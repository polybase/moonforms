import {
  Box,
  Button,
  Checkbox,
  Container,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Text,
  Textarea,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Copy, Plus } from 'phosphor-react';
import React from 'react';

import { Layout } from '../../features/common/Layout';

const NewForm = () => {
  const router = useRouter();
  // const db = usePolybase();
  // const collection = db.collection('alpha-testing/TestForm')

  return (
    <Layout>
      <Container maxWidth='container.lg'>
        <VStack
          display='flex'
          maxW='3xl'
          alignItems={{
            base: 'left',
            sm: 'center',
            md: 'center',
            lg: 'center',
          }}
        >
          <Box
            display='flex'
            w='full'
            alignItems='start'
            flexDirection='column'
          >
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
            <VStack
              mt={10}
              w='full'
              experimental_spaceY={8}
              display='flex'
              alignItems='left'
            >
              <Box maxW='full'>
                <Text fontWeight='500' color='purple.5' mb={1} fontSize='md'>
                  Title & Description
                </Text>

                <Input
                  color='purple.4'
                  focusBorderColor='purple.3'
                  borderColor='purple.2'
                  w={{ base: 'full', sm: 'lg', md: 'lg', lg: 'lg' }}
                  placeholder='Untitled form'
                />
                <Textarea
                  color='purple.4'
                  focusBorderColor='purple.3'
                  borderColor='purple.2'
                  maxW='xl'
                  mt={2}
                  placeholder='Description...'
                  size='md'
                  resize='none'
                />
              </Box>
              <Box mt={12} maxW='full'>
                <Text fontWeight='500' color='purple.5' mb={1} fontSize='md'>
                  Questions
                </Text>
                <Button
                  leftIcon={<Icon weight='bold' as={Plus} />}
                  bg='purple.05'
                  color='purple.3'
                  size='xs'
                >
                  {' '}
                  Add quesiton
                </Button>
                <Box
                  mt={4}
                  maxWidth='3xl'
                  borderRadius='md'
                  p={3}
                  border='1px'
                  borderColor='purple.2'
                >
                  <Text mb={3} color='purple.4' fontSize='sm'>
                    Untitled question? • Short text response
                  </Text>
                  <HStack w='full'>
                    <Input
                      borderColor='purple.2'
                      focusBorderColor='purple.3'
                      maxW='lg'
                      placeholder='Untitled question'
                      size='md'
                    />
                    <Select
                      _hover={{ bg: 'purple.1' }}
                      _selected={{ bg: 'purple.1' }}
                      bg='purple.05'
                      color='purple.3'
                      variant='filled'
                      w='sm'
                    >
                      <option value='option1'>Short text</option>
                    </Select>
                  </HStack>
                  <Input
                    _placeholder={{ color: 'purple.3' }}
                    variant='flushed'
                    placeholder='Short text answer'
                    disabled
                  />
                  <HStack mt={4}>
                    <Checkbox
                      size='md'
                      color='purple.4'
                      colorScheme='purple.4'
                      iconColor='purple.4'
                      defaultChecked
                      mr={5}
                    >
                      Required
                    </Checkbox>
                    <Tooltip bg='purple.2' color='white' label='Duplicate'>
                      <IconButton
                        size='sm'
                        color='purple.3'
                        bg='purple.05'
                        _hover={{ bg: 'purple.1' }}
                        aria-label='Search database'
                        icon={<Icon weight='bold' as={Copy} />}
                      />
                    </Tooltip>
                  </HStack>
                </Box>
                <Button
                  size='md'
                  _hover={{ bg: 'purple.1' }}
                  color='purple.4'
                  bg='purple.05'
                  mt='4'
                >
                  Create form
                </Button>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
};

export default NewForm;
