requirejs.config({
  baseUrl: "./",
  paths: {
  }
});

define('main', ['fileupload/fileupload', 'redux/dux'], function(fup, dux) {
  return function() {
    dux.subscribe(function() {
      fup.render();
    });
    fup.main();
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

define('uid', function() {
  return function() {
    return ("0000" + (Math.random() * Math.pow(36,4) << 0).toString(36)).slice(-4)
  }
});

// TODO: move elsehere
define('templates/helpers/eacho', ['hbs/handlebars'], function(Handlebars) {
  var eacho = function(context, options) {
    var ret = "";
    var keys = Object.keys(context);

    keys.map(function(key) {
      ret = ret + options.fn(context[key][1]);
    })

    return ret;
  };

  Handlebars.registerHelper('eacho', eacho);
  return eacho;
});
