var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', function(req,res){

    res.json({
        "ipaddress": req.connection.remoteAddress,
        "language": req.headers["accept-language"].split(",")[0],
        "software": req.headers["user-agent"].split("(")[1].split(")")[0]
    });

});

app.listen(port, function(req,res){
    console.log("Listening on port: " + port);
})