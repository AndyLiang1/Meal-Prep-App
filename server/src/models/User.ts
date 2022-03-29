import { any } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';
import DayInterface from '../../../client/src/state/helpers/IDay';
import FoodInterface from '../../../client/src/state/helpers/IFood';

export interface IUser {
    username: string;
    email: string;
    password: string;
    days: DayInterface[];
    foodList: FoodInterface[]
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        // days: {type: Array, required: true},
        // days: [[[{type: String}]]],
        days: [{
            name: String, 
            meals: [
                {
                    id: String, 
                    foods: [
                        {
                            name: String, 
                            calories: Number, 
                            proteins: Number, 
                            carbs: Number,
                            fats: Number,
                            ingredients: Array
                        }
                    ]
                }
            ]
        }],
        // days: any,
        foodList: {type: Array, required: true}
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);
