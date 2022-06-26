import { MealListFoodDao } from '../daos/MealListFoodDao';
import {
    CreateMealListFoodInput_Existing,
    CreateMealListFoodInput_NewYesIng,
    CreateMealListFoodInput_NewNoIng,
    Food,
    Meal,
    EditMealListFoodInput_NewYesIng,
    EditMealListFoodInput_ActualAmount,
    EditMealListFoodInput_NewNoIng,
    DeleteMealListFoodInputReal,
    CreateFoodListInput_NewYesIng,
    CreateFoodListInput_NewNoIng,
    CreateFoodListInputReal
} from '../generated/graphql-server';
import { IUserDocument } from '../models/User';
import { createFoodWithIng } from './helpers';
import services from './services';
import validator from './validate';

export class MealListFoodService {
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
                        name: getByNameResponse.result.name,
                        calories: getByNameResponse.result.calories,
                        proteins: getByNameResponse.result.proteins,
                        carbs: getByNameResponse.result.carbs,
                        fats: getByNameResponse.result.fats,
                        ingredients: getByNameResponse.result.ingredients,
                        givenAmount: getByNameResponse.result.givenAmount,
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
                inputIsValid = validator.createOrEditMealListFood_NewNoIng(user, inputNewNoIng);

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

                const inputNewNoIngForFoodList = {
                    createType: 'NEW_NO_ING',
                    inputNewNoIng: {
                        name: inputNewNoIng.name,
                        calories: inputNewNoIng.calories,
                        proteins: inputNewNoIng.proteins,
                        carbs: inputNewNoIng.carbs,
                        fats: inputNewNoIng.fats,
                        givenAmount: inputNewNoIng.givenAmount
                    }
                };

                await services.foodListService.create(user, inputNewNoIngForFoodList);
                dayIndex = inputNewNoIng.dayIndex;
                mealId = inputNewNoIng.mealId;
                break;
            case 'NEW_YES_ING':
                const { inputNewYesIng }: { inputNewYesIng: CreateMealListFoodInput_NewYesIng } = input;
                inputIsValid = validator.createOrEditMealListFood_NewYesIng(user, inputNewYesIng);
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

                const inputNewYesIngForFoodList = {
                    createType: 'NEW_YES_ING',
                    inputNewYesIng: {
                        name: inputNewYesIng.name,
                        ingredientNames: inputNewYesIng.ingredientNames,
                        ingredientActualAmounts: inputNewYesIng.ingredientActualAmounts,
                        givenAmount: inputNewYesIng.givenAmount
                    }
                };

