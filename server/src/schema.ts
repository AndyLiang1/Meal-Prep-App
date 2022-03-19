import { gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        token: String!
        days: [Day!]!
    }

    type Day {
        meals: [Meal!]!
    }
    type Meal {
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

    type Mutation {
        register(input: RegisterInput!): User!
    }
`;

export default typeDefs;
