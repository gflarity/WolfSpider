var fs = require('fs');

exports.mount_plugins = function mount_plugins( dir, plugin_cb ) {
  
  var files = fs.readdirSync( dir );
  var js_pattern = /\.js$/;
  for ( var i = 0; i < files.length; i++ ) {
    
    var file = files[i];
    if ( js_pattern.test( file ) ) {
    
      var plugin = require( dir + '/' + file );
      plugin_cb( plugin );
    }
  
  }
    
};
