import mongoose from 'mongoose';
import Logging from '../library/Logging';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

import { UserInputError } from 'apollo-server';

const Mutation = {
    async register(parent: any, {input}: any, context: any, info: any) {        
        const { username, email, password } = input;
        const userWithSameEmail = await User.findOne({ email: email });
        if (userWithSameEmail) {
            return { message: 'User already exists in our database' };
            // throw new UserInputError('Username is taken', {
            //     error: {
            //         message: 'This username is taken'
            //     }
            // })
            // ;
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const days: any = [];
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            email,
            password: hashedPass,
            days
        });

        const returnedUser = await user.save().catch((error) => Logging.error(error));
        let accessToken = '';
        let id = '';
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
                    days
                }
            };
            // return ret.user
            return ret;
        }
    },

    async login(parent: any, args: any, context: any, info: any) {
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
    }
};

export default Mutation;
