const db = require('../index');

const models = {
  test: (callback) => {
    callback(null, 'Success!');
  },
};

module.exports = models;
