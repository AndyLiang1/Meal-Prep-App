import { combineReducers } from "redux"
import userReducer from './UserData'
import dayReducer from './DayIndex'
import modalStatusReducer from './ModalStatus'
import refreshTriggerReducer from './RefetchUserDataTrigger'
const reducers = combineReducers({
    user: userReducer,
    dayIndex: dayReducer,
    modalStatus: modalStatusReducer,
    refreshTrigger: refreshTriggerReducer
});
export type IRootState = ReturnType<typeof reducers>;
export default reducers;