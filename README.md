# ValidateForm

form校验

## Usage

install

    npm install --save lh-validate-form

quickly start

```js
  // 1. rules
  const rules = [
    { field: 'firstName', required: true, msg: 'firstName field is required. '},
    { field: 'lastName', required: true, msg: 'lastName field is required. '},
  ]
  // 2. validator
  const validator = new Validator(rules);
  
  // 3.1 validate
  const validateResult = validator.validate(data);
  
  // 3.2 validate all
  const validateResultList = validator.validateAll(data);

  // 4.1 result
  if(validateResult.validate) {
    // success
    
  } else {
    // error
    console.log(validateResult.msg);
  }
  
  // 4.2 result list
  if(validateResultList.length===0) {
    // success
  } else {
    // error
    console.log(validateResultList[0].msg);
  }
```
