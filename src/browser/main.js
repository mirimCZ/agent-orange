console.log('call for require');
requirejs.config({
  baseUrl: "./",
  paths: {
  }
});

define('main', ['fileupload/index'], function(fup) {
  console.log('fup', fup);
})
