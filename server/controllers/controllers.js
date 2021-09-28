const models = require('../models/models');

const controllers = {
  test: (req, res) => {
    models.test((err, results) => {
      if (err) {
        console.error('Error on test', err);
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },
};

module.exports = controllers;
