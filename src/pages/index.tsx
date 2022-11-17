import {
  Box,
  Button,
  Container,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Marquee from 'react-fast-marquee';

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
    <>
      <Layout>
        <VStack spacing={{ base: 10, md: 44, lg: 44 }}>
          <Container maxWidth='container.xl' mt={36}>
            <Box
              alignItems='center'
              textAlign='center'
              display='flex'
              flexDirection='column'
            >
              <Text
                color='yellow.5'
                fontSize={{ base: '4xl', lg: '6xl' }}
                fontFamily={` "Lora", serif;`}
              >
                Decentralized forms and surveys
              </Text>
              <Box maxW='container.md'>
                <Text color='white' fontSize={{ base: 'xl', lg: '3xl' }}>
                  Create forms, share links and view responses (even if there’s
                  a nuclear war)
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
              <VStack mt={{ base: 12, lg: 0 }} spacing={{ base: 12, lg: 28 }}>
                <Text
                  color='yellow.5'
                  fontWeight='700'
                  fontSize={{ base: '4xl', lg: '5xl' }}
                >
                  Why moonforms?
                </Text>
                <Box>
                  <Text
                    mt={8}
                    color='white'
                    fontWeight='700'
                    fontSize={{ base: '3xl', lg: '4xl' }}
                  >
                    Cryptographically guaranteed privacy
                  </Text>
                  <Stack
                    mt={14}
                    direction={['column', 'row']}
                    spacing={{ base: 12 }}
                  >
                    <Box maxWidth='xs'>
                      <VStack>
                        <Image src='/moon_emoji.svg' alt='moo emoji' />
                        <Box>
                          <Text color='white' fontWeight={500} fontSize='lg'>
                            With Moonforms, only people with explicit permission
                            can view responses.
                          </Text>
                        </Box>
                      </VStack>
                    </Box>
                    <Spacer />
                    <Box maxWidth='xs'>
                      <VStack>
                        <Image src='/mask_emoji.svg' alt='mask emoji' />
                        <Box>
                          <Text color='white' fontWeight={500} fontSize='lg'>
                            In Google Forms, Typeform or Airtable, anyone at
                            those companies can view the data.
                          </Text>
                        </Box>
                      </VStack>
                    </Box>
                  </Stack>
                </Box>
                <Box>
                  <Text
                    mt={8}
                    color='white'
                    fontWeight='700'
                    fontSize={{ base: '3xl', lg: '4xl' }}
                  >
                    Censorship-resistant
                  </Text>
                  <Stack mt={14} direction={['column', 'row']} spacing='24px'>
                    <Box maxWidth='xs'>
                      <VStack>
                        <Image src='/moon_emoji.svg' alt='moon emoji' />
                        <Box>
                          <Text color='white' fontWeight={500} fontSize='lg'>
                            Moonform forms and responses cannot be censored or
                            taken down by corporations or governments.
                          </Text>
                        </Box>
                      </VStack>
                    </Box>
                    <Spacer />
                    <Box maxWidth='xs'>
                      <VStack>
                        <Image src='/mask_emoji.svg' alt='mask emoji' />
                        <Box>
                          <Text color='white' fontWeight={500} fontSize='lg'>
                            This can happen with web2 forms that collect data
                            that authoritarian governments don’t like.
                          </Text>
                        </Box>
                      </VStack>
                    </Box>
                  </Stack>
                </Box>
                <Box>
                  <Text
                    mt={8}
                    color='white'
                    fontWeight='700'
                    fontSize={{ base: '3xl', lg: '4xl' }}
                  >
                    Linked to wallets and open source
                  </Text>
                  <Stack mt={14} direction={['column', 'row']} spacing='24px'>
                    <Box maxWidth='xs'>
                      <VStack>
                        <Image src='/moon_emoji.svg' alt='moon emoji' />
                        <Box>
                          <Text color='white' fontWeight={500} fontSize='lg'>
                            Respondents can view responses for all Moonforms
                            they submit by logging in with their wallet.
                          </Text>
                        </Box>
                      </VStack>
                    </Box>
                    <Spacer />
                    <Box maxWidth='xs'>
                      <VStack>
                        <Image src='/mask_emoji.svg' alt='mask emoji' />
                        <Box>
                          <Text color='white' fontWeight={500} fontSize='lg'>
                            In web2 forms, once the response is submitted
                            respondents loose access to their data.
                          </Text>
                        </Box>
                      </VStack>
                    </Box>
                  </Stack>
                </Box>
              </VStack>
            </Box>
          </Container>
          <Container maxWidth='container.xl'>
            <Box alignItems='center' display='flex' flexDirection='column'>
              <VStack mt={{ base: 0, lg: 0 }} w='full'>
                <Text
                  color='yellow.5'
                  fontWeight='700'
                  fontSize={{ base: '4xl', lg: '5xl' }}
                >
                  How does it work?
                </Text>
                <Box textAlign='left' w='full'>
                  <Text
                    color='white'
                    fontWeight='400'
                    fontSize={{ base: 'lg', lg: '2xl' }}
                  >
                    Moonforms is powered by Polybase, a decentralized database.
                  </Text>
                  <Text
                    color='white'
                    mt={8}
                    fontWeight='400'
                    fontSize={{ base: 'lg', lg: '2xl' }}
                  >
                    This means that even if Moonforms goes away 😢, you can
                    always still view your data on the Polybase decentralized
                    storage network via the Polybase Explorer.
                  </Text>
                  <Text
                    color='white'
                    mt={8}
                    fontWeight='400'
                    fontSize={{ base: 'lg', lg: '2xl' }}
                  >
                    When someone responds to a form, that response is encrypted
                    in a way that both the form creator and the responder can
                    view that response, but no one else.
                  </Text>
                  <Text
                    color='white'
                    mt={8}
                    fontWeight='400'
                    fontSize={{ base: 'lg', lg: '2xl' }}
                  >
                    Don’t trust us, check the code: [github]
                  </Text>
                </Box>
              </VStack>
            </Box>
          </Container>
          <Container maxWidth='container.xl'>
            <Box
              alignItems='center'
              textAlign='center'
              display='flex'
              flexDirection='column'
            >
              <VStack>
                <Text
                  color='yellow.5'
                  mb={12}
                  fontWeight='700'
                  fontSize={{ base: '4xl', lg: '5xl' }}
                >
                  Still use google forms?
                </Text>
                <Button
                  onClick={handleGetStartedClick}
                  p={7}
                  color='Black'
                  _hover={{ bg: 'purple.5' }}
                  bg='white'
                  borderRadius='lg'
                >
                  Create a Moonform
                </Button>
              </VStack>
            </Box>
          </Container>
        </VStack>
      </Layout>
      <Box textColor='white' mt={24} p={3} w='full'>
        <Marquee gradient={false}>
          <HStack spacing={12}>
            <Text fontSize='xl' fontWeight={500}>
              Typeform is soooo web2
            </Text>
            <Text
              fontSize='2xl'
              textShadow='rgb(255 254 241 / 50%) 0px 0px 20px'
            >
              ✦
            </Text>
            <Text fontSize='xl' fontWeight={500}>
              Do you even decentralize bro?
            </Text>
            <Text
              fontSize='2xl'
              textShadow='rgb(255 254 241 / 50%) 0px 0px 20px'
            >
              ✦
            </Text>
            <Text fontSize='xl' fontWeight={500}>
              Still using Google Forms?
            </Text>
          </HStack>
        </Marquee>
      </Box>
    </>
  );
};

export default Home;
