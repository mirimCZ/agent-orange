;define('fileupload/reducer', [
  'fileupload/constants',
  'immutable',
  'uid'
], function(constants, immutable, uid) {

  function uploadFileStatus(state, file, statusKey) {
    return state.setIn(
      ['files', file.get('id')],
      file.set('status', constants.get('status').get(statusKey))
    );
  }

  return function(state, action) {
    if (!state) {
      return immutable.Map(
        // TODO: refactor this?
        JSON.parse(
          document.getElementById(constants.get('elementId')).getAttribute('data-intialState')
        )
      ).merge({
        files: immutable.Map()
      });
    }

    switch(action.type) {
      case constants.get('actions').ADD_FILES:
        var files = immutable.Map(action.payload.files).reduce(function(result, file) {
          var id = uid();
          // NOTE: this Map should probably be Record
          return result.set(id, immutable.Map({
            id: id,
            name: file.name,
            size: file.size,
            type: file.type,
            progress: 0,
            status: constants.get('status').get('inQueue'),
            rawFile: file
          }));
        }, new immutable.Map());

        return state
          .update('files', function(oldFiles) {
            return oldFiles.merge(files);
          });
        break;

      case constants.get('actions').UPLOAD_FILE_START:
        return uploadFileStatus(state, actions.payload.file, 'uploadInProgress');
        break;

      default:
        return state;
    }
  }
})
