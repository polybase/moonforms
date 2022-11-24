import {
  Box,
  Button,
  Checkbox,
  HStack,
  Input,
  Radio,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';

import {
  CheckboxOption,
  FormDetails,
  LinearScaleConfig,
  MultipleChoiceOption,
} from '../../features/types';

interface QuestionTypeProps {
  disabled: boolean;
}

interface CheckboxTypeProps extends QuestionTypeProps {
  questionIndex: number;
}

interface MultipleChoiceTypeProps extends QuestionTypeProps {
  questionIndex: number;
}

interface LinearScaleProps extends QuestionTypeProps {
  questionIndex: number;
}

export function ShortTextQuestion({
  disabled,
}: QuestionTypeProps): ReactElement {
  return (
    <Input
      color="white"
      variant='flushed'
      placeholder='Short text answer'
      disabled={disabled}
      type='text'
    />
  );
}

export function EmailQuestion({ disabled }: QuestionTypeProps): ReactElement {
  return (
    <Input
      color="white"
      variant='flushed'
      placeholder='Email answer'
      disabled={disabled}
      type='email'
    />
  );
}

export function DateQuestion({ disabled }: QuestionTypeProps): ReactElement {
  return (
    <Input
      _placeholder={{ color: 'purple.6' }}
      variant='flushed'
      disabled={disabled}
      type='datetime-local'
    />
  );
}

export function CheckboxQuestion({
  disabled,
  questionIndex,
}: CheckboxTypeProps): ReactElement {
  const formikCtx = useFormikContext<FormDetails>();
  const [checkboxOptions, setCheckboxOptions] = useState<CheckboxOption[]>([
    { title: 'Option 1' },
  ]);

  const updateQuestionData = () => {
    formikCtx.setFieldValue(
      `questions.${questionIndex}.data`,
      JSON.stringify(checkboxOptions)
    );
  };

  return (
    <Box maxW='3dxl' borderRadius='md' border='2px' borderColor='white' p={5}>
      <VStack display='flex' alignItems='start' w='full'>
        <Button
          size='sm'
          onClick={() => {
            const newArr = checkboxOptions.slice();
            newArr.push({ title: '' });
            setCheckboxOptions(newArr);
            updateQuestionData();
          }}
        >
          Add option
        </Button>
        <Box w='full'>
          {checkboxOptions.map((option, index) => {
            return (
              <HStack mt={2} key={index}>
                <Checkbox  colorScheme='purple' size='lg' disabled={disabled} />
                <Input
                  onChange={(e) => {
                    const newArr = [...checkboxOptions];
                    newArr[index] = { title: e.target.value };
                    setCheckboxOptions(newArr);
                    updateQuestionData();
                  }}
                  color="white"
                  variant='flushed'
                  placeholder={`Option ${index + 1}`}
                  type='text'
                  w='full'
                />
              </HStack>
            );
          })}
        </Box>
      </VStack>
    </Box>
  );
}

export function MultipleChoiceQuestion({
  disabled,
  questionIndex,
}: MultipleChoiceTypeProps): ReactElement {
  const formikCtx = useFormikContext<FormDetails>();

  const [choices, setChoices] = useState<MultipleChoiceOption[]>([
    {
      title: 'Option 1',
    },
  ]);

  const updateQuestionData = () => {
    formikCtx.setFieldValue(
      `questions.${questionIndex}.data`,
      JSON.stringify(choices)
    );
  };

  return (
    <Box maxW='3xl' borderRadius='md' border='1px' borderColor='purple.1' p={5}>
      <VStack display='flex' alignItems='start' w='full'>
        <Button
          size='sm'
          onClick={() => {
            const newArr = choices.slice();
            newArr.push({ title: '' });
            setChoices(newArr);
            updateQuestionData();
          }}
        >
          Add option
        </Button>
        <Box w='full'>
          {choices.map((choice, index) => {
            return (
              <HStack mt={2} key={index}>
                <Radio colorScheme='purple' size='lg' disabled={disabled} />
                <Input
                  onChange={(e) => {
                    const newArr = [...choices];
                    newArr[index] = { title: e.target.value };
                    setChoices(newArr);
                    updateQuestionData();
                  }}
                  color="white"
                  variant='flushed'
                  placeholder={`Option ${index + 1}`}
                  type='text'
                  w='full'
                />
              </HStack>
            );
          })}
        </Box>
      </VStack>
    </Box>
  );
}

export function LinearScaleQuestion({
  questionIndex,
}: LinearScaleProps): ReactElement {
  const formikCtx = useFormikContext<FormDetails>();

  const [scale, setScale] = useState<LinearScaleConfig>({
    min: '',
    max: '',
  });

  const updateQuestionData = () => {
    formikCtx.setFieldValue(
      `questions.${questionIndex}.data`,
      JSON.stringify(scale)
    );
  };

  return (
    <HStack maxW='2xl'>
      <Select
        w='sm'
        onChange={(e) => {
          setScale({ ...scale, min: e.target.value });
          updateQuestionData();
        }}
      >
        <option value='0'>0</option>
        <option value='1'>1</option>
      </Select>

      <Text>To</Text>

      <Select
        w='sm'
        onChange={(e) => {
          setScale({ ...scale, max: e.target.value });
          updateQuestionData();
        }}
      >
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
        <option value='8'>8</option>
        <option value='9'>9</option>
        <option value='10'>10</option>
      </Select>
    </HStack>
  );
}
