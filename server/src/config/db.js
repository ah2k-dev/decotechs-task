const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(`mongodb+srv://dev:admin123@expressapps.kqkua.mongodb.net/?retryWrites=true`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const conneciton = mongoose.connection;

module.exports = conneciton;
