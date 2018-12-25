export class ValidateResult {
  field = "field";
  required = false;
  max = null;
  min = null;
  regex = null;
  msg = "invalid field value."
  validate = false;
  constructor(options) {
    this.field = options.field || 'field';
    this.required = options.required || false;
    this.max = options.max || null;
    this.min = options.min || null;
    this.msg = options.msg ||  "invalid field value.";
    this.regex = options.regex || null;
    this.validate = options.validate || false;
  }
}

export class Validator {
  constructor(rules) {
    this.rules = rules || [];
  }
  validate(formData) {
    var validate = true;
    for(var i=0;i<this.rules.length;i++){
      var rule = this.rules[i];
      if(rule instanceof ValidateRule) {
        var item = formData[rule.field];
        if(rule.required) {
          validate = !!item;
          if(!validate) return new ValidateResult({ validate: false, ...rule })
        }
        if(rule.max && typeof item === 'string') {
          validate = item.length <= rule.max
          if(!validate) return new ValidateResult({ validate: false, ...rule })
        }
        if(rule.min && typeof item === 'string') {
          validate = item.length >= rule.min
          if(!validate) return new ValidateResult({ validate: false, ...rule })
        }
        if(rule.regex && typeof item === 'string') {
          validate = item.match(rule.regex)
          if(!validate) return new ValidateResult({ validate: false, ...rule })
        }
        if(rule.custom && rule.custom instanceof Function) {
          validate = rule.custom(rule, formData)
          if(!validate) return new ValidateResult({ validate: false, ...rule })
        }
      }
    }
    return new ValidateResult({ validate, ...rule });
  }
}

export class ValidateRule {
  constructor(options) {
    this.field = options.field || 'field';
    this.required = options.required || false;
    this.max = options.max || null;
    this.min = options.min || null;
    this.msg = options.msg ||  "invalid field value.";
    this.regex = options.regex || null;
    this.custom = options.custom || null;
  }
  field = "field";
  required = false;
  max = null;
  min = null;
  regex = null;
  custom = null;
  msg = "invalid field value."
}
