import { get } from 'lodash';
import { createSelector } from 'reselect';
import { AppState } from '@redux/reducer/rootReducer';

const entity = 'entities.Employee';

export const getEmployeesLoadingState = (state: AppState) => get(state, `${entity}.isgetEmployeesLoading`, false);
export const getEmployeesState = (state:  AppState) => get(state, `${entity}.data`, []);
export const getEmployeesErrorState = (state: AppState) => get(state, `${entity}.getEmployeesError`);
export const isgetEmployeesLoading = createSelector(getEmployeesLoadingState, (isLoading) => isLoading);
export const getEmployees = createSelector(getEmployeesState, (Employees) => Employees);
export const getEmployeesError = createSelector(getEmployeesErrorState, (error) => error);

export const insertEmployeeLoadingState = (state: AppState) => get(state, `${entity}.isInsertEmployeeLoading`, false);
export const insertEmployeeErrorState = (state: AppState) => get(state, `${entity}.insertEmployeeError`);
export const isInsertEmployeeLoading = createSelector(insertEmployeeLoadingState, (isLoading) => isLoading);
export const insertEmployeeError = createSelector(insertEmployeeErrorState, (error) => error);

export const updateEmployeeLoadingState = (state: AppState) => get(state, `${entity}.isUdpateEmployeeLoading`, false);
export const updateEmployeeErrorState = (state: AppState) => get(state, `${entity}.updateEmployeeError`);
export const isUpdateEmployeeLoading = createSelector(updateEmployeeLoadingState, (isLoading) => isLoading);
export const updateEmployeeError = createSelector(updateEmployeeErrorState, (error) => error);

export const deleteEmployeeLoadingState = (state: AppState) => get(state, `${entity}.isDeleteEmployeeLoading`, false);
export const deleteEmployeeErrorState = (state: AppState) => get(state, `${entity}.deleteEmployeeError`);
export const isDeleteEmployeeLoading = createSelector(deleteEmployeeLoadingState, (isLoading) => isLoading);
export const deleteEmployeeError = createSelector(deleteEmployeeErrorState, (error) => error);

export const isAddSkillsLoadingState = (state: AppState) => get(state, `${entity}.isAddSkillsLoading`, false);
export const addSkillErrorState = (state: AppState) => get(state, `${entity}.addSkillsError`);
export const isAddSkillsLoading = createSelector(isAddSkillsLoadingState, (isLoading) => isLoading);
export const addSkillsError = createSelector(addSkillErrorState, (error) => error);
