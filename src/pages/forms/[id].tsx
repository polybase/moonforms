import { Box, Button, Container, Text, VStack } from '@chakra-ui/react';
import EthCrypto from 'eth-crypto';
import { CollectionRecordResponse } from '@polybase/client';
import { usePolybase } from '@polybase/react';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import { map } from 'lodash';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import ResponseQuestion from '../../components/Questions/ResponseCard';
import { Layout } from '../../features/common/Layout';
import {
  FormRecord,
  QuestionRecord,
  ResponseDetails,
  UserRecord,
} from '../../features/types';
import { useAuth } from '../../features/users/useAuth';

const FormResponsePage = () => {
  const router = useRouter();
  const polybase = usePolybase();
  const { auth } = useAuth();

  const [formId, setFormId] = useState<string>(router.query.id as string);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  const [questions, setQuestions] =
    useState<CollectionRecordResponse<QuestionRecord>[]>();
  const [formRecord, setFormRecord] =
    useState<CollectionRecordResponse<FormRecord>>();
  const [authorizedUsers, setAuthorizedUsers] =
    useState<CollectionRecordResponse<UserRecord>[]>();

  const responseCollection = polybase.collection('response');
  const responseUserCollection = polybase.collection('responseUser');
  const formCollection = polybase.collection<FormRecord>('form');
  const questionCollection = polybase.collection<QuestionRecord>('question');
  const userCollection = polybase.collection<UserRecord>('user');

  const getCollections = useCallback(
    async (formId: string) => {
      if (!auth) throw new Error('You are not authenticated');
      const formRecord = await formCollection.record(formId).get();
      const questions = await questionCollection.get();
      const formCreatedBy = await userCollection
        .record(formRecord.data.createdBy)
        .get();
      const responseSubmitter = await userCollection
        .record(auth.accountAddress)
        .get();

      setQuestions(
        questions.data.filter(
          (q) => q.data.formId === (router.query.id as string)
        )
      );
      setAuthorizedUsers([formCreatedBy, responseSubmitter]);
      setFormRecord(formRecord);
      setIsLoading(false);
    },
    [auth, formCollection, questionCollection, router.query.id, userCollection]
  );

  const handleSubmitResponse = async (
    values: ResponseDetails,
    helpers: FormikHelpers<ResponseDetails>
  ) => {
    if (!auth || !authorizedUsers) throw new Error('You are not authenticated');

    setFormSubmitting(true);

    const responseId = nanoid();
    const _values = values;

    _values.id = responseId;
    _values.form = formId;

    const symmetricKey = EthCrypto.createIdentity();

    const encryptedResponse = await EthCrypto.encryptWithPublicKey(
      symmetricKey.publicKey,
      JSON.stringify(_values.answers)
    );

    await responseCollection.create([
      responseId,
      formId,
      `${Math.floor(Date.now() / 1000)}`,
      EthCrypto.cipher.stringify(encryptedResponse),
    ]);

    const createdUserResponses = authorizedUsers.map(async (user) => {
      const { id: userId, publicKey } = user.data;

      const encryptedSymmetricKeyWithUsersPublicKey = await EthCrypto.encryptWithPublicKey(
        publicKey.replace('0x', ''),
        JSON.stringify(symmetricKey)
      );

      return responseUserCollection.create([
        nanoid(),
        userId,
        responseId,
        EthCrypto.cipher.stringify(encryptedSymmetricKeyWithUsersPublicKey),
      ]);
    });

    await Promise.all(createdUserResponses);

    // setFormSubmitting(false);
    helpers.resetForm();
  };

  // const encryptData = async (data: string) => {
  //   // const encryptedObject = await EthCrypto.encryptWithPublicKey(
  //   //   formRecord?.data..replace('0x', '') as string,
  //   //   data
  //   // );
  //
  //   // const decrypted = await EthCrypto.decryptWithPrivateKey(auth?.walletAccount.getPrivateKeyString() as string, EthCrypto.cipher.parse(EthCrypto.cipher.stringify(encryptedObject)));
  //   // console.log('decrypted', decrypted)
  //
  //   // return EthCrypto.cipher.stringify(encryptedObject);
  // };

  useEffect(() => {
    setIsLoading(true);
    setFormId(router.query.id as string);

    getCollections(formId).catch(() => null);

    setIsLoading(false);
  }, [getCollections, router, auth, formId, setIsLoading]);
  return (
    <Layout isLoading={isLoading}>
      <Container mt={10} maxWidth='container.lg'>
        <VStack
          maxWidth='container.lg'
          alignItems='center'
          display='flex'
          flexDirection='column'
        >
          <Box
            w='full'
            borderRadius='md'
            maxWidth='container.lg'
            bgGradient={'radial-gradient(78.9% 78.52% at 24.68% 21.48%, #2C2E30 0%, #1E2124 100%)'}
            p={8}
          >
            <Text color='purple.1' fontWeight={700} fontSize={{base: '2xl', lg: '5xl'}}>
              {formRecord?.data.title}
            </Text>
            <Text color='gray.300' as='p' fontSize='md'>
              {formRecord?.data.description}
            </Text>
          </Box>
          <Box w='full' borderRadius='md' maxWidth='container.lg'>
            <Formik
              initialValues={
                {
                  id: '',
                  form: '',
                  answers: [],
                } as ResponseDetails
              }
              onSubmit={handleSubmitResponse}
            >
              {() => (
                <Form>
                  <FieldArray name='answers'>
                    {() => (
                      <>
                        {map(questions, ({ data }, index) => {
                          return (
                            <ResponseQuestion
                              key={data.id}
                              index={index}
                              question={data}
                            />
                          );
                        })}
                      </>
                    )}
                  </FieldArray>
                  <Button
                    size='md'
                    _hover={{ bg: 'purple.1' }}
                    color='purple.4'
                    bg='purple.05'
                    mt='4'
                    type='submit'
                    isLoading={formSubmitting}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
          <Box pb={14} display={'flex'} alignItems={'center'} alignContent={'center'} justifyContent={'center'} mt={20} w={'full'}>
            <VStack>
              <Text mt={5} color={'gray.500'}>The content of this response is encrypted and can only be viewed by you and the forms owner</Text>
              <Text  color={'gray.600'} fontWeight={700}> Powered by Polybase</Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
};

export default FormResponsePage;
