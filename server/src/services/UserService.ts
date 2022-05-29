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
    constructor(private UserDao: UserDao) {
        
    }

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
        const valErr = validate.register(email)
        if(valErr) {
            return { message: 'Invalid email'}
        }

        const userWithSameEmail = await this.UserDao.getEmail(email);
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
            ingredients: Array(1).fill(ing1),
            givenAmount: 300,
            actualAmount: 100
        };
        const food2: Food = {
            name: 'food2',
            calories: 400,
            proteins: 10,
            fats: 2,
            carbs: 10,
            ingredients: Array(1).fill(ing2),
            givenAmount: 500,
            actualAmount: 100
        };

        // const meal: Meal = {
        //     name: 'Meal',
        //     id: createUID(),
        //     index: 0,
        //     foods: [food, food2, food, food2]
        // };
        const meal: Meal = {
            name: 'Meal',
            id: createUID(),
            index: 0,
            foods: []
        };

        const day1 = [meal, meal, meal, meal, meal];
        const day2 = [meal, meal, meal, meal, meal];
        const day3 = [meal, meal, meal, meal, meal];
        const day4 = [meal, meal, meal, meal, meal];
        const day5 = [meal, meal, meal, meal, meal];
        const day6 = [meal, meal, meal, meal, meal];
        const day7 = [meal, meal, meal, meal, meal];
        // const foodList: Food[] = Array(1).fill(food2);
        const foodList: Food[] = [];
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
                ...user
            }
        };
        return ret;
    }

    public async login(email: string, password: string) {
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
            console.log(error);
        }
    }
}
