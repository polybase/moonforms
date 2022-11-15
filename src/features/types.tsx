// Represents a record from the User collection
export interface UserRecord {
  id: string;
  privatekey: string;
}
// Represents a record from the Form collection
export interface FormRecord {
  id: string;
  title: string;
  description: string;
  publickey: string;
  createdat: string;
}
// Represents a record from the Question collection
export interface QuestionRecord {
  id: string;
  form: string;
  title: string;
  type:
    | 'date'
    | 'checkbox'
    | 'email'
    | 'short-text'
    | 'multiple-choice'
    | 'linear-scale';
  creator: string;
  required: string;
  data: string;
}
// Represents a record from the Response collection
export interface ResponseRecord {
  id: string;
  form: string;
  data: string;
  publickey: string;
  createdat: string;
}

export interface ResponseDetails {
  id: string;
  form: string;
  answers: QuestionAnswer[];
}

export interface QuestionAnswer {
  questionId: string;
  data: string;
  type: string;
}

export interface FormDetails {
  id: string;
  title: string;
  description: string;
  questions: QuestionDetails[];
}

export interface QuestionDetails {
  id: string;
  title: string;
  type:
    | 'date'
    | 'checkbox'
    | 'email'
    | 'short-text'
    | 'multiple-choice'
    | 'linear-scale';
  required: boolean;
  data: string;
}

export interface CheckboxOption {
  title: string;
}

export interface MultipleChoiceOption {
  title: string;
}

export interface LinearScaleConfig {
  min: string;
  max: string;
}
