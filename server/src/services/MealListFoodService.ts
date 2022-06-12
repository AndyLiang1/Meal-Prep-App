import { MealListFoodDao } from '../daos/MealListFoodDao';
import { CreateMealListFoodInput_Existing, CreateMealListFoodInput_NewYesIng, CreateMealListFoodInput_NewNoIng, Food, Meal } from '../generated/graphql-server';
import { IUserDocument } from '../models/User';
import { createFoodWithIng } from './helpers';
import services from './services';
import validator from './validate';

export class MealListFoodService {
    // private MealListFoodDao;
    constructor(private MealListFoodDao: MealListFoodDao) {}

    public async create(
        user: IUserDocument,
        // existingFoodName: string | null | undefined,

        // name: string | null | undefined,
        // calories: number | null | undefined,
        // proteins: number | null | undefined,
        // carbs: number | null | undefined,
        // fats: number | null | undefined,
        // newIngNames: string[],
        // newIngActualAmounts: number[],

        // givenAmount: number | null | undefined,
        // actualAmount: number,
        // dayIndex: number,
        // mealId: string
        input: any
    ) {
        const { createType } = input;
        let inputIsValid;
        let newFoodForMeal: Food | null | undefined = null;
        let dayIndex;
        let mealId;

        switch (createType) {
            case 'EXISTING':
                const { inputExisting }: { inputExisting: CreateMealListFoodInput_Existing } = input;
                inputIsValid = validator.createMealListFood_Existing(inputExisting);
                if (!inputIsValid.ok && inputIsValid.message) {
                    return {
                        ok: false,
                        message: inputIsValid.message
                    };
                }
                const getByNameResponse = await services.foodListService.getByName(user, inputExisting.existingFoodName);
                if (getByNameResponse.ok && getByNameResponse.result) {
                    newFoodForMeal = {
                        ...getByNameResponse.result,
                        actualAmount: inputExisting.actualAmount
                    };
                } else {
                    return {
                        ok: false,
                        message: 'No food found with this name'
                    };
                }
                dayIndex = inputExisting.dayIndex;
                mealId = inputExisting.mealId;
                break;

            case 'NEW_NO_ING':
                const { inputNewNoIng }: { inputNewNoIng: CreateMealListFoodInput_NewNoIng } = input;
                inputIsValid = validator.createMealListFood_NewNoIng(user, inputNewNoIng);

                if (!inputIsValid.ok && inputIsValid.message) {
                    return {
                        ok: false,
                        message: inputIsValid.message
                    };
                }
                newFoodForMeal = {
                    name: inputNewNoIng.name,
                    calories: inputNewNoIng.calories,
                    proteins: inputNewNoIng.proteins,
                    carbs: inputNewNoIng.carbs,
                    fats: inputNewNoIng.fats,
                    ingredients: [],
                    givenAmount: inputNewNoIng.givenAmount,
                    actualAmount: inputNewNoIng.actualAmount
                };
                await services.foodListService.create(
                    user,
                    inputNewNoIng.name,
                    inputNewNoIng.calories,
                    inputNewNoIng.proteins,
                    inputNewNoIng.carbs,
                    inputNewNoIng.fats,
                    [],
                    [],
                    inputNewNoIng.givenAmount
                );
                dayIndex = inputNewNoIng.dayIndex;
                mealId = inputNewNoIng.mealId;
                break;
            case 'NEW_YES_ING':
                const { inputNewYesIng }: { inputNewYesIng: CreateMealListFoodInput_NewYesIng } = input;
                inputIsValid = validator.createMealListFood_NewYesIng(user, inputNewYesIng);
                if (!inputIsValid.ok && inputIsValid.message) {
                    return {
                        ok: false,
                        message: inputIsValid.message
                    };
                }
                const createdFoodWithIng = createFoodWithIng(user, inputNewYesIng.name, inputNewYesIng.ingredientNames, inputNewYesIng.ingredientActualAmounts, inputNewYesIng.givenAmount);
                newFoodForMeal = {
                    ...createdFoodWithIng,
                    actualAmount: inputNewYesIng.actualAmount
                };
                await services.foodListService.create(
                    user,
                    inputNewYesIng.name,
                    null,
                    null,
                    null,
                    null,
                    inputNewYesIng.ingredientNames,
                    inputNewYesIng.ingredientActualAmounts,
                    inputNewYesIng.givenAmount
                );
                dayIndex = inputNewYesIng.dayIndex;
                mealId = inputNewYesIng.mealId;
                break;
            default:
                break;
        }
        // const inputIsValid = validator.createMealListFood(user, existingFoodName, name, calories, proteins, carbs, fats, newIngNames, newIngActualAmounts, givenAmount, actualAmount, dayIndex, mealId);
        // if (!inputIsValid.ok && inputIsValid.message) {
        //     return {
        //         ok: false,
        //         message: inputIsValid.message
        //     };
        // }

        // let newFoodForMeal: Food | null | undefined = null;

        // if (existingFoodName && actualAmount) {
        //     const getByNameResponse = await services.foodListService.getByName(user, existingFoodName);
        //     if (getByNameResponse.ok && getByNameResponse.result) {
        //         newFoodForMeal = {
        //             ...getByNameResponse.result,
        //             actualAmount
        //         };
        //     } else {
        //         return {
        //             ok: false,
        //             message: 'No food found with this name'
        //         };
        //     }
        // } else if (
        //     name &&
        //     typeof calories === 'number' &&
        //     typeof proteins === 'number' &&
        //     typeof carbs === 'number' &&
        //     typeof fats === 'number' &&
        //     newIngNames.length === 0 &&
        //     typeof givenAmount === 'number'
        // ) {
        //     newFoodForMeal = {
        //         name,
        //         calories,
        //         proteins,
        //         carbs,
        //         fats,
        //         ingredients: [],
        //         givenAmount,
        //         actualAmount
        //     };
        //     await services.foodListService.create(user, name, calories, proteins, carbs, fats, [], [], givenAmount);
        // } else {
        //     if (name && typeof givenAmount === 'number') {
        //         const createdFoodWithIng = createFoodWithIng(user, name, newIngNames, newIngActualAmounts, givenAmount);
        //         newFoodForMeal = {
        //             ...createdFoodWithIng,
        //             actualAmount
        //         };
        //         await services.foodListService.create(user, name, calories, proteins, carbs, fats, newIngNames, newIngActualAmounts, givenAmount);
        //     }
        // }
        if (typeof dayIndex === 'number' && typeof mealId === 'string') {
            const newlyCreatedFood = this.MealListFoodDao.create(user, newFoodForMeal!, dayIndex, mealId);
            return {
                ok: true,
                result: newlyCreatedFood
            };
        } 
        return {
             ok: false,
             message: 'Failed in MealListFoodService'
        }
    }

    public async edit(user: IUserDocument, dayIndex: number, mealId: string, foodIndex: number, newActualAmount: number) {
        return this.MealListFoodDao.edit(user, dayIndex, mealId, foodIndex, newActualAmount);
    }

    public async delete(user: IUserDocument, dayIndex: number, mealId: string, foodIndex: number) {
        return this.MealListFoodDao.delete(user, dayIndex, mealId, foodIndex);
    }
}
