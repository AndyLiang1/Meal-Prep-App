import mongoose from 'mongoose';
import Logging from '../library/Logging';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

import {UserInputError} from 'apollo-server'

const Mutation = {
    async register(parent: any, { input }: any, context: any, info: any) {
        const { username, email, password } = input;
        const userWithSameEmail = await User.findOne({ email: email });
        if (userWithSameEmail) {
            // return { message: 'User already exists in our database' }
            throw new UserInputError('Username is taken', {
                error: {
                    message: 'This username is taken'
                }
            })
            ;
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
        console.log(`User is ${user}`)
        const returnedUser = await user.save().catch((error) => Logging.error(error));
        let token = '';
        let id = '';
        if (returnedUser) {
            token = jwt.sign(
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
                    token,
                    days
                }
            };
            
            console.log('returned user');
            console.log(returnedUser);
            console.log('ret is')
            console.log(ret)
            return ret.user
            // return ret;
        }
    }
};

export default Mutation;
