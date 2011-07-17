var util = require('util');
var express = require('express');
var Spider = require('spider');
var mount_plugins = require('./plugin.js').mount_plugins;


var app = express.createServer();
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

//setup the spider and include all routes on startup
var spider = new Spider();
var plugin_cb = function plugin_cb( plugin ) {  
  plugin.mount( spider );
};
mount_plugins( './plugins', plugin_cb );

app.post('/', function(req, res){

  var uri = req.body.uri;      
  spider.get(uri);
  res.end('ok');
});
app.listen(4000);

