const jwt = require('jsonwebtoken');
const pool = require('../db/db');
const Role = require('../models/role');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const authorizeRoles = (allowedRoles) => {
  return async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, async (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }
      try {
        const result = await Role.getRoleById(payload.user.role_id);

        if (!result) {
          res.sendStatus(404);
        }
        const userRole = result.name;

        if (allowedRoles.includes(userRole)) {
          req.user = payload;
          next();
        } else {
          res.sendStatus(403);
        }
      } catch (error) {
        console.error('Error verifying user role:', error);
        res.sendStatus(500);
      }
    });
  };
};

module.exports = authorizeRoles;
