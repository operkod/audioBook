import { Schema, model } from 'mongoose'
import { IComment } from './Comment'

export interface IBook extends Document {
	name: string;
	author: string;
	imgUrl: string;
	description: string;
	comments: IComment[] | [];
	likes: Array<string> | [];
}

const BookSchema = new Schema(
	{
		name: { type: Schema.Types.String, required: true, text: true },
		author: { type: Schema.Types.String, required: true, text: true },
		imgUrl: { type: Schema.Types.String, require: false },
		description: { type: Schema.Types.String, require: true },
		comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
		likes: [{ type: Schema.Types.String }] // TODO: ref user
	}
)

const BookModel = model<IBook | any>('Book', BookSchema)

export default BookModel
