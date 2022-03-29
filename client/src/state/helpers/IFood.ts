export default interface FoodInterface {
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    ingredients: FoodInterface[];
}   