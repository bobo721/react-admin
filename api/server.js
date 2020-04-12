require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const corsOptions =  {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Expose-Headers", "X-Total-Count, Content-Range");
  next();
});


//Načtení modelů
var models = require("./models");
//sync databáze
models.sequelize.sync().then(function() {
  console.log('Databáze jede');
}).catch(function(err) {
  console.log(err, "Něco je špatně s databází");
});

//Načtení routs
require('./routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Vítejte na serveru',
}))

//const users_route = require("./routes/users");
//const tools_route = require("./routes/tools");
//app.use("/api/users", users_route);
//app.use("/api/tools", tools_route);

app.use(function(err, req, res, next){
  console.error(err.stack);
  return res.status(err.status).json({ message: err.message });
});

app.listen(8080, () => {
  console.log("server started");
});

