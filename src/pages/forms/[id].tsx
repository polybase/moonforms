import {Alert, Box, Button, Container, Fade, Icon, Text, VStack} from '@chakra-ui/react';
import { CollectionRecordResponse } from '@polybase/client';
import * as eth from '@polybase/eth';
import { usePolybase } from '@polybase/react';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import { map } from 'lodash';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { aescbc, secp256k1, x25519xsalsa20poly1305, decodeFromString, encodeToString } from '@polybase/util'

import ResponseQuestion from '../../components/Questions/ResponseCard';
import { Layout } from '../../features/common/Layout';
import {
  AlertDetails,
  FormRecord,
  QuestionRecord,
  ResponseDetails,
  UserRecord,
} from '../../features/types';
import { useAuth } from '../../features/users/useAuth';

const pause = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

const FormResponsePage = () => {
  const router = useRouter();
  const polybase = usePolybase();
  const { auth } = useAuth();

  const [formId, setFormId] = useState<string>(router.query.id as string);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [alertDetails, setAlertDetails] = useState<AlertDetails>({
    show: false,
    type: 'error',
    message: '',
  });

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

    let canSubmitForm = true;
    setFormSubmitting(true);

    for (let i = 0; i < values.answers.length; i++) {
      const question = questions?.find(q => q.data.id === values.answers[i].questionId);
      if (question?.data.required === 'true') {
        if (values.answers[i].data === '' || values.answers[i].type === 'checkbox' && values.answers[i].data === '[]') {
          canSubmitForm = false;
        }
      }
    }

    if (!canSubmitForm) {
      setAlertDetails({
        show: true,
        type: 'error',
        message: 'Answer all of the required questions to submit the form'
      })
      await pause(300)
      setFormSubmitting(false)
    }

    const responseId = nanoid();
    const _values = values;

    _values.id = responseId;
    _values.form = formId;

    const symmetricKey = aescbc.generateSecretKey()

    const encryptedResponse = await aescbc.symmetricEncryptToEncoding(symmetricKey, JSON.stringify(_values.answers), 'base64')

    await responseCollection.create([
      responseId,
      formId,
      `${Math.floor(Date.now() / 1000)}`,
      encryptedResponse,
    ]);

    const createdUserResponses = authorizedUsers.map(async (user, index) => {
      const { id: userId, publicKey } = user.data;

      const decodedPublicKeyStr = decodeFromString(publicKey, 'hex')
      const encryptedSymmetricKeyWithUsersPublicKey = await secp256k1.asymmetricEncryptToEncoding(decodedPublicKeyStr, encodeToString(symmetricKey, 'hex'), 'base64')

      return responseUserCollection.create([
        nanoid(),
        userId,
        responseId,
        encryptedSymmetricKeyWithUsersPublicKey,
      ]);
    });

    await Promise.all(createdUserResponses);
    setAlertDetails({
      show: true,
      type: 'success',
      message: '🎉 Your response has been submitted'
    })
    setFormSubmitting(false);
    helpers.resetForm();
  };

  useEffect(() => {
    setFormId(router.query.id as string);
    getCollections(formId).catch(() => null);
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
            boxShadow={'md'}
            bgGradient={'radial-gradient(78.9% 78.52% at 24.68% 21.48%, #2C2E30 0%, #1E2124 100%)'}
            p={8}
          >
            <Text color='white' fontWeight={700} fontSize={{base: '2xl', lg: '5xl'}}>
              {formRecord?.data.title}
            </Text>
            <Text color='gray.300' as='p' fontSize='md'>
              {formRecord?.data.description}
            </Text>
          </Box>
          <Box w='full' borderRadius='md' maxWidth='container.lg'>
            {alertDetails.show && (
              <Fade in={alertDetails.show} unmountOnExit={true}>
                <Alert
                  rounded='lg'
                  fontSize={'lg'}
                  fontWeight={500}
                  color={
                    alertDetails.type === 'error' ? 'red.800' : 'green.800'
                  }
                  status={alertDetails.type}
                  w={'full'}
                >
                  <Text>
                    {alertDetails.message}
                  </Text>
                </Alert>
              </Fade>
            )}
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
                    size='lg'
                    _hover={{ bg: 'gray.300' }}
                    color='dark.1'
                    bg='white'
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
