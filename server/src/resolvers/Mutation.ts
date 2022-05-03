import mongoose from 'mongoose';
import Logging from '../library/Logging';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import {register, login} from './Mutations/Auth'
import { UserInputError } from 'apollo-server';
import {createFood, deleteFood, editFood} from './Mutations/Food'
import {createMeal, deleteMeal} from './Mutations/Meal'



const Mutation = {
    register,
    login,
    createFood,
    createMeal, 
    deleteMeal,
    deleteFood,
    editFood
};

export default Mutation;
