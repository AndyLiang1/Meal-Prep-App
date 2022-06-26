import { UserDao } from '../daos/UserDao';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Food, Meal } from '../generated/graphql-server';
import { createUID } from '../resolvers/Mutations/Auth';
import { config } from '../config/config';
import validate from './validate';

enum DayNames {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}
export class UserService {
    constructor(private UserDao: UserDao) {}

    public async get(userId: string) {
        return this.UserDao.get(userId);
    }

    private createAccessToken(userId: string, username: string): string {
        let accessToken = jwt.sign(
            {
                id: userId,
                username
            },
            config.server.JWT_SECRET
        );
        return accessToken;
    }

    public async register(username: string, email: string, password: string) {
        const valErr = validate.register(username, email, password);
        if (valErr) {
            return { message: 'Invalid email or form is not complete'};
        }

        const userWithSameEmail = await this.UserDao.getEmail(email);
        if (userWithSameEmail) {
            return { message: 'User already exists in our database' };
        }

        const hashedPass: string = await bcrypt.hash(password, 10);
        let yay = false;
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
            calories: 500,
            proteins: 10,
            fats: 2,
            carbs: 10,
            ingredients: [],
            givenAmount: 500,
            actualAmount: 100
        };
        const ing3: Food = {
            name: 'ing3',
            calories: 600,
            proteins: 10,
            fats: 2,
            carbs: 10,
            ingredients: [],
            givenAmount: 500,
            actualAmount: 100
        };
        const food1: Food = {
            name: 'food',
            calories: 300,
            proteins: 30,
            fats: 2,
            carbs: 15,
            ingredients: Array(20).fill(ing1),
            givenAmount: 300,
            actualAmount: 100
        };
        const food2: Food = {
            name: 'food2',
            calories: 400,
            proteins: 10,
            fats: 2,
            carbs: 10,
            ingredients: Array(20).fill(ing2),
            givenAmount: 500,
            actualAmount: 100
        };
        let meal: any;
        if (yay) {
            meal = {
                name: 'Meal',
                // id: createUID(),
                index: 0,
                foods: [food1, food2, food1, food2, food1]
            };
        } else {
            meal = {
                name: 'Meal',
                id: 'e',
                index: 0,
                foods: []
            };
        }

        const day1 = [meal, meal, meal, meal, meal];
        const day2 = [meal, meal, meal, meal, meal];
        const day3 = [meal, meal, meal, meal, meal];
        const day4 = [meal, meal, meal, meal, meal];
        const day5 = [meal, meal, meal, meal, meal];
        const day6 = [meal, meal, meal, meal, meal];
        const day7 = [meal, meal, meal, meal, meal];

        let foodList: Food[] = [];
        if (yay) {
            foodList = Array(300).fill(food2);
        }

        const user = {
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
        };

        const newUser = await this.UserDao.create(user);
        let accessToken: string = '';

        if (newUser) {
            accessToken = this.createAccessToken(newUser._id, newUser.username);
        }

        const ret = {
            user: {
                id: newUser._id,
                accessToken,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                day1: newUser.day1, 
                day2: newUser.day2,
                day3: newUser.day3,
                day4: newUser.day4, 
                day5: newUser.day5, 
                day6: newUser.day6,
                day7: newUser.day7,
                foodList: newUser.foodList
            }
        };
        return ret;
    }

    public async login(email: string, password: string) {

        const valErr = validate.login(email, password);
        if (valErr) {
            return { message: 'Invalid email or form is not complete'};
        }
        
        const userWithSameEmail = await this.UserDao.getEmail(email);
        if (!userWithSameEmail) {
            return { message: 'No user has registered with that email' };
        }

        try {
            const match = await bcrypt.compare(password, userWithSameEmail.password);
            if (!match) {
                return { message: 'Wrong username and password combination' };
            } else {
                const accessToken = this.createAccessToken(userWithSameEmail._id, userWithSameEmail.username);
                const days: DayNames[] = [];

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
            console.error(error);
        }
    }
}
