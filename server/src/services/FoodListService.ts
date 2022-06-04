import { MealListFoodDao } from '../daos/MealListFoodDao';
import { FoodListDao } from '../daos/FoodListDao';
import { CreateFoodListResponse, Food } from '../generated/graphql-server';
import { IUserDocument } from '../models/User';
import { MealListFoodService } from './MealListFoodService';
import validator from './validate';

export class FoodListService {
    constructor(private FoodListDao: FoodListDao, private MealListFoodService: MealListFoodService) {}

    private createFoodWithIng(user: IUserDocument, newFoodName: string, newIngNames: string[], newIngActualAmounts: number[], newGivenAmount: number): Food {
        let cals = 0,
            p = 0,
            c = 0,
            f = 0,
            newIngCals = 0,
            newIngP = 0,
            newIngC = 0,
            newIngF = 0;
        let ingredientsArr: Food[] = [];
        console.log(newIngNames);
        newIngNames.forEach((ingName, i) => {
            console.log('dealin with ', ingName);
            user.foodList.forEach((food) => {
                console.log(ingName + ' vs ', food.name);
                if (ingName === food.name) {
                    console.log(newIngActualAmounts[i] / food.givenAmount);
                    newIngCals = food.calories * (newIngActualAmounts[i] / food.givenAmount);
                    newIngP = food.proteins * (newIngActualAmounts[i] / food.givenAmount);
                    newIngC = food.carbs * (newIngActualAmounts[i] / food.givenAmount);
                    newIngF = food.fats * (newIngActualAmounts[i] / food.givenAmount);
                    ingredientsArr.push({
                        name: food.name,
                        calories: food.calories,
                        proteins: food.proteins,
                        carbs: food.carbs,
                        fats: food.fats,
                        ingredients: [],
                        givenAmount: food.givenAmount,
                        actualAmount: newIngActualAmounts[i]
                    });
                    cals += newIngCals;
                    p += newIngP;
                    c += newIngC;
                    f += newIngF;
                }
            });
        });
        return {
            name: newFoodName,
            calories: cals,
            proteins: p,
            carbs: c,
            fats: f,
            ingredients: ingredientsArr,
            givenAmount: newGivenAmount
        };
    }

    public async create(
        user: IUserDocument,
        name: string,
        calories: number | null | undefined,
        proteins: number | null | undefined,
        carbs: number | null | undefined,
        fats: number | null | undefined,
        newIngNames: string[],
        newIngActualAmounts: number[],
        givenAmount: number
    ) {
        try {
            if (!validator.createFoodList)
                return {
                    ok: false
                };
            if (newIngNames.length !== newIngActualAmounts.length) {
                return {
                    ok: false,
                    message: "There is a mismatch between the new ingredient names array's length and the new ingredient actual amounts' array's length"
                };
            }
            let newFood: Food | null = null;

            if (typeof calories === 'number' && typeof proteins === 'number' && typeof carbs === 'number' && typeof fats === 'number' && newIngNames.length === 0) {
                newFood = {
                    name,
                    calories,
                    proteins,
                    carbs,
                    fats,
                    ingredients: [],
                    givenAmount
                };
            } else {
                newFood = this.createFoodWithIng(user, name, newIngNames, newIngActualAmounts, givenAmount);
            }

            const newlyCreatedFood = await this.FoodListDao.create(user, newFood);
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
            return {
                ok: true,
                result: foodList
            };
        } catch (err) {
            return {
                ok: false,
                message: err
            };
        }
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
            editedFood = this.createFoodWithIng(user, newFoodName, newIngNames, newIngActualAmounts, newGivenAmount);
        }

        editedFood = await this.FoodListDao.edit(user, oldFoodName, editedFood);
        return {
            ok: true,
            result: editedFood
        };
    }

    public async delete(user: IUserDocument, foodNameToDelete: string) {
        const deletedFoodName = await this.FoodListDao.delete(user, foodNameToDelete);
        console.log(deletedFoodName);
        return {
            ok: true,
            result: deletedFoodName
        };
    }
}
