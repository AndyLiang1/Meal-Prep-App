import { Food, Meal } from "../../generated/graphql-client";

export interface UserInfoInterface {
    username: string;
    accessToken: string;
    loggedIn: boolean;
    day?: Meal[]; // this should be the only one used
    day1?: Meal[];
    day2?: Meal[];
    day3?: Meal[];
    day4?: Meal[];
    day5?: Meal[];
    day6?: Meal[];
    day7?: Meal[];
    // 
    foodList: Food[]
}
export const defaultUserInfo: UserInfoInterface = {
    username: '',
    accessToken: '',
    loggedIn: false,
    day: [],
    foodList: []
};
const reducer = (state: UserInfoInterface | null = defaultUserInfo, action: any) => {
    switch (action.type) {
        case 'addUserToStore':
            return action.payload;
        case 'clearUserFromStore':
            return defaultUserInfo;
        default:
            return state;
    }
};

export default reducer;
