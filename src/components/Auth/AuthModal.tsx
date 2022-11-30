import {
  Button,
  Icon,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useToast
} from '@chakra-ui/react';
import { Envelope, GoogleLogo, Wallet } from 'phosphor-react';
import React, {useState} from 'react';

import { useLogin } from '../../features/users/useLogin';

const AuthModal = () => {
  const login = useLogin();

  const [email, setEmail] = useState<string>('')

  return (
    <>
      <ModalOverlay />
      <ModalContent p={8} bg='dark.1'>
        <VStack display='flex' alignItems='center'>
          <ModalCloseButton color='white' fontWeight={700} />
          <ModalBody w='full'>
            <VStack spacing={4}>
              <Text fontSize='sm' color='white' fontWeight={600}>
                Sign in to Moonforms
              </Text>
              <Input
                placeholder='Your email'
                focusBorderColor='white'
                color='white'
                rounded='lg'
                border='2px'
                p={6}
                type='email'
                onChange={(e) => { setEmail(e.target.value) }}
                w='full'
              />
              <Button
                p={6}
                onClick={() => { login({loginType: 'email', email})}}
                _hover={{ bg: 'blue.300' }}
                w='full'
                fontWeight={500}
                color='white'
                bg='blue.500'
                rounded='2xl'
                leftIcon={
                  <Icon
                    fontSize='20px'
                    weight='bold'
                    strokeWidth={124}
                    as={Envelope}
                  />
                }
              >
                Sign in with Email
              </Button>
              <Text fontWeight={600} fontSize='md' color='white'>
                Or
              </Text>
              <Button
                leftIcon={
                  <Icon
                    fontSize='20px'
                    weight='bold'
                    strokeWidth={124}
                    as={GoogleLogo}
                  />
                }
                _hover={{ bg: 'green.300' }}
                p={6}
                w='full'
                bg='green.500'
                rounded='2xl'
                color='white'
                fontWeight={500}
              >
                Sign in with Google
              </Button>
              <Button
                p={6}
                w='full'
                fontWeight={500}
                _hover={{ bg: 'orange.300' }}
                bg='orange.400'
                rounded='2xl'
                color='white'
                leftIcon={<Icon fontSize='20px' weight='bold' as={Wallet} />}
              >
                Connect your wallet
              </Button>
            </VStack>
          </ModalBody>
        </VStack>
      </ModalContent>
    </>
  );
};

export default AuthModal;

