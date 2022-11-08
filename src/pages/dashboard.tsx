import { Box, Button, Container, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import FormPreviewCard from '../components/Dashboard/FormPreviewCard';
import { Layout } from '../features/common/Layout';

const Dashboard = () => {
  const router = useRouter();
  return (
    <Layout>
      <Container maxWidth='container.lg'>
        <VStack display='flex' alignItems='left'>
          <Box display='flex' alignItems='start' flexDirection='column'>
            <Text color='purple.3' fontSize='md' fontWeight={600}>
              Your forms
            </Text>
            <Button
              onClick={async () => {
                await router.push('/forms/new');
              }}
              size='md'
              _hover={{ bg: 'purple.1' }}
              color='purple.4'
              bg='purple.05'
              mt='4'
            >
              New form
            </Button>
            <VStack mt={4} w='full' display='flex' alignItems='left'>
              <FormPreviewCard />
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Dashboard;
