console.log("csvToJsonTest.js start");
const fs = require("fs");
const csv = require("csvtojson");
const _ = require("lodash");
// csv 파일의 경로
const csvFilePath =
  "public/csv-dir/graphics-color/19983881105_e93c2d8279_b.jpg.csv";
// 결과물인 json 파일의 경로
const jsonFileResultPath =
  "public/json-result/graphics-color/19983881105_e93c2d8279_b.jpg.json";
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
      console.log("File has been created");
    });
  });
