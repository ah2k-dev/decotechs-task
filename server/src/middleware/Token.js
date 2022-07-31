const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
    path: path.resolve(__dirname, './../.env')
})


const TOKEN_SECRET = process.env.TOKEN_SECRET;

const authenticateJWT = (req, res, next) => {

    try {
        // const token = req.cookies.token
        const token = req.headers.authorization.split(" ")[1];
        // const decoded = jwt.verify(token, TOKEN_SECRET);
        const decodedToken = jwt.verify(
            token,
            TOKEN_SECRET
        );
        req.user = {
            userId: decodedToken.id,
            role: decodedToken.role
        }; 
        next();
    } catch (error) {
        res.status(401).send({ message: "Authentication failed!" });
    }
};
module.exports = {
    authenticateJWT
}