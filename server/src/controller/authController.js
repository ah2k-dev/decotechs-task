const user = require('../model/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');
dotenv.config({
    path: path.resolve(__dirname, "./../.env"),
});
const TOKEN_SECRET = "TODOAPP";

// const options = {
//     httpOnly: true,
//     maxAge: 1000 * 60 * 60 * 24 * 7,
//     expires: new Date(
//         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),
// };

const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        const exUser = await user.findOne({ email: email });
        if (exUser) {
            return res.status(400).send({ message: 'email already in use', sucess: false });
        }
        const newUser = new user({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });

        newUser.save();

        return res.status(200).send({ message: 'Registered Successfully', success: true });
    }
    catch (err) {
        res.status(500).send({ error: err, sucess: false })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const exUser = await user.findOne({ email: email });
        if (!exUser) {
            return res.status(404).send({ message: 'User not found', success: false });
        }
        const validate = await bcrypt.compare(password, exUser.password);
        if (!validate) {
            return res.status(401).send({ message: 'Invalid password', success: false });
        }
        const token = jwt.sign({ id: exUser._id, role: exUser.role }, TOKEN_SECRET);

        // res.cookie("token", token, options);

        return res.status(200).send({ token: token, user: exUser, role: exUser.role, message: "Logged in", success: true });

    } catch (err) {
        res.status(500).send({ error: err, success: false })
    }
}
module.exports = {
    register,
    login
}
