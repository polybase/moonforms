import { Polybase } from '@polybase/client'

const schema = `
collection user {
  id: string;
  privatekey: string;
  
  @index(id, privatekey);

  constructor (id: string, privatekey: string) {
    this.id = id;
    this.privatekey = privatekey;
  }
}

collection formTwo {
  id: string;
  title: string;
  description: string;
  publickey: string;
  createdat: string;
  
  @index(id, title, description, publickey, createdat);
  
  constructor (id: string, title: string, description: string, createdat: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdat = createdat;
    this.publickey = ctx.publicKey;
  }
}

collection question {
  id: string;
  form: string;
  title: string;
  type: string;
  creator: string;
  required: string;
  data?: string;
  
  @index(id, form, title, type, required);
  constructor (id: string, form: string, title: string, type: string, required: string, data: string) {
    this.id = id;
    this.form = form;
    this.type = type;
    this.title = title;
    this.required = required;
    this.data = data;
    this.creator = ctx.publicKey;
  }
}

collection response {
    id: string;
    form: string;
    data: string;
    publickey: string;
    createdat: string;
    
    @index(id, form, publickey, createdat);
    
    constructor(id: string, form: string, createdAt: string, data: string) {
      this.id = id;
      this.form = form;
      this.data = data;
      this.createdat = createdAt;
      this.publickey = ctx.publicKey;
    }
  }
`
async function loadSchema () {
  const db = new Polybase()
  await db.applySchema(schema, 'new-forms');
  return 'Schema loaded';
}

loadSchema()
  .then(console.log)
  .catch(console.error)
