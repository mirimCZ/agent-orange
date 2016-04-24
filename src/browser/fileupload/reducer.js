;define('fileupload/reducer', [
  'fileupload/actions',
  'fileupload/constants',
  'immutable'
], function(actions, constants, immutable) {
  return function(state, action) {
    if (!state) {
      return immutable.Map(
        JSON.parse(
          document.getElementById(constants.get('elementId')).getAttribute('data-intialState')
        )
      );
    }

    switch(action.type) {
      case constants.get('actions').ADD_FILES:
        console.log('reducer: add files', action.payload);
        return state;
        break;

      default:
        return state;
    }
  }
})
