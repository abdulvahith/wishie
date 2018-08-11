
var express = require('express');
var app = express();
app.use(express.static('public'));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var url = "mongodb://abdul_vahi:Vahi123%24@cluster0-shard-00-00-nuxza.mongodb.net:27017,cluster0-shard-00-01-nuxza.mongodb.net:27017,cluster0-shard-00-02-nuxza.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

// Database Name
const dbName = 'techcafe';

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());


app.get("/admin", function (request, response) {
    MongoClient.connect(url, function(err, db) {
       if (err) throw err;
        var dbo = db.db(dbName);
        var existUser=[];

        dbo.collection("studentsRegistration").find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log("success");
          console.log(JSON.stringify(result));
          var arr = result;
          var regStds= "";
          for(var i in arr){
              regStds += "Name = "+arr[i].name+"| MobileNumber = "+arr[i].number+"| course = "+arr[i].course+"\n";
          }
           response.end(regStds);
          db.close();
        });
      });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
