// action creators are a fct that dispatches an action
import {Day} from '../reducers/Day';
import { defaultUserInfo } from '../reducers/UserData';
import {UserInfoInterface} from '../reducers/UserData'
// // login-action-creator returns a dispatch function ? 
// export const login = (user: UserInfoInterface) => {
//     return (dispatch: (arg0: { type: string; payload: any }) => void) => {
//         dispatch({
//             type: 'login',
//             payload: user
//         });
//     };
// };

// export const logout = (user: UserInfoInterface) => {
//     return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
//         dispatch({
//             type: 'logout',
//             payload: defaultUserInfo
//         });
//     }
// }


export const addUserToStore = (user: UserInfoInterface) => {
    return (dispatch: (arg0: { type: string; payload: UserInfoInterface }) => void) => {
        dispatch({
            type: 'addUserToStore',
            payload: user
        });
    };
};

export const changeDay = (day: Day) => {
    return (dispatch: (arg0: { type: string; payload: Day }) => void) => {
        dispatch({
            type: 'changeDay',
            payload: day
        });
    };
}