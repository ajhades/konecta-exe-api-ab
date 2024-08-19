var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
const User = require('../models/user');

/**
 * Index API.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
const index = async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al conectarse a la base de datos');
  }
};

module.exports = { index };
