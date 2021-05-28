const { Schema, model } = require('mongoose')

const CommentSchema = new Schema({
  author: { type: Schema.Types.String, ref: 'User' },
  text: { type: Schema.Types.String, required: true }
})

module.exports = model('Comment', CommentSchema)
