import { MealListFoodDao } from '../daos/MealListFoodDao';
import { Food, Meal } from '../generated/graphql-server';
import { IUserDocument } from '../models/User';
import { createFoodWithIng } from './helpers';
import services from './services';
import validator from './validate';

export class MealListFoodService {
    // private MealListFoodDao;
    constructor(private MealListFoodDao: MealListFoodDao) {}

    public async create(
        user: IUserDocument,
        existingFoodName: string | null | undefined,

        name: string | null | undefined,
        calories: number | null | undefined,
        proteins: number | null | undefined,
        carbs: number | null | undefined,
        fats: number | null | undefined,
        newIngNames: string[],
        newIngActualAmounts: number[],

        givenAmount: number | null | undefined,
        actualAmount: number,
        dayIndex: number,
        mealId: string
    ) {
        const inputIsValid = validator.createMealListFood(user, existingFoodName, name, calories, proteins, carbs, fats, newIngNames, newIngActualAmounts, givenAmount, actualAmount, dayIndex, mealId);
        if (!inputIsValid.ok && inputIsValid.message) {
            return {
                ok: false,
                message: inputIsValid.message
            };
        }

        let newFoodForMeal: Food | null | undefined = null;

        if (existingFoodName && actualAmount) {
            const getByNameResponse = await services.foodListService.getByName(user, existingFoodName);
            if (getByNameResponse.ok && getByNameResponse.result) {
                newFoodForMeal = {
                    ...getByNameResponse.result,
                    actualAmount
                };
            } else {
                return {
                    ok: false,
                    message: 'No food found with this name'
                };
            }
        } else if (
            name &&
            typeof calories === 'number' &&
            typeof proteins === 'number' &&
            typeof carbs === 'number' &&
            typeof fats === 'number' &&
            newIngNames.length === 0 &&
            typeof givenAmount === 'number'
        ) {
            newFoodForMeal = {
                name,
                calories,
                proteins,
                carbs,
                fats,
                ingredients: [],
                givenAmount,
                actualAmount
            };
            await services.foodListService.create(user, name, calories, proteins, carbs, fats, [], [], givenAmount);
        } else {
            if (name && typeof givenAmount === 'number') {
                const createdFoodWithIng = createFoodWithIng(user, name, newIngNames, newIngActualAmounts, givenAmount);
                newFoodForMeal = {
                    ...createdFoodWithIng,
                    actualAmount
                };
                await services.foodListService.create(user, name, calories, proteins, carbs, fats, newIngNames, newIngActualAmounts, givenAmount);
            }
        }
        const newlyCreatedFood = this.MealListFoodDao.create(user, newFoodForMeal!, dayIndex, mealId);
        return {
            ok: true,
            result: newlyCreatedFood
        };
    }

    public async edit(user: IUserDocument, dayIndex: number, mealId: string, foodIndex: number, newActualAmount: number) {
        return this.MealListFoodDao.edit(user, dayIndex, mealId, foodIndex, newActualAmount);
    }

    public async delete(user: IUserDocument, dayIndex: number, mealId: string, foodIndex: number) {
        return this.MealListFoodDao.delete(user, dayIndex, mealId, foodIndex);
    }
}
