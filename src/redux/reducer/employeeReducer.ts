import { EMPLOYEE_ACTIONS } from "@redux/actions/employeeActions";

const initialState = {
    isgetEmployeesLoading: false,
    data: [],
    getEmployeesError: null,
    isInsertEmployeeLoading: false,
    insertEmployeeError: null,
    isUdpateEmployeeLoading: false,
    updateEmployeeError: null,
    isDeleteEmployeeLoading: false,
    deleteEmployeeError: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch(action.type) {
        case EMPLOYEE_ACTIONS.GET_EMPLOYEES_REQUEST:
            return {
                ...state,
                isgetEmployeesLoading: true,
                getEmployeesError: null,
            };
        case EMPLOYEE_ACTIONS.GET_EMPLOYEES_SUCCESS:
            return {
                ...state,
                isgetEmployeesLoading: false,
                data: action.payload,
                getEmployeesError: null,
            }; 
        case EMPLOYEE_ACTIONS.GET_EMPLOYEES_ERROR:
            return {
                ...state,
                isgetEmployeesLoading: false,
                data: [],
                getEmployeesError: action.payload.error,
            };
        // INSERT
        case EMPLOYEE_ACTIONS.INSERT_EMPLOYEES_REQUEST:
            return {
                ...state,
                isInsertEmployeeLoading: true,
                insertEmployeeError: null,
            };
        case EMPLOYEE_ACTIONS.INSERT_EMPLOYEES_ERROR:
            return {
                ...state,
                isInsertEmployeeLoading: false,
                insertEmployeeError: action.payload.error,
            };
        // UPDATE
        case EMPLOYEE_ACTIONS.UPDATE_EMPLOYEES_REQUEST:
            return {
                ...state,
                isUdpateEmployeeLoading: true,
                updateEmployeeError: null,
            };
        case EMPLOYEE_ACTIONS.UPDATE_EMPLOYEES_ERROR:
            return {
                ...state,
                isUdpateEmployeeLoading: false,
                updateEmployeeError: action.payload.error,
            };
        // DELETE
        case EMPLOYEE_ACTIONS.DELETE_EMPLOYEES_REQUEST:
            return {
                ...state,
                isDeleteEmployeeLoading: true,
                deleteEmployeeError: null,
            }; 
        case EMPLOYEE_ACTIONS.DELETE_EMPLOYEES_ERROR:
            return {
                ...state,
                isDeleteEmployeeLoading: false,
                deleteEmployeeError: action.payload.error,
            };
        default: 
            return {
                ...initialState,
            }
    }
}