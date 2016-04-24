;define('fileupload/fileupload', [
  'fileupload/constants',
  'hbs!fileupload/page',
  'immutable',
  'jquery',
  'redux/dux',
], function(constants, page, Immutable, jquery, dux) {

  var element = jQuery('#' + constants.get('elementId'));

  function addListeners() {
    element.on('change', '#file-upload-input', function(event) {
      dux.actions.addFiles(event.target.files);
    })
  }

  function render() {
    // NOTE: deeply transfer to plain objects
    var state = JSON.parse(JSON.stringify(dux.getState().fileUpload));
    element.html(page(state));
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
