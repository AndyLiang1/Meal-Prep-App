import { UserInfoInterface } from '../helpers/IUserInfo';

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
