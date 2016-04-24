;define('fileupload/constants', ['immutable'], function(immutable) {
  // TODO: deepmap & spread problem?
  return immutable.Map({
    elementId: 'fileupload',
    actions: {
      ADD_FILES: 'ADD_FILES'
    },
    status: {
      ok: 0,
      inQueue: 1
    }
  })
})
