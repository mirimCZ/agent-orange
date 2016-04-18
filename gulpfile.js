var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();


gulp.task('rqjs', function() {
    plugins.requirejs({
      name: 'main',
      baseUrl: 'src/browser',
      out: 'build.js',
      include: [
        '../../node_modules/requirejs/require.js'
      ]
    })
    .pipe(gulp.dest('./build/')); // pipe it to the output DIR
});
