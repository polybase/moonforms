import { Box, Stack, Spacer, Image, Button, Container, Text, VStack } from '@chakra-ui/react';
// import { useDocument, usePolybase } from '@polybase/react';
import type { NextPage } from 'next';
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

  return (
    <Layout>
      <VStack p={5} spacing={{ base: 10, md: 44, lg: 64 }}>
        <Container maxHeight={'container.xl'} maxWidth='container.xl' mt={36} p={4}>
          <Box
            alignItems='center'
            textAlign='center'
            display='flex'
            flexDirection='column'
          >
            <Text color='yellow.5' fontWeight='700' fontSize='6xl'>
              Decentralized forms and surveys
            </Text>
            <Box maxW='container.md'>
              <Text color='white' fontSize='3xl'>
                Create forms, share links and view responses (even if there’s a
                nuclear war)
              </Text>
            </Box>
            <Button
              onClick={handleGetStartedClick}
              p={7}
              color='Black'
              mt={20}
              _hover={{ bg: 'purple.5' }}
              bg='white'
              borderRadius='lg'
            >
              Create a Moonform
            </Button>
          </Box>
        </Container>
        <Container maxWidth='container.xl'>
          <Box
            alignItems='center'
            textAlign='center'
            display='flex'
            flexDirection='column'
          >
            <VStack spacing={{ base: 28}}>
              <Text color='yellow.5' fontWeight='700' fontSize='5xl'>
                Why moonforms?
              </Text>
              <Box>
                <Text mt={8} color='purple.4' fontWeight='500' fontSize='4xl'>
                  Cryptographically guaranteed privacy
                </Text>
                <Stack mt={14} direction={['column', 'row']} spacing='24px'>
                  <Box maxWidth='xs'>
                    <VStack>
                      <Image src='/thumbs_up.svg' alt='polybase logo' />
                      <Box>
                        <Text color='white' textAlign={'justify'} fontSize='xl'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                          do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua.
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                  <Spacer />
                  <Box maxWidth='xs'>
                    <VStack textAlign='left'>
                      <Image src='/data.svg' alt='polybase logo' />
                      <Box>
                        <Text color='white' textAlign={'justify'} fontSize='xl'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                          do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua.
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                </Stack>
              </Box>
              <Box >
                <Text mt={8} color='white' fontWeight='500' fontSize='4xl'>
                  Censorship-resistant
                </Text>
                <Stack mt={14} direction={['column', 'row']} spacing='24px'>
                  <Box maxWidth='xs'>
                    <VStack textAlign='left'>
                      <Image src='/thumbs_up.svg' alt='polybase logo' />
                      <Box>
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
                        <Text color='purple.3' fontSize='md'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                          do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua.
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                </Stack>
              </Box>
              <Box >
                <Text mt={8} color='white' fontWeight='500' fontSize='4xl'>
                  Linked to wallets and open source
                </Text>
                <Stack mt={14} direction={['column', 'row']} spacing='24px'>
                  <Box maxWidth='xs'>
                    <VStack textAlign='left'>
                      <Image src='/thumbs_up.svg' alt='polybase logo' />
                      <Box>
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
                        <Text color='purple.3' fontSize='md'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                          do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua.
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                </Stack>
              </Box>
            </VStack>
          </Box>
        </Container>
      </VStack>
    </Layout>
  );
};

export default Home;
