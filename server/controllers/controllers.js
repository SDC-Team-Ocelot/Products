const models = require('../../db/models/models');

const controllers = {
  products: async (req, res) => {
    const args = {};
    if (req.query) {
      args.page = req.query.page;
      args.count = req.query.count;
    }
    try {
      const data = await models.products(args);
      const results = data.rows;
      res.status(200).send(results);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  productId: async (req, res) => {
    try {
      const data = await models.productId(req.params.id);
      const productInfo = data.rows[0];
      const featuresArray = (productInfo.featuresarray).slice(1, -1).split(',');
      const outputArray = [];
      for (let i = 0; i < featuresArray.length; i += 2) {
        outputArray.push({
          feature: featuresArray[i],
          value: featuresArray[i + 1],
        });
      }
      const results = {
        id: productInfo.id,
        name: productInfo.name,
        slogan: productInfo.slogan,
        description: productInfo.description,
        category: productInfo.category,
        default_price: productInfo.default_price,
        features: outputArray,
      };
      res.status(200).send(results);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  styles: async (req, res) => {
    try {
      const data = await models.styles(req.params.id);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  related: async (req, res) => {
    try {
      const data = await models.related(req.params.id);
      const { relatedarray } = data.rows[0];
      const results = JSON.parse(relatedarray);
      res.status(200).send(results);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};

module.exports = controllers;
