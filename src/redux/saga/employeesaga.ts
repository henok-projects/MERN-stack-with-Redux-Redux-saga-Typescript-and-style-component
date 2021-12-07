import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import employeeModel from '@models/employeeModel';
import { formatDate } from '@utils/dateUtils';
import { get } from 'lodash';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { deleteEmployeeError, getEmployeesError, getEmployeesRequest, getEmployeesSuccess, insertEmployeeError, EMPLOYEE_ACTIONS, updateEmployeeError } from "@redux/actions/employeeActions";



// AXIOS
const baseUrl = 'http://localhost:5000/api';
const headers = { 
    'Content-Type': 'application/json',
    mode: 'cors',
    credentials: 'include'
};

const axiosClient = axios;
axiosClient.defaults.baseURL = baseUrl;
axiosClient.defaults.headers = headers;

const getEmployeesAsync = (body: employeeModel) => {
    return axiosClient.post<employeeModel[]>(
        '/', 
        body
    );
}

function* getEmployeesSaga(action) {
    try {
        const args = get(action, 'args', {})
        const response = yield call(getEmployeesAsync, args);
        yield put(getEmployeesSuccess(response.data));
    } catch(ex: any) {
        const error = {
            type: ex.message, // something else can be configured here
            message: ex.message,
        };
        yield put(getEmployeesError({error}));
    }
}

const insertEmployeesAsync = async (body: employeeModel) => {
    return axiosClient.post(
        '/add',
        body
    )
}

function* insertEmployeeSaga(action) {
    try {
        const employeeModel = get(action, 'args');
        if (employeeModel == null) {
            throw new Error('Request is null');
        }
        yield call(insertEmployeesAsync, employeeModel);
       
        const getAction = {
            type: EMPLOYEE_ACTIONS.GET_EMPLOYEES_REQUEST,
            args: {},
        };
        yield call(getEmployeesSaga, getAction);
    } catch(ex: any) {
        const error = {
            type: ex.message, // something else can be configured here
            message: ex.message,
        };
        yield put(insertEmployeeError({error}));
    }
};

const updateEmployeeAsync = async (body: employeeModel) => {
    return axiosClient.put(
        '/:id',
        body
    );
};

/**
 * 
 * @param action {type, payload: employeeModel}
 */
function* updateEmployeeSaga(action) {
    try {
        const employeeModel = get(action, 'args');
        if (employeeModel == null) {
            throw new Error('Request is null');
        };
        yield call(updateEmployeeAsync, employeeModel);
       
        // const getEmployeeRequestAction = getEmployeesRequest({});
        // yield call(getEmployeesSaga, getEmployeeRequestAction);
    } catch(ex: any) {
        const error = {
            type: ex.message, // something else can be configured here
            message: ex.message,
        };
        yield put(updateEmployeeError({error}));
    }
};

const deleteEmployeesAsync = async (ids: string[]) => {
    return axiosClient.post(
        '/:id',
        {ids}
    );
};

/**
 * 
 * @param action {type, payload: string[]}
 */
 function* deleteEmployeeSaga(action) {
    try {
        const ids = get(action, 'args');
        if (isEmpty(ids)) {
            throw new Error('Request is null');
        };
        yield call(deleteEmployeesAsync, ids);
       
        // const getEmployeeRequestAction = getEmployeesRequest({});
        // yield call(getEmployeesSaga, getEmployeeRequestAction);
    } catch(ex: any) {
        const error = {
            type: ex.message, // something else can be configured here
            message: ex.message,
        };
        yield put(deleteEmployeeError({error}));
    }
};

function* EmployeeSaga() {
    yield all([
        takeLatest(EMPLOYEE_ACTIONS.GET_EMPLOYEES_REQUEST, getEmployeesSaga),
        takeLeading(EMPLOYEE_ACTIONS.INSERT_EMPLOYEES_REQUEST, insertEmployeeSaga),
        takeLeading(EMPLOYEE_ACTIONS.UPDATE_EMPLOYEES_REQUEST, updateEmployeeSaga),
        takeLeading(EMPLOYEE_ACTIONS.DELETE_EMPLOYEES_REQUEST, deleteEmployeeSaga),
    ]);
}

export default EmployeeSaga;