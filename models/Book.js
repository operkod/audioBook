const { Schema, model } = require('mongoose')

const BookSchema = new Schema({
	name: { type: Schema.Types.String, required: true, text: true },
	author: { type: Schema.Types.String, required: true, text: true },
	imgUrl: { type: Schema.Types.String, require: false },
	description: { type: Schema.Types.String, require: true },
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	likes: [{ type: Schema.Types.String }]
})
module.exports = model('Book', BookSchema)
