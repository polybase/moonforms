import { Box, HStack, Text } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React, { useCallback, useEffect } from 'react';

import {
  CheckboxAnswer,
  DateAnswer,
  EmailAnswer,
  LinearScaleAnswer,
  MultipleChoiceAnswer,
  ShortTextAnswer,
} from './AnswerTypes';
import { QuestionRecord } from '../../features/types';

interface ResponseQuestionProps {
  index: number;
  question: QuestionRecord;
}

const ResponseCard = ({ question, index }: ResponseQuestionProps) => {
  const formikCtx = useFormikContext();

  const setDefaultValues = useCallback(() => {
    formikCtx.setFieldValue(`answers.${index}.questionId`, question.id);
    formikCtx.setFieldValue(`answers.${index}.type`, question.type);
    formikCtx.setFieldValue(`answers.${index}.data`, '');
  }, [formikCtx, index, question.id, question.type]);

  useEffect(() => {
    setDefaultValues();
  }, []);

  return (
    <Box
      mt={4}
      maxWidth='full'
      borderRadius='md'
      boxShadow={'md'}
      p={6}
      border='2px'
      borderColor='rgb(255,255,255, 0.05)'
      bg='dark.1'
    >
      <HStack w='full'>
        <Text color='white' fontWeight={600} fontSize={{base: 'lg', lg: '2xl'}}>
          {question.title}
        </Text>
        {question.required === 'true' ? (
          <Text color='red.300' fontWeight={500} fontSize='xl' as='span'>
            *
          </Text>
        ) : null}
      </HStack>

      {question.type === 'short-text' && (
        <ShortTextAnswer question={question} questionIndex={index} />
      )}
      {question.type === 'email' && (
        <EmailAnswer question={question} questionIndex={index} />
      )}
      {question.type === 'date' && (
        <DateAnswer question={question} questionIndex={index} />
      )}
      {question.type === 'checkbox' && (
        <CheckboxAnswer question={question} questionIndex={index} />
      )}
      {question.type === 'multiple-choice' && (
        <MultipleChoiceAnswer question={question} questionIndex={index} />
      )}
      {question.type === 'linear-scale' && (
        <LinearScaleAnswer question={question} questionIndex={index} />
      )}
      <HStack mt={4}></HStack>
    </Box>
  );
};

export default ResponseCard;
