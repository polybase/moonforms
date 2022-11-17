import { Polybase } from '@polybase/client'

const schema = `
collection user {
  id: string;
  encryptedPrivateKey: string;
  publicKey: string;
    
  @index(id, encryptedPrivateKey, publicKey);

  constructor (id: string, privateKey: string) {
    this.id = id;
    this.encryptedPrivateKey = privateKey;
    this.publicKey = ctx.publicKey;
  }
}

collection form {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  
  @index(id, title, description, createdBy, createdAt);
  
  constructor (id: string, title: string, description: string, createdAt: string, createdBy: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}

collection question {
  id: string;
  formId: string;
  title: string;
  type: string;
  createdBy: string;
  required: string;
  data?: string;
  
  @index(id, form, title, type, required, createdBy);
  
  constructor (id: string, form: string, title: string, type: string, required: string, data: string, createdBy: string) {
    this.id = id;
    this.formId = form;
    this.type = type;
    this.title = title;
    this.required = required;
    this.data = data;
    this.createdBy = createdBy;
  }
}

collection response {
    id: string;
    formId: string;
    encryptedData: string;
    createdAt: string;
    
    @index(id, formId, createdAt, encryptedData);
    
    constructor(id: string, form: string, createdAt: string, data: string) {
      this.id = id;
      this.formId = form;
      this.encryptedData = data;
      this.createdAt = createdAt;
    }
}

collection responseUser {
    id: string;
    userId: string;
    responseId: string;
    encryptedEncryptionKey: string;
    
    @index(id, userId, responseId, encryptedEncryptionKey);
    
    constructor(id: string, userId: string, responseId: string, encryptedEncryptionKey: string) {
      this.id = id;
      this.userId = userId;
      this.responseId = responseId;
      this.encryptedEncryptionKey = encryptedEncryptionKey;
    }
}
`

async function loadSchema () {
  const db = new Polybase()
  await db.applySchema(schema, 'formsTesting_3');
  return 'Schema loaded';
}

loadSchema()
  .then(console.log)
  .catch(console.error)
