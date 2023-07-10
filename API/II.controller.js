const {logger} = require('../startup/logger')
const generateWebToken = require('../auth/generateToken');

const { create, show, update, deleteModule, login } = require('./I.service');

module.exports = {
  create: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).send('Database connection error');
      }
      logger.info('New module added');
      return res.status(200).send(results);
    });
  },
  show: (req, res) => {
    show((err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).send('Database connection error');
      }
      logger.info('All modules returned');
      return res.status(200).send(results);
    });
  },
  update: (req, res) => {
    const body = req.body;
    const module_id = req.params.module_id;
    console.log(module_id);
    update(module_id, body, (err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).send('Database connection error');
      }
      logger.info(`Module with is ${module_id} updated`);
      return res.status(200).send(results);
    });
  },
  deleteModule: (req, res) => {
    const module_id = req.params.module_id;
    deleteModule(module_id, (err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).send('Database connection error');
      }
      logger.info(`Module with is ${module_id} updated`);
      return res.status(200).send(results);
    });
  },
  login: (req, res) => {
    const username = req.params.username;
    const password = req.body.password;
    login(username, (err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).send('Database connection error.');
      }

      if (results.length === 0) {
        logger.error('Invalid username.');
        return res.status(404).send("Invalid username.");
      }
      else if (password != results[0].password) {
        logger.error('Invalid password.');
        return res.status(404).send("Invalid password.");
      }

      const jsontoken = generateWebToken({ result: results });
      logger.info(`User ${username} logged in.`);
      return res.status(200).send(jsontoken);
    });
  },
}
