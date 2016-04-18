;define('fileupload/index', [
  'fileupload/constants'
], function(constants) {
  console.log('constants are', constants);
  return {
    someKey: 'someValue',
    constants: constants
  }
})
