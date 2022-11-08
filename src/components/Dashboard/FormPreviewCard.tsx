import { Box, Button, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { LinkSimple, PencilSimple, User } from 'phosphor-react';
import React from 'react';

const FormPreviewCard = () => {
  return (
    <Box
      maxWidth='3xl'
      p={2}
      borderRadius='md'
      border='1px'
      borderColor='purple.1'
    >
      <VStack display='flex' alignItems='left'>
        <Text pl={3} fontWeight='500' color='purple.5'>
          Florida web3 convention ticket giveaway
        </Text>
        <HStack display='flex'>
          <Button
            size='sm'
            _hover={{ bg: 'purple.05' }}
            color='purple.4'
            bg='white'
            leftIcon={<Icon weight='bold' as={User} />}
          >
            329 responses
          </Button>
          <Button
            size='sm'
            _hover={{ bg: 'purple.05' }}
            color='purple.4'
            bg='white'
            leftIcon={<Icon weight='bold' as={PencilSimple} />}
          >
            Edit
          </Button>
          <Button
            size='sm'
            _hover={{ bg: 'purple.05' }}
            color='purple.4'
            bg='white'
            leftIcon={<Icon weight='bold' as={LinkSimple} />}
          >
            Copy link
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default FormPreviewCard;
