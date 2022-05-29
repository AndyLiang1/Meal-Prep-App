import mongoose from 'mongoose';
import Logging from '../../library/Logging';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { Food, Meal, MutationLoginArgs, MutationRegisterArgs, User } from '../../generated/graphql-server';
import services from '../../services/services'

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
    const newUser = await services.userService.register(username, email, password);
    return newUser
};

export const login = async (parent: any, args: MutationLoginArgs, context: any, info: any) => {
    const { email, password } = args;

    const registeredUser = await services.userService.login(email, password)

    return registeredUser;
};
