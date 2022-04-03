import { gql } from "@apollo/client";

export const CREATE_MEAL = gql`
    mutation CREATE_MEAL($userId: ID!, $dayIndex: Int!, $day1: Boolean!, $day2: Boolean!, $day3: Boolean!, $day4: Boolean!, $day5: Boolean!, $day6: Boolean!, $day7: Boolean!) {
        createMeal(userId: $userId, dayIndex: $dayIndex, day1: $day1, day2: $day2, day3: $day3, day4: $day4, day5: $day5, day6: $day6, day7: $day7) {
            username
            id
            day1 @include(if: $day1) {
                foods {
                    name
                }
            }
            day2 @include(if: $day2) {
                foods {
                    name
                }
            }
            day3 @include(if: $day3) {
                foods {
                    name
                }
            }
            day4 @include(if: $day4) {
                foods {
                    name
                }
            }
            day5 @include(if: $day5) {
                foods {
                    name
                }
            }
            day6 @include(if: $day6) {
                foods {
                    name
                }
            }
            day7 @include(if: $day7) {
                foods {
                    name
                }
            }
        }
    }
`;