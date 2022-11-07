
**form schema:**
- id string
- title string
- description string
- creatorPk string
- createdAt string

**question schema:**
- id string
- formId string
- createdAt string
- title string
- type string (text, email, )
- required boolean

since polybase does not support arrays yet I will have to create a collection for multiple choice questions
**multiple choice option**
- id string
- questionId string
- title string



**response schema:**
- id string
- formId string
- questionType string (should I add this?)
- data string (string? can it be multiple types?)


next steps
