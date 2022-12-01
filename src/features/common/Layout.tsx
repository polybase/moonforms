import {
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CaretDown, House, ListBullets, SignOut } from 'phosphor-react';
import React from 'react';

import { shortEthAddress } from './utils';
import { useAuth } from '../users/useAuth';
import { useLogin } from '../users/useLogin';
import { Loading } from '../../modules/loading/Loading';

export interface LayoutProps {
  children?: React.ReactNode | React.ReactNode[];
  isLoading?: boolean;
}
import { Box, BoxProps } from '@chakra-ui/react';
import { ImageProps } from 'next/image';

export type NextChakraImageProps = Omit<BoxProps, 'as'> & ImageProps;

export function Layout({ children, isLoading }: LayoutProps) {
  const { auth, logout } = useAuth();
  const login = useLogin();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Moonforms • Decentralized forms and surveys</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Flex height='100%' flexDirection='column'>
        <Container maxW='container.xl'>
          <HStack p={8}>
            <Box>
              <Image
                height='3rem'
                src='/moonforms_logo.svg'
                alt='Moonforms logo'
              />
            </Box>
            <Spacer />
            {!auth && (
              <Button
                color='white'
                _hover={{ bg: '' }}
                bg='transparent'
                bgGradient='radial(78.9% 78.52% at 24.68% 21.48%, rgba(73, 70, 182, 0.6) 0%, rgba(107, 105, 207, 0.26) 100%)'
                onClick={login}
                p={7}
                size={{ base: 'sm', lg: 'lg' }}
                fontSize={{ base: 'sm', lg: 'xl' }}
              >
                Connect Wallet
              </Button>
            )}
            {auth && (
              <>
                <Menu>
                  <MenuButton
                    color='white'
                    size='lg'
                    fontSize='xl'
                    _hover={{ bg: '' }}
                    bg='transparent'
                    bgGradient='radial(78.9% 78.52% at 24.68% 21.48%, rgba(73, 70, 182, 0.6) 0%, rgba(107, 105, 207, 0.26) 100%)'
                    as={Button}
                    p={7}
                    rightIcon={<Icon as={CaretDown} />}
                  >
                    {shortEthAddress(auth.accountAddress)}
                  </MenuButton>
                  <MenuList bg='white'>
                    <MenuItem
                      color='black'
                      onClick={() => {
                        router.push('/dashboard');
                      }}
                      icon={<Icon fontSize='20px' weight='bold' as={House} />}
                    >
                      Dashboard
                    </MenuItem>
                    <MenuItem
                      color='black'
                      onClick={async () => {
                        await router.push('/responses');
                      }}
                      _hover={{ bg: 'grey.500' }}
                      icon={
                        <Icon fontSize='20px' weight='bold' as={ListBullets} />
                      }
                    >
                      My responses
                    </MenuItem>
                    <MenuItem
                      color='black'
                      _hover={{ bg: 'gre.500' }}
                      onClick={async () => {
                        await logout();
                        await router.push('/');
                      }}
                      icon={<Icon fontSize='20px' weight='bold' as={SignOut} />}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            )}
          </HStack>
        </Container>
        <Box>
          {isLoading ? (
            <Center>
              <Box>
                <Loading loading center data-test='layout-loading' />
              </Box>
            </Center>
          ) : (
            children
          )}
        </Box>
      </Flex>
    </>
  );
}
