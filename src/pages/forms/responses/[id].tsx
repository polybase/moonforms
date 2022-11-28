import { Box, Text } from '@chakra-ui/react';
import { usePolybase } from '@polybase/react';
import { aescbc, decodeFromString, secp256k1 } from '@polybase/util';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { Layout } from '../../../features/common/Layout';
import {
  QuestionAnswer,
  ResponseRecord,
  ResponseUserRecord,
} from '../../../features/types';
import { useAuth } from '../../../features/users/useAuth';

const FormResponses = () => {
  const router = useRouter();
  const polybase = usePolybase();
  const { auth } = useAuth();

  const [formId, setFormId] = useState<string>(router.query.id as string);
  const [loading, setLoading] = useState<boolean>(true);
  const [decryptedAnswers, setDecryptedAnswers] = useState<QuestionAnswer[][]>(
    []
  );

  const responseCollectionReference =
    polybase.collection<ResponseRecord>('response');
  const responseUserCollectionReference =
    polybase.collection<ResponseUserRecord>('responseUser');

  const queryCollections = useCallback(
    async (formId: string) => {
      if (!auth) throw new Error('You are not authenticated');
      try {
        const responsesCollection = await responseCollectionReference.get();
        const userResponsesCollection =
          await responseUserCollectionReference.get();

        const formResponses = responsesCollection.data.filter(
          (r) => r.data.formId === formId
        );

        const userResponses = formResponses.map((resp) => {
          return {
            // get the user response where user id == owner address && response id == resp id
            userResponse: userResponsesCollection.data.find(
              (r) =>
                r.data.responseId === resp.data.id &&
                r.data.userId === auth.accountAddress
            ),
            encryptedData: resp.data.encryptedData,
          };
        });

        const decryptedResponses = userResponses.map(async (resp) => {
          const decodedPrivateKey = decodeFromString(
            auth.walletAccount.getPrivateKeyString(),
            'hex'
          );
          const symmetricKey = await secp256k1.asymmetricDecryptFromEncoding(
            decodedPrivateKey,
            resp?.userResponse?.data.encryptedEncryptionKey as string,
            'base64'
          );
          return await aescbc.symmetricDecryptFromEncoding(
            decodeFromString(symmetricKey, 'hex'),
            resp.encryptedData,
            'base64'
          );
        });

        const parsedResponses = await Promise.all(decryptedResponses);
        setDecryptedAnswers(
          parsedResponses.map((r) => JSON.parse(r) as QuestionAnswer[])
        );
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    },
    [auth, responseCollectionReference, responseUserCollectionReference]
  );

  useEffect(() => {
    setFormId(router.query.id as string);
    queryCollections(formId).catch(() => null);
  }, [formId, queryCollections, router.query.id]);

  return (
    <Layout isLoading={loading}>
      {decryptedAnswers.map((answers, index) => {
        return (
          <Box bg='red.200' mb={11} key={index}>
            {answers.map((answer, index) => {
              return (
                <Text color='white' key={index}>
                  {answer.data}
                </Text>
              );
            })}
          </Box>
        );
      })}
    </Layout>
  );
};

export default FormResponses;
