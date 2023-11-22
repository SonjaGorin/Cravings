const validator = require('validator')

let email = 'test@gmail.com'
console.log(validator.isEmail(email))
email = 'test@'
console.log(validator.isEmail(email))