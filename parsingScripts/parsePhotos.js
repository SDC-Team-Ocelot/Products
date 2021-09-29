const fs = require('fs');
const parse = require('csv-parse');
const path = require('path');

const CSV_DIR = path.resolve(__dirname, '..', 'csv');

const header = 'id,style_id,url,thumbnail_url';
const writeFile = fs.createWriteStream(path.resolve(CSV_DIR, 'cleanedPhotos.csv'));
writeFile.write(header);

const errorRows = [];
const startTime = new Date();
console.log('Parsing photo.csv...');
fs.createReadStream(path.resolve(CSV_DIR, 'photos.csv'))
  .pipe(
    parse({
      delimiter: ',',
      from_line: 2,
      quote: '',
    }),
  )
  .on('data', (row) => {
    if (
      row.length !== 4
      || isNaN(row[0])
      || isNaN(row[1])
    ) {
      errorRows.push(row);
    } else if (
      row[2].slice(0, 1) !== '"' || row[2].slice(-1) !== '"'
      || row[3].slice(0, 1) !== '"' || row[3].slice(-1) !== '"'
    ) {
      const tempRow2 = row[2].replace(/["]+/g, '');
      const tempRow3 = row[3].replace(/["]+/g, '');
      writeFile.write(`\n${row[0]},${row[1]},"${tempRow2}","${tempRow3}"`);
    } else {
      writeFile.write(`\n${row[0]},${row[1]},${row[2]},${row[3]}`);
    }
  })
  .on('end', () => {
    const endTime = new Date();
    console.log(`${endTime - startTime}ms to complete operation`);
    console.log('These rows have length problems');
    console.log(errorRows);
  });
