
var express = require('express');
var app = express();
app.use(express.static('public'));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var url = "mongodb://abdul_vahi:Vahi123%24@cluster0-shard-00-00-nuxza.mongodb.net:27017,cluster0-shard-00-01-nuxza.mongodb.net:27017,cluster0-shard-00-02-nuxza.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

// Database Name
const dbName = 'wishie';

var bodyParser = require('body-parser');

app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/", function (request, response) {
  console.log(__dirname);
  response.sendFile(__dirname + '/index.html');
});

app.post('/signupDetail', function(req, res) {
    var body = req.body;
    console.log(req.body);
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
       if (err) throw err;
        var dbo = db.db(dbName);
        var existUser=[];
        dbo.collection("wishData").find({ signUp_mail:body.signUp_mail }).toArray(function(err, result) {
          if (err) throw err;
          console.log(result.length)
          existUser= result;
           if(result.length> 0){
             res.end("fail");
           }
          else{
              var myobj = req.body;
              dbo.collection("wishData").insertOne(myobj, function(err, res1) {
                if (err) throw err;
                console.log("1 document inserted");
                res.end("success");
              });
            }
          db.close();
        });
  });
});

app.post('/userLogin', function(req, res) {
    var body = req.body;
    console.log(req.body);
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
       if (err) throw err;
        var dbo = db.db(dbName);
        var existUser=[];
        dbo.collection("wishData").find({ signUp_mail:body.log_mail }).toArray(function(err, result) {
          if (err) throw err;
          console.log(result.length)
          existUser= result;
          console.log(result);
          if(result.length == 0)
            res.end("mail not found");
          else if(result[0].signUp_passwd != body.log_passwd)
            res.end("pass failed");
          else
            res.end("success");
          db.close();
        });
  });
});
app.get("/userform", function (request, response) {
  console.log(__dirname);
  response.sendFile(__dirname + '/module/user-form/index.html');
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
