;define('app/dux', [
  'redux',
  'redux-logger',
  'app/promiseMiddleware',
  'app/mapDispatchToActions',
  'app/combineReducers'
], function(Redux, Logger, promiseMiddleware, mapDispatchToActions, combineReducers) {
  // TODO: solve initial state

  var logger = Logger({
    collapsed: true,
    // Convert immutablejs to JSON.
    stateTransformer: function(state) {
      return JSON.parse(JSON.stringify(state));
    }
  });

  var promises = promiseMiddleware({
    // TODO: this can be extracted to constants and wrapped around helper
    promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
  });

  var middlewares = Redux.applyMiddleware(promises, logger);
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
