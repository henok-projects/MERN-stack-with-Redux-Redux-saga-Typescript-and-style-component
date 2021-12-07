const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
module.exports = async function dbConnect() {
    const connect = mongoose.connect(process.env.DB_STRING,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log("Database connected!"))
        .catch(err => console.log(err));
    return connect
}
