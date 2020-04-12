const express = require("express");
const router = express.Router();

const connection = require("../db/db");

// get list of users
router.get("", (req, res) => {

  let range = req.query.range;
  range = range.replace(",","-")
  range = range.slice(1,-1)
  const range_array = range.split('-');
    let from = Number(range_array[0]);
    let to = Number(range_array[1]);
    let row_count = to - from + 1;

  const pathname = req.path.substr(1);
  let filtry = JSON.parse(req.query.filter);
  console.log(filtry.q);
  console.log(filtry);

  let sql_q = "select COUNT(id) as count from users; select * from users ORDER BY "+req.query.sortBy+" "+req.query.sortOrder+" LIMIT "+from+", "+row_count+" ";
  //console.log(sql_q);

  connection.query(sql_q, [2, 1], (err, result) => {
    if (err) {
      res.status(404).send({ message: "error occured" });
    } else {
        console.log(result[1]);
    let numRows = JSON.parse(JSON.stringify(result[0]));
    numRows = result[0][0].count;

    let con_range = pathname + " " + range + "/" + numRows;

    res.header("Content-Range", con_range);
    res.json(JSON.parse(JSON.stringify(result[1])));
    }
  });
});

//get user by ID
router.get("/:id", (req, res) => {
  let id = req.params.id;
  console.log(req.params.id);
  connection.query(
    "select * from users where users.id =" + id,
    (error, result) => {
      if (error) {
        res.status(404).send({ message: "error occured" });
      } else {
        //res.status(201).send({ data: result });
        res.status(201).json(JSON.parse(JSON.stringify(result[0])));
        //res.json(JSON.parse(JSON.stringify(result)));
      }
    }
  );
});

//update user
router.put("/:id", (req, res) => {
  var name = req.body.name;
  let email = req.body.email;
  if (name == null) {
    res.send({ message: "name required" });
  } else if (email == null) {
    res.send({ message: "email required" });
  } else {
    connection.query(
      "update users set name='" +
        name +
        "',email='" +
        email +
        "' where users.id='" +
        req.params.id +
        "' ",
      (error, result) => {
        if (error) {
          res.status(404).send({ message: "error occured" });
        } else {
          res.status(201).json(JSON.parse(JSON.stringify(req.body)));
        }
      }
    );
  }
});

//create user
router.post("", (req, res) => {
  var name = req.body.name;
  let email = req.body.email;

  if (name == null) {
    res.send({ message: "name required" });
  } else if (email == null) {
    res.send({ message: "email required" });
  } else {
    connection.query(
      "insert into users(name,email) values ('" + name + "','" + email + "')",
      (error, result) => {
        if (error) {
          res.status(404).send({ message: "error occured" });
        } else {
          result = { data: {id: result.insertId} };
          res.status(200).json(result.data);
        }
      }
    );
  }
});

//delete user
router.delete("/:id", (req, res) => {

  connection.query(

    "delete from users where users.id='" + req.params.id + "'",
    (error, result) => {
      if (error) {
        res.status(404).send({ message: "error occured" });
      } else {
        res.status(200).send({ users: result });
      }
    }
  );
});

module.exports = router;
