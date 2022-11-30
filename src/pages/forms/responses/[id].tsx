import { Box, Container, Text, VStack } from '@chakra-ui/react';
import { usePolybase } from '@polybase/react';
import { aescbc, decodeFromString, secp256k1 } from '@polybase/util';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import FormResponsesTable from '../../../components/Responses/FormResponsesTable';
import { Layout } from '../../../features/common/Layout';
import {
  FormAnswers,
  QuestionAnswer,
  QuestionRecord,
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
  const [questionResponses, setQuestionResponses] = useState<FormAnswers[]>([]);
  const responseCollectionRef = polybase.collection<ResponseRecord>('response');
  const responseUserCollectionRef =
    polybase.collection<ResponseUserRecord>('responseUser');
  const questionCollectionRef = polybase.collection<QuestionRecord>('question');

  const queryCollections = useCallback(
    async (formId: string) => {
      if (!auth) throw new Error('You are not authenticated');
      try {
        const responsesCollection = await responseCollectionRef.get();
        const userResponsesCollection = await responseUserCollectionRef.get();
        const questionsCollection = await questionCollectionRef.get();
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

        const responses = await Promise.all(decryptedResponses);
        // todo show question titles as columns and answers as rows
        console.log(responses.map(r => JSON.parse(r) as QuestionAnswer[]))

        setLoading(false);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    [
      auth,
      questionCollectionRef,
      responseCollectionRef,
      responseUserCollectionRef,
    ]
  );

  useEffect(() => {
    setFormId(router.query.id as string);
    queryCollections(formId).catch(() => null);
  }, [formId, queryCollections, router.query.id]);

  return (
    <Layout isLoading={loading}>
      <Container mt={10} maxWidth='container.lg'>
        <VStack
          alignItems='start'
          display='flex'
          flexDirection='column'
          spacing={12}
        >
          <Box w='full'>
            {/*<VStack mt={2} alignItems='start' w='full' spacing={32}>*/}
            {/*  <FormResponsesTable questionAnswers={questionResponses} />*/}
            {/*</VStack>*/}
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
};

export default FormResponses;
