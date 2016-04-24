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
        hbs: '../../node_modules/require-handlebars-plugin/hbs',
        jquery: '../../node_modules/jquery/dist/jquery.min'
      },
      include: [
        '../../node_modules/requirejs/require.js',
        '../../node_modules/require-handlebars-plugin/hbs/handlebars.runtime',
        '../../node_modules/immutable/dist/immutable.js',
        '../../node_modules/redux/dist/redux.js'
      ]
    })
    .pipe(gulp.dest('./build/')); // pipe it to the output DIR
});

// TODO: run server from gulp, single command start ftw
gulp.task('server', function() {
  path.normalize('node src/server/main.js')
})

gulp.task('css', function() {
  return gulp.src('./src/browser/**/*.less')
    .pipe(plugins.concat('build.css'))
    .pipe(plugins.less())
    .pipe(gulp.dest('./build'));
})

gulp.task('default', ['js', 'css']);
