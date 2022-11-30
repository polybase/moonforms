import { Box, Container, Text, VStack } from '@chakra-ui/react';
import { usePolybase } from '@polybase/react';
import { aescbc, decodeFromString, secp256k1 } from '@polybase/util';
import { useCallback, useEffect, useState } from 'react';

import { Layout } from '../features/common/Layout';
import {
  FormRecord,
  QuestionAnswer,
  ResponseRecord,
  ResponseUserRecord,
  SubmittedUserResponse,
} from '../features/types';
import { useAuth } from '../features/users/useAuth';

const Responses = () => {
  const polybase = usePolybase();
  const { auth } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [submittedResponses, setSubmittedResponses] =
    useState<SubmittedUserResponse[]>();

  const responseCollectionRef = polybase.collection<ResponseRecord>('response');
  const responseUserCollectionRef =
    polybase.collection<ResponseUserRecord>('responseUser');
  const formCollectionRef = polybase.collection<FormRecord>('form');

  const queryCollections = useCallback(async () => {
    if (!auth) throw new Error('You are not authenticated');
    // const userResponses = await responseUserCollectionRef.where('userId', '==', auth.accountAddress).get();
    const responsesUserCollection = await responseUserCollectionRef.get();
    const responsesCollection = await responseCollectionRef.get();
    const filteredUserResponses = responsesUserCollection.data.filter(
      (r) => r.data.userId === auth.accountAddress
    );

    const decryptedResponses = filteredUserResponses.map(async (resp) => {
      const response = responsesCollection.data.find(
        (r) => r.data.id === resp.data.responseId
      );

      if (!response || !resp) return null;

      const decodedPrivateKey = decodeFromString(
        auth.walletAccount.getPrivateKeyString(),
        'hex'
      );
      const symmetricKey = await secp256k1.asymmetricDecryptFromEncoding(
        decodedPrivateKey,
        resp.data.encryptedEncryptionKey as string,
        'base64'
      );
      const formDetails = await formCollectionRef
        .record(response.data.formId)
        .get();
      const decryptedResponse = await aescbc.symmetricDecryptFromEncoding(
        decodeFromString(symmetricKey, 'hex'),
        response.data.encryptedData,
        'base64'
      );

      return {
        formTitle: formDetails.data.title,
        decryptedResponse: JSON.parse(decryptedResponse) as QuestionAnswer[],
      } as SubmittedUserResponse;
    });

    const data = await Promise.all(decryptedResponses);
    setLoading(false);
    setSubmittedResponses(data as SubmittedUserResponse[]);
  }, [
    auth,
    formCollectionRef,
    responseCollectionRef,
    responseUserCollectionRef,
  ]);

  useEffect(() => {
    queryCollections().catch(() => null);
  }, [queryCollections]);

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
            {submittedResponses?.map((response, index) => {
              return (
                <Box key={`response-${index}`}>
                  <Text color='gray.200' fontSize='xl' fontWeight={500}>
                    {response.formTitle}
                  </Text>
                  <VStack>
                    {/*{response.decryptedResponse.map((answer, index) => {*/}
                    {/*  return (*/}
                    {/*    <Box key={`answer-${index}`}>*/}
                    {/*      <Text>{answer.data}</Text>*/}
                    {/*    </Box>*/}
                    {/*  );*/}
                    {/*})}*/}
                  </VStack>
                </Box>
              );
            })}
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Responses;
