import React, { useEffect, useState } from "react";
import _ from 'lodash';
import employeeModel, {  } from "@models/employeeModel";
import EmployeeForm from "@app/employeeForm";
import EmployeeTable from "@app/employeeTable";
import { useDispatch } from "react-redux";
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
//import { getEmployeesRequest } from "@redux/actions/employeeActions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        home: {
            width: '98%',
            justifyContent: 'center',
            textAlign: 'center',
            margin: 'auto'
        }
    }),
);

export default function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();


    const emptyemployeeModel: employeeModel = {
        _id: '',
        name: '',
        salary: 0,
        gender: '',
        dob: ''
    };
    
    useEffect(() => {
       
        }, []);

    return (
        <div className={classes.home}>
            <h2> Addis Software Project</h2>
            <EmployeeForm></EmployeeForm>   
            <EmployeeTable></EmployeeTable>
        </div>
    );
}
