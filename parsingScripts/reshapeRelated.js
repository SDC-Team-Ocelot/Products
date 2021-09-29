const fs = require('fs');
const parse = require('csv-parse');
const path = require('path');

const CSV_DIR = path.resolve(__dirname, '..', 'csv');

const header = 'id,product_id,relatedArray';
const writeFile = fs.createWriteStream(path.resolve(CSV_DIR, 'reshapedRelated.csv'));
writeFile.write(header);

const startTime = new Date();

let idx = 1;
let tempArray = [];
let prevID = 0;

console.log('Reshaping related.csv...');

fs.createReadStream(path.resolve(CSV_DIR, 'cleanedRelated.csv'))
  .pipe(
    parse({
      delimiter: ',',
      from_line: 2,
    }),
  )
  .on('data', (row) => {
    const productId = JSON.parse(row[1]);
    const relatedId = JSON.parse(row[2]);

    if (prevID === 0) {
      prevID = productId;
      tempArray.push(relatedId);
    } else if (productId !== prevID) {
      writeFile.write(`\n${idx},${prevID},"[${tempArray}]"`);
      prevID = productId;
      idx += 1;
      tempArray = [];
      tempArray.push(relatedId);
    } else if (prevID !== idx) {
      writeFile.write(`\n${idx},${idx},"[]"`);
      idx += 1;
    } else {
      tempArray.push(relatedId);
    }
  })
  .on('end', () => {
    writeFile.write(`\n${idx},${prevID},"[${tempArray}]"`);
    const endTime = new Date();
    console.log(`${endTime - startTime}ms to reshaped related`);
  });
