;define('fileupload/index', [
  'fileupload/constants',
  'hbs!fileupload/page'
], function(constants, page) {
  return {
    someKey: 'someValue',
    constants: constants,
    page: page
  }
})
