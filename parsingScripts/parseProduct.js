const fs = require('fs');
const parse = require('csv-parse');
const path = require('path');

const CSV_DIR = path.resolve(__dirname, '..', 'csv');

const header = 'product_id,name,slogan,description,category,default_price';
const writeFile = fs.createWriteStream(path.resolve(CSV_DIR, 'cleanedProduct.csv'));
writeFile.write(header);

const errorRows = [];
const startTime = new Date();
console.log('Parsing product.csv...');
fs.createReadStream(path.resolve(CSV_DIR, 'product.csv'))
  .pipe(
    parse({
      delimiter: ',',
      from_line: 2,
    }),
  )
  .on('data', (row) => {
    if (
      row.length !== 6
      || isNaN(row[0])
      || row[1].length > 50
      || row[2].length > 150
      || row[3].length > 500
      || row[4].length > 50
      || isNaN(+row[5])
    ) {
      errorRows.push(row);
    } else {
      writeFile.write(`\n${row[0]},"${row[1]}","${row[2]}","${row[3]}","${row[4]}",${row[5]}`);
    }
  })
  .on('end', () => {
    const endTime = new Date();
    console.log(`${endTime - startTime}ms to complete operation`);
    console.log('These rows have length problems');
    console.log(errorRows);
  });
