var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var path = require('path');

gulp.task('js', function() {
    plugins.requirejs({
      name: 'main',
      baseUrl: 'src/browser',
      out: 'build.js',
      stubModules: ['hbs'],
      pragmasOnSave: {
        excludeHbsParser: true,
        excludeHbs: true,
        excludeAfterBuild: true
      },
      paths: {
        hbs: '../../node_modules/require-handlebars-plugin/hbs'
      },
      include: [
        '../../node_modules/requirejs/require.js',
        '../../node_modules/require-handlebars-plugin/hbs/handlebars.runtime'
      ]
    })
    .pipe(gulp.dest('./build/')); // pipe it to the output DIR
});

// TODO: run server from gulp, single command start ftw
gulp.task('server', function() {
  path.normalize('node src/server/main.js')
})


gulp.task('default', ['js']);
