;define('fileupload/fileupload', [
  'fileupload/constants',
  'hbs!fileupload/page',
  'immutable',
  'jquery',
  'app/dux',
], function(constants, page, Immutable, jquery, dux) {

  var element = jQuery('#' + constants.get('elementId'));

  function addListeners() {
    element.on('change', '.file-upload-input', function(event) {
      dux.actions.addFiles(event.target.files);
    });

    element.on('click', '.start-upload', function(event) {
      var fileToUpload = dux.getState().fileUpload.get('files').find(function(file) {
        return file.get('status') === constants.get('status').get('inQueue');
      });

      if(fileToUpload) {
        dux.actions.uploadFile(fileToUpload);
      } else {
        console.log('Nothing to upload?');
      }
    })
  }

  function render() {
    // NOTE: deeply transfer to plain objects
    var dateStart = new Date();
    var state = JSON.parse(JSON.stringify(dux.getState().fileUpload));
    element.html(page(state));
    var dateEnd = new Date();

    var timeStart = parseInt(dateStart.getSeconds() + '' + dateStart.getMilliseconds());
    var timeEnd = parseInt(dateEnd.getSeconds() + '' + dateEnd.getMilliseconds());

    console.log('render', timeEnd - timeStart);
  }

  return {
    main: function() {
      // NOTE: if needed can be serialized, but shouldnt be
      addListeners();
      render();
    },
    render: function() {
      render();
    }
  }
})
