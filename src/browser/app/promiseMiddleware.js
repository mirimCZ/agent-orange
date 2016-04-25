;define('app/promiseMiddleware', function() {
  // TODO: extract to own module?
  function isPromise(value) {
    if (value !== null && typeof value === 'object') {
      return value && typeof value.then === 'function';
    }

    return false;
  }

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  return function() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypes;

    return function(ref) {
      var dispatch = ref.dispatch;

      return function(next) {
        return function(action) {
          if (action.payload) {
            if (!isPromise(action.payload) && !isPromise(action.payload.promise)) {
              return next(action);
            }
          } else {
            return next(action);
          }

          // Deconstruct the properties of the original action object to constants
          var type = action.type;
          var payload = action.payload;
          var meta = action.meta;

          var suffixes = (meta || {}).promiseTypeSuffixes || promiseTypeSuffixes;
          var PENDING = suffixes[0];
          var FULFILLED = suffixes[1];
          var REJECTED = suffixes[2];

          /**
           * @function getAction
           * @description Utility function for creating a rejected or fulfilled
           * flux standard action object.
           * @param {boolean} Is the action rejected?
           * @returns {object} action
           */
          var getAction = function getAction(newPayload, isRejected) {
            return _extends({
              type: type + '_' + (isRejected ? REJECTED : FULFILLED)
            }, newPayload ? {
              payload: newPayload
            } : {}, !!meta ? { meta: meta } : {}, isRejected ? {
              error: true
            } : {});
          };

          /**
           * Assign values for promise and data variables. In the case the payload
           * is an object with a `promise` and `data` property, the values of those
           * properties will be used. In the case the payload is a promise, the
           * value of the payload will be used and data will be null.
           */
          var promise = void 0;
          var data = void 0;

          if (!isPromise(action.payload) && typeof action.payload === 'object') {
            promise = payload.promise;
            data = payload.data;
          } else {
            promise = payload;
            data = null;
          }

          /**
           * First, dispatch the pending action. This flux standard action object
           * describes the pending state of a promise and will include any data
           * (for optimistic updates) and/or meta from the original action.
           */
          next(_extends({
            type: type + '_' + PENDING},
            !!data ? { payload: data } : {},
            !!meta ? { meta: meta } : {}
          ));

          /**
           * Second, dispatch a rejected or fulfilled action. This flux standard
           * action object will describe the resolved state of the promise. In
           * the case of a rejected promise, it will include an `error` property.
           *
           * In order to allow proper chaining of actions using `then`, a new
           * promise is constructed and returned. This promise will resolve
           * with two properties: (1) the value (if fulfilled) or reason
           * (if rejected) and (2) the flux standard action.
           */
          return new Promise(function (resolve, reject) {
            promise.then(function () {
              var value = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

              var resolvedAction = getAction(value, false);
              dispatch(resolvedAction);
              resolve({ value: value, action: resolvedAction });

              return;
            }, function () {
              var reason = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

              var rejectedAction = getAction(reason, true);
              dispatch(rejectedAction);
              reject({ reason: reason, action: rejectedAction });

              return;
            });
          });
        }
      }
    }
  }
});
