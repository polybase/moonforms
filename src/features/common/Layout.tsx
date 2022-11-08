import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CaretDown, House, SignOut } from 'phosphor-react';
import React from 'react';

import { shortEthAddress } from './utils';
import { useAuth } from '../users/useAuth';
import { useLogin } from '../users/useLogin';
import { Loading } from '../../modules/loading/Loading';

export interface LayoutProps {
  children?: React.ReactNode | React.ReactNode[];
  isLoading?: boolean;
}

export function Layout({ children, isLoading }: LayoutProps) {
  const { auth, logout } = useAuth();
  const login = useLogin();
  const router = useRouter();

  return (
    <Flex height='100%' flexDirection='column'>
      <Container maxW='container.xl'>
        <HStack p={4}>
          <Link href='/'>
            <Text
              cursor='pointer'
              color='purple.5'
              fontWeight='700'
              fontSize='3xl'
            >
              Formify
            </Text>
          </Link>
          <Spacer />
          <HStack>
            {!auth && (
              <Button
                color='white'
                _hover={{ bg: 'green.5' }}
                bg='green.4'
                onClick={login}
              >
                Connect Wallet
              </Button>
            )}
            {auth && (
              <>
                <Menu>
                  <MenuButton
                    _hover={{ bg: 'green.5' }}
                    _expanded={{ bg: 'green.4' }}
                    bg='green.4'
                    as={Button}
                    color='white'
                    rightIcon={<Icon as={CaretDown} />}
                  >
                    {shortEthAddress(auth.account)}
                  </MenuButton>
                  <MenuList bg='white'>
                    <MenuItem
                      color='black'
                      onClick={() => {
                        router.push('/dashboard');
                      }}
                      icon={
                        <Icon
                          fontSize='20px'
                          weight='bold'
                          strokeWidth={124}
                          as={House}
                        />
                      }
                    >
                      Dashboard
                    </MenuItem>
                    <MenuItem
                      color='black'
                      _hover={{ bg: 'gre.500' }}
                      onClick={async () => {
                        await logout();
                        await router.push('/');
                      }}
                      icon={
                        <Icon
                          fontSize='20px'
                          weight='bold'
                          strokeWidth={124}
                          as={SignOut}
                        />
                      }
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            )}
          </HStack>
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
  );
}
