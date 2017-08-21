const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  _id: String,
  password: String
})

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
userSchema.methods.validPassword = function (password, hashpassword) {
  return bcrypt.compareSync(password, hashpassword)
}

module.exports = mongoose.model('User', userSchema)
