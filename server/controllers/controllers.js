const models = require('../../db/models/models');

const controllers = {
  products: (req, res) => {
    const args = {};
    if (req.query) {
      args.page = req.query.page;
      args.count = req.query.count;
    }
    models.products(args, (err, data) => {
      if (err) {
        console.error('Error on products endpoint\n', err);
        res.status(400).send(err);
      } else {
        const results = data.rows;
        res.status(200).send(results);
      }
    });
  },
  productId: (req, res) => {
    models.productId(req.params.id, (err, data) => {
      if (err) {
        console.error('Error on product id endpoint\n', err);
        res.status(400).send(err);
      } else {
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
      }
    });
  },
  styles: (req, res) => {
    models.styles(req.params.id, (err, data) => {
      if (err) {
        console.error('Error on styles endpoint\n', err);
        res.status(400).send(err);
      } else {
        const productInfo = data.rows;
        productInfo.forEach((style, idx) => {
          const photosArr = style.photos;
          let tempUrl;
          const uniquePhotos = [];
          photosArr.forEach((url) => {
            if (JSON.stringify(tempUrl) !== JSON.stringify(url)) {
              uniquePhotos.push(url);
            }
            tempUrl = url;
          });
          productInfo[idx].photos = uniquePhotos;
        });
        res.status(200).send(productInfo);
      }
    });
  },
};

module.exports = controllers;
