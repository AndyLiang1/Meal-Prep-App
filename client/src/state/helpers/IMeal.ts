import FoodInterface from './IFood'

export default interface MealInterface {
    id: string;
    foods: FoodInterface[];
}