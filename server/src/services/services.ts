import UserModel from '../models/User';
import { UserDao } from '../daos/UserDao';
import { UserService } from '../services/UserService';

import {MealListFoodDao} from '../daos/MealListFoodDao'
import { MealListFoodService } from '../services/MealListFoodService';
 
import {MealListMealDao} from '../daos/MealListMealDao'
import { MealListMealService } from '../services/MealListMealService';
import { FoodListDao } from '../daos/FoodListDao';
import { FoodListService } from '../services/FoodListService';

const userDao = new UserDao(UserModel);
const userService = new UserService(userDao);

const mealListFoodDao = new MealListFoodDao()
const mealListFoodService = new MealListFoodService(mealListFoodDao);

const mealListMealDao = new MealListMealDao()
const mealListMealService = new MealListMealService(mealListMealDao);

const foodListDao = new FoodListDao()
const foodListService = new FoodListService(foodListDao); 



const services = {
    userService,
    mealListFoodService,
    mealListMealService,
    foodListService
};

export default services