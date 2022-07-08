import { Food } from "../../generated/graphql-client";

export const calcTotalStats = (ingredients: Food[], setTotalStats: any) => {
    let cals = 0,
        p = 0,
        c = 0,
        f = 0;
    ingredients.forEach((ingredient) => {
        const { calories, proteins, carbs, fats, givenAmount, actualAmount } = ingredient;
        cals += Number(((calories * actualAmount!) / givenAmount).toFixed(0));
        p += Number(((proteins * actualAmount!) / givenAmount).toFixed(2));
        c += Number(((carbs * actualAmount!) / givenAmount).toFixed(2));
        f += Number(((fats * actualAmount!) / givenAmount).toFixed(2));
    });
    setTotalStats({
        calories: cals,
        proteins: p,
        carbs: c,
        fats: f
    });
};
