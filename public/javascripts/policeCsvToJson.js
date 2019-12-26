console.log("csvToJsonTest.js start");
const fs = require("fs");
const csv = require("csvtojson");
const _ = require("lodash");
// csv 파일의 경로
// const csvFilePath = "public/csv-dir/UNdata.csv";
const csvFilePath = "public/csv-dir/police-dir/2.human_edge.csv";
// 결과물인 json 파일의 경로
// const jsonFileResultPath = "public/json-result/UNdata.json";
const jsonFileResultPath = "public/json-result/police-dir/human_edge_0.3.json";
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

    // const filteredUnData = filterUnDataProperty(jsonObj);
    // const newJsonObj = filterHumanEdge(jsonObj);
    const newJsonObj = filterHumanEdge(jsonObj);



    fs.writeFile(jsonFileResultPath, JSON.stringify(newJsonObj, null, 4), err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File has been created");
    });
  });
function filterHuman(jsonObj) {
  let arr = [];
  _.forEach(jsonObj, (o)=>{
    arr.push(o['직업'])
  });
  arr = _.uniq(arr);
  let hash = _.chain(jsonObj)
  .map(o => o['직업'])
  .values();

  console.log(arr);

  const hash2 = {};
  for(let i = 0 ; i <arr.length ; i++) {
    hash2[arr[i]] = i;
  }

  console.log(hash2);

  let filtered = _.chain(jsonObj)
  .filter(e => e['주소지'].includes('서울특별시')).values();

  // console.log(_.map(filtered, f => f['직업']));

  return [filtered, hash2];

}
function filterHumanEdge(jsonObj) {
  console.log(jsonObj)
  let filtered = _.chain(jsonObj)

    .map(element => {
      element.source = +element.ID_From + 10000;
      element.target = +element.ID_To + 10000;
      return {
        source: element.source,
        target: element.target,
        value: +element.weight
      };
    })
    .filter(e => e.value >= 0.3)
    .values();
    console.log(filtered);
  return filtered;
}

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
