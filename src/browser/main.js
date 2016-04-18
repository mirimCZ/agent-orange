requirejs.config({
  baseUrl: "./",
  paths: {
  }
});

requirejs(function() {
  // TODO: find way how to skip manual adding
  // ATM this is good enought
  require([
    'fileupload/index'
  ], function(fup) {
    console.log('main is running');
  })
})
