import { Food, Meal } from '../generated/graphql-server';
import { IUser, IUserDocument } from '../models/User';
import { createUID } from '../resolvers/Mutations/Auth';

export class MealListMealDao {

    constructor() {
    }

    public async create(user: IUserDocument, dayIndex: number) {
        let newMeal: Meal = {
            name: 'Meal',
            index: 0,
            foods: [],
            id: createUID()
        };
        switch (dayIndex) {
            case 0:
                user.day1.push(newMeal);
                break;
            case 1:
                user.day2.push(newMeal);
                break;
            case 2:
                user.day3.push(newMeal);
                break;
            case 3:
                user.day4.push(newMeal);
                break;
            case 4:
                user.day5.push(newMeal);
                break;
            case 5:
                user.day6.push(newMeal);
                break;
            case 6:
                user.day7.push(newMeal);
                break;
            default:
                break;
        }
        await user.save();
        return newMeal.id;
    }

    public async get(user: IUserDocument, dayIndex: number) {
        switch (dayIndex) {
            case 0:
                return user.day1;
            case 1:
                return user.day2;
            case 2:
                return user.day3;
            case 3:
                return user.day4;
            case 4:
                return user.day5;
            case 5:
                return user.day6;
            case 6:
                return user.day7;
            default:
                return user.day1;
        }
    }

    private async deleteMealHelper(day: Meal[], mealId: string) {
        for (let [i, meal] of day.entries()) {
            if (mealId === meal.id) {
                day.splice(i, 1);
            }
            break
        });
    }
    
    public async delete(user: IUserDocument, dayIndex: number, mealId: string) {
        switch (dayIndex) {
            case 0:
                this.deleteMealHelper(user.day1, mealId);
            case 1:
                this.deleteMealHelper(user.day2, mealId);
            case 2:
                this.deleteMealHelper(user.day3, mealId);
            case 3:
                this.deleteMealHelper(user.day4, mealId);
            case 4:
                this.deleteMealHelper(user.day5, mealId);
            case 5:
                this.deleteMealHelper(user.day6, mealId);
            case 6:
                this.deleteMealHelper(user.day7, mealId);
            default:
                this.deleteMealHelper(user.day1, mealId);
        }
        await user.save()
        return mealId;
    }
}
