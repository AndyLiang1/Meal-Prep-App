import { gql } from '@apollo/client';

export const GET_DAY1 = gql`
    query GET_USER($getUserId: ID!) {
        getUser(id: $getUserId) {
            id
            username
            email
            password

            day1 {
                foods {
                    name
                    calories
                    proteins
                }
            }
        }
    }
`;

export const GET_DAY2 = gql`
    query GET_USER($getUserId: ID!) {
        getUser(id: $getUserId) {
            id
            username
            email
            password

            day2 {
                foods {
                    name
                    calories
                    proteins
                }
            }
        }
    }
`;
export const GET_DAY3 = gql`
    query GET_USER($getUserId: ID!) {
        getUser(id: $getUserId) {
            id
            username
            email
            password

            day3 {
                foods {
                    name
                    calories
                    proteins
                }
            }
        }
    }
`;
export const GET_DAY4 = gql`
    query GET_USER($getUserId: ID!) {
        getUser(id: $getUserId) {
            id
            username
            email
            password

            day4 {
                foods {
                    name
                    calories
                    proteins
                }
            }
        }
    }
`;
export const GET_DAY5 = gql`
    query GET_USER($getUserId: ID!) {
        getUser(id: $getUserId) {
            id
            username
            email
            password

            day5 {
                foods {
                    name
                    calories
                    proteins
                }
            }
        }
    }
`;
export const GET_DAY6 = gql`
    query GET_USER($getUserId: ID!) {
        getUser(id: $getUserId) {
            id
            username
            email
            password

            day6 {
                foods {
                    name
                    calories
                    proteins
                }
            }
        }
    }
`;

export const GET_DAY7 = gql`
    query GET_USER($getUserId: ID!) {
        getUser(id: $getUserId) {
            id
            username
            email
            password

            day7 {
                foods {
                    name
                    calories
                    proteins
                }
            }
        }
    }
`;
