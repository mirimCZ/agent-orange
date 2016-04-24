;define('fileupload/index', [
  'fileupload/constants',
  'hbs!fileupload/page',
  'immutable',
  'redux-instance'
], function(constants, page, Immutable, dux) {
  function getModuleElement() {
    return document.getElementById('fileupload');
  }

  console.log(dux.getState().fileUpload.toObject());

  var render = function(state) {
    // Dont do .inerHTML = it is dangerous.
    getModuleElement().innerHTML = page();
  }
  return {
    render: function() {
      render();
    },
  }
})
