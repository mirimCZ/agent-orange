;define('fileupload/fileupload', [
  'fileupload/constants',
  'hbs!fileupload/page',
  'immutable',
  'redux/dux'
], function(constants, page, Immutable, dux) {
  function getModuleElement() {
    return document.getElementById(constants.get('elementId'));
  }

  var render = function(state) {
    var state = dux.getState().fileUpload.toObject();
    // Dont do .inerHTML = it is dangerous.
    getModuleElement().innerHTML = page(state);
  }

  setTimeout(dux.actions.addFiles, 1500);

  return {
    render: function() {
      render();
    }
  }
})
