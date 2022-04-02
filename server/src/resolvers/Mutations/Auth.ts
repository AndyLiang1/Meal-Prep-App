import mongoose from 'mongoose';
import Logging from '../../library/Logging';
import UserModel from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

import { Day, Food, Meal, MutationLoginArgs, MutationRegisterArgs, User } from '../../generated/graphql-server';

enum Days {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}
const createUID = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const register = async (parent: any, { input }: MutationRegisterArgs, context: any, info: any) => {
    const { username, email, password } = input;
    const userWithSameEmail = await UserModel.findOne({ email: email });
    if (userWithSameEmail) {
        return { message: 'User already exists in our database' };
    }

    const hashedPass: string = await bcrypt.hash(password, 10);
    let days: Day[] = [];
    for (let i: number = 0; i < 7; i++) {
        const foods: Food[] = [];
        const meal: Meal = {
            index: 0,
            foods
        };
        const day: Day = {
            name: Days[i],
            meals: [meal]
        };
        days.push(day);
    }
    const foodList: Food[] = [];
    const user = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        username,
        email,
        password: hashedPass,
        days,
        foodList
    });

    const returnedUser = await user.save().catch((error) => Logging.error(error));
    let accessToken: string = '';
    if (returnedUser) {
        accessToken = jwt.sign(
            {
                id: returnedUser.id,
                username: returnedUser.username
            },
            config.server.JWT_SECRET
        );
        const { username, email, password, days } = returnedUser;
        const ret = {
            user: {
                id: returnedUser._id,
                username,
                email,
                password,
                accessToken,
                days,
                foodList
            }
        };
        return ret;
    }
};

export const login = async (parent: any, args: MutationLoginArgs, context: any, info: any) => {
    const { email, password } = args;

    const userWithSameEmail = await UserModel.findOne({ email: email });
    if (!userWithSameEmail) {
        return { message: 'No user has registered with that email' };
        // throw new UserInputError('Username is taken', {
        //     error: {
        //         message: 'This username is taken'
        //     }
        // })
        // ;
    }
    try {
        const match = await bcrypt.compare(password, userWithSameEmail.password);
        if (!match) {
            return { message: 'Wrong username and password combination' };
        } else {
            const accessToken:string = jwt.sign({ username: userWithSameEmail.username, id: userWithSameEmail.id }, config.server.JWT_SECRET);
            const days: Days[] = [];

            const ret = {
                user: {
                    id: userWithSameEmail._id,
                    username: userWithSameEmail.username,
                    email,
                    password,
                    accessToken,
                    days
                }
            };
            return ret;
        }
    } catch (error) {
        console.log(error);
    }
};
