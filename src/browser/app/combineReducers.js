;define('app/combineReducers', [
  'redux',
  // NOTE: all reducers need to be registered here
  'fileupload/reducer'
  ],
  function(Redux, fup) {
    return function() {
      return Redux.combineReducers({
        fileUpload: fup
      });
    };
  }
);
