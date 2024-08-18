var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

const pool = require('./db/db');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeesRouter = require('./routes/employees');
var requestsRouter = require('./routes/requests');
var rolesRouter = require('./routes/roles');
var permissionsRouter = require('./routes/permissions');

var app = express();

const PORT = process.env.SERVER_PORT;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employees', employeesRouter);
app.use('/requests', requestsRouter);
app.use('/roles', rolesRouter);
app.use('/permissions', permissionsRouter);

module.exports = app;
