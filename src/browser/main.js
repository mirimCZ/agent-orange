requirejs.config({
  baseUrl: "./",
  paths: {
  }
});

define('main', ['fileupload/index'], function(fup) {
  return function() {
    console.log('main executed');
    console.log('fup', fup);
    console.log(fup.page());
  }
})
