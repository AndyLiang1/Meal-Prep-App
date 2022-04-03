import { combineReducers } from "redux"
import userReducer from './UserData'
import dayReducer from './Day'
const reducers = combineReducers({
    user: userReducer,
    day: dayReducer
})
export type IRootState = ReturnType<typeof reducers>;
export default reducers;