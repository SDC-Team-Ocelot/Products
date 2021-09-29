const fs = require('fs');
const parse = require('csv-parse');
const path = require('path');

const CSV_DIR = path.resolve(__dirname, '..', 'csv');

const header = 'product_id,name,slogan,description,category,default_price,relatedArray';
const writeFile = fs.createWriteStream(path.resolve(CSV_DIR, 'cleanedCombinedProductAndRelated.csv'));
writeFile.write(header);

const startTime = new Date();
console.log('Parsing combinedProductsAndRelated.csv...');
fs.createReadStream(path.resolve(CSV_DIR, 'combinedProductsAndRelated.csv'))
  .pipe(
    parse({
      delimiter: ',',
      from_line: 2,
    }),
  )
  .on('data', (row) => {
    writeFile.write(`\n${row[0]},${row[1]},${row[2]},${row[3]},${row[4]},${row[5]},"${row[6]}"`);
  })
  .on('end', () => {
    const endTime = new Date();
    console.log(`${endTime - startTime}ms to complete operation`);
  });
