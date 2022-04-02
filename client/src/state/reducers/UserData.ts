import { Day, User } from "../../generated/graphql-client";

export interface UserInfoInterface { 
    username: string, 
    id: string, 
    accessToken: string, 
    loggedIn: boolean, 
    days: Day[]

}
export const defaultUserInfo: UserInfoInterface = {
    username: '',
    id: '',
    accessToken: '',
    loggedIn: false,
    days: []
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
