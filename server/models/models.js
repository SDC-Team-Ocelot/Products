const pool = require('../../db');

const models = {
  test: (callback) => {
    callback(null, 'Success!');
  },
};

module.exports = models;
