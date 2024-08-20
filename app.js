var express = require('express');
const cors = require('cors');
const helmet = require('helmet');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeesRouter = require('./routes/employees');
var applicationsRouter = require('./routes/applications');
var rolesRouter = require('./routes/roles');

const authenticateToken = require('./middlewares/authenticateToken');

var app = express();

const PORT = process.env.SERVER_PORT;
const FRONT_END_ENDPOINT = process.env.FRONT_END_ENDPOINT;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(
  cors({
    origin: FRONT_END_ENDPOINT, // Permite solicitudes solo desde esta URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  })
);

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
const protectedRouter = express.Router();

protectedRouter.use(authenticateToken);

protectedRouter.use('/users', usersRouter);
protectedRouter.use('/employees', employeesRouter);
protectedRouter.use('/applications', applicationsRouter);
protectedRouter.use('/roles', rolesRouter);

app.use('/api/v1', protectedRouter);

module.exports = app;
