const dataForge = require('data-forge');
require('data-forge-fs');

const path = require('path');
const CSV_DIR = path.resolve(__dirname, '..', 'csv');
const startTime = new Date();
// headers: id,name,slogan,description,category,default_price,relatedArray
const dataProducts = dataForge.readFileSync(path.resolve(CSV_DIR, 'cleanedCombinedProductAndRelated.csv')).parseCSV();

// headers: id,product_id,featuresArray
const dataRelated = dataForge.readFileSync(path.resolve(CSV_DIR, 'reshapedFeatures.csv')).parseCSV();

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
    relatedArray: left.relatedArray,
    featuresArray: right.featuresArray,
  }),
);

dataMerged.asCSV().writeFileSync(path.resolve(CSV_DIR, 'combineProductAndFeatures.csv'));
const endTime = new Date();
console.log(`${endTime - startTime}ms to complete operation`);
