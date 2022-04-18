import { combineReducers } from "redux"
import userReducer from './UserData'
import dayReducer from './Day'
import modalStatusReducer from './ModalStatus'
const reducers = combineReducers({
    user: userReducer,
    day: dayReducer,
    modalStatus: modalStatusReducer
});
export type IRootState = ReturnType<typeof reducers>;
export default reducers;