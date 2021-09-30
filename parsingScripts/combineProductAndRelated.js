const dataForge = require('data-forge');
require('data-forge-fs');

const path = require('path');
const CSV_DIR = path.resolve(__dirname, '..', 'csv');
const startTime = new Date();
// headers: product_id,name,slogan,description,category,default_price
const dataProducts = dataForge.readFileSync(path.resolve(CSV_DIR, 'cleanedProduct.csv')).parseCSV();

// headers: id,product_id,relatedArray
const dataRelated = dataForge.readFileSync(path.resolve(CSV_DIR, 'reshapedRelated.csv')).parseCSV();

console.log('starting join');
const dataMerged = dataProducts.join(
  dataRelated,

  (left) => left.id,
  (right) => right.product_id,

  (left, right) => ({
    id: left.id,
    name: JSON.stringify(left.name),
    slogan: JSON.stringify(left.slogan),
    description: JSON.stringify(left.description),
    category: JSON.stringify(left.category),
    default_price: left.default_price,
    relatedArray: right.relatedArray,
  }),
);

dataMerged.asCSV().writeFileSync(path.resolve(CSV_DIR, 'combinedProductsAndRelated.csv'));
const endTime = new Date();
console.log(`${endTime - startTime}ms to complete operation`);
