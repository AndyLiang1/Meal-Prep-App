import { MealListFoodDao } from '../daos/MealListFoodDao';
import { FoodListDao } from '../daos/FoodListDao';
import {
    CreateFoodListInputReal,
    CreateFoodListInput_NewNoIng,
    CreateFoodListInput_NewYesIng,
    CreateFoodListResponse,
    EditFoodListInput_NewNoIng,
    EditFoodListInput_NewYesIng,
    Food,
    Meal
} from '../generated/graphql-server';
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

    public async edit(user: IUserDocument, input: any) {
        const { editType } = input;
        let inputIsValid: any;
        let editedFood: Food | null = null
        let oldFoodName = '';
        switch (editType) {
            case 'NEW_NO_ING':
                const { inputNewNoIng }: { inputNewNoIng: EditFoodListInput_NewNoIng } = input;
                inputIsValid = validator.editFoodList_NewNoIng(user, inputNewNoIng);
                if (!inputIsValid.ok && inputIsValid.message) {
                    return {
                        ok: false,
                        message: inputIsValid.message
                    };
                }
                editedFood = {
                    name: inputNewNoIng.name,
                    calories: inputNewNoIng.calories,
                    proteins: inputNewNoIng.proteins,
                    carbs: inputNewNoIng.carbs,
                    fats: inputNewNoIng.fats,
                    ingredients: [],
                    givenAmount: inputNewNoIng.givenAmount
                };
                oldFoodName = inputNewNoIng.oldFoodName
                break;
            case 'NEW_YES_ING':
                const { inputNewYesIng }: { inputNewYesIng: EditFoodListInput_NewYesIng } = input;
                inputIsValid = validator.editFoodList_NewYesIng(user, inputNewYesIng);
                if (!inputIsValid.ok && inputIsValid.message) {
                    return {
                        ok: false,
                        message: inputIsValid.message
                    };
                }
                editedFood = createFoodWithIng(user, inputNewYesIng.name, inputNewYesIng.ingredientNames, inputNewYesIng.ingredientActualAmounts, inputNewYesIng.givenAmount);
                oldFoodName = inputNewYesIng.oldFoodName
                break;
            default:
                break;
        }
        const newlyEditedFood = await this.FoodListDao.edit(user, oldFoodName, editedFood!);

        await services.mealListFoodService.editMoreFood(user, oldFoodName, editedFood!);
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
