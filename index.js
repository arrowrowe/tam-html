var replace = require('gulp-replace');

module.exports = function (tam, assets, gulp) {

  if (tam.version < '0.4.0') {
    tam.log.warn('Tam-HTML supports only tam>=0.4.0 rather than tam@' + tam.version + '.');
    return;
  }

  var linked = this.read(assets);

  var getBySuffix = function (pkg, suffix) {
    var suffixIndex = -suffix.length;
    return linked[pkg].filter(function (file) { return file.substr(suffixIndex) === suffix; });
  };
  var ReplaceToHTML = function (suffix) {
    return function (content, sBefore, pkg, sAfter) {
      return getBySuffix(pkg, suffix).map(function (file) { return sBefore + file + sAfter; }).join('');
    };
  };

  gulp.src(['./src/index.html'])
    .pipe(replace(/(<link .*?href=")@tam\/(.+?)(".*?>)/g, ReplaceToHTML('.css')))
    .pipe(replace(/(<script .*?src=")@tam\/(.+?)(".*?><\/script>)/g, ReplaceToHTML('.js')))
    .pipe(gulp.dest('./'));

};
