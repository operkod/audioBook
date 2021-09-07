import { Schema, model, Document } from 'mongoose'
import { IUser } from './User'

export interface IComment extends Document {
	author: IUser | string
	text: string
}


const CommentSchema = new Schema(
	{
		author: { type: Schema.Types.String, ref: 'User' },
		text: { type: Schema.Types.String, required: true }
	},
	{
		timestamps: true,
	}
)

const CommentModel = model<IComment>('Comment', CommentSchema)

export default CommentModel
