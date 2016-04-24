;define('fileupload/index', [
  'fileupload/constants',
  'hbs!fileupload/page',
  'immutable',
  'redux-instance'
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
  return {
    render: function() {
      render();
    },
  }
})
