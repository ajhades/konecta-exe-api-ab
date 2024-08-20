var express = require('express');
var router = express.Router();
const { login, logout } = require('../controllers/authController');
const { index } = require('../controllers/indexController');

/* GET home page. */
router.get('/', index);

router.post('/api/v1/login', login);

router.post('/api/v1/logout', logout);

module.exports = router;
