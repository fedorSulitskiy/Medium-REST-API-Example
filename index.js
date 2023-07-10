require('dotenv').config();
const express = require('express');
const app = express();

const {logger, handler} = require('./startup/logger');
handler();

// throw new Error('Something failed during startup'); // to test uncaught exception
// const p = Promise.reject(new Error('Something failed miserably')); // rejected promise, like async operation dying
// p.then(() => console.log('Done')); // unhandled rejection

require('./startup/routes')(app);

const server = app.listen(process.env.APP_PORT, () => {
  logger.info(`Server up and running on port ${process.env.APP_PORT}`);
})