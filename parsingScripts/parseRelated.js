const fs = require('fs');
const parse = require('csv-parse');
const path = require('path');

const CSV_DIR = path.resolve(__dirname, '..', 'csv');

const header = 'id,product_id,related_id';
const writeFile = fs.createWriteStream(path.resolve(CSV_DIR, 'cleanedRelated.csv'));
writeFile.write(header);

const errorRows = [];
const startTime = new Date();
console.log('Parsing related.csv...');
fs.createReadStream(path.resolve(CSV_DIR, 'related.csv'))
  .pipe(
    parse({
      delimiter: ',',
      from_line: 2,
    }),
  )
  .on('data', (row) => {
    if (
      row.length !== 3
      || isNaN(row[0])
      || isNaN(row[1])
      || isNaN(row[2])
    ) {
      errorRows.push(row);
    } else {
      writeFile.write(`\n${row[0]},${row[1]},${row[2]}`);
    }
  })
  .on('end', () => {
    const endTime = new Date();
    console.log(`${endTime - startTime}ms to complete operation`);
    console.log('These rows have problems');
    console.log(errorRows);
  });
