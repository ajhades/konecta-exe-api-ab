var jwt = require('jsonwebtoken');
const User = require('../models/user');
const { loginSchema } = require('../validation/authSchema');

/**
 * Controller to autenticate user
 * @param {*} req
 * @param {*} res
 * @returns {string} token auth
 */
const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const username = req.body.username;
    const password = req.body.password;
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
};

/**
 * Logout
 * @param {*} req
 * @param {*} res
 */
const logout = async (req, res) => {
  res.send('Logged out');
};

module.exports = { login, logout };
