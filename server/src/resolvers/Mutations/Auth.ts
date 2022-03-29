import mongoose from 'mongoose';
import Logging from '../../library/Logging';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import DayInterface from '../../../../client/src/state/helpers/IDay';
import FoodInterface from '../../../../client/src/state/helpers/IFood';
import MealInterface from '../../../../client/src/state/helpers/IMeal';

enum Days {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}
const createUID = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const register = async (parent: any, { input }: any, context: any, info: any) => {
    const { username, email, password } = input;
    const userWithSameEmail = await User.findOne({ email: email });
    if (userWithSameEmail) {
        return { message: 'User already exists in our database' };
    }

    const hashedPass = await bcrypt.hash(password, 10);
    let days: DayInterface[] = [];
    for (let i = 0; i < 7; i++) {
        const foods: FoodInterface[] = []
        const meal = {
            id: createUID(),
            foods
        };
        const day = {
            name: Days[i],
            meals: [
                meal
            ]
        };
        days.push(day);
    }
    const foodList: FoodInterface[] = []
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        email,
        password: hashedPass,
        days,
        foodList
    });

    const returnedUser = await user.save().catch((error) => Logging.error(error));
    let accessToken = '';
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

export const login = async (parent: any, args: any, context: any, info: any) => {
    const { email, password } = args;

    const userWithSameEmail = await User.findOne({ email: email });
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
            const accessToken = jwt.sign({ username: userWithSameEmail.username, id: userWithSameEmail.id }, config.server.JWT_SECRET);
            const days: any = [];

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
