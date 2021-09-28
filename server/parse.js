const fs = require('fs');
const parse = require('csv-parse');
const path = require('path');
const CSV_DIR = path.resolve(__dirname, '..', 'csv');

const csvData = [];
fs.createReadStream(path.resolve(CSV_DIR, 'product.csv'))
  .pipe(
    parse({
      delimiter: ',',
      from_line: 2,
      to_line: 5,
    }),
  )
  .on('data', (row) => {
    console.log(row);
    csvData.push(row);
  })
  .on('end', () => {
    console.log(csvData);
  });
