import {
  Box,
  Checkbox,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React, { ReactElement, useState } from 'react';

import {
  CheckboxOption,
  MultipleChoiceOption,
  QuestionRecord,
  ResponseDetails,
} from '../../features/types';

interface AnswerTypeProps {
  questionIndex: number;
  question: QuestionRecord;
}

export function ShortTextAnswer({
  questionIndex,
}: AnswerTypeProps): ReactElement {
  const [textResponse, setTextResponse] = useState<string>('');
  const formikCtx = useFormikContext<ResponseDetails>();

  const updateAnswer = () => {
    formikCtx.setFieldValue(`answers.${questionIndex}.data`, textResponse);
  };
  return (
    <Input
      onChange={(e) => {
        setTextResponse(e.target.value);
        updateAnswer();
      }}
      _placeholder={{ color: 'gray.400' }}
      color={'purple.3'}
      variant='flushed'
      placeholder='Your answer'
      type='text'
    />
  );
}

export function EmailAnswer({
  question,
  questionIndex,
}: AnswerTypeProps): ReactElement {
  const [emailResponse, setEmailResponse] = useState<string>('');
  const formikCtx = useFormikContext<ResponseDetails>();

  const updateAnswer = () => {
    formikCtx.setFieldValue(`answers.${questionIndex}.data`, emailResponse);
  };
  return (
    <Input
      onChange={(e) => {
        setEmailResponse(e.target.value);
        updateAnswer();
      }}
      _placeholder={{ color: 'gray.400' }}
      color={'purple.3'}
      variant='flushed'
      placeholder='Your email'
      type='email'
    />
  );
}

export function DateAnswer({ questionIndex }: AnswerTypeProps): ReactElement {
  const [dateResponse, setDateResponse] = useState<string>('');
  const formikCtx = useFormikContext<ResponseDetails>();

  const updateAnswer = () => {
    formikCtx.setFieldValue(`answers.${questionIndex}.data`, dateResponse);
  };
  return (
    <Input
      onChange={(e) => {
        setDateResponse(e.target.value);
        updateAnswer();
      }}
      _placeholder={{ color: 'gray.400' }}
      color={'purple.3'}
      variant='flushed'
      type='datetime-local'
    />
  );
}

export function CheckboxAnswer({
  question,
  questionIndex,
}: AnswerTypeProps): ReactElement {
  const checkBoxQuestions = JSON.parse(question.data) as CheckboxOption[];
  return (
    <Box maxW='2xl' p={2}>
      <VStack display='flex' alignItems='start' w='full'>
        <Box w='full'>
          {checkBoxQuestions.map((option, index) => {
            return (
              <HStack mt={2} key={index}>
                <Checkbox colorScheme='purple' size='lg' />
                <Text color='white' fontSize={'lg'}>{option.title}</Text>
              </HStack>
            );
          })}
        </Box>
      </VStack>
    </Box>
  );
}

export function MultipleChoiceAnswer({
  question,
  questionIndex,
}: AnswerTypeProps): ReactElement {
  const multipleChoiceOptions = JSON.parse(
    question.data
  ) as MultipleChoiceOption[];

  return (
    <Box maxW='2xl' p={2}>
      <VStack display='flex' alignItems='start' w='full'>
        <Box w='full'>
          <RadioGroup>
            <Stack direction='column'>
              {multipleChoiceOptions.map((option, index) => {
                return (
                  <Radio key={index} value={option.title}>
                    <Text color={"white"} fontSize={'lg'}>{option.title}</Text>
                  </Radio>
                );
              })}
            </Stack>
          </RadioGroup>
        </Box>
      </VStack>
    </Box>
  );
}

export function LinearScaleAnswer({
  questionIndex,
}: AnswerTypeProps): ReactElement {
  const formikCtx = useFormikContext<ResponseDetails>();
  // console.log(formikCtx.values.questions[questionIndex].data);
  // const [checkboxOptions, setCheckboxOptions] = useState<CheckboxOption[]>([
  //   { title: 'Option 1' },
  // ]);

  // const updateQuestionData = () => {
  //   formikCtx.setFieldValue(
  //     `questions.${questionIndex}.data`,
  //     JSON.stringify(checkboxOptions)
  //   );
  // };

  return (
    <Box maxW='2xl' borderRadius='md' border='1px' borderColor='purple.1' p={5}>
      <VStack display='flex' alignItems='start' w='full'>
        <Box w='full'>
          Linear Scale Answer
          {/*{checkboxOptions.map((option, index) => {*/}
          {/*  return (*/}
          {/*    <HStack mt={2} key={index}>*/}
          {/*      <Checkbox colorScheme='purple' size='lg' disabled={disabled} />*/}
          {/*      <Input*/}
          {/*        onChange={(e) => {*/}
          {/*          const newArr = [...checkboxOptions];*/}
          {/*          newArr[index] = { title: e.target.value };*/}
          {/*          setCheckboxOptions(newArr);*/}
          {/*          updateQuestionData();*/}
          {/*        }}*/}
          {/*        _placeholder={{ color: 'purple.3' }}*/}
          {/*        _selected={{ borderColor: 'purple.6' }}*/}
          {/*        variant='flushed'*/}
          {/*        placeholder='Option'*/}
          {/*        type='text'*/}
          {/*        w='full'*/}
          {/*      />*/}
          {/*    </HStack>*/}
          {/*  );*/}
          {/*})}*/}
        </Box>
      </VStack>
    </Box>
  );
}
