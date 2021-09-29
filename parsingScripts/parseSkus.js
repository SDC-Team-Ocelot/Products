const fs = require('fs');
const parse = require('csv-parse');
const path = require('path');

const CSV_DIR = path.resolve(__dirname, '..', 'csv');

const header = 'id,style_id,size,quantity';
const writeFile = fs.createWriteStream(path.resolve(CSV_DIR, 'cleanedSkus.csv'));
writeFile.write(header);

const errorRows = [];
const startTime = new Date();
console.log('Parsing skus.csv...');
fs.createReadStream(path.resolve(CSV_DIR, 'skus.csv'))
  .pipe(
    parse({
      delimiter: ',',
      from_line: 2,
    }),
  )
  .on('data', (row) => {
    if (
      row.length !== 4
      || isNaN(row[0])
      || isNaN(row[1])
      || row[2].length > 50
      || isNaN(row[3])
    ) {
      errorRows.push(row);
    } else {
      writeFile.write(`\n${row[0]},${row[1]},"${row[2]}",${row[3]}`);
    }
  })
  .on('end', () => {
    const endTime = new Date();
    console.log(`${endTime - startTime}ms to complete operation`);
    console.log('These rows have length problems');
    console.log(errorRows);
  });
