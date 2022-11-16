import { Box, Button, Container, Text, VStack } from '@chakra-ui/react';
import { CollectionList } from '@polybase/client';
import { usePolybase } from '@polybase/react';
import { map } from 'lodash';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import FormPreviewCard from '../components/Dashboard/FormPreviewCard';
import { Layout } from '../features/common/Layout';
import { FormRecord } from '../features/types';
import { useAuth } from '../features/users/useAuth';

const Dashboard = () => {
  const polybase = usePolybase();
  const router = useRouter();
  const { auth } = useAuth();

  const [forms, setForms] = useState<CollectionList<FormRecord>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserForms = useCallback(async () => {
    if (!auth) throw new Error('You are not authenticated');

    const collection = await polybase.collection<FormRecord>('form').get();
    setForms(collection);
    setIsLoading(false);
  }, [auth, polybase]);

  const createdUserForms = map(
    forms?.data.filter(
      (r) => r.data.createdBy === auth?.accountAddress
    ),
    ({ data }) => {
      return <FormPreviewCard form={data} key={nanoid()} />;
    }
  );

  useEffect(() => {
    setIsLoading(true);
    if (!auth) {
      router.push('/');
      return;
    }
    getUserForms().catch(() => null);
  }, [auth, getUserForms, router]);

  return (
    <Layout isLoading={isLoading}>
      <Container maxWidth='container.lg'>
        <VStack display='flex' alignItems='left'>
          <Box display='flex' alignItems='start' flexDirection='column'>
            <Text color='purple.3' fontSize='md' fontWeight={600}>
              Your forms
            </Text>
            <Button
              onClick={async () => {
                await router.push('/forms/new');
                setIsLoading(true);
              }}
              size='lg'
              _hover={{ bg: 'purple.3' }}
              color='white'
              bg='purple.2'
              mt='4'
            >
              New form
            </Button>
            <VStack
              mt={4}
              spacing={6}
              w='full'
              display='flex'
              alignItems='left'
            >
              {createdUserForms.length < 1 && (
                <Box
                  border='1px'
                  borderColor='purple.2'
                  borderStyle='dashed'
                  rounded='md'
                  p={3}
                  display='flex'
                  justifyContent='center'
                  mt={4}
                >
                  <Text textAlign='center' color='purple.2'>
                    Create a form to get started
                  </Text>
                </Box>
              )}
              {createdUserForms}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Dashboard;
