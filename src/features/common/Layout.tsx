import {
  Button,
  Center,
  Container,
  createIcon,
  Flex,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  CaretDown,
  Envelope,
  GoogleLogo,
  House,
  SignOut,
  Wallet,
} from 'phosphor-react';
import React from 'react';

import { shortEthAddress } from './utils';
import { useAuth } from '../users/useAuth';
import { useLogin } from '../users/useLogin';
import { Loading } from '../../modules/loading/Loading';
export interface LayoutProps {
  children?: React.ReactNode | React.ReactNode[];
  isLoading?: boolean;
}
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import AuthModal from "../../components/Auth/AuthModal";

export function Layout({ children, isLoading }: LayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { auth, logout } = useAuth();
  const login = useLogin();
  const router = useRouter();

  return (
    <Flex height='100%' flexDirection='column'>
      <Container maxW='container.xl'>
        <Modal isOpen={isOpen} onClose={onClose}>
          <AuthModal/>
        </Modal>
        <HStack p={4}>
          <Box>
            <Image src='/moonforms_logo.svg' alt='logo' />
          </Box>
          <Spacer />
          {!auth && (
            <Button
              color='white'
              _hover={{ bg: '' }}
              bg='transparent'
              bgGradient='radial(78.9% 78.52% at 24.68% 21.48%, rgba(73, 70, 182, 0.6) 0%, rgba(107, 105, 207, 0.26) 100%)'
              onClick={onOpen}
              p={7}
              size={{ base: 'sm', lg: 'lg' }}
              fontSize={{ base: 'sm', lg: 'xl' }}
            >
              Get started
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
