import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
    days: Array<any>;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        days: {type: Array, required: true}
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);
