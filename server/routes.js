const router = require('express').Router();
const controllers = require('./controllers/controllers');

router.route('/products')
  .get(controllers.products);

router.route('/products/:id')
  .get(controllers.productId);

router.route('/products/:id/styles')
  .get(controllers.styles);

router.route('/products/:id/related')
  .get(controllers.related);

module.exports = router;
