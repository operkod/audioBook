const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: { type: Schema.Types.String, required: true, unique: true },
  password: { type: Schema.Types.String, required: true },
  fullname: { type: Schema.Types.String, require: true},
  avatar: { type: Schema.Types.String }
})
module.exports = model('User', userSchema)
