export interface FormDetails {
  title: string;
  description: string;
  questions: Question[];
}

export interface Question {
  id: string;
  title: string;
  type: string;
  required: boolean;
}
