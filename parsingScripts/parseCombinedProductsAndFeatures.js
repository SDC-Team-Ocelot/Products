const fs = require('fs');
const parse = require('csv-parse');
const path = require('path');

const CSV_DIR = path.resolve(__dirname, '..', 'csv');

const header = 'id,name,slogan,description,category,default_price,relatedArray,featuresArray';
const writeFile = fs.createWriteStream(path.resolve(CSV_DIR, 'cleanedCombinedProductsAndFeatures.csv'));
writeFile.write(header);

const startTime = new Date();
console.log('Parsing combinedProductsAndFeatures.csv...');
fs.createReadStream(path.resolve(CSV_DIR, 'combineProductAndFeatures.csv'))
  .pipe(
    parse({
      delimiter: ',',
      from_line: 2,
    }),
  )
  .on('data', (row) => {
    writeFile.write(`\n${row[0]},${row[1]},${row[2]},${row[3]},${row[4]},"${row[5]}","${row[6]}","${row[7]}"`);
  })
  .on('end', () => {
    const endTime = new Date();
    console.log(`${endTime - startTime}ms to complete operation`);
  });
