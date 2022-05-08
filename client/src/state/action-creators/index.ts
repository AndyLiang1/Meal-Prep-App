// action creators are a fct that dispatches an action
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

export const changeDay = (dayIndex: number) => {
    return (dispatch: (arg0: { type: string; payload: number }) => void) => {
        dispatch({
            type: 'changeDay',
            payload: dayIndex
        });
    };
}

export const setModalStatus = (modalStatus: boolean) => {
    return (dispatch: (arg0: {type: string; payload: boolean}) => void) => {
        dispatch({
            type: 'setModalStatus',
            payload: modalStatus
        });
    }
}

const triggerRefetch = () => {
    return (dispatch: (arg0: {type: string}) => void) => {
        dispatch({
            type: `refetchTrigger`,
        });
    }
}