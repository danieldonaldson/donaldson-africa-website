//
// Variables ===================================
//

// Load dependencies
const autoprefixer = require('gulp-autoprefixer');
const browsersync = require('browser-sync').create();
const cached = require('gulp-cached');
const cleancss = require('gulp-clean-css');
const del = require('del');
const fileinclude = require('gulp-file-include');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const npmdist = require('gulp-npm-dist');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const gzip = require('gulp-gzip');
const htmlmin = require('gulp-htmlmin');
const hash = require('gulp-hash');
const references = require('gulp-hash-references');
const critical = require('critical').stream;
const   log = require('fancy-log');

// Define paths
const paths = {
  base: {
    base: {
      dir: './'
    },
    node: {
      dir: './node_modules'
    }
  },
  dist: {
    base: {
      dir: './dist'
    },
    libs: {
      dir: './dist/assets/libs'
    }
  },
  src: {
    base: {
      dir: './src',
      files: './src/**/*'
    },
    css: {
      dir: './src/assets/css',
      files: './src/assets/css/**/*'
    },
    html: {
      dir: './src',
      files: './src/**/*.html',
    },
    img: {
      dir: './src/assets/img',
      files: './src/assets/img/**/*',
    },
    js: {
      dir: './src/assets/js',
      files: './src/assets/js/**/*'
    },
    partials: {
      dir: './src/partials',
      files: './src/partials/**/*'
    },
    scss: {
      dir: './src/assets/scss',
      files: './src/assets/scss/**/*',
      main: './src/assets/scss/*.scss'
    },
    tmp: {
      dir: './src/.tmp',
      files: './src/.tmp/**/*'
    }
  }
};

//
// Tasks ===================================
//

gulp.task('browsersync', function(callback) {
  browsersync.init({
    server: {
      baseDir: [paths.src.tmp.dir, paths.src.base.dir, paths.base.base.dir]
    },
  });
  callback();
});

gulp.task('browsersyncReload', function(callback) {
  browsersync.reload();
  callback();
});

gulp.task('watch', function() {
  gulp.watch(paths.src.scss.files, gulp.series('scss'));
  gulp.watch([paths.src.js.files, paths.src.img.files], gulp.series('browsersyncReload'));
  gulp.watch([paths.src.html.files, paths.src.partials.files], gulp.series('fileinclude', 'browsersyncReload'));
});

gulp.task('scss', function() {
  return gulp
    .src(paths.src.scss.main)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.src.css.dir))
    .pipe(browsersync.stream());
});

gulp.task('compressAll', function() {
  return gulp.src(paths.dist.base.dir + '/**/*.{html,css,js,xml,ttf,otf,md,eot,woff,woff2,svg,txt,json}')
    .pipe(gzip({
      gzipOptions: {
        level: 9
      },
      threshold: 1024,
      skipGrowingFiles: true
    }))
    .pipe(gulp.dest(paths.dist.base.dir));
});

gulp.task('hashCSSJS', function() {
  return gulp.src(paths.dist.base.dir + '/assets/{css,js,libs}/**/*.{js,css}')
    .pipe(hash()) // Generate hashes for the CSS files
    .pipe(gulp.dest(paths.dist.base.dir + '/assets')) // Save the renamed CSS files (e.g. style.123456.css)
    .pipe(hash.manifest(paths.src.tmp.dir + '/asset-manifest.json', {
      deleteOld: true,
      sourceDir: paths.dist.base.dir + '/assets'
    })) // Generate a manifest file
    .pipe(gulp.dest('.')); // Save the manifest file
});

gulp.task('updateReferences', function() {
  return gulp.src(paths.dist.base.dir + '/**/*.html')
    .pipe(references(paths.src.tmp.dir + '/asset-manifest.json')) // Replace file paths in index.html according to the manifest
    .pipe(gulp.dest(paths.dist.base.dir));
});


gulp.task('gulpcritical', function() {
  return gulp.src(paths.dist.base.dir + '/*.html')
    .pipe(critical({
      //base: './dist',
      //rebase: './dist',
      inline: true,
      minify: true,
      css: [
        paths.dist.base.dir + '/assets/css/*.css',
      ]
    }))
    .on('error', err => {
      log.error(err.message);
    })
    .pipe(gulp.dest(paths.dist.base.dir));
});

gulp.task('fileinclude', function(callback) {
  return gulp
    .src([
      paths.src.html.files,
      '!' + paths.src.tmp.files,
      '!' + paths.src.partials.files
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true
    }))
    .pipe(cached())
    .pipe(gulp.dest(paths.src.tmp.dir));
});

gulp.task('clean:tmp', function(callback) {
  del.sync(paths.src.tmp.dir);
  callback();
});

gulp.task('clean:dist', function(callback) {
  del.sync(paths.dist.base.dir);
  callback();
});

gulp.task('copy:all', function() {
  return gulp
    .src([
      paths.src.base.files,
      '!' + paths.src.partials.dir, '!' + paths.src.partials.files,
      '!' + paths.src.scss.dir, '!' + paths.src.scss.files,
      '!' + paths.src.tmp.dir, '!' + paths.src.tmp.files,
      '!' + paths.src.js.dir, '!' + paths.src.js.files,
      '!' + paths.src.css.dir, '!' + paths.src.css.files,
      '!' + paths.src.html.files,
    ])
    .pipe(gulp.dest(paths.dist.base.dir));
});

gulp.task('copy:libs', function() {
  return gulp
    .src(npmdist(), {
      base: paths.base.node.dir
    })
    .pipe(gulp.dest(paths.dist.libs.dir));
});

gulp.task('html', function() {
  return gulp
    .src([
      paths.src.html.files,
      '!' + paths.src.tmp.files,
      '!' + paths.src.partials.files
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true
    }))
    .pipe(replace(/href="(.{0,10})node_modules/g, 'href="$1assets/libs'))
    .pipe(replace(/src="(.{0,10})node_modules/g, 'src="$1assets/libs'))
    .pipe(useref())
    .pipe(cached())
    .pipe(gulpif('*.html',htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      removeEmptyAttributes: true,
    })))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cleancss()))
    .pipe(gulp.dest(paths.dist.base.dir));
});

gulp.task('build', gulp.series(gulp.parallel('clean:tmp', 'clean:dist', 'copy:all', 'copy:libs'), 'scss', 'html','gulpcritical','hashCSSJS','updateReferences','compressAll'));

gulp.task('default', gulp.series(gulp.parallel('fileinclude', 'scss'), gulp.parallel('browsersync', 'watch')));
