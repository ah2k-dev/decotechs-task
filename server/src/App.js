const express = require('express');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require("cookie-parser");
const {user, admin, auth} = require('./router');


// const compress = require('compression'); //for gzip compression
const app = express();

app.use(express.json());//json form req
app.use(cors()); // cross origin policy
app.options('*', cors());
app.use(helmet());//HTTP security Headers
app.use(express.urlencoded({ extended: true })); //url encoded req body
app.use(mongoSanitize()); //look for mongo injection i.e. $inject
app.use(xss());// prevent xss attack
app.use(cookieParser());// parse cookie header and populate req.cookies

app.use('/auth', auth);
app.use('/admin', admin);
app.use('/user', user);

module.exports = app;