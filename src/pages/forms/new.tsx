import {
  Box,
  Button,
  Container, HStack,
  Input, Spacer,
  Text,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { Layout } from '../../features/common/Layout';

const NewForm = () => {
  const router = useRouter();

  return (
    <Layout>
      <Container maxWidth='container.lg'>
        <VStack display='flex' alignItems='center'>
          <Box display='flex' alignItems='start' flexDirection='column'>
            <Text
              onClick={async () => {
                await router.push('/dashboard');
              }}
              cursor='pointer'
              color='purple.3'
              fontSize='md'
              fontWeight={500}
            >
              {'< View your forms'}
            </Text>
            <Button
              size='md'
              _hover={{ bg: 'green.4' }}
              color='white'
              bg='green.3'
              mt='6'
            >
              Save
            </Button>
            <VStack
              mt={10}
              maxW='full'
              // experimental_spaceY={8}
              display='flex'
              alignItems='left'
            >
              <Box>
                <Text color='purple.5' mb={1} fontSize='md'>
                  Title & Description
                </Text>
                <Input color={"purple.4"} focusBorderColor='purple.3' borderColor='purple.2' maxW='lg' placeholder='Untitled form' size='md' />
                <Textarea
                  color={"purple.4"}
                  focusBorderColor='purple.3'
                  borderColor='purple.2'
                  maxW='xl'
                  mt={2}
                  placeholder='Description...'
                  size='md'
                  resize='none'
                />
              </Box>
              <Box mt={12}>
                <Text color='purple.5' mb={1} fontSize='md'>
                  Questions
                </Text>
                <Box maxWidth='3xl' borderRadius='md' p={3} border='1px' borderColor='purple.2'>
                  <Text mb={3} color={"purple.4"} fontSize={"sm"}>Untitled question? • Short text response</Text>
                  <HStack w={"full"}>
                    <Input borderColor={"purple.2"} focusBorderColor='purple.3' maxW='lg' placeholder='Untitled question' size='md' />
                    <Select _hover={{bg: "purple.1"}} _selected={{bg: "purple.1"}} bg='purple.05' color={"purple.3"} variant='filled' w={"sm"} placeholder='Question type'>
                      <option value='option1'>Short text</option>
                    </Select>
                  </HStack>
                  <Input _placeholder={{  color: 'purple.3' }} variant='flushed' placeholder='Short text answer' disabled/>
                </Box>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
};

export default NewForm;
