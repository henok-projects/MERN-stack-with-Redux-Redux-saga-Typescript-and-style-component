import { TextField, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { useState } from "react";
import { Button } from "./styleComponent"
import { Image, Jumbotron } from "react-bootstrap";
import logo from '@assets/svg/logo.svg';
import employeeModel from "@models/employeeModel";
import { useSelector } from "react-redux";
import { isEmpty } from 'lodash';
import { getEmployees } from "@redux/selector/employeeSelector";
import { insertemployeeRequest } from "@redux/actions/employeeActions";
import { useDispatch } from "react-redux";
import styled, { createGlobalStyle, css } from 'styled-components';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            display: 'inline-block',
            width: '100%',
            marginBottom: '20px',
        },
        jumbotron: {
            height: '20px',
            width: '100%',
            display: 'grid',
            justifyContent: 'center',
            margin: 'auto',
            backgroundColor: 'lightblue',
            marginBottom: '10px',
        },
        form: {
            display: 'flex',
            justifyContent: 'center'
        },
        infoBox: {
            display: 'flex',
            justifyContent: 'center',
            verticalAlign: 'center'
        },
        labelStyle: {
            fontSize: '32px',
            fontWeight: 'bold',
            verticalAlign: 'center'
        },
        insertBtn: {
            marginLeft: '40px'
        }
    }),
);

function JumbotronHeader(props) {
    const classes = useStyles();
    const { totalEmployees } = props;
    return (
        <Jumbotron className={classes.jumbotron}>
            <Image src={logo}/>
        
        </Jumbotron>
    );
}

export default function EmployeeForm(props) {
    const Employees = useSelector(getEmployees);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [name, setFirstName ] = useState('');
    const [salary, setSalary] = useState(0);
    const [gender, setGender] = useState('');
    const [dob, setDateOfBirth] = useState('');
    // const totalEmployees = isEmpty(Employees) ? 0 : Employees.length;
    
    async function insertEmployeeAsync() {
        const request: employeeModel = {
            name,
            dob,
            gender,
            salary
           
        };
        dispatch(insertemployeeRequest(request));
    }
   
    return (
        <div className={classes.header}>
            <JumbotronHeader />  
             <form 
                className={classes.form}
                noValidate 
                autoComplete="off">
                <TextField 
                    id="firstName" 
                    label="First Name" 
                    variant="outlined" 
                    onChange={e => setFirstName(e.target.value)}/>
                <TextField 
                    id="salary" 
                    label="salary" 
                    type="number"
                    variant="outlined"
                    onChange={e => setSalary(parseInt(e.target.value))}/>
                <TextField 
                    id="Gender" 
                    label="Gender" 
                    variant="outlined"
                    onChange={e => setGender(e.target.value)}/>
                <TextField 
                    id="dateOfBirth" 
                    label="DOB"
                    type="date" 
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setDateOfBirth(e.target.value)}/>
                <Button 
                    id="insertBtn"
                    className={classes.insertBtn}                   
                    color="primary"
                    onClick={() => insertEmployeeAsync()}>
                    Add Employee
                </Button>
            </form>
        </div>
    );
}
