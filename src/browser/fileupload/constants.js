;define('fileupload/constants', ['immutable'], function(immutable) {
  // TODO: deepmap & spread problem?
  return immutable.Map({
    elementId: 'fileupload',
    actions: {
      ADD_FILES: 'ADD_FILES',
      // NOTE: UPLOAD_FILE action probably should not be exported since it should not be catched
      // in any reducer, only its async suffixed childs...
      UPLOAD_FILE: 'UPLOAD_FILE',
      UPLOAD_FILE_START: 'UPLOAD_FILE_START',
      UPLOAD_FILE_ERROR: 'UPLOAD_FILE_ERROR',
      UPLOAD_FILE_SUCCESS: 'UPLOAD_FILE_SUCCESS',
    },
    status: immutable.Map({
      uploadInProgress: -2,
      inQueue: -1,
      ok: 0,
    })
  })
})
