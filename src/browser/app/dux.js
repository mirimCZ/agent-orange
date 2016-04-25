;define('app/dux', [
  'redux',
  'redux-logger',
  'redux-promise-middleware',
  'app/mapDispatchToActions',
  'app/combineReducers'
], function(Redux, Logger, Promises, mapDispatchToActions, combineReducers) {
  // TODO: solve initial state

  var logger = Logger({
    collapsed: true,
    // Convert immutablejs to JSON.
    stateTransformer: function(state) {
      return JSON.parse(JSON.stringify(state));
    }
  });

  var middlewares = Redux.applyMiddleware(Promises, logger);
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
