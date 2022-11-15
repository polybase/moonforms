import { Box, Button, Container, Text, VStack } from '@chakra-ui/react';
import { CollectionRecordResponse } from '@polybase/client';
import { usePolybase } from '@polybase/react';
import EthCrypto from 'eth-crypto';
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
} from '../../features/types';
import { useAuth } from '../../features/users/useAuth';

const FormResponsePage = () => {
  const router = useRouter();

  const [questions, setQuestions] =
    useState<CollectionRecordResponse<QuestionRecord>[]>();
  const [formRecord, setFormRecord] =
    useState<CollectionRecordResponse<FormRecord>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [formId, setFormId] = useState<string>(router.query.id as string);

  const polybase = usePolybase();
  const { auth } = useAuth();

  const responseCollection = polybase.collection('response');
  // const { data, loading, error } = useDocument(polybase.collection<FormRecord>('formTwo').record(query.id as string));
  // const questionsCollection = useCollection(polybase.collection('question').where('form', '==', query.id as string))
  const getQuestions = useCallback(async () => {
    if (!auth) throw new Error('You are not authenticated');
    const collection = await polybase
      .collection<QuestionRecord>('question')
      .get();
    setQuestions(
      collection.data.filter((q) => q.data.form === (router.query.id as string))
    );
    setIsLoading(false);
  }, [auth, polybase, router.query.id]);

  const getForm = useCallback(
    async (formId: string) => {
      if (!auth) throw new Error('You are not authenticated');
      const collection = await polybase
        .collection<FormRecord>('formTwo')
        .record(formId)
        .get();
      setFormRecord(collection);
      setIsLoading(false);
    },
    [auth, polybase]
  );

  const handleSubmitResponse = async (
    values: ResponseDetails,
    helpers: FormikHelpers<ResponseDetails>
  ) => {
    // setFormSubmitting(true);
    //
    // const _values = values;
    // const encryptedAnswers = await encryptData(JSON.stringify(_values.answers));
    // _values.id = nanoid();
    // _values.form = formId;
    //
    // const response = await responseCollection.create([
    //   nanoid(),
    //   formId,
    //   `${Math.floor(Date.now() / 1000)}`,
    //   encryptedAnswers,
    // ]);
    //
    // setFormSubmitting(false);
    // helpers.resetForm();
  };

  const encryptData = async (data: string): Promise<string> => {
    const encryptedObject = await EthCrypto.encryptWithPublicKey(
      formRecord?.data.publickey.replace('0x', '') as string,
      data
    );

    // const decrypted = await EthCrypto.decryptWithPrivateKey(auth?.walletAccount.getPrivateKeyString() as string, EthCrypto.cipher.parse(EthCrypto.cipher.stringify(encryptedObject)));
    // console.log('decrypted', decrypted)

    return EthCrypto.cipher.stringify(encryptedObject);
  };

  useEffect(() => {
    // setIsLoading(true)
    // if (!auth) {
    //   router.push('/');
    //   return;
    // }
    setFormId(router.query.id as string);
    getQuestions().catch(() => null);
    getForm(formId).catch(() => null);
    setIsLoading(false);
  }, [getQuestions, getForm, router, auth, formId, setIsLoading]);
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
            bg='purple.05'
            p={5}
          >
            <Text color='purple.5' fontWeight={600} fontSize='4xl'>
              {formRecord?.data.title}
            </Text>
            <Text color='purple.4' as='p' fontSize='md'>
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
        </VStack>
      </Container>
    </Layout>
  );
};

export default FormResponsePage;
