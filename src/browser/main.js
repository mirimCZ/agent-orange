requirejs.config({
  baseUrl: "./",
  paths: {
  }
});

define('main', ['fileupload/index'], function(fup) {
  return function() {
    fup.render();
  }
});

define('immutable', ['../../node_modules/immutable/dist/immutable.js'], function(Immutable) {
  return Immutable;
});

define('redux', ['../../node_modules/redux/dist/redux.js'], function(Redux) {
  return Redux;
});

define('redux-instance', [
  'redux',
  'redux/mapDispatchToActions',
  'redux/combineReducers'
], function(Redux, mapDispatchToActions, combineReducers) {
  // TODO: solve initial state
  var store = Redux.createStore(combineReducers(), {});
  var actions = mapDispatchToActions(store.dispatch);
  return {
    actions: actions,
    getState: function() {
      return store.getState();
    }
  };
})

define('redux/mapDispatchToActions', [
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

define('redux/combineReducers', [
  'redux',
  // NOTE: all reducers need to be registered here
  'fileupload/reducer'
  ],
  function(Redux, fup) {
    return function() {
      return Redux.combineReducers({
        fileUpload: fup
      });
    }
  }
)
