const express = require('express');
const admin = require('../controller/adminController');
const { authenticateJWT } = require('../middleware/Token');
const router = express.Router();

router.route('/getTodo/:id').get(authenticateJWT, admin.getTodo);
router.route('/getUsers').get(authenticateJWT, admin.getUsers);
router.route('/giveRemarks/:id').put( admin.giveRemarks);

module.exports = router;
