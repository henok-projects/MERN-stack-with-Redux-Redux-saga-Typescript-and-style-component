import React, { useEffect, useState } from "react";
import employeeModel from "@models/employeeModel";
import { isEmpty } from 'lodash';
import { getEmployees, isgetEmployeesLoading } from "@redux/selector/employeeSelector";
import { deleteEmployeeRequest, UpdateEmployeeRequest } from "@redux/actions/employeeActions";
import { useDispatch, useSelector } from "react-redux";
import { shadows } from '@mui/system';
import { createStyles, makeStyles } from '@mui/styles';
import { 
    Box, 
    Button, 
    Checkbox, 
    CircularProgress, 
    Collapse, Dialog, 
    DialogActions, 
    DialogTitle, 
    IconButton, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TextField, 
    Theme, 
    Typography 
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        userTable: {
            width: "100%",
            marginTop: "20px"
        },
        innerTable: {
            padding: "0px !important"
        },
        innerBox: {
            padding: "16px"
        },
        innerTableNoBottom: {
            padding: "0px !important",
            borderBottom: "0px !important"
        },
        skillsDialog: {
            width: "600%"
        },
        dialog: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        input: {
            width: "300px"
        },
        paper: {
            minWidth: "600px",
            backgroundColor: 'grey',
            border: '2px solid #000',
            boxShadow: "1px 3px 1px #9E9E9E",
            padding: "2px, 4px, 3px",
        },
    }),
);

function getSkillsSummary(skills: string[]) {
    const summary: string = new Array(skills).join(",");
    return summary.length > 6 ?
        `${summary.substring(0, 6)}...` :
        summary;
}

function SkillsDialog(props: {
    openDialog: boolean,
    handleSave,
    handleClose,
}) {
    const {
        openDialog,
        handleSave,
        handleClose
    } = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        setOpen(openDialog)
    }, [props]);

    return (
        <Dialog
            classes={{ paper: classes.paper }}
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add a skill</DialogTitle>
            <TextField
                autoFocus
                className={classes.input}
                margin="dense"
                id="name"
                onChange={e => setInputText(e.target.value)}
            />
            <DialogActions>
                <Button
                    color="primary"
                    onClick={() => handleClose()}>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    onClick={() => handleSave(inputText)}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

function Row(
    props: {
        Employee: employeeModel,
        handleCheck
    }
) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { Employee, handleCheck } = props;
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const openSkillsDialog = () => {
        setOpenDialog(true);
    }

    const closeSkillsDialog = () => {
        setOpenDialog(false);
    }

    async function saveSkillsAsync(newSkill: string) {
        // const skills = Employee.skills;
        // skills.push(newSkill);

        const request: employeeModel = {
            _id: Employee._id,
            name: Employee.name,
            salary: Employee.salary,
            gender: Employee.gender,
            dob: Employee.dob
            
        };

        // dispatch(UpdateEmployeeRequest(request));
        // closeSkillsDialog();
    }

    return (
        <React.Fragment>
            <TableRow
                className={classes.userTable}
                tabIndex={-1}
                key={Employee._id}
                role="checkbox">
                <TableCell padding="checkbox">
                    <Checkbox
                        id={Employee._id}
                        onChange={(event) => handleCheck(event, Employee._id)}
                        checked={Employee.checked}
                        inputProps={{ 'aria-labelledby': Employee._id }} />
                </TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown/>}
                    </IconButton>
                </TableCell>
                <TableCell scope="Employee">
                    {`${Employee.name} ${Employee.name}`}
                </TableCell>
                <TableCell>
                    {Employee.dob}
                </TableCell>
                <TableCell>
                    {Employee.salary}
                </TableCell>
                
            </TableRow>
            <TableRow>
                <TableCell
                    className={open ? classes.innerTable : classes.innerTableNoBottom}
                    colSpan={6}>
                    <Collapse in={open}
                        timeout="auto"
                        unmountOnExit>
                        <Box className={classes.innerBox}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                component="div">
                                
                            </Typography>
                            <Table size="small"
                                aria-label="skills">
                                <TableBody>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => openSkillsDialog()}>
                                      
                                    </Button>
                                  
                                    <SkillsDialog
                                        openDialog={openDialog}
                                        handleClose={closeSkillsDialog}
                                        handleSave={saveSkillsAsync}
                                    />
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function EmployeeTable() {
    const dispatch = useDispatch();
    const Employees: employeeModel[] = useSelector(getEmployees);
    const isLoading: boolean = useSelector(isgetEmployeesLoading);
    const [selectedAll, setSelectedAll] = useState(false);
    const [EmployeeList, setEmployeeList] = useState<employeeModel[]>([]);

    useEffect(() => {
        setEmployeeList(Employees);
    }, [Employees]);

    useEffect(() => {
        if (!isEmpty(EmployeeList)) {
            const filter = EmployeeList.filter(s => !s.checked);
            setSelectedAll((prevChecked) => isEmpty(filter));
        }
    }, [EmployeeList]);

    const handleCheck = (event, id) => {
        const auxList = EmployeeList;
        setEmployeeList((prevList) => {
            const aux = prevList.map(s => {
                const check = (s._id === id) ? event.target.checked :
                    s.checked;
                return {
                    _id: s._id,
                    name: s.name,
                    salary: s.salary,
                    gender: s.gender,
                    dob: s.dob,
                    checked: check
                }
            });
            return aux;
        });
    }

    const handleSelectAll = (event) => {
        const check = event.target.checked;
        setSelectedAll(check);
        setEmployeeList((prevList) => {
            const aux = prevList.map(s => {
                return {
                    _id: s._id,
                    name: s.name,
                    salary: s.salary,
                    gender: s.gender,
                    dob: s.dob,
                    checked: check
                }
            });
            return aux;
        });
    }

    async function deleteEmployeesAsync() {
        const filter: string[] = EmployeeList
            .filter(s => s.checked === true)
            .map(x => x._id || '');
        if (!isEmpty(filter)) {
            dispatch(deleteEmployeeRequest(filter));
        };
    }

    const LoadingCustom = () => {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <TableContainer component={Paper}>
            {
                isLoading && (
                    <LoadingCustom />
                )
            }
            {!isLoading && (
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    value={selectedAll}
                                    checked={selectedAll}
                                    onChange={(event) => handleSelectAll(event)}
                                    inputProps={{ 'aria-label': 'Select all Employees' }} />
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => deleteEmployeesAsync()}>
                                    Delete
                                </Button>
                            </TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>DOB</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {EmployeeList.map((row) => {
                            return (
                                <Row
                                    key={row._id}
                                    Employee={row}
                                    handleCheck={handleCheck} />
                            );
                        })}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
}
