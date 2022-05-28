import mongoose from 'mongoose';
import Logging from '../../library/Logging';
import UserModel from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

import { Food, Meal, MutationLoginArgs, MutationRegisterArgs, User } from '../../generated/graphql-server';

enum Days {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}
export const createUID = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const register = async (parent: any, { input }: MutationRegisterArgs, context: any, info: any) => {
    const { username, email, password } = input;
    const userWithSameEmail = await UserModel.findOne({ email: email });
    if (userWithSameEmail) {
        return { message: 'User already exists in our database' };
    }

    const hashedPass: string = await bcrypt.hash(password, 10);
    const ing1: Food = {
        name: 'ing1',
        calories: 400,
        proteins: 10,
        fats: 2,
        carbs: 10,
        ingredients: [],
        givenAmount: 500,
        actualAmount: 100
    };
    const ing2: Food = {
        name: 'ing2',
        calories: 400,
        proteins: 10,
        fats: 2,
        carbs: 10,
        ingredients: [],
        givenAmount: 500,
        actualAmount: 100
    };
    const ing3: Food = {
        name: 'ing3',
        calories: 400,
        proteins: 10,
        fats: 2,
        carbs: 10,
        ingredients: [],
        givenAmount: 500,
        actualAmount: 100
    };
    const food: Food = {
        name: 'food',
        calories: 300,
        proteins: 30,
        fats: 2,
        carbs: 15,
        ingredients: Array(15).fill(ing1),
        givenAmount: 300,
        actualAmount: 100
    };
    const food2: Food = {
        name: 'food2',
        calories: 400,
        proteins: 10,
        fats: 2,
        carbs: 10,
        ingredients: Array(15).fill(ing2),
        givenAmount: 500,
        actualAmount: 100
    };

    const meal: Meal = {
        name: 'Meal',
        id: createUID(),
        index: 0,
        foods: [food, food2, food, food2]
    };

    const day1 = [meal, meal, meal, meal, meal];
    const day2 = [meal, meal, meal, meal, meal];
    const day3 = [meal, meal, meal, meal, meal];
    const day4 = [meal, meal, meal, meal, meal];
    const day5 = [meal, meal, meal, meal, meal];
    const day6 = [meal, meal, meal, meal, meal];
    const day7 = [meal, meal, meal, meal, meal];
    const foodList: Food[] = Array(30).fill(food2);
    const user = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        username,
        email,
        password: hashedPass,
        day1,
        day2,
        day3,
        day4,
        day5,
        day6,
        day7,
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
        const { username, email, password, day1, day2, day3, day4, day5, day6, day7 } = returnedUser;
        const ret = {
            user: {
                id: returnedUser._id,
                username,
                email,
                password,
                accessToken,
                day1,
                day2,
                day3,
                day4,
                day5,
                day6,
                day7,
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
            const accessToken: string = jwt.sign({ username: userWithSameEmail.username, id: userWithSameEmail.id }, config.server.JWT_SECRET);
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
