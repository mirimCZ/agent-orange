;define('fileupload/constants', ['immutable'], function(immutable) {
  // TODO: deepmap & spread problem?
  return immutable.Map({
    elementId: 'fileupload',
    actions: {
      ADD_FILES: 'ADD_FILES',
      UPLOAD_FILE: 'UPLOAD_FILE'
    },
    status: {
      uploadInProgress: -2,
      inQueue: -1,
      ok: 0,
    }
  })
})
