import {
  Box,
  Button,
  Container,
  HStack,
  Image,
  Link,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
// import { useDocument, usePolybase } from '@polybase/react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { Layout } from '../features/common/Layout';
import { useAuth } from '../features/users/useAuth';
import { useLogin } from '../features/users/useLogin';
const Home: NextPage = () => {
  const { auth } = useAuth();
  const login = useLogin();
  const router = useRouter();

  const handleGetStartedClick = async () => {
    if (!auth) {
      await login();
      await router.push('/dashboard');
    }
    await router.push('/dashboard');
  };
  // const polybase = usePolybase();
  // const { data } = useCollection(polybase.collection('demo/social/users'));
  // const oneDocument = useDocument(
  //   polybase
  //     .collection('demo/social/users')
  //     .doc('0x111e5fea3d613eb866fd41b30c8257c930180428')
  // );
  return (
    <Layout>
      <VStack p={5} spacing={{ base: 10, md: 44, lg: 28 }}>
        <Container maxWidth='container.xl' p={4}>
          <Box
            alignItems='center'
            textAlign='center'
            display='flex'
            flexDirection='column'
            mt={12}
          >
            <Text color='purple.5' fontWeight='700' fontSize='3xl'>
              Create forms and collect data with{' '}
              <Text
                as='span'
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                bgClip='text'
              >
                decentralized
              </Text>{' '}
              forms
            </Text>
            <HStack mt={4} alignContent='center'>
              <Text color='purple.3'>Powered by </Text>
              <Image src='/logo.svg' alt='polybase logo' />
              <Text color='purple.3'>
                <NextLink href='https://www.polybase.xyz/'>
                  <Link as='span' fontWeight='600'>
                    Polybase
                  </Link>
                </NextLink>
              </Text>
            </HStack>
            {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
            <Button
              onClick={handleGetStartedClick}
              mt={10}
              color='white'
              _hover={{ bg: 'purple.5' }}
              bg='purple.4'
            >
              Get started for free
            </Button>
          </Box>
        </Container>
        <Container maxWidth='container.lg'>
          <Stack direction={['column', 'row']} spacing='24px'>
            <Box maxWidth='xs'>
              <VStack textAlign='left'>
                <Image src='/thumbs_up.svg' alt='polybase logo' />
                <Box>
                  <Text color='purple.4' fontWeight={700} fontSize='xl'>
                    Easy to use
                  </Text>
                  <Text color='purple.3' fontSize='md'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Text>
                </Box>
              </VStack>
            </Box>
            <Spacer />
            <Box maxWidth='xs'>
              <VStack>
                <Image src='/data.svg' alt='polybase logo' />
                <Box>
                  <Text color='purple.4' fontWeight={700} fontSize='xl'>
                    Export your data
                  </Text>
                  <Text color='purple.3' fontSize='md'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Text>
                </Box>
              </VStack>
            </Box>
            <Spacer />
            <Box maxWidth='xs'>
              <VStack>
                <Image src='/book.svg' alt='polybase logo' />
                <Box>
                  <Text color='purple.4' fontWeight={700} fontSize='xl'>
                    Open-source
                  </Text>
                  <Text color='purple.3' fontSize='md'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Text>
                </Box>
              </VStack>
            </Box>
          </Stack>
        </Container>
      </VStack>
    </Layout>
  );
};

export default Home;
