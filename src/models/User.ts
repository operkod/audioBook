import { Schema, model, Document } from 'mongoose'


export interface IUser extends Document {
  email: string;
  password: string,
  fullname: string,
  avatar: string
}

const userSchema = new Schema(
  {
    email: { type: Schema.Types.String, required: true, unique: true },
    password: { type: Schema.Types.String, required: true },
    fullname: { type: Schema.Types.String, require: true },
    avatar: { type: Schema.Types.String }
  }
)


const UserModel = model<IUser>("User", userSchema);

export default UserModel;
