import {Box, Button, Container, Icon, Text, VStack} from '@chakra-ui/react';
import React from 'react';

import { Layout } from '../features/common/Layout';
import {Plus} from "phosphor-react";

const Dashboard = () => {
  return (
    <Layout>
      <VStack p={5}>
        <Container maxWidth='container.lg' p={4}>
          <Box display='flex' alignItems={"start"} flexDirection='column'>
            <Text fontSize={"md"} fontWeight={600}>Your forms</Text>
            <Button leftIcon={<Icon
              weight='bold'
              as={Plus}
            />}  mt={"4"}>
              New form
            </Button>
            <VStack mt={4}>
              <Box p={3} borderRadius={"md"} borderColor='blue.400' border='1px' >
                hello
              </Box>
            </VStack>
          </Box>
        </Container>
      </VStack>
    </Layout>
  );
};

export default Dashboard;
