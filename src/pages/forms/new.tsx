import { Box, Button, Container, Icon, Text, VStack } from '@chakra-ui/react';
import { Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import { Plus } from 'phosphor-react';
import React from 'react';

import {
  initialFormValue,
  NewFormSchema,
} from '../../components/FormsPage/Forms/newFormSchema';
import QuestionCard from '../../components/FormsPage/Questions/QuestionCard';
import { Layout } from '../../features/common/Layout';
import FormDetails from "../../components/FormsPage/Forms/FormDetails";

const SubmitForm = () => {
  const { submitForm } = useFormikContext()
  return (
      <Button
          onClick={async () => { console.log("hello") }}
          size='md'
          _hover={{ bg: 'purple.1' }}
          color='purple.4'
          bg='purple.05'
          mt='4'
      >
        Create form
      </Button>
  )
}

const NewForm = () => {
  const router = useRouter();

  // const db = usePolybase();
  // const formsCollection = db.collection('Form');

  const handleCreateForm = async () => {
    console.log('edldld')
    // try {
    //   console.log('submit form');
    //   // const createdForm = await formsCollection.create([
    //   //   'test-id',
    //   //   'new testing',
    //   //   'description',
    //   //   'created at',
    //   // ]);
    //   // console.log('create form', createdForm);
    // } catch (e) {
    //   console.log(`error creating form`, e);
    // }
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
                validationSchema={NewFormSchema}
                onSubmit={(values, formikHelpers) => {console.log(values,formikHelpers)}}
              >
                <Box maxW='full'>
                  <Text fontWeight='500' color='purple.5' mb={1} fontSize='md'>
                    Title & Description
                  </Text>

                  <FormDetails/>

                  <Box mt={10} maxW='full'>
                    <Text
                      fontWeight='500'
                      color='purple.5'
                      mb={1}
                      fontSize='md'
                    >
                      Questions
                    </Text>

                    <Button
                      leftIcon={<Icon weight='bold' as={Plus} />}
                      bg='purple.05'
                      color='purple.3'
                      size='xs'
                    >
                      Add question
                    </Button>

                    <QuestionCard />

                    <SubmitForm/>
                  </Box>
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
