import * as yup from 'yup';

import { Form } from '../../../features/types';

export const NewFormSchema = yup.object().shape({
  title: yup.string().required('A title is required'),
  description: yup.string().nullable(),
  questions: yup
    .array()
    .required('You need to add a question to create a form'),
});

export const initialFormValue: Form = {
  title: '',
  description: '',
  questions: [],
};
