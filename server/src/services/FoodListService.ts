import { MealListFoodDao } from '../daos/MealListFoodDao';
import { FoodListDao } from '../daos/FoodListDao';
import { Food } from '../generated/graphql-server';
import { IUserDocument } from '../models/User';
import MealListFoodService from './MealListFoodService';

export class FoodListService {
    constructor(private FoodListDao: FoodListDao, private MealListFoodDao: MealListFoodDao) {
    }

    public async create(user: IUserDocument, food: Food) {
        return this.FoodListDao.create(user, food);
    }

    public async get(user: IUserDocument) {
        return this.FoodListDao.get(user)
    }

    private editFoodHasIng(user: IUserDocument, newFoodName: string, newIngNames: string[], newIngActualAmounts: number[], newGivenAmount: number): Food {
        let cals = 0,
            p = 0,
            c = 0,
            f = 0,
            newIngCals = 0,
            newIngP = 0,
            newIngC = 0,
            newIngF = 0;
        let ingredientsArr: Food[] = [];
        newIngNames.forEach((ingName, i) => {
            user.foodList.every((food) => {
                if (ingName === food.name) {
                    newIngCals = food.calories * (newIngActualAmounts[i] / food.givenAmount);
                    newIngP = food.proteins * (newIngActualAmounts[i] / food.givenAmount);
                    newIngC += food.carbs * (newIngActualAmounts[i] / food.givenAmount);
                    newIngF += food.fats * (newIngActualAmounts[i] / food.givenAmount);
                    ingredientsArr.push({
                        name: food.name,
                        calories: newIngCals,
                        proteins: newIngP,
                        carbs: newIngC,
                        fats: newIngF,
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
    public async edit(
        user: IUserDocument,
        oldFoodName: string,
        newFoodName: string,
        newCalories: number,
        newProteins: number,
        newCarbs: number,
        newFats: number,
        newGivenAmount: number,
        newIngNames: string[],
        newIngActualAmounts: number[]
    ) {
        if (newIngNames.length !== newIngActualAmounts.length) {
            return "There is a mismatch between the new ingredient names array's length and the new ingredient actual amounts' array's length";
        }
        // if we have ingredients, then our stats are based off of the
        // ingredients
        let editedFood: Food | null = null;
        if (newIngNames.length) {
            editedFood = this.editFoodHasIng(user, newFoodName, newIngNames, newIngActualAmounts, newGivenAmount);
        } else {
            editedFood = {
                name: newFoodName,
                calories: newCalories,
                proteins: newProteins,
                carbs: newCarbs,
                fats: newFats,
                ingredients: [],
                givenAmount: newGivenAmount
            };
        }

        return this.FoodListDao.edit(user, oldFoodName, editedFood);
    }

    public async delete(user: IUserDocument, foodNameToDelete: string) {
        await this.FoodListDao.delete(user, foodNameToDelete);
    }
}
