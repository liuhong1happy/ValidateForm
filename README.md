# ValidateForm

form校验

## Usage

install

  npm install --save git+https://github.com/liuhong1happy/lh-validate-form.git

quickly start

```js
  // 1. rules
  const rules = [
    new ValidateRule({ field: 'firstName', required: true, msg: 'firstName field is required. '}),
    new ValidateRule({ field: 'lastName', required: true, msg: 'lastName field is required. '}),
  ]
  // 2. validator
  const validator = new Validator(rules);
  
  // 3. validate
  const validateResult = validator.validate(data);

  // 4. result
  if(validateResult.validate) {
    // success
    
  } else {
    // error
    console.log(validateResult.msg);
  }
```