                await services.foodListService.create(user, inputNewYesIngForFoodList);
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
            const newlyCreatedFood = await this.MealListFoodDao.create(user, newFoodForMeal!, dayIndex, mealId);
            return {
                ok: true,
                result: newlyCreatedFood
            };
        }
        return {
            ok: false,
            message: 'Failed in MealListFoodService'
        };
    }

    public async edit(user: IUserDocument, input: any) {
        const { editType } = input;
        let inputIsValid;
        let newFoodForEdit: Food | null = null;
        let dayIndex;
        let mealId;
        let foodIndex;

        switch (editType) {
            case 'ACTUAL_AMOUNT':
                const { inputActualAmount }: { inputActualAmount: EditMealListFoodInput_ActualAmount } = input;
                inputIsValid = validator.editMealListFood_ActualAmount(inputActualAmount);
                if (!inputIsValid.ok && inputIsValid.message) {
                    return {
                        ok: false,
                        message: inputIsValid.message
                    };
                }
                dayIndex = inputActualAmount.dayIndex;
                mealId = inputActualAmount.mealId;
                foodIndex = inputActualAmount.foodIndex;
                const currentFood = await this.MealListFoodDao.get(user, dayIndex, mealId, foodIndex);
                newFoodForEdit = {
                    name: currentFood.name,
                    calories: currentFood.calories,
                    proteins: currentFood.proteins,
                    carbs: currentFood.carbs,
                    fats: currentFood.fats,
                    ingredients: currentFood.ingredients,
                    givenAmount: currentFood.givenAmount,
                    actualAmount: inputActualAmount.newActualAmount
                };
                break;
            case 'NEW_NO_ING':
                const { inputNewNoIng }: { inputNewNoIng: EditMealListFoodInput_NewNoIng } = input;
                inputIsValid = validator.createOrEditMealListFood_NewNoIng(user, inputNewNoIng);
                if (!inputIsValid.ok && inputIsValid.message) {
                    return {
                        ok: false,
                        message: inputIsValid.message
                    };
                }
                dayIndex = inputNewNoIng.dayIndex;
                mealId = inputNewNoIng.mealId;
                foodIndex = inputNewNoIng.foodIndex;
                const inputNewNoIngForFoodList = {
                    createType: 'NEW_NO_ING',
                    inputNewNoIng: {
                        name: inputNewNoIng.name,
                        calories: inputNewNoIng.calories,
                        proteins: inputNewNoIng.proteins,
                        carbs: inputNewNoIng.carbs,
                        fats: inputNewNoIng.fats,
                        givenAmount: inputNewNoIng.givenAmount
                    }
                };
                await services.foodListService.create(user, inputNewNoIngForFoodList);
                newFoodForEdit = {
                    name: inputNewNoIng.name,
                    calories: inputNewNoIng.calories,
                    proteins: inputNewNoIng.proteins,
                    carbs: inputNewNoIng.carbs,
                    fats: inputNewNoIng.fats,
                    ingredients: [],
                    givenAmount: inputNewNoIng.givenAmount,
                    actualAmount: inputNewNoIng.actualAmount
                };
                break;
            case 'NEW_YES_ING':
                const { inputNewYesIng }: { inputNewYesIng: EditMealListFoodInput_NewYesIng } = input;
                inputIsValid = validator.createOrEditMealListFood_NewYesIng(user, inputNewYesIng);
                if (!inputIsValid.ok && inputIsValid.message) {
                    return {
                        ok: false,
                        message: inputIsValid.message
                    };
                }
                dayIndex = inputNewYesIng.dayIndex;
                mealId = inputNewYesIng.mealId;
                foodIndex = inputNewYesIng.foodIndex;
                newFoodForEdit = createFoodWithIng(user, inputNewYesIng.name, inputNewYesIng.ingredientNames, inputNewYesIng.ingredientActualAmounts, inputNewYesIng.givenAmount);
                const inputNewYesIngForFoodList = {
                    createType: 'NEW_YES_ING',
                    inputNewYesIng: {
                        name: inputNewYesIng.name,
                        ingredientNames: inputNewYesIng.ingredientNames,
                        ingredientActualAmounts: inputNewYesIng.ingredientActualAmounts,
                        givenAmount: inputNewYesIng.givenAmount
                    }
                };
                await services.foodListService.create(user, inputNewYesIngForFoodList);
                newFoodForEdit = {
                    ...newFoodForEdit,
                    actualAmount: inputNewYesIng.actualAmount
                };
                break;
            default:
                break;
        }
        if (typeof dayIndex === 'number' && typeof mealId === 'string' && typeof foodIndex === 'number' && newFoodForEdit) {
            const newlyEditedFood = await this.MealListFoodDao.edit(user, dayIndex, mealId, foodIndex, newFoodForEdit);
            return {
                ok: true,
                result: newlyEditedFood
            };
        }
        return {
            ok: false,
            message: 'Failed in MealListFoodService'
        };

        // return this.MealListFoodDao.edit(user, dayIndex, mealId, foodIndex, newActualAmount);
    }

    public async editMoreFood(user: IUserDocument, oldFoodName: string, editedFood: Food) {
        return await this.MealListFoodDao.editMoreFood(user, oldFoodName, editedFood);
    }

    public async delete(user: IUserDocument, input: DeleteMealListFoodInputReal) {
        let inputIsValid = validator.deleteMealListFood(input);

        if (!inputIsValid.ok && inputIsValid.message) {
            return {
                ok: false,
                message: inputIsValid.message
            };
        }

        const { dayIndex, mealId, foodIndex } = input;
        await this.MealListFoodDao.delete(user, dayIndex, mealId, foodIndex);
        return {
            ok: true,
            result: 'Successfully deleted food'
        };
    }
}
