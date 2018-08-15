
var express = require('express');
var app = express();
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var url = "mongodb://abdul_vahi:Vahi123%24@cluster0-shard-00-00-nuxza.mongodb.net:27017,cluster0-shard-00-01-nuxza.mongodb.net:27017,cluster0-shard-00-02-nuxza.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

// Database Name
const dbName = 'wishie';

var bodyParser = require('body-parser');

app.use(express.static('public'));
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// parse application/json
app.use(bodyParser.json())

//session variable
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'whishieSec',
  resave: false,
  saveUninitialized: true,
  cookie: {
            secure: true,
            maxAge: 600000
          }
}))
var sess;

app.get("/", function (request, response) {
  console.log(__dirname+ '/index.html');
  response.sendFile(__dirname + '/index.html');
});

app.get("/userform", function (request, response) {
  // sess = request.session;
  console.log("***************************userpage*****************");
  console.log(sess);
  console.log("*********************88");
  console.log(sess);
  console.log(__dirname + '/module/user-form/index.html');
  response.sendFile(__dirname + '/public/module/user-form/index.html');
  // response.end("Haiii");
});

app.get("/getgreetingdata/:id", urlencodedParser ,function (req,res) {
  var greetId = req.params.id.toString();
  MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
     if (err) throw err;
      var dbo = db.db(dbName);
      var existUser=[];
      if(greetId=="newgreet"){
        var curUserMail = sess.cookie.mailId;
        var sessionMail = curUserMail;
        dbo.collection("wishData").find({ signUp_mail:sessionMail}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          var resData = result[0];
          db.close();
          res.end(JSON.stringify(result[0]));
        });
      }
      else{
        var curGreetId = greetId.substring(0,greetId.length-2);
        var greetIndex = greetId.charAt(greetId.length-1);
        dbo.collection("wishData").find({ greetingId:curGreetId }).toArray(function(err, result) {
          if (err) throw err;
          console.log(result.length)
          existUser= result;
          console.log(result);
          db.close();
          res.end(JSON.stringify(result[0].userform[greetIndex]));
        });
      }
    });
})

  // app.use(function (req, res, next) {
  //     res.header('Content-Type', 'application/json');
  //     next();
  // });

app.post('/userformdata', urlencodedParser, function(req, res) {
   // sess=req.session;
  console.log("********session*************");
  console.log(sess);
  console.log("***************************");
 var body = req.body;
  console.log(body);
  var resUserForm;
  res.setHeader('Content-Type', 'application/json');
  MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
     if (err) throw err;
      var dbo = db.db(dbName);
      var existUser=[];
      // var curUserMail = "abdul.vahith126@gmail.com";
      var curUserMail = sess.cookie.mailId;
      dbo.collection("wishData").find({ signUp_mail:curUserMail }).toArray(function(err, result) {
        if (err) throw err;
        existUser = result;
        var myquery = { signUp_mail: curUserMail };
        existUser[0].greetingId = curUserMail.substring(0,curUserMail.indexOf("@"));
        existUser[0].userform.push(body);
        var newvalues = { $set: existUser[0] };
        dbo.collection("wishData").updateOne(myquery, newvalues, function(err, res_1) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
        db.close();
        res.end(JSON.stringify({res:'success'}));
      });
    });
});

app.get("/greetingcard", function (request, response) {
  console.log(__dirname + '/module/user-form/index.html');
  response.sendFile(__dirname + '/public/module/3d-birthday-card/index.html');
  // response.end("Haiii");
});

app.get('/getgreeting/:id', function(req, res) {
  // var greetId = req.params.id.toString();
  // var curGreetId = greetId.substring(0,greetId.length-2);
  // var greetIndex = greetId.charAt(greetId.length-1);
  // MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  //    if (err) throw err;
  //     var dbo = db.db(dbName);
  //     var existUser=[];
  //     dbo.collection("wishData").find({ greetingId:curGreetId }).toArray(function(err, result) {
  //       if (err) throw err;
  //       console.log(result.length)
  //       existUser= result;
  //       console.log(result);
  //       //res.write(JSON.stringify(result[0].userform[greetIndex]));
  //       db.close();
        res.sendFile(__dirname + '/public/module/3d-birthday-card/index.html');
    //   });
    // });
});

app.post('/signupDetail', urlencodedParser, function(req, res) {
    var body = req.body;
    console.log(body);
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
              myobj["userform"] = [];
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

app.post('/userLogin', urlencodedParser, function(req, res) {
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
          else{
            sess=req.session;
            sess.cookie.mailId = body.log_mail;
            res.end("success");
          }
          db.close();
        });
  });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
