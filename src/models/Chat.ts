import { Schema, model, Document } from 'mongoose';
// TODO: ref: user;

export interface IChat extends Document {
  author: string;
  avatar: string;
  message: string;
};

const ChatSchema = new Schema(
  {
    author: { type: Schema.Types.String },
    avatar: { type: Schema.Types.String },
    message: { type: Schema.Types.String, required: true },
  },
  {
    timestamps: true,
  },
);

const ChatModel = model<IChat>('Chat', ChatSchema);

export default ChatModel;
