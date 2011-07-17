var http = require('http');
var util = require('util');
var fs = require('fs');
var request = require('request');
  
var OUTDIR = '.';

var download = function download( link, filepath ) {
  
  request({uri:link, encoding : 'binary'}, function (error, res, body) {
      if (!error && res.statusCode == 200) {
          console.log(filepath);
          fs.writeFile( filepath, body, 'binary' );
      }
  });
};
    
 var on_matched = function on_matched(window, $, url ) {

  //usernam is the dir
  var dir = OUTDIR + '/' + $('#photo_username a')[0].href.split('/').pop();     
  
  
  //lazy but effective
  try {  
    fs.mkdirSync(dir, '0755');  
    directory_created = true;
  } 
  catch (e ) {
    //console.log( e.message );  
  }    

  var img_src = $('img#mainphoto')[0].src;
  var img_src_components = img_src.split('/');
  var filename = dir + '/' + 
                 img_src_components[img_src_components.length-2] +
                 '.jpg';
  
  download( img_src, filename );        
};
  
exports.mount = function( spider, outdir ) {
  
  if ( outdir ) {
    OUTDIR = outdir;
  }
  spider.route('500px.com', /\/photo\/\d+/, on_matched );
}
