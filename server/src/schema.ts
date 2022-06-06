import { gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        accessToken: String!
        day1: [Meal!]!
        day2: [Meal!]!
        day3: [Meal!]!
        day4: [Meal!]!
        day5: [Meal!]!
        day6: [Meal!]!
        day7: [Meal!]!
        foodList: [Food!]!
    }

    type Meal {
        name: String!
        index: Int!
        id: ID
        foods: [Food!]!
    }

    type Food {
        name: String!
        calories: Float!
        proteins: Float!
        carbs: Float!
        fats: Float!
        ingredients: [Food!]!
        givenAmount: Float!
        actualAmount: Float
    }

    type GetFoodListResponse {
        ok: Boolean!
        result: [Food!]
        message: String
    }

    type Query {
        # health check
        boop: String!
        clearDb: String
        getFoodList: GetFoodListResponse
        getMeals(id: ID!, day1: Boolean!, day2: Boolean!, day3: Boolean!, day4: Boolean!, day5: Boolean!, day6: Boolean!, day7: Boolean!): User!
        getMealListMeal(dayIndex: Float!): GetMealListMealResponse
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
    }

    type RegisterSuccess {
        user: User!
    }

    type RegisterError {
        message: String!
    }

    type CreateFoodListResponse {
        ok: Boolean!
        result: Food
        message: String
    }

    type EditFoodListResponse {
        ok: Boolean!
        result: Food
        message: String
    }

    type DeleteFoodListResponse {
        ok: Boolean!
        result: String
        message: String
    }

    type CreateMealListFoodResponse {
        ok: Boolean!
        result: Food
        message: String
    }

    type GetMealListMealResponse {
        ok: Boolean!
        result: [Meal!]
        message: String
    }

    union RegisterResult = RegisterSuccess | RegisterError

    type LoginSuccess {
        user: User!
    }

    type LoginError {
        message: String!
    }

    union LoginResult = LoginSuccess | LoginError
    input CreateFoodInput {
        acessToken: String!
        dayIndex: Int
        mealId: ID
        foodName: String!
        calories: Float!
        proteins: Float!
        carbs: Float!
        fats: Float!
        ingredientNames: [String!]!
        givenAmount: Float!
        actualAmount: Float!
    }

    input CreateFoodListInput {
        name: String!
        calories: Float
        proteins: Float
        carbs: Float
        fats: Float

        ingredientNames: [String!]!
        ingredientActualAmounts: [Float!]!
        givenAmount: Float!
    }

    input EditFoodListInput {
        oldFoodName: String!
        newFoodName: String!
        newCalories: Float
        newProteins: Float
        newCarbs: Float
        newFats: Float
        newIngNames: [String!]!
        newIngActualAmounts: [Float!]!
        newGivenAmount: Float!
    }

    input CreateMealListFoodInput {
        existingFoodName: String

        name: String
        calories: Float
        proteins: Float
        carbs: Float
        fats: Float
        ingredientNames: [String!]!
        ingredientActualAmounts: [Float!]!
        givenAmount: Float

        actualAmount: Float!
        dayIndex: Float!
        mealId: String!
    }

    input CreateMealInput {
        accessToken: String!
        dayIndex: Int!
    }

    input DeleteMealInput {
        accessToken: String!
        dayIndex: Int!
        mealId: ID!
    }

    input DeleteFoodInput {
        accessToken: String!
        dayIndex: Int
        mealId: ID
        foodName: String
        foodIndex: Int
    }
    input EditFoodFromMealListInput {
        accessToken: ID!
        dayIndex: Int!
        mealId: ID!
        foodIndex: Int!
        newActualAmount: Int!
    }

    input EditFoodInput {
        accessToken: String!
        dayIndex: Int
        mealId: ID
        foodIndex: Int
        foodName: String

        newFoodName: String
        newCalories: Float
        newProteins: Float
        newCarbs: Float
        newFats: Float
        newIngredientNames: [String!]
        newGivenAmount: Float
        newActualAmount: Float
    }

    type Mutation {
        register(input: RegisterInput!): RegisterResult!
        login(email: String!, password: String!): LoginResult!

        createFoodList(input: CreateFoodListInput!): CreateFoodListResponse!
        editFoodList(input: EditFoodListInput!): EditFoodListResponse
        deleteFoodList(oldFoodNameToDelete: String!): DeleteFoodListResponse

        createMealListFood(input: CreateMealListFoodInput!): CreateMealListFoodResponse

        createFood(input: CreateFoodInput!): Food!
        createMeal(input: CreateMealInput!): ID!
        deleteMeal(input: DeleteMealInput!): ID!
        deleteFood(input: DeleteFoodInput!): String!
        editFood(input: EditFoodInput!): String!
    }
`;

export default typeDefs;
