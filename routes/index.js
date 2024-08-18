var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
const User = require('../models/user');

const authorizeRoles = require('../middlewares/autorizeRoles');

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al conectarse a la base de datos');
  }
});

router.post('/login', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }
    const user = await User.getUsersLogin({ username, password });
    if (user) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
});

router.post('/logout', (req, res) => {
  res.send('Logged out');
});

module.exports = router;
