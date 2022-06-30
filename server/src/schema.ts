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
        id: ID!
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

    input RegisterInput {
        username: String!
        email: String!
        password: String!
    }

    enum CreateFoodListType {
        NEW_NO_ING
        NEW_YES_ING
    }

    input CreateFoodListInputReal {
        createType: CreateFoodListType!
        inputNewNoIng: CreateFoodListInput_NewNoIng
        inputNewYesIng: CreateFoodListInput_NewYesIng
    }

    input CreateFoodListInput_NewNoIng {
        name: String!
        calories: Float!
        proteins: Float!
        carbs: Float!
        fats: Float!
        givenAmount: Float!
    }

    input CreateFoodListInput_NewYesIng {
        name: String!
        ingredientNames: [String!]!
        ingredientActualAmounts: [Float!]!
        givenAmount: Float!
    }

    enum EditFoodListType {
        NEW_NO_ING
        NEW_YES_ING
    }

    input EditFoodListInputReal {
        editType: EditFoodListType!
        inputNewNoIng: EditFoodListInput_NewNoIng
        inputNewYesIng: EditFoodListInput_NewYesIng
    }

    input EditFoodListInput_NewNoIng {
        oldFoodName: String!
        name: String!
        calories: Float!
        proteins: Float!
        carbs: Float!
        fats: Float!
        givenAmount: Float!
    }

    input EditFoodListInput_NewYesIng {
        oldFoodName: String!
        name: String!
        ingredientNames: [String!]!
        ingredientActualAmounts: [Float!]!
        givenAmount: Float!
    }

    enum CreateMealListFoodType {
        EXISTING
        NEW_NO_ING
        NEW_YES_ING
    }

    input CreateMealListFoodInputReal {
        createType: CreateMealListFoodType!
        inputExisting: CreateMealListFoodInput_Existing
        inputNewNoIng: CreateMealListFoodInput_NewNoIng
        inputNewYesIng: CreateMealListFoodInput_NewYesIng
    }

    input CreateMealListFoodInput_Existing {
        existingFoodName: String!
        actualAmount: Float!

        dayIndex: Float!
        mealId: String!
    }

    input CreateMealListFoodInput_NewNoIng {
        name: String!
        calories: Float!
        proteins: Float!
        carbs: Float!
        fats: Float!
        givenAmount: Float!
        actualAmount: Float!
        dayIndex: Float!

        mealId: String!
    }

    input CreateMealListFoodInput_NewYesIng {
        name: String!
        ingredientNames: [String!]!
        ingredientActualAmounts: [Float!]!
        givenAmount: Float!
        actualAmount: Float!

        dayIndex: Float!
        mealId: String!
    }

    enum EditMealListFoodType {
        ACTUAL_AMOUNT
        NEW_NO_ING
        NEW_YES_ING
    }

    input EditMealListFoodInputReal {
        editType: EditMealListFoodType!
        inputActualAmount: EditMealListFoodInput_ActualAmount
        inputNewNoIng: EditMealListFoodInput_NewNoIng
        inputNewYesIng: EditMealListFoodInput_NewYesIng
    }

    input EditMealListFoodInput_ActualAmount {
        newActualAmount: Float!

        dayIndex: Float!
        mealId: String!
        foodIndex: Float!
    }

    input EditMealListFoodInput_NewNoIng {
        name: String!
        calories: Float!
        proteins: Float!
        carbs: Float!
        fats: Float!
        givenAmount: Float!
        actualAmount: Float!

        dayIndex: Float!
        mealId: String!
        foodIndex: Float!
    }

    input EditMealListFoodInput_NewYesIng {
        name: String!
        ingredientNames: [String!]!
        ingredientActualAmounts: [Float!]!
        givenAmount: Float!
        actualAmount: Float!

        dayIndex: Float!
        mealId: String!
        foodIndex: Float!
    }

    input DeleteMealListFoodInputReal {
        dayIndex: Float!
        mealId: String!
        foodIndex: Float!
    }

    type Query {
        # health check
        boop: String!
        clearDb: String
        getFoodList: GetFoodListResponse!
        getMealListMeal(dayIndex: Float!): GetMealListMealResponse!
    }

    type Mutation {
        register(input: RegisterInput!): RegisterResult!
        login(email: String!, password: String!): LoginResult!

        createFoodList(input: CreateFoodListInputReal!): CreateFoodListResponse!
        editFoodList(input: EditFoodListInputReal!): EditFoodListResponse!
        deleteFoodList(oldFoodNameToDelete: String!): DeleteFoodListResponse!

        createMealListFood(input: CreateMealListFoodInputReal!): CreateMealListFoodResponse!
        editMealListFood(input: EditMealListFoodInputReal!): EditMealListFoodResponse!
        deleteMealListFood(input: DeleteMealListFoodInputReal!): DeleteMealListFoodResponse!

        createMealListMeal(dayIndex: Float!): String!
        deleteMealListMeal(dayIndex: Float!, mealId: String!): ID!
    }

    type RegisterSuccess {
        user: User!
    }

    type RegisterError {
        message: String!
    }

    union RegisterResult = RegisterSuccess | RegisterError

    type LoginSuccess {
        user: User!
    }

    type LoginError {
        message: String!
    }

    union LoginResult = LoginSuccess | LoginError

    type CreateFoodListResponse {
        ok: Boolean!
        result: Food
        message: String
    }

    type GetFoodListResponse {
        ok: Boolean!
        result: [Food!]
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

    type EditMealListFoodResponse {
        ok: Boolean!
        result: Food
        message: String
    }

    type DeleteMealListFoodResponse {
        ok: Boolean!
        result: String
        message: String
    }
`;

export default typeDefs;
