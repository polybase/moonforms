import {
  Box,
  Button,
  HStack,
  Icon,
  Spacer,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ArrowUpRight, Cube, LinkSimple, PencilSimple } from 'phosphor-react';
import React from 'react';

import { FormRecord } from '../../features/types';

interface FormPreviewCardProps {
  form: FormRecord;
}
const FormPreviewCard = ({ form }: FormPreviewCardProps) => {
  // const explorerUrl = 'https://explorer.testnet.polybase.xyz/collections/new-forms%2FformTwo';
  const toast = useToast();
  const router = useRouter();
  const copyLink = async () => {
    const formUrl =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:3000/forms/${form.id}`
        : '';
    await navigator.clipboard.writeText(formUrl);
    toast({
      title: 'Copied form link',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      maxWidth='full'
      maxH='full'
      padding={3}
      borderRadius='md'
      border='2px'
      borderColor='purple.1'
    >
      <VStack display='flex' alignItems='left'>
        <HStack mb={1} ml={1} display='flex'>
          <Text
            fontSize={{ base: 'sm', sm: 'md', md: 'md', lg: 'xl' }}
            fontWeight='600'
            color='purple.5'
          >
            {form.title}
          </Text>
          <Spacer />
          <Button
            leftIcon={<Icon weight='bold' as={Cube} />}
            _hover={{ bg: 'purple.05' }}
            bg='white'
            color='purple.3'
            size='md'
          >
            View in explorer
          </Button>
        </HStack>
        <HStack display='flex'>
          <Button
            size='md'
            _hover={{ bg: 'purple.1' }}
            color='purple.4'
            bg='purple.05'
            rightIcon={<Icon weight='bold' as={ArrowUpRight} />}
            onClick={() => {
              router.push(`/forms/responses/${form.id}`);
            }}
          >
            Responses
          </Button>
          <Button
            size='md'
            _hover={{ bg: 'purple.05' }}
            color='purple.4'
            bg='white'
            rightIcon={<Icon weight='bold' as={PencilSimple} />}
          >
            Edit
          </Button>
          <Button
            size='md'
            _hover={{ bg: 'purple.05' }}
            color='purple.4'
            bg='white'
            rightIcon={<Icon weight='bold' as={LinkSimple} />}
            onClick={copyLink}
          >
            Copy link
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default FormPreviewCard;
