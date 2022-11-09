import {
  Box,
  Button,
  Container,
  FormLabel,
  Icon,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { usePolybase } from '@polybase/react';
import { Form, Formik, useFormikContext } from 'formik';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { Plus } from 'phosphor-react';
import React, { useState } from 'react';

import { initialFormValue } from '../../components/FormsPage/Forms/newFormSchema';
import QuestionCard from '../../components/FormsPage/Questions/QuestionCard';
import { Layout } from '../../features/common/Layout';
import { FormDetails, Question } from '../../features/types';

const FormDetails = () => {
  const { handleChange, values } = useFormikContext<FormDetails>();
  return (
    <>
      <Text
        fontWeight='500'
        color='purple.5'
        mb={1}
        fontSize='md'
        as={FormLabel}
      >
        Title
      </Text>

      <Input
        id='title'
        color='purple.4'
        focusBorderColor='purple.3'
        borderColor='purple.2'
        w={{ base: 'full', sm: 'lg', md: 'lg', lg: 'lg' }}
        placeholder='Untitled form'
        type='text'
        value={values.title}
        onChange={handleChange}
      />
      <Text
        fontWeight='500'
        color='purple.5'
        mb={1}
        fontSize='md'
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
  const router = useRouter();
  const [formQuestions, setFormQuestions] = useState<{
    [id: string]: Question;
  }>({});
  const db = usePolybase();
  const formsCollection = db.collection('Form');
  const questionsCollection = db.collection('Question');

  const handleCreateQuestions = async (formId: string) => {
    const questions = Object.keys(formQuestions);
    for (let i = 0; i < questions.length; i++) {
      await questionsCollection.create([]);
    }
  };

  const handleCreateForm = async (values: FormDetails) => {
    try {
      const _values = values;
      _values.questions = Object.keys(formQuestions).map(
        (id) => formQuestions[id]
      );

      const formId = nanoid();
      const createdForm = await formsCollection.create([
        formId,
        _values.title,
        _values.description,
        `${Math.floor(Date.now() / 1000)}`,
      ]);

      console.log('create form', createdForm);
    } catch (e) {
      console.log(`error creating form`, e);
    }
  };

  const handleQuestionChange = (
    id: string,
    changeType: 'title' | 'type' | 'required',
    value: unknown
  ) => {
    setFormQuestions({
      ...formQuestions,
      [id]: {
        id,
        type:
          changeType === 'type' ? (value as string) : formQuestions[id].type,
        title:
          changeType === 'title' ? (value as string) : formQuestions[id].title,
        required:
          changeType === 'required'
            ? (value as boolean)
            : formQuestions[id].required,
      },
    });
  };

  const handleNewQuestion = () => {
    const newQuestions = { ...formQuestions };
    const questionId = nanoid();
    newQuestions[questionId] = {
      id: questionId,
      type: 'short-text',
      title: '',
      required: false,
    };
    setFormQuestions(newQuestions);
  };

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
              <Formik
                initialValues={initialFormValue}
                onSubmit={handleCreateForm}
              >
                <Box pb={3} maxW='full'>
                  <Form>
                    <FormDetails />
                    <Text
                      fontWeight='500'
                      color='purple.5'
                      mt={3}
                      fontSize='md'
                    >
                      Questions
                      {Object.keys(formQuestions).length >= 1 && (
                        <Text
                          fontWeight={400}
                          color='purple.2'
                          fontSize='xs'
                          as='span'
                        >
                          {' '}
                          - {Object.keys(formQuestions).length} questions
                        </Text>
                      )}
                    </Text>
                    <Button
                      leftIcon={<Icon weight='bold' as={Plus} />}
                      onClick={handleNewQuestion}
                      bg='purple.05'
                      color='purple.3'
                      size='xs'
                    >
                      Add question
                    </Button>

                    <Box mb={5}>
                      {Object.keys(formQuestions).length < 1 && (
                        <Text mt={4}>Add a question to get started</Text>
                      )}
                      {Object.keys(formQuestions).length >= 1 &&
                        Object.keys(formQuestions).map((id) => {
                          return (
                            <QuestionCard
                              key={nanoid()}
                              changeHandler={handleQuestionChange}
                              details={{
                                title: formQuestions[id].title,
                                id,
                                type: formQuestions[id].type,
                                required: formQuestions[id].required,
                              }}
                            />
                          );
                        })}
                    </Box>

                    <Button
                      size='md'
                      _hover={{ bg: 'purple.1' }}
                      color='purple.4'
                      bg='purple.05'
                      mt='4'
                      type='submit'
                    >
                      Create form
                    </Button>
                  </Form>
                </Box>
              </Formik>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
};

export default NewForm;
