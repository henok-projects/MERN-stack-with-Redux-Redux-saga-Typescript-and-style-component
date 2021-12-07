import { all, fork } from "redux-saga/effects";
import EmployeeSaga from "./employeesaga";
export function* rootSaga() {
    yield all([fork(EmployeeSaga)]);
};