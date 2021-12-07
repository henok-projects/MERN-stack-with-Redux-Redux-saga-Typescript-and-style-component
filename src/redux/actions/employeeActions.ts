import employeeModel from "@models/employeeModel";

// TYPES
export enum EMPLOYEE_ACTIONS {
    GET_EMPLOYEES_REQUEST = 'GET_EMPLOYEES_REQUEST',
    GET_EMPLOYEES_SUCCESS = 'GET_EMPLOYEES_SUCCESS',
    GET_EMPLOYEES_ERROR = 'GET_EMPLOYEES_ERROR',
    INSERT_EMPLOYEES_REQUEST = 'INSERT_EMPLOYEES_REQUEST',
    INSERT_EMPLOYEES_SUCCESS = 'INSERT_EMPLOYEES_SUCCESS',
    INSERT_EMPLOYEES_ERROR = 'INSERT_EMPLOYEES_ERROR',
    UPDATE_EMPLOYEES_REQUEST = 'UPDATE_EMPLOYEES_REQUEST',
    UPDATE_EMPLOYEES_SUCCESS = 'UPDATE_EMPLOYEES_SUCCESS',
    UPDATE_EMPLOYEES_ERROR = 'UPDATE_EMPLOYEES_ERROR',
    DELETE_EMPLOYEES_REQUEST = 'DELETE_EMPLOYEES_REQUEST',
    DELETE_EMPLOYEES_SUCCESS = 'DELETE_EMPLOYEES_SUCCESS',
    DELETE_EMPLOYEES_ERROR = 'DELETE_EMPLOYEESERROR',
    ADD_SKILLS_REQUEST = 'ADD_SKILLS_REQUEST',
    ADD_SKILLS_SUCCESS = 'ADD_SKILLS_SUCCESS',
    ADD_SKILLS_ERROR = 'ADD_SKILLS_ERROR',
};

interface LoadingState {
  isLoading: boolean,
}

interface CommonErrorPayload {
  error?: {
      message: string,
      type: string,
  },
}

// ACTION RETURN TYPES
export interface getEmployeesRequest {
  type: typeof EMPLOYEE_ACTIONS.GET_EMPLOYEES_REQUEST;
  args: employeeModel,
};

export interface getEmployeesSuccess {
  type: typeof EMPLOYEE_ACTIONS.GET_EMPLOYEES_SUCCESS;
  payload: employeeModel[],
};

export interface getEmployeesError {
  type: typeof EMPLOYEE_ACTIONS.GET_EMPLOYEES_ERROR;
  payload: CommonErrorPayload,
};

export interface insertemployeeRequest {
  type: typeof EMPLOYEE_ACTIONS.INSERT_EMPLOYEES_REQUEST;
  args: employeeModel,
}

export interface InsertEmployeeSuccess {
  type: typeof EMPLOYEE_ACTIONS.INSERT_EMPLOYEES_SUCCESS,
};

export interface InsertEmployeeError {
  type: typeof EMPLOYEE_ACTIONS.INSERT_EMPLOYEES_ERROR;
  payload: CommonErrorPayload,
};

export interface UpdateEmployeeRequest {
  type: typeof EMPLOYEE_ACTIONS.UPDATE_EMPLOYEES_REQUEST;
  args: employeeModel,
};

export interface UpdateEmployeeSuccess {
  type: typeof EMPLOYEE_ACTIONS.UPDATE_EMPLOYEES_SUCCESS,
};

export interface UpdateEmployeeError {
  type: typeof EMPLOYEE_ACTIONS.UPDATE_EMPLOYEES_ERROR;
  payload: CommonErrorPayload,
};

export interface DeleteEmployeeRequest {
  type: typeof EMPLOYEE_ACTIONS.DELETE_EMPLOYEES_REQUEST;
  args: string[],
};

export interface DeleteEmployeeSuccess {
  type: typeof EMPLOYEE_ACTIONS.DELETE_EMPLOYEES_SUCCESS,
};

export interface DeleteEmployeeError {
  type: typeof EMPLOYEE_ACTIONS.DELETE_EMPLOYEES_ERROR;
  payload: CommonErrorPayload,
};

// ACTIONS
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const getEmployeesRequest = (args: employeeModel): getEmployeesRequest  => ({
  type: EMPLOYEE_ACTIONS.GET_EMPLOYEES_REQUEST,
  args,
}); 

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const getEmployeesSuccess = (payload: employeeModel[]): getEmployeesSuccess => ({
  type: EMPLOYEE_ACTIONS.GET_EMPLOYEES_SUCCESS,
  payload,
});

export const getEmployeesError = (payload: CommonErrorPayload): getEmployeesError => ({
  type: EMPLOYEE_ACTIONS.GET_EMPLOYEES_ERROR,
  payload,
});

export const insertemployeeRequest = (args: employeeModel): insertemployeeRequest => ({
  type: EMPLOYEE_ACTIONS.INSERT_EMPLOYEES_REQUEST,
  args,
});

export const insertEmployeeSuccess = (): InsertEmployeeSuccess => ({
  type: EMPLOYEE_ACTIONS.INSERT_EMPLOYEES_SUCCESS,
});

export const insertEmployeeError = (payload: CommonErrorPayload): InsertEmployeeError => ({
  type: EMPLOYEE_ACTIONS.INSERT_EMPLOYEES_ERROR,
  payload,
});

const updateEmployeeRequest = (args: employeeModel): UpdateEmployeeRequest => ({
  type: EMPLOYEE_ACTIONS.UPDATE_EMPLOYEES_REQUEST,
  args,
});

export const updateEmployeeSuccess = (): UpdateEmployeeSuccess => ({
  type: EMPLOYEE_ACTIONS.UPDATE_EMPLOYEES_SUCCESS,
});

export const updateEmployeeError = (payload: CommonErrorPayload): UpdateEmployeeError => ({
  type: EMPLOYEE_ACTIONS.UPDATE_EMPLOYEES_ERROR,
  payload,
});

export const deleteEmployeeRequest = (args: string[]): DeleteEmployeeRequest => ({
  type: EMPLOYEE_ACTIONS.DELETE_EMPLOYEES_REQUEST,
  args,
});

export const deleteEmployeeSuccess = (): DeleteEmployeeSuccess => ({
  type: EMPLOYEE_ACTIONS.DELETE_EMPLOYEES_SUCCESS,
});

export const deleteEmployeeError = (payload: CommonErrorPayload): DeleteEmployeeError => ({
  type: EMPLOYEE_ACTIONS.DELETE_EMPLOYEES_ERROR,
  payload,
});