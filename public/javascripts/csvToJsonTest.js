console.log('asdf');

const csvFilePath = 'public/javascripts/edges.csv';
const csv = require('csvtojson');
csv()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */
  });

// Async / await usage
async function function1() {
  const jsonArray = await csv().fromFile(csvFilePath);
  console.log('jsonArray', jsonArray);
}

function1();
