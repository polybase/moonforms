// Represents a record from the User collection
export interface UserRecord {
  id: string;
  encryptedPrivateKey: string;
  publicKey: string;
}
// Represents a record from the Form collection
export interface FormRecord {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
}
// Represents a record from the Question collection
export interface QuestionRecord {
  id: string;
  formId: string;
  title: string;
  type:
    | 'date'
    | 'checkbox'
    | 'email'
    | 'short-text'
    | 'multiple-choice'
    | 'linear-scale';
  createdBy: string;
  required: string;
  data: string;
}
// Represents a record from the Response collection
export interface ResponseRecord {
  id: string;
  formId: string;
  encryptedData: string;
  createdAt: string;
}
// Represents a record from the ResponseUser collection
export interface ResponseUserRecord {
  id: string;
  userId: string;
  responseId: string;
  encryptedEncryptionKey: string;
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

export interface AlertDetails {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}