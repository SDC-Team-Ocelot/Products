const router = require('express').Router();
const controllers = require('./controllers/controllers');

router.route('/test')
  .get(controllers.test);

module.exports = router;
