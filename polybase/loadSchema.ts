import { Polybase } from '@polybase/client'

const schema = `
collection Form {
  id: string;
  title: string;
  description?: string;
  creatorPk: string;
  createdAt: string;
  
  @index(id, title, description, createdAt);
}

collection Question {
  id: string;
  formId: string;
  createdAt: string;
  title: string;
  type: string;
  required: string;
  
  @index(id, title, type, createdAt);
}

collection MultipleChoiceOption {
  id: string;
  questionId: string;
  title: string;
  
  @index(id, questionId, title);
}

collection Response {
  id: string;
  formId: string;
  questionType: string;
  data: string;
  
  @index(id, formId, questionType, data);
}
`

async function loadSchema () {
  const db = new Polybase()
  await db.applySchema(schema, 'forms-testing');
  return 'Schema loaded';
}

loadSchema()
  .then(console.log)
  .catch(console.error)