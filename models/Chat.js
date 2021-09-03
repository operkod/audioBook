const { Schema, model } = require('mongoose')

const ChatSchema = new Schema({
	author: { type: Schema.Types.String },
	avatar: { type: Schema.Types.String },
	message: { type: Schema.Types.String, required: true },
	date: { type: Schema.Types.String }
})

module.exports = model('Chat', ChatSchema)
