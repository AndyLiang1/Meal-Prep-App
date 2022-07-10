import { Food, Meal } from '../generated/graphql-server';
import { IUser, IUserDocument } from '../models/User';
import { createUID } from '../resolvers/Mutations/Auth';

export class MealListMealDao {
    constructor() {}
    
    private async createHelper(day: Meal[]) {
        let newMeal: any = {
            name: 'Meal ' + `${day.length + 1}`,
            index: day.length + 1,
            foods: []
        };
        day.push(newMeal)
    }

    public async create(user: IUserDocument, dayIndex: number) {
        switch (dayIndex) {
            case 0:
                this.createHelper(user.day1)
                break;
            case 1:
                this.createHelper(user.day2);
                break;
            case 2:
                this.createHelper(user.day3);
                break;
            case 3:
                this.createHelper(user.day4);
                break;
            case 4:
                this.createHelper(user.day5);
                break;
            case 5:
                this.createHelper(user.day6);
                break;
            case 6:
                this.createHelper(user.day7);
                break;
            default:
                break;
        }
        await user.save();
        return 'Successful';
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

    // have to make day of type any[] due to meal not have id
    private async deleteMealHelper(day: any[], mealId: string) {
        for (let [i, meal] of day.entries()) {
            if (mealId === meal.id) {
                day.splice(i, 1);
                break;
            }
        }
    }

    public async delete(user: IUserDocument, dayIndex: number, mealId: string) {
        switch (dayIndex) {
            case 0:
                this.deleteMealHelper(user.day1, mealId);
                break;
            case 1:
                this.deleteMealHelper(user.day2, mealId);
                break;
            case 2:
                this.deleteMealHelper(user.day3, mealId);
                break;
            case 3:
                this.deleteMealHelper(user.day4, mealId);
                break;
            case 4:
                this.deleteMealHelper(user.day5, mealId);
                break;
            case 5:
                this.deleteMealHelper(user.day6, mealId);
                break;
            case 6:
                this.deleteMealHelper(user.day7, mealId);
                break;
            default:
                break;
        }
        await user.save();
        return mealId;
    }
}
