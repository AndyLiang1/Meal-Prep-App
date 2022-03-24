// action creators are a fct that dispatches an action
import { UserInfoInterface } from '../helpers/IUserInfo';
import { defaultUserInfo } from '../reducers/Auth';

// login-action-creator returns a dispatch function ? 
export const login = (user: UserInfoInterface) => {
    return (dispatch: (arg0: { type: string; payload: any }) => void) => {
        dispatch({
            type: 'login',
            payload: user
        });
    };
};

export const logout = (user: UserInfoInterface) => {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        dispatch({
            type: 'logout',
            payload: defaultUserInfo
        });
    }
}
