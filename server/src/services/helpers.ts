import { Food } from '../generated/graphql-server';
import { IUserDocument } from '../models/User';

export const createFoodWithIng = (user: IUserDocument, newFoodName: string, newIngNames: string[], newIngActualAmounts: number[], newGivenAmount: number): Food => {
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
        for (let food of user.foodList) {
            if (ingName === food.name) {
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
                break;
            }
        }
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
};

export const foodStatsWillBeBasedOnIngredients = (calories: any, proteins: any, carbs: any, fats: any, newIngNames: any[]) => {
    return typeof calories === 'number' && typeof proteins === 'number' && typeof carbs === 'number' && typeof fats === 'number' && newIngNames.length === 0;
};

export function roundToZero(num: number) {
    return Math.round(num);
}

export function roundToTwo(num: any) {
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formatter.format(num);
}

export function checkIfSuperSmallNeg(num: number) {
    if(num < 0 && num > -0.05) {
        return 0
    } else {
        return num
    }
}
