import {
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { Copy } from 'phosphor-react';
import React from 'react';

import { Question } from '../../../features/types';

interface QuestionCardProps {
  details: Question;
  changeHandler: (
    id: string,
    changeType: 'title' | 'type' | 'required',
    value: unknown
  ) => void;
}

const QuestionCard = ({ details, changeHandler }: QuestionCardProps) => {
  const { handleChange } = useFormikContext();

  return (
    <Box
      mt={4}
      maxWidth='3xl'
      borderRadius='md'
      p={3}
      // as={Field}
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
          onChange={handleChange('')}
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
          isChecked={details.required}
          onChange={() => {
            changeHandler(details.id, 'required', !details.required);
          }}
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
  );
};

export default QuestionCard;
