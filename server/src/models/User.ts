import { any } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';
import { Food, Meal } from '../generated/graphql-server';

export interface IUser {
    username: string;
    email: string;
    password: string;
    day1: Meal[];
    day2: Meal[];
    day3: Meal[];
    day4: Meal[];
    day5: Meal[];
    day6: Meal[];
    day7: Meal[];
    foodList: Food[];
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        // days: {type: Array},
        // days: [[[{type: String}]]],
        // days: [{
        //     name: String,
        //     meals: [
        //         {
        //             index: Number,
        //             foods: [
        //                 {
        //                     name: String,
        //                     calories: Number,
        //                     proteins: Number,
        //                     carbs: Number,
        //                     fats: Number,
        //                     ingredients: Array
        //                 }
        //             ]
        //         }
        //     ]
        // }],
        day1: [
            {
                name: String,
                index: Number,
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
        ],
        day2: [
            {
                name: String,
                index: Number,
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
        ],
        day3: [
            {
                index: Number,
                name: String,
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
        ],
        day4: [
            {
                name: String,
                index: Number,
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
        ],
        day5: [
            {
                name: String,
                index: Number,
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
        ],
        day6: [
            {
                name: String,
                index: Number,
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
        ],
        day7: [
            {
                name: String,
                index: Number,
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
        ],
        // days: any,
        foodList: { type: Array, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);
