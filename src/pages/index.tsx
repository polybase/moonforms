import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Link,
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

const BENEFITS = [
  {
    title: 'Cryptographically guaranteed privacy',
    breakdown: [
      {
        text: 'With Moonforms, only people with explicit permission can view responses.',
        image: '/moon_emoji.svg',
      },
      {
        text: 'In Google Forms, Typeform or Airtable, anyone at those companies can view the data.',
        image: '/mask_emoji.svg',
      },
    ],
  },
  {
    title: 'Censorship-resistant',
    breakdown: [
      {
        text: 'Moonforms forms and responses cannot be censored or taken down by corporations or governments.',
        image: '/moon_emoji.svg',
      },
      {
        text: 'This can happen with web2 forms that collect data that authoritarian governments don’t like.',
        image: '/mask_emoji.svg',
      },
    ],
  },
  {
    title: 'Linked to wallets and open source',
    breakdown: [
      {
        text: 'Respondents can view responses for all Moonforms they submit by logging in with their wallet.',
        image: '/moon_emoji.svg',
      },
      {
        text: 'In web2 forms, once the response is submitted respondents loose access to their data.',
        image: '/mask_emoji.svg',
      },
    ],
  },
];

const MARQUEE_MESSAGES = [
  'Typeform is sooooo web2',
  'Do you even decentralize bro?',
  'Still using Google Forms?',
];

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
      <Stack
        w='full'
        position='relative'
        alignItems={{ base: 'center', lg: 'start' }}
      >
        <Box
          position='absolute'
          width='200px'
          height='330px'
          top='0'
          right='0'
          bottom='0'
          left='0'
          borderRadius='0px 250px 250px 0px'
          bgColor='#afb1ff'
          opacity='60%'
          filter='blur(84px)'
          mb={20}
          // backgroundImage="radial-gradient(green, yellow, red)"
        />
      </Stack>
      <Layout>
        <Container mt={10} maxWidth='container.2xl'>
          <VStack spacing={28}>
            <VStack
              w='full'
              alignItems={{ base: 'center', lg: 'end' }}
              zIndex={-99}
            >
              <Box position='absolute' mr={{ base: 0, lg: 80 }}>
                <Image
                  position='absolute'
                  height='10rem'
                  w={{ base: '8rem', lg: '10rem' }}
                  src='/big_moon.svg'
                  alt='moon emoji'
                  inset={0}
                  zIndex={0}
                  filter='blur(16px)'
                />
                <Image
                  position='relative'
                  height='10rem'
                  w={{ base: '8rem', lg: '10rem' }}
                  src='/big_moon.svg'
                  alt='moon emoji'
                  zIndex={100}
                  inset={0}
                />
              </Box>
            </VStack>

            <Box
              alignItems='center'
              textAlign='center'
              display='flex'
              flexDirection='column'
            >
              <Heading
                as='h1'
                color='yellow.5'
                fontSize={{ base: '4xl', lg: '6xl' }}
                fontFamily={`"Lora", serif;`}
                fontWeight='400'
              >
                Decentralized forms and surveys
              </Heading>
              <Box maxW='container.md' pt={8}>
                <Heading
                  color='gray.200'
                  fontSize={{ base: 'xl', lg: '3xl' }}
                  as='h2'
                  fontWeight='400'
                >
                  Moonforms is end-to-end encrypted, censorship resistant and
                  self-sovereign.
                </Heading>
              </Box>

              <Button
                onClick={handleGetStartedClick}
                p={7}
                color='Black'
                mt={20}
                _hover={{ bg: 'gray.300' }}
                bg='white'
                boxShadow=' 0 0 30px 0 rgba(255, 255, 255, 0.2)'
                borderRadius='lg'
                size='lg'
              >
                Create a Moonform
              </Button>

              <VStack
                mt={{ base: 10, lg: 5 }}
                w='full'
                alignItems={{ base: 'center', lg: 'start' }}
              >
                <Box position='relative'>
                  <Image
                    position='absolute'
                    height='10rem'
                    w={{ base: '8rem', lg: '10rem' }}
                    src='/rocket.svg'
                    alt='rocket emoji'
                    inset={0}
                    zIndex={0}
                    filter='blur(16px)'
                  />
                  <Image
                    position='relative'
                    height='10rem'
                    w={{ base: '8rem', lg: '10rem' }}
                    src='/rocket.svg'
                    alt='rocket emoji'
                    zIndex={100}
                    inset={0}
                  />
                </Box>
              </VStack>
            </Box>
            <Stack
              w='full'
              position='relative'
              alignItems={{ base: 'center', lg: 'end' }}
            >
              <Box
                position='absolute'
                width='200px'
                height='330px'
                top='0'
                right='0'
                borderRadius='250px 0px 0px 250px'
                bgColor='#ffafc4'
                opacity='60%'
                filter='blur(84px)'
              />
            </Stack>
            <Box
              alignItems='center'
              textAlign='center'
              display='flex'
              flexDirection='column'
            >
              <Text
                color='yellow.5'
                fontWeight='700'
                fontSize={{ base: '4xl', lg: '5xl' }}
                mb={8}
              >
                Why Moonforms?
              </Text>
              <VStack spacing={12}>
                {BENEFITS.map((b) => {
                  return (
                    <Box key={b.title}>
                      <Text
                        mt={8}
                        color='white'
                        fontWeight='700'
                        fontSize={{ base: 'xl', lg: '2xl' }}
                      >
                        {b.title}
                      </Text>
                      <Stack mt={14} direction={['column', 'row']} spacing={12}>
                        {b.breakdown.map((bb) => {
                          return (
                            <Box maxWidth='xs' key={bb.text}>
                              <VStack spacing={8}>
                                <Image
                                  height='3rem'
                                  src={bb.image}
                                  alt='moon emoji'
                                />
                                <Box>
                                  <Text color='white' fontSize='lg'>
                                    {bb.text}
                                  </Text>
                                </Box>
                              </VStack>
                            </Box>
                          );
                        })}
                      </Stack>
                    </Box>
                  );
                })}
              </VStack>
            </Box>
            <Box
              alignItems='center'
              display='flex'
              flexDirection='column'
              px={{ base: 8, lg: 12 }}
            >
              <VStack mt={{ base: 0, lg: 0 }}>
                <Text
                  color='yellow.5'
                  fontWeight='700'
                  fontSize={{ base: '4xl', lg: '5xl' }}
                  mb={8}
                >
                  How does it work?
                </Text>
                <Box textAlign='left'>
                  <Text
                    color='white'
                    fontWeight='400'
                    fontSize={{ base: 'lg', lg: '2xl' }}
                  >
                    Moonforms is powered by{' '}
                    <Link href='https://polybase.xyz'>Polybase</Link>, a
                    decentralized database.
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
                    Don’t trust us,{' '}
                    <Link
                      href='https://github.com/polybase/moonforms'
                      isExternal
                    >
                      check the code
                    </Link>
                    .
                  </Text>
                </Box>
              </VStack>
            </Box>
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
                  Still using Google Forms?
                </Text>
                <Button
                  onClick={handleGetStartedClick}
                  p={7}
                  color='Black'
                  _hover={{ bg: 'gray.300' }}
                  bg='white'
                  boxShadow=' 0 0 30px 0 rgba(255, 255, 255, 0.2)'
                  borderRadius='lg'
                  size='lg'
                >
                  Create a Moonform
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Layout>
      <Box textColor='white' mt={24} p={3} w='full'>
        <Marquee gradient={false}>
          <HStack spacing={12} pl={12}>
            {MARQUEE_MESSAGES.map((m, index) => {
              return (
                <HStack key={`marquee_${index}`}>
                  <Text fontSize='xl' fontWeight={500}>
                    {m}
                  </Text>
                  <Text fontSize='2xl'>✦</Text>
                </HStack>
              );
            })}
            <Text fontSize='xl' fontWeight={500}>
              Do you even decentralize bro?
            </Text>
            <Text fontSize='2xl'>✦</Text>
            <Text fontSize='xl' fontWeight={500}>
              Still using Google Forms?
            </Text>
            <Text fontSize='2xl'>✦</Text>
          </HStack>
        </Marquee>
      </Box>
    </>
  );
};

export default Home;
