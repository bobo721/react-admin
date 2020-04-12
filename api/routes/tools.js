const express = require("express");
const router = express.Router();

const connection = require("../db/db");



router.get("", (req, res) => {

  console.log("tools test");
  console.log(JSON.parse(req.query.filter).free);
  let range = req.query.range;
  let free = JSON.parse(req.query.filter).free;
  range = range.replace(",","-")
  range = range.slice(1,-1)
  const range_array = range.split('-');
    let from = Number(range_array[0]);
    let to = Number(range_array[1]);
    let row_count = to - from + 1;

  const pathname = req.path.substr(1);
  let filtry = JSON.parse(req.query.filter);
  //console.log(filtry.q);


  let sql_q = "select COUNT(id) as count from tools; select * from tools WHERE free = "+free+" ORDER BY "+req.query.sortBy+" "+req.query.sortOrder+" LIMIT "+from+", "+row_count+"";
  //console.log(sql_q);

  connection.query(sql_q, [2, 1], (err, result) => {
    if (err) {
      res.status(404).send({ message: "error occured" });
    } else {

    let numRows = JSON.parse(JSON.stringify(result[0]));
    numRows = result[0][0].count;


    let con_range = pathname + " " + range + "/" + numRows;

    res.header("Content-Range", con_range);
    res.json(JSON.parse(JSON.stringify(result[1])));
    }

  });
});


module.exports = router;
