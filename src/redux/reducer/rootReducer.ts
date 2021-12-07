import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";

const rootReducer = combineReducers({
    entities: combineReducers({
        Employee: employeeReducer,
    }),
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;