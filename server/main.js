let MongoClient = require('mongodb').MongoClient;
let express = require('express');
let bodyParser = require('body-parser');
let Config = require('../config');

let app = express();
let db;

MongoClient.connect(Config.urls.mongo, function (err, client) {
  if (err) throw err;

  db = client.db('eatm');

  app.listen(8081);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get('/sessions', function (req, res) {
  db.collection('sessions').find().toArray(function (err, result) {
    if (err) throw err;

    res.send(result);
  })
});

app.post('/session', function (req, res) {
  db.collection("sessions").insertOne({
    history: req.body.history,
    name: req.body.name,
    submitted: new Date()
  }, function(err, res) {
    if (err) throw err;
  });
});

app.get('/reset', function (req, res) {
  db.collection("sessions").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
  });

  db.createCollection("sessions", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
  });
});


