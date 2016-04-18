var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var path = require('path');

gulp.task('js', function() {
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

// TODO: run server from gulp, single command start ftw
gulp.task('server', function() {
  path.normalize('node src/server/main.js')
})


gulp.task('default', ['js']);
