;define('redux/mapDispatchToActions', [
  'redux',
  'immutable',
  // NOTE: all actions need to be registered here
  'fileupload/actions'
], function(Redux, Immutable, fup) {
  var creators = Immutable.Map()
    .merge(fup)
    .filter(function(value) {
      return typeof value === 'function';
    })
    .toObject();

  return function(dispatch) {
    return Redux.bindActionCreators(creators, dispatch);
  }
});
