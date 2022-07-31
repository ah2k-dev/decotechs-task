const express = require('express');
const user= require('../controller/userController');
const {authenticateJWT} = require('../middleware/Token');
const router = express.Router();


router.route('/getTodo/:id').get(authenticateJWT, user.getTodo);
router.route('/addTodo/:id').post(authenticateJWT,user.addTodo);
router.route('/updateTodo/:id').put(authenticateJWT,user.updateTodo);
router.route('/removeTodo/:id').delete(authenticateJWT,user.removeTodo);

module.exports = router;