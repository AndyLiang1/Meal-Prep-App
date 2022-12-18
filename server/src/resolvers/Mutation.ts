import mongoose from 'mongoose';
import Logging from '../library/Logging';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import {register, login} from './Mutations/Auth'
import { UserInputError } from 'apollo-server';
import { createFoodList, editFoodList, deleteFoodList } from './Mutations/FoodListResolver';
import {createMealListMeal, deleteMealListMeal} from './Mutations/MealListMealResolver'
import {createMealListFood, deleteMealListFood, editMealListFood} from './Mutations/MealListFoodResolver'

const Mutation = {
    register,
    login,

    createFoodList,
    editFoodList,
    deleteFoodList,

    createMealListMeal,
    deleteMealListMeal,

    createMealListFood,
    editMealListFood,
    deleteMealListFood
};

export default Mutation;


