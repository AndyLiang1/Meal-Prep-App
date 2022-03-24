import { UserInfoInterface } from '../helpers/IUserInfo';

export const defaultUserInfo: UserInfoInterface = {
    username: '',
    id: '',
    accessToken: '',
    loggedIn: false
};
const reducer = (state: UserInfoInterface | null = defaultUserInfo, action: any) => {
    switch (action.type) {
        case 'login':
            return action.payload;
        case 'logout':
            return defaultUserInfo;
        default:
            return state;
    }
};

export default reducer;
