console.log("csvToJsonTest.js start");
const fs = require("fs");
const csv = require("csvtojson");
const _ = require("lodash");
// csv 파일의 경로
const csvFilePath = "public/csv-dir/2year-UNdata.csv";
// 결과물인 json 파일의 경로
const jsonFileResultPath = "public/json-result/2year-UNdata.json";
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

    const filteredUnData = filterUnDataProperty(jsonObj);

    fs.writeFile(jsonFileResultPath, JSON.stringify(filteredUnData), err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File has been created");
    });
  });

/**
 * unData중 필요없는 property를 제거하는 함수이다.
 */
function filterUnDataProperty(unData) {
  const filteredUnData = _.map(unData, datum => {
    return {
      rcid: datum.rcid,
      vote: datum.vote,
      Country: datum.Country,
      Countryname: datum.Countryname,
      year: datum.year
    };
  });

  console.log("filteredUnData", filteredUnData);
  return filteredUnData;
}
