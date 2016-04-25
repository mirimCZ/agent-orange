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
      // NOTE: .js is added automaticaly and cannot be given explicitly
      paths: {
        hbs: '../../node_modules/require-handlebars-plugin/hbs',
        immutable: '../../node_modules/immutable/dist/immutable',
        jquery: '../../node_modules/jquery/dist/jquery.min',
        redux: '../../node_modules/redux/dist/redux',
        'redux-logger': '../../node_modules/redux-logger/dist/index',
        'redux-promise-middleware': '../../node_modules/redux-promise-middleware/dist/index',
      },
      include: [
        '../../node_modules/require-handlebars-plugin/hbs/handlebars.runtime',
        '../../node_modules/requirejs/require.js',
      ]
    })
    .pipe(gulp.dest('./build/'));
});

// TODO: run server from gulp, single command start ftw
gulp.task('server', function() {
  path.normalize('node src/server/main.js')
})

gulp.task('less', function() {
  return gulp.src('./src/browser/**/*.less')
    .pipe(plugins.concat('build.css'))
    .pipe(plugins.less())
    .pipe(gulp.dest('./build'));
})

gulp.task('watch', function() {
  gulp.watch(['./src/browser/**/*.js', './src/browser/**/*.hbs'], ['js']);
  gulp.watch(['./src/browser/**/*.less'], ['less']);
})

gulp.task('default', ['js', 'watch']);
