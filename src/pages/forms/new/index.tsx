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
import { FormDetails, QuestionDetails } from '../../../features/types';
import { useAuth } from '../../../features/users/useAuth';
interface AlertDetails {
  message: string;
  type: 'success' | 'error';
}
const pause = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

const FormDetails = () => {
  const { handleChange, values } = useFormikContext<FormDetails>();
  return (
    <>
      <Text
        fontWeight='600'
        color='purple.5'
        mb={1}
        fontSize='lg'
        as={FormLabel}
      >
        Title
      </Text>

      <Input
        id='title'
        color='purple.4'
        focusBorderColor='purple.3'
        borderColor='purple.2'
        fontSize='lg'
        w={{ base: 'full', sm: 'lg', md: 'lg', lg: 'lg' }}
        placeholder='Untitled form'
        type='text'
        value={values.title}
        onChange={handleChange}
      />
      <Text
        fontWeight='600'
        color='purple.5'
        mb={1}
        fontSize='lg'
        as={FormLabel}
        mt={2}
      >
        Description
      </Text>
      <Textarea
        color='purple.4'
        focusBorderColor='purple.3'
        borderColor='purple.2'
        maxW='xl'
        fontSize='lg'
        name='description'
        onChange={handleChange}
        value={values.description}
        placeholder='Description...'
        size='md'
        resize='none'
      />
    </>
  );
};

const NewForm = () => {
  const { auth } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const db = usePolybase();

  const formsCollection = db.collection('formTwo');
  const questionsCollection = db.collection('question');

  const [formId, setFormId] = useState<string>(nanoid());
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertDetails, setAlertDetails] = useState<AlertDetails>({
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
        setShowAlert(true);
        setAlertDetails({
          type: 'error',
          message: "It seems like your form doesn't have questions",
        });
        await pause(2000);
        setShowAlert(false);
        setAlertDetails({
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
      ]);

      await handleCreateQuestions(values.questions);

      setFormSubmitting(false);

      helpers.resetForm();

      setShowAlert(true);
      setAlertDetails({
        type: 'success',
        message: '🎉 Your form has been created!',
      });

      await pause(4000);

      setShowAlert(false);
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
    if (!auth) {
      router.push('/');
    }
  }, [auth, router]);
  return (
    <Layout>
      <Container maxWidth='container.lg'>
        <VStack
          display='flex'
          maxW='3xl'
          alignItems={{
            base: 'left',
            sm: 'center',
            md: 'center',
            lg: 'center',
          }}
        >
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
              color='purple.3'
              fontSize='md'
              fontWeight={500}
            >
              {'< View your Forms'}
            </Text>
            <VStack
              mt={10}
              w='full'
              experimental_spaceY={8}
              display='flex'
              alignItems='left'
            >
              {showAlert && (
                <Fade in={showAlert} unmountOnExit={true}>
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
                  <Box pb={3} maxW='full'>
                    <Form>
                      <FormDetails />
                      <Box mb={5}>
                        <Text
                          fontWeight='600'
                          color='purple.5'
                          mt={3}
                          fontSize='lg'
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
                                bg='purple.05'
                                color='purple.3'
                                size='sm'
                              >
                                Add question
                              </Button>

                              {values.questions.length < 1 && (
                                <Box
                                  border='2px'
                                  borderColor='purple.2'
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
                                    color='purple.2'
                                  >
                                    Add a question to get started
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
                        _hover={{ bg: 'purple.3' }}
                        color='white'
                        bg='purple.2'
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
