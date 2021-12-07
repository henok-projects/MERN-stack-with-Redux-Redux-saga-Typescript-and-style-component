const joi = require("joi");

const Employee = require('../models/employee');
const handleResponse = require('../utils/handleResponse');
const { mustValidate } = require('../utils/validation');

exports.index = function (req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.employee_list = async function (req, res) {
    try {
        const allEmployees = await Employee.find({})
        handleResponse(req, res,  allEmployees)
    } catch (err) {
        console.log(err)
        handleResponse(req, res, { status: "error", "msg": err.msg ? { detail: err.message } : err }, 500);
    }
};

exports.employee_detail = async function (req, res) {
    try {
        console.log(req.params)
        const validateSchema = () =>
            joi.object({
                id: joi.string().required(),
            }).required();
        const { id } = mustValidate(validateSchema(), req.params);

        const employee = await Employee.findById(id)
        handleResponse(req, res, employee)
    } catch (err) {
        console.log(err)
        handleResponse(req, res, { status: "error", "msg": err.msg ? { detail: err.message } : err }, 500);
    }
};

exports.employee_create = async function (req, res) {
    try {

        const validateSchema = () =>
            joi.object({
                name: joi.string().required(),
                dob: joi.date().required(),
                gender: joi.string().required(),
                salary: joi.number().required(),
            }).required();
        const { name, dob, gender, salary } = mustValidate(validateSchema(), req.body);
        const employee = new Employee({
            name: name,
            dob: dob,
            gender: gender,
            salary: salary
        })
        const createdEmployee = await employee.save();
        handleResponse(req, res,  createdEmployee )
    } catch (err) {
        console.log(err)
        handleResponse(req, res, { status: "error", "msg": err.msg ? { detail: err.message } : err }, 500);
    }

};

exports.employee_edit = async function (req, res) {
    try {
        const validateSchema = () =>
            joi.object({
                name: joi.string().required(),
                dob: joi.date().required(),
                gender: joi.string().required(),
                salary: joi.number().required(),
            }).required();
        const { name, dob, gender, salary } = mustValidate(validateSchema(), req.body);

        const validateIdSchema = () =>
            joi.object({
                id: joi.string().required(),
            }).required();
        const { id } = mustValidate(validateIdSchema(), req.params);
        const employee = {
            id: id,
            name: name,
            dob: dob,
            gender: gender,
            salary: salary
        }
        const updatedEmployee = await Employee.findByIdAndUpdate(id, { $set: employee });
        handleResponse(req, res,  updatedEmployee );
    } catch (err) {
        console.log(err)
        handleResponse(req, res, { status: "error", "msg": err.msg ? { detail: err.message } : err }, 500);
    }
};

exports.employee_delete = async function (req, res) {
    try {
        const validateSchema = () =>
            joi.object({
                id: joi.string().required(),
            }).required();
        const { id } = mustValidate(validateSchema(), req.params);
        const deltedEmployee = await Employee.findByIdAndRemove(id);
        handleResponse(req, res,  deltedEmployee );
    } catch (err) {
        console.log(err)
        handleResponse(req, res, { status: "error", "msg": err.msg ? { detail: err.message } : err }, 500);
    }
};

