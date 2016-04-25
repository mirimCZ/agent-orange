requirejs.config({
  baseUrl: "./",
  paths: {
  }
});

define('main', ['fileupload/fileupload', 'app/dux'], function(fup, dux) {
  return function() {
    dux.subscribe(function() {
      fup.render();
    });
    fup.main();
  }
});

define('uid', function() {
  return function() {
    return ("0000" + (Math.random() * Math.pow(36,4) << 0).toString(36)).slice(-4)
  }
});

// TODO: move elsewhere
define('templates/helpers/map', ['hbs/handlebars'], function(Handlebars) {
  var map = function(context, options) {
    var ret = "";
    var keys = Object.keys(context);

    keys.map(function(key) {
      ret = ret + options.fn(context[key]);
    })

    return ret;
  };

  Handlebars.registerHelper('map', map);
  return map;
});
