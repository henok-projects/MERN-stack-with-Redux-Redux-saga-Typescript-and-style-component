const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name: String,
    salary: Number,
    Gender: String,
    dob: Date
 });
 module.exports = mongoose.model("employee", employeeSchema);