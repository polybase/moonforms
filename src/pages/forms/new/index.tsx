import {
  Alert,
  Box,
  Button,
  Container,
  Fade,
  FormLabel,
  Icon,
  Input,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { usePolybase } from '@polybase/react';
import {
  FieldArray,
  Form,
  Formik,
  FormikHelpers,
  useFormikContext,
} from 'formik';
import { map } from 'lodash';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { ArrowUpRight, Plus } from 'phosphor-react';
import React, { useEffect, useState } from 'react';

import FormCreationCard from '../../../components/Questions/FormCreationCard';
import { initialFormValue } from '../../../features/common/formik';
import { Layout } from '../../../features/common/Layout';
import {
  AlertDetails,
  FormDetails,
  QuestionDetails,
} from '../../../features/types';
import { useAuth } from '../../../features/users/useAuth';

const pause = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

const FormDetails = () => {
  const { handleChange, values } = useFormikContext<FormDetails>();
  return (
    <Box maxW='3xl'>
      <Text fontWeight='600' color='white' mb={1} fontSize='xl' as={FormLabel}>
        Title
      </Text>

      <Input
        id='title'
        color='white'
        focusBorderColor='white'
        borderColor='white'
        fontSize='xl'
        boxShadow='md'
        w={{ base: 'full', sm: 'lg', md: 'lg', lg: '3xl' }}
        placeholder='Untitled form'
        type='text'
        value={values.title}
        onChange={handleChange}
      />
      <Text
        fontWeight='600'
        color='purple.05'
        mb={1}
        fontSize='xl'
        as={FormLabel}
        mt={5}
      >
        Description
      </Text>
      <Textarea
        boxShadow='md'
        fontSize='xl'
        color='white'
        focusBorderColor='white'
        borderColor='white'
        w={{ base: 'full', sm: 'lg', md: 'lg', lg: '3xl' }}
        name='description'
        onChange={handleChange}
        value={values.description}
        placeholder='Description...'
        size='md'
        resize='none'
      />
    </Box>
  );
};

const NewForm = () => {
  const { auth } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const db = usePolybase();

  const formsCollection = db.collection('form');
  const questionsCollection = db.collection('question');

  const [loading, setLoading] = useState<boolean>(false);
  const [formId, setFormId] = useState<string>(nanoid());
  const [alertDetails, setAlertDetails] = useState<AlertDetails>({
    show: false,
    type: 'error',
    message: '',
  });
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  const handleCreateQuestions = async (questions: QuestionDetails[]) => {
    if (!auth) throw new Error('You must be logged in to create a form');

    for (let i = 0; i < questions.length; i++) {
      await questionsCollection.create([
        questions[i].id,
        formId,
        questions[i].title,
        questions[i].type,
        `${questions[i].required}`,
        questions[i].data,
        auth.accountAddress,
      ]);
    }
  };

  const handleSubmitForm = async (
    values: FormDetails,
    helpers: FormikHelpers<FormDetails>
  ) => {
    try {
      if (!auth) return;
      const _values = values;

      if (_values.title === '') {
        _values.title = 'Untitled form';
      }

      if (values.questions.length < 1) {
        setAlertDetails({
          show: true,
          type: 'error',
          message: "It seems like your form doesn't have questions",
        });
        await pause(2000);

        setAlertDetails({
          show: false,
          type: 'error',
          message: '',
        });
        return;
      }

      setFormSubmitting(true);

      // New form parameters: id, title, description, createdAt
      await formsCollection.create([
        formId,
        _values.title,
        _values.description,
        `${Math.floor(Date.now() / 1000)}`,
        auth.accountAddress,
      ]);

      await handleCreateQuestions(values.questions);

      setFormSubmitting(false);

      helpers.resetForm();

      setAlertDetails({
        show: true,
        type: 'success',
        message: '🎉 Your form has been created!',
      });

      await pause(4000);

      setAlertDetails({
        show: false,
        type: 'error',
        message: '',
      });

      setFormId(nanoid());
    } catch (e) {
      toast({
        title: 'Error submitting form, please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setFormSubmitting(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (!auth) {
      router.push('/');
      return;
    }
    setLoading(false);
  }, [auth, router]);
  return (
    <Layout isLoading={loading}>
      <Container maxWidth='container.xl'>
        <VStack display='flex' maxW='full'>
          <Box
            display='flex'
            w='full'
            alignItems='start'
            flexDirection='column'
          >
            <Text
              onClick={async () => {
                await router.push('/dashboard');
              }}
              cursor='pointer'
              color='white'
              fontSize='xl'
              fontWeight={500}
            >
              {'< Dashboard'}
            </Text>
            <VStack
              mt={10}
              w='full'
              experimental_spaceY={8}
              display='flex'
              alignItems='center'
            >
              {alertDetails.show && (
                <Fade in={alertDetails.show} unmountOnExit={true}>
                  <Alert
                    rounded='lg'
                    color={
                      alertDetails.type === 'error' ? 'red.800' : 'green.800'
                    }
                    status={alertDetails.type}
                  >
                    <Text>
                      {alertDetails.message}
                      {alertDetails.type === 'success' && (
                        <Button
                          onClick={async () => {
                            await router.push(`/forms/${formId}`);
                          }}
                          iconSpacing={0}
                          _hover={{ textDecoration: 'none' }}
                          ml={2}
                          rightIcon={<Icon weight='bold' as={ArrowUpRight} />}
                          color='green.800'
                          variant='link'
                        >
                          Go to form
                        </Button>
                      )}
                    </Text>
                  </Alert>
                </Fade>
              )}
              <Formik
                initialValues={initialFormValue}
                onSubmit={handleSubmitForm}
              >
                {({ values }) => (
                  <Box pb={3} maxWidth='3xl' display='flex' alignItems='center'>
                    <Form>
                      <FormDetails />
                      <Box mt={10} mb={5}>
                        <Text
                          fontWeight='600'
                          color='white'
                          mt={3}
                          fontSize='xl'
                        >
                          Questions
                        </Text>
                        <FieldArray name='questions'>
                          {({ push }) => (
                            <Box>
                              <Button
                                leftIcon={<Icon weight='bold' as={Plus} />}
                                onClick={() => {
                                  push({
                                    id: nanoid(),
                                    title: 'Untitled question',
                                    type: 'short-text',
                                    required: false,
                                    data: '',
                                  });
                                }}
                                bg='transparent'
                                _hover={{ bg: 'white', color: 'dark.1' }}
                                border='1px'
                                borderColor='white'
                                borderRadius='lg'
                                color='white'
                                size='md'
                              >
                                Add question
                              </Button>

                              {values.questions.length < 1 && (
                                <Box
                                  border='2px'
                                  borderColor='gray.300'
                                  borderStyle='dashed'
                                  rounded='md'
                                  p={3}
                                  display='flex'
                                  justifyContent='center'
                                  mt={4}
                                >
                                  <Text
                                    fontSize='lg'
                                    fontWeight={500}
                                    textAlign='center'
                                    color='white'
                                  >
                                    🚀 Add a question to get started
                                  </Text>
                                </Box>
                              )}
                              {values.questions.length >= 1 &&
                                map(values.questions, (value, index) => {
                                  return (
                                    <FormCreationCard
                                      key={`question_${index}`}
                                      index={index}
                                    />
                                  );
                                })}
                            </Box>
                          )}
                        </FieldArray>
                      </Box>
                      <Button
                        size='lg'
                        _hover={{ bg: 'gray.300' }}
                        color='dark.1'
                        bg='white'
                        mt='4'
                        type='submit'
                        isLoading={formSubmitting}
                      >
                        Create form
                      </Button>
                    </Form>
                  </Box>
                )}
              </Formik>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
};

export default NewForm;
