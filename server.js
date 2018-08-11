
var express = require('express');
var app = express();
app.use(express.static('public'));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var url = "mongodb://abdul_vahi:Vahi123%24@cluster0-shard-00-00-nuxza.mongodb.net:27017,cluster0-shard-00-01-nuxza.mongodb.net:27017,cluster0-shard-00-02-nuxza.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

// Database Name
const dbName = 'techcafe';

var bodyParser = require('body-parser')
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));
// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded());

app.use(express.static('public'));

app.get("/", function (request, response) {
  console.log(__dirname);
  response.sendFile(__dirname + '/index.html');
});

app.get("/userform", function (request, response) {
  console.log(__dirname);
  response.sendFile(__dirname + '/module/user-form/index.html');
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
