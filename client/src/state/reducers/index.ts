import { combineReducers } from "redux"
import userReducer from './UserData'
import dayReducer from './DayIndex'
import modalStatusReducer from './ModalStatus'
import refetchTriggerReducer from './RefetchTrigger'
const reducers = combineReducers({
    user: userReducer,
    dayIndex: dayReducer,
    modalStatus: modalStatusReducer,
    refetchTrigger: refetchTriggerReducer
});
export type IRootState = ReturnType<typeof reducers>;
export default reducers;