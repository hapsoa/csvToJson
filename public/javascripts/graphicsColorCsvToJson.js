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

    const filteredUnData = filterDataProperty(jsonObj);

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
function filterDataProperty(unData) {
  const filteredUnData = _.map(unData, datum => {
    return {
      Ind: Number(datum.Ind),
      Type: datum.Type,
      Lind: Number(datum.Lind),
      Rind: Number(datum.Rind),
      NumLeaves: Number(datum.NumLeaves),
      R: Number(datum.R),
      G: Number(datum.G),
      B: Number(datum.B),
      Ward: Number(datum.Ward),
      Sse: Number(datum.Sse),
      Var: Number(datum.Var),
      Std: Number(datum.Std),
      NumClusterSamples: Number(datum.NumClusterSamples)
    };
  });

  console.log("filteredUnData", filteredUnData);
  return filteredUnData;
}
