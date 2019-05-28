console.log('csvToJsonTest.js start');
const fs = require('fs');
const csv = require('csvtojson');
const csvFilePath = 'public/csv-dir/1764edges.csv';
const jsonFileResultPath = 'public/json-result/1764edges.json';
csv()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    // console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */
    fs.writeFile(jsonFileResultPath, JSON.stringify(jsonObj), err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File has been created');
    });
  });

// Async / await usage
// async function function1() {
//   const jsonArray = await csv().fromFile(csvFilePath);
//   console.log('jsonArray', jsonArray);
// }

// function1();
