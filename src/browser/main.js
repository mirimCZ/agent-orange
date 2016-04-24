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
