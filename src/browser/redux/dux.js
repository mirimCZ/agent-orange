;define('redux/dux', [
  'redux',
  'redux-logger',
  'redux/mapDispatchToActions',
  'redux/combineReducers'
], function(Redux, Logger, mapDispatchToActions, combineReducers) {
  // TODO: solve initial state

  var logger = Logger({
    collapsed: true,
    // Convert immutablejs to JSON.
    stateTransformer: function(state) {
      return JSON.parse(JSON.stringify(state));
    }
  });

  var middlewares = Redux.applyMiddleware(logger);
  var store = middlewares(Redux.createStore)(combineReducers(), {});
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
