function ValidateRule(options) {
  if(options==null) {
    options = {}
  }
  var keys = Object.keys(ValidateRule.prototype);
  for(var i=0;i<keys.length;i++) {
    var key = keys[i];
    if(options[key]!=null)
      this[key] = options[key]
  }
}

ValidateRule.prototype.field = "field";
ValidateRule.prototype.required = false;
ValidateRule.prototype.max = null;
ValidateRule.prototype.min = null;
ValidateRule.prototype.regex = null;
ValidateRule.prototype.custom = null;
ValidateRule.prototype.msg = "invalid field value.";

module.exports.ValidateRule = ValidateRule;

function ValidateResult(options) {
  ValidateRule.call(this, options);
  if(options.validate != null) {
    this.validate = options.validate;
  }
}

ValidateResult.prototype = new ValidateRule(); 
ValidateResult.prototype.constructor = ValidateResult;
ValidateResult.prototype.validate = false;

module.exports.ValidateResult = ValidateResult;

function Validator(rules) {
  this.rules = rules || [];
}

Validator.prototype.validate = function() {
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
    rule.validate = validate;
    return new ValidateResult(rule);
}

module.exports.Validator = Validator;

