export interface Form {
  title: string;
  description: string;
  questions: Question[];
}

export interface Question {
  title: string;
  type: string;
  required: boolean;
}
