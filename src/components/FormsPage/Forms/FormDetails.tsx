import { Input, Textarea } from '@chakra-ui/react';
import React from 'react';

const FormDetails = () => {
  return (
    <>
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
    </>
  );
};

export default FormDetails;
