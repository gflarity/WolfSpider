
$(document).ready( function() {

  var dropZone = document.querySelector('#drop-zone');

  dropZone.addEventListener('dragenter', function(event) {
    if (event.preventDefault) event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    this.className = 'hovering';
    return false;
  }, false);

  dropZone.addEventListener('dragover', function(event) {
    if (event.preventDefault) event.preventDefault(); // allows us to drop
    event.dataTransfer.dropEffect = 'copy';
    return false;
  }, false);

  dropZone.addEventListener('dragleave', function(event) {
    if (event.preventDefault) event.preventDefault(); // allows us to drop
    this.className = '';
    return false;
  }, false);

  dropZone.addEventListener('drop', function(event) {
    if (event.preventDefault) event.preventDefault();
    var uri = null;
    var types = event.dataTransfer.types;
    this.innerHTML = '';
    for (var i = 0; i < types.length; i++) {
      if (types[i] == 'text/uri-list') {
        var uri = event.dataTransfer.getData('text/uri-list');
        //post the data
        $.ajax({
          url: "/",
          type: 'post',
          data: 'uri=' + encodeURIComponent(uri),
          success: function(){
          }
        });
      }
    }

    return false;
  }, false);
});