const gulp = require('gulp4');
const devServer = require('gulp-develop-server');
const notifier = require('node-notifier');

const notify = message => {
  notifier.notify({
    title: 'Express-Token',
    message
  });
};

gulp.task('serve', done => {
  devServer.listen({ path: 'examples/index.js' }, err => {
    err && console.error(err);
    notify('Started, Begin watching...');
    done();
  });
});

gulp.task('restart', done => {
  devServer.restart(err => {
    err && console.error(err);
    notify('Restart ok');
    done();
  });
});

gulp.task('watch', done => {
  gulp.watch([
    'examples/**/*',
    'lib/**/*',
    'index.js'
  ], gulp.series('restart'));
  done();
});

gulp.task('default', gulp.parallel('serve', 'watch'));
