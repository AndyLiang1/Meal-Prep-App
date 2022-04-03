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
    }

    type Meal {
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
    }

    type Query {
        # health check
        boop: String!
        clearDb: String
        getUser(id: ID!): User
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

    union RegisterResult = RegisterSuccess | RegisterError

    type LoginSuccess {
        user: User!
    }

    type LoginError {
        message: String!
    }

    union LoginResult = LoginSuccess | LoginError
    input CreateFoodInput {
        userId: ID!
        mealIndex: Int!
        name: String!
        calories: Float!
        proteins: Float!
        carbs: Float!
        fats: Float!
        ingredientNames: [String!]!
    }
    type Mutation {
        register(input: RegisterInput!): RegisterResult!
        login(email: String!, password: String!): LoginResult!

        createFood(input: CreateFoodInput!): Food!
        createMeal(userId: ID!, dayIndex: Int!): User!
    }
`;

export default typeDefs;
