import * as yup from 'yup';

import { FormDetails } from '../../../features/types';

export const newFormSchema = yup.object().shape({
  title: yup.string().required('A title is required'),
  description: yup.string().nullable(),
  questions: yup
    .array()
    .required('You need to add a question to create a form'),
});

export const initialFormValue: FormDetails = {
  title: '',
  description: '',
  questions: [],
};
