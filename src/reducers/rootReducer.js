
import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";



/* Este rootReducer es el reducer PADRE que combinará el resto de los reducers */
export const rootReducer = combineReducers({
    ui:uiReducer, // my firt reducer
    calendar: calendarReducer,
    auth: authReducer
});
