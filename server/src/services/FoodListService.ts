import { MealListFoodDao } from '../daos/MealListFoodDao';
import { FoodListDao } from '../daos/FoodListDao';
import { CreateFoodListInputReal, CreateFoodListInput_NewNoIng, CreateFoodListInput_NewYesIng, CreateFoodListResponse, Food, Meal } from '../generated/graphql-server';
import { IUserDocument } from '../models/User';
import { MealListFoodService } from './MealListFoodService';
import validator from './validate';
import { createFoodWithIng } from './helpers';
import services from './services';

export class FoodListService {
    constructor(private FoodListDao: FoodListDao) {}

    public async create(user: IUserDocument, input: any) {
        try {
            let inputIsValid;
            const { createType } = input;
            let newFood: Food | null = null;

            switch (createType) {
                case 'NEW_NO_ING':
                    const { inputNewNoIng }: { inputNewNoIng: CreateFoodListInput_NewNoIng } = input;
                    inputIsValid = validator.createFoodList_NewNoIng(user, inputNewNoIng);
                    if (!inputIsValid.ok && inputIsValid.message) {
                        return {
                            ok: false,
                            message: inputIsValid.message
                        };
                    }
                    newFood = {
                        name: inputNewNoIng.name,
                        calories: inputNewNoIng.calories,
                        proteins: inputNewNoIng.proteins,
                        carbs: inputNewNoIng.carbs,
                        fats: inputNewNoIng.fats,
                        ingredients: [],
                        givenAmount: inputNewNoIng.givenAmount
                    };
                    break;
                case 'NEW_YES_ING':
                    const { inputNewYesIng }: { inputNewYesIng: CreateFoodListInput_NewYesIng } = input;
                    inputIsValid = validator.createFoodList_NewYesIng(user, inputNewYesIng);
                    if (!inputIsValid.ok && inputIsValid.message) {
                        return {
                            ok: false,
                            message: inputIsValid.message
                        };
                    }
                    newFood = createFoodWithIng(user, inputNewYesIng.name, inputNewYesIng.ingredientNames, inputNewYesIng.ingredientActualAmounts, inputNewYesIng.givenAmount);
                    break;
                default:
                    break;
            }

            const newlyCreatedFood = await this.FoodListDao.create(user, newFood!);
            return {
                ok: true,
                result: newlyCreatedFood
            };
        } catch (err) {
            console.error(err);
            return {
                ok: false,
                message: err
            };
        }
    }

    public async get(user: IUserDocument) {
        try {
            const foodList = await this.FoodListDao.get(user);
            const sortedFoodList = foodList.sort((food1, food2) => (food1.name > food2.name ? 1 : -1));
            return {
                ok: true,
                result: sortedFoodList
            };
        } catch (err) {
            return {
                ok: false,
                message: err
            };
        }
    }

    public async getByName(user: IUserDocument, name: string) {
        const retFood = await this.FoodListDao.getByName(user, name);
        return {
            ok: true,
            result: retFood
        };
    }

    public async edit(
        user: IUserDocument,
        oldFoodName: string,
        newFoodName: string,
        newCalories: number | null | undefined,
        newProteins: number | null | undefined,
        newCarbs: number | null | undefined,
        newFats: number | null | undefined,
        newIngNames: string[],
        newIngActualAmounts: number[],
        newGivenAmount: number
    ) {
        if (newIngNames.length !== newIngActualAmounts.length) {
            return {
                ok: false,
                message: "There is a mismatch between the new ingredient names array's length and the new ingredient actual amounts' array's length"
            };
        }
        // if we have ingredients, then our stats are based off of the
        // ingredients
        let editedFood: Food | null = null;

        if (typeof newCalories === 'number' && typeof newProteins === 'number' && typeof newCarbs === 'number' && typeof newFats === 'number' && newIngNames.length === 0) {
            editedFood = {
                name: newFoodName,
                calories: newCalories,
                proteins: newProteins,
                carbs: newCarbs,
                fats: newFats,
                ingredients: [],
                givenAmount: newGivenAmount
            };
        } else {
            editedFood = createFoodWithIng(user, newFoodName, newIngNames, newIngActualAmounts, newGivenAmount);
        }

        const newlyEditedFood = await this.FoodListDao.edit(user, oldFoodName, editedFood);

        await services.mealListFoodService.editMoreFood(user, oldFoodName, editedFood);
        return {
            ok: true,
            result: newlyEditedFood
        };
    }

    public async delete(user: IUserDocument, foodNameToDelete: string) {
        const deletedFoodName = await this.FoodListDao.delete(user, foodNameToDelete);
        return {
            ok: true,
            result: deletedFoodName
        };
    }
}
