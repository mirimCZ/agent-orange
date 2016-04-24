;define('fileupload/index', [
  'fileupload/constants',
  'hbs!fileupload/page',
  'immutable',
  'redux/dux'
], function(constants, page, Immutable, dux) {
  function getModuleElement() {
    return document.getElementById(constants.get('elementId'));
  }

  console.log(dux.getState().fileUpload.toObject());

  var render = function(state) {
    // Dont do .inerHTML = it is dangerous.
    var state = dux.getState().fileUpload.toObject();
    getModuleElement().innerHTML = page(state);
  }

  setTimeout(dux.actions.addFiles, 1500);

  return {
    render: function() {
      render();
    }
  }
})
