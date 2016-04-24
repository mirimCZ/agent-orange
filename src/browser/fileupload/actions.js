;define('fileupload/actions', ['immutable', 'fileupload/constants'], function(Immutable, constants) {
  var names = constants.get('actions')

  return Immutable.Map({
    addFiles: function(fileList) {
      return {
        type: names.ADD_FILES,
        payload: {
          files: fileList
        }
      }
    },
    uploadFile: function(file) {
      return {
        type: names.UPLOAD_FILE,
        payload: {
          file: file
        }
      }
    },
  });
})
