'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('../../api-server/src/error-handlers/500');
const notFound = require('../../api-server/src/error-handlers/404');
const authRoutes = require('./auth/routes.js');
const apiRoutes = require('../../api-server/src/routes/v2')
const unprotectedRoutes = require('../../api-server/src/routes/v1')

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes, apiRoutes);
app.use('api/v1/', unprotectedRoutes)

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
