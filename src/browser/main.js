requirejs.config({
  baseUrl: "./",
  paths: {
  }
});

define('main', ['fileupload/index', 'redux/dux'], function(fup, dux) {
  return function() {
    dux.subscribe(function() {
      fup.render();
    });
  }
});

define('immutable', ['../../node_modules/immutable/dist/immutable.js'], function(Immutable) {
  return Immutable;
});

define('redux', ['../../node_modules/redux/dist/redux.js'], function(Redux) {
  return Redux;
});

define('redux-logger', ['../../node_modules/redux-logger/dist/index.js'], function(Logger) {
  return Logger;
})
