var express = require('express');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;

// from boilerplate !!!

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json')
  .get(function(req, res, next) {
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })
/// end of boilerplate

app.get('/api', function(req,res){

    res.json({
        "ipaddress": req.connection.remoteAddress,
        "language": req.headers["accept-language"].split(",")[0],
        "software": req.headers["user-agent"].split("(")[1].split(")")[0]
    });

});

app.listen(port, function(req,res){
    console.log("Listening on port: " + port);
})