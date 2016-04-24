;define('fileupload/reducer', [
  'fileupload/actions',
  'fileupload/constants',
  'immutable',
  'uid'
], function(actions, constants, immutable, uid) {

  return function(state, action) {
    if (!state) {
      return immutable.Map(
        // TODO: refactor this?
        JSON.parse(
          document.getElementById(constants.get('elementId')).getAttribute('data-intialState')
        )
      ).merge({
        files: immutable.List(),
        rawFiles: []
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
            status: constants.get('status').inQueue,
            rawFile: file
          }));
        }, new immutable.Map());

        return state
          .update('files', function(oldFiles) {
            return oldFiles.merge(files);
          });
        break;

      default:
        return state;
    }
  }
})
