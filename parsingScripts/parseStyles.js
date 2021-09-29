const fs = require('fs');
const parse = require('csv-parse');
const path = require('path');

const CSV_DIR = path.resolve(__dirname, '..', 'csv');

const header = 'style_id,product_id,name,sale_price,original_price,default_style';
const writeFile = fs.createWriteStream(path.resolve(CSV_DIR, 'cleanedStyles.csv'));
writeFile.write(header);

const errorRows = [];
const startTime = new Date();
console.log('Parsing styles.csv...');
fs.createReadStream(path.resolve(CSV_DIR, 'styles.csv'))
  .pipe(
    parse({
      delimiter: ',',
      from_line: 2,
      // to_line: 50,
    }),
  )
  .on('data', (row) => {
    if (
      row.length !== 6
      || isNaN(row[0])
      || isNaN(row[1])
      || row[2].length > 50
      || row[5] > 1
      || row[5] < 0
    ) {
      errorRows.push(row);
    } else if (isNaN(+row[3]) && row[3] !== 'null') {
      errorRows.push(row);
    } else if (isNaN(+row[4]) && row[4] !== 'null') {
      errorRows.push(row);
    } else {
      writeFile.write(`\n${row[0]},${row[1]},"${row[2]}",${row[3]},${row[4]},${row[5]}`);
    }
  })
  .on('end', () => {
    const endTime = new Date();
    console.log(`${endTime - startTime}ms to complete operation`);
    console.log('These rows have problems');
    console.log(errorRows);
  });
