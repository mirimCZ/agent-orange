;define('fileupload/constants', ['immutable'], function(immutable) {
  // TODO: deepmap & spread problem?
  return immutable.Map({
    elementId: 'fileupload',
    actions: {
      ADD_FILES: 'ADD_FILES'
    },
    STATUS: {
      OK: 0
    }
  })
})
