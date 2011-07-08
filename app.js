var util = require('util');
var express = require('express');
var Spider = require('spider');

var app = express.createServer();
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

//setup the spider and include all routes on startup
var spider = new Spider();
require('./4chan.js').mount(spider);
require('./kodie.js').mount(spider);
require('./500px.js').mount(spider);
app.post('/', function(req, res){

  var uri = req.body.uri;      
  spider.get(uri);
  res.end('ok');
});
app.listen(4000);

