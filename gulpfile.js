/**
 * @file Gulpfile
 * @author Mike Joyce [hello@mikejoyce.io]
 */

/**
 * Load Gulp
 * @type {Object}
 * @external 'gulp'
 * @see {@link http://gulpjs.com/}
 */
const gulp = require('gulp');

/**
 * Load del
 * @type {Object}
 * @external 'del'
 * @see {@link https://www.npmjs.com/package/del}
 */
const del = require('del');

/**
 * Load fs
 * @type {Object}
 * @external 'fs'
 * @see {@link https://nodejs.org/api/fs.html#fs_file_system}
 */
const fs = require('fs');

/**
 * Parse command line strings, allows the --production switch
 * @type {Object}
 * @external 'yargs'
 * @see {@link https://www.npmjs.com/package/yargs}
 */
const argv = require('yargs').argv;

/**
 * Load jpeg-recompress imagemin plugin
 * @type {Object}
 * @external 'imagemin-jpeg-recompresss'
 * @see {@link https://www.npmjs.com/package/imagemin-jpeg-recompress}
 */
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

/**
 * Load Gulp Plugins
 * @type {Object}
 * @external 'gulpLoadPlugins'
 * @see {@link https://www.npmjs.com/package/gulp-load-plugins}
 */
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins({
  pattern: [
    'gulp-*',
    'gulp.*'
  ],
  replaceString: /\bgulp[\-.]/
});

/**
 * Configuration
 * @type {Object}
 */
const config = {
  dist: 'dist',
  packages: 'node_modules',
  src: 'src'
};

/**
 * Clean Task. Cleans the build directories.
 * @external 'del()'
 * @see {@link https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname--deps-fn}
 */
gulp.task('clean', function(done) {
  del([
    `${config.dist}/css/*`,
    `${config.dist}/favicons/*`,
    `${config.dist}/fonts/*`,
    `${config.dist}/images/*`,
    `${config.dist}/js/*`
  ], done());
});

/**
 * Scripts Task. Uglifies & concatenates JavaScript files
 * @external 'gulp.task'
 * @see {@link https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md}
 */
gulp.task('scripts', function(done) {

  gulp.src([
    `${config.packages}/jquery/dist/jquery.js`,
    `${config.packages}/what-input/dist/what-input.js`,
    `${config.packages}/foundation-sites/dist/js/foundation.js`,
    `${config.src}/js/**/*.js`
  ])

  /**
   * Gulp Concat
   * @external '.concat'
   * @see {@link https://www.npmjs.com/package/gulp-concat}
   */
  .pipe($.concat('app.js'))

  /**
   * Gulp Plumber
   * @external '.plumber'
   * @see {@link https://www.npmjs.com/package/gulp-plumber
   */
  .pipe($.plumber({
    handleError: function(err) {
      console.log(err);
      this.emit('end');
    }
  }))

  /**
   * Gulp If
   * @external '.if'
   * @see {@link https://www.npmjs.com/package/gulp-if}
   */
  .pipe($.if(argv.prod,

   /**
    * Gulp Uglify
    * @external '.uglify'
    * @see {@link https://www.npmjs.com/package/gulp-uglify}
    */
    $.uglify({
      mangle: true
    })

  ))

  .pipe(gulp.dest(`${config.dist}/js`))

  done();

});

/**
 * Styles Task. Uglifies & concatenates scss files.
 * @external 'gulp.task'
 * @see {@link https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md}
 */
gulp.task('styles', function(done) {

  gulp.src(`${config.src}/scss/*.scss`)

  /**
   * Gulp Sass
   * @external '.sass'
   * @see {@link https://www.npmjs.com/package/gulp-sass}
   */
  .pipe($.sass({
    includePaths: [
      'node_modules/foundation-sites/scss',
      'node_modules/motion-ui/src',
      'node_modules/motion-ui/'
    ],
    css: './',
    style: 'expanded',
    sourceMap: false
  }).on('error', $.sass.logError))

  /**
   * Gulp Autoprefixer
   * @external '.autoprefixer'
   * @see {@link https://www.npmjs.com/package/gulp-autoprefixer}
   */
  .pipe($.autoprefixer({
    browsers: [
      'last 2 versions',
      'ie >= 9',
      'and_chr >= 2.3'
    ]
  }))

  /**
   * Gulp If
   * @external '.if'
   * @see {@link https://www.npmjs.com/package/gulp-if}
   */
  .pipe($.if(argv.prod,

    /**
     * Gulp Clean CSS
     * @external '.cleanCss'
     * @see {@link https://www.npmjs.com/package/gulp-clean-css}
     */
    $.cleanCss()

  ))

  .pipe(gulp.dest(`${config.dist}/css`))

  done();

});

/**
 * Images Task. Minify images.
 * @external 'gulp.task'
 * @see {@link https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md}
 */
gulp.task('images', function(done) {

  gulp.src(`${config.src}/images/*`)

  /**
   * Gulp Imagemin
   * @external '.imagemin()'
   * @see {@link https://www.npmjs.com/package/gulp-imagemin}
   */
  .pipe($.imagemin([
    imageminJpegRecompress({
      loops: 4,
      min: 50,
      max: 95,
      quality: 'high'
    })
  ]))

  .pipe(gulp.dest(`${config.dist}/images`))

  done();

});

/**
 * Fonts Task. Move font files to dist.
 * @external 'gulp.task'
 * @see {@link https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md}
 */
gulp.task('fonts', function(done) {

  gulp.src(`${config.src}/fonts/*`)

  .pipe(gulp.dest(`${config.dist}/fonts`))

  done();

});

/**
 * Favicon Task. Generates a favicon for all major platforms.
 * @external '.realFavicon'
 * @see {@link https://www.npmjs.com/package/gulp-real-favicon}
 */
gulp.task('favicon', function(done) {

  $.realFavicon.generateFavicon({
      masterPicture: `${config.src}/favicon/favicon.png`,
      dest: config.dist + '/favicons',
      iconsPath: './',
      design: {
        ios: {
          pictureAspect: 'noChange',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true
          }
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: '#ffffff',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false
            }
          }
        },
        androidChrome: {
          pictureAspect: 'noChange',
          themeColor: '#ffffff',
          manifest: {
            name: 'Foundation + Gulp Boilerplate',
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false
          }
        },
        safariPinnedTab: {
          pictureAspect: 'blackAndWhite',
          threshold: 78.125,
          themeColor: '#ffffff'
        }
      },
      settings: {
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false
      },
      markupFile: 'favicon.json'
    }, function() {
      done();
    });
  }

);

/**
 * Favicon Update Task. Check for updates on RealFaviconGenerator.
 * @external '.realFavicon'
 * @see {@link https://www.npmjs.com/package/gulp-real-favicon}
 */
gulp.task('favicon-update', function(done) {

  const currentVersion = JSON.parse(fs.readFileSync('favicon.json')).version;

  $.realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    }
  });

});

/**
 * Watch Task. Watches for changes in JS and SCSS files.
 * @external 'gulp.watch'
 * @see {@link https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglobs-opts-fn}
 */
gulp.task('watch', function(done) {
  gulp.watch(`${config.src}/scss/**/*.scss`, gulp.parallel('styles'));
  gulp.watch(`${config.src}/js/**/*.js`, gulp.parallel('scripts'));
  done();
});

/**
 * Set the default Gulp task
 * @external 'gulp.task'
 * @see {@link https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md}
 */
gulp.task('default', gulp.series(
    'clean',
    gulp.parallel([
      'favicon',
      'fonts',
      'images',
      'scripts',
      'styles'
    ]),
    'watch'
  )
);
