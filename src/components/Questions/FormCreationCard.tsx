import {
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Spacer,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Field, FieldHookConfig, useField, useFormikContext } from 'formik';
import { Copy } from 'phosphor-react';
import React, { FC } from 'react';

import {
  CheckboxQuestion,
  DateQuestion,
  EmailQuestion,
  LinearScaleQuestion,
  MultipleChoiceQuestion,
  ShortTextQuestion,
} from './QuestionTypes';
import { FormDetails } from '../../features/types';

interface QuestionCardProps {
  index: number;
}

const CustomInput: FC<FieldHookConfig<string>> = ({ ...props }) => {
  const [field] = useField(props);
  return (
    <Input
      color='white'
      focusBorderColor='white'
      borderColor='white'
      fontSize='xl'
      {...field}
    />
  );
};

const CustomSelect: FC<FieldHookConfig<string>> = ({ ...props }) => {
  const [field] = useField(props);
  return (
    <Select
      {...field}
      _hover={{ bg: 'transparent' }}
      _selected={{ bg: 'white', color: 'dark.1' }}
      bg='transparent'
      border='1px'
      borderColor='white'
      color='white'
      variant='filled'
      fontSize='xl'
      w='sm'
    >
      {props.children}
    </Select>
  );
};

const CustomCheckbox: FC<FieldHookConfig<string>> = ({ ...props }) => {
  const [field] = useField(props);
  return <Checkbox {...field} colorScheme='red' size='lg' />;
};

const FormCreationCard = ({ index }: QuestionCardProps) => {
  const formikCtx = useFormikContext<FormDetails>();
  return (
    <Box
      mt={4}
      maxWidth='3xl'
      borderRadius='md'
      p={5}
      bg='dark.1'
      boxShadow='lg'
    >
      <HStack w='full'>
        <Field
          key={index}
          as={CustomInput}
          id={`questions.${index}.title`}
          name={`questions.${index}.title`}
          type='text'
        />
        <Field
          id={`questions.${index}.type`}
          name={`questions.${index}.type`}
          as={CustomSelect}
        >
          <option value='short-text'>Short text</option>
          <option value='email'>Email</option>
          <option value='checkbox'>Checkbox</option>
          <option value='date'>Date</option>
          <option value='multiple-choice'>Multiple choice</option>
          <option value='linear-scale'>Linear scale</option>
        </Field>
      </HStack>

      <Box mt={6} mb={6}>
        {formikCtx.values.questions[index].type === 'short-text' && (
          <ShortTextQuestion disabled={true} />
        )}
        {formikCtx.values.questions[index].type === 'email' && (
          <EmailQuestion disabled={true} />
        )}
        {formikCtx.values.questions[index].type === 'checkbox' && (
          <CheckboxQuestion questionIndex={index} disabled={true} />
        )}

        {formikCtx.values.questions[index].type === 'date' && (
          <DateQuestion disabled={true} />
        )}

        {formikCtx.values.questions[index].type === 'multiple-choice' && (
          <MultipleChoiceQuestion questionIndex={index} disabled={true} />
        )}

        {formikCtx.values.questions[index].type === 'linear-scale' && (
          <LinearScaleQuestion questionIndex={index} disabled={true} />
        )}
      </Box>

      <HStack mt={4}>
        <Tooltip bg='white' color='dark.1' label='Duplicate'>
          <IconButton
            size='lg'
            color='white'
            borderColor='white'
            border='1px'
            bg='transparent'
            _hover={{ bg: 'white', color: 'dark.1' }}
            aria-label='Duplicate'
            icon={<Icon weight='bold' as={Copy} />}
          />
        </Tooltip>
        <Spacer />
        <HStack>
          <Field
            as={CustomCheckbox}
            key={`checkbox_${index}`}
            id={`questions.${index}.required`}
            name={`questions.${index}.required`}
          />
          <Text fontWeight={500} color='white'>
            Required
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default FormCreationCard;
