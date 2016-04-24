;define('redux/dux', [
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
    },
    subscribe: function(callback) {
      store.subscribe(callback);
    }
  };
});
