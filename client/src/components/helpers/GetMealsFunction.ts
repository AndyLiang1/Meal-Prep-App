import { useLazyQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { GetMealsDocument, GetMealsQuery, User } from "../../generated/graphql-client";
import { addUserToStore } from "../../state/action-creators";
import { IRootState } from "../../state/reducers";

export const getUserMeals = async (dayIndex: number, user: any, getMeals: any) => {

    try {
        const input = {
            userId: user.id,
            getUserId: user.id,
            dayIndex,
            day1: dayIndex === 0,
            day2: dayIndex === 1,
            day3: dayIndex === 2,
            day4: dayIndex === 3,
            day5: dayIndex === 4,
            day6: dayIndex === 5,
            day7: dayIndex === 6
        };

        const {data} = await getMeals({
            variables: input
        });

        const userFromDb = data!.getMeals;
        // const user = data!.getMeals;

        if (userFromDb) {
            const { username, id } = userFromDb!;

            let day: any = [];
            switch (dayIndex) {
                case 0:
                    day = userFromDb.day1;
                    break;
                case 1:
                    day = userFromDb.day2;
                    break;
                case 2:
                    day = userFromDb.day3;
                    break;
                case 3:
                    day = userFromDb.day4;
                    break;
                case 4:
                    day = userFromDb.day5;
                    break;
                case 5:
                    day = userFromDb.day6;
                    break;
                case 6:
                    day = userFromDb.day7;
                    break;
                default:
                    day = userFromDb.day1;
                    break;
            }

            return day
        }
    } catch (error) {
        console.log(error);
    }
};
