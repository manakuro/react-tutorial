const $ = require('gulp-load-plugins')();
const watchify = require('watchify');
const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const assign = require('lodash.assign');
const glob = require('glob');
const babelify = require('babelify');
const reactify = require('reactify');

// Config
const config = require('./gulpfile.config')();

/**
 *   JS Task
 * 
 */
gulp.task('watchify', () => {
    jsComplie(true);
});

gulp.task('browserify', () => {
    jsComplie(false);
});

const srcFile = glob.sync(config.js.app, { ignore : config.js.ignore }),
    browserifyOp = {
        cache: {},
        packageCache: {},
        entries: srcFile,
        transform: [
            [reactify, {"harmony": true}]
        ],
        debug: true
    },
    options = assign({}, watchify.args, browserifyOp);
    console.log(srcFile);
function jsComplie(isWatch) {
    let b; 
    let rebundle;

    if (isWatch) {
        b = watchify(browserify(options));

        rebundle = function () {
            return b.bundle()
                    .on('error', function (err) {
                        console.log($.util.colors.red(err.message));
                        this.emit('end');
                     })
                    .pipe(source(config.js.bundled))
                    .pipe(gulp.dest(config.js.dist));
        };

        b.on('update', rebundle);
        b.on('log', $.util.log);

    } else {
        b = browserify(options);

        rebundle = function () {
            return b.bundle()
                    .on('error', function (err) {
                        console.log($.util.colors.red(err.message));
                        this.emit('end');
                     })
                    .pipe(source(config.js.bundled))
                    .pipe(buffer())
                    .pipe($.sourcemaps.init({ loadMaps: true }))
                    .pipe($.uglify())
                    .pipe($.sourcemaps.write('./'))
                    .pipe(gulp.dest(config.js.dist));
        };

    }
    return rebundle();

}

/**
 *   CSS Task
 * 
 */
gulp.task('css', cssBundle);
function cssBundle() {
    return gulp.src(config.css.app)
               .pipe($.plumber({
                    errorHander: (err) => {
                        console.log(err.messageFormatted);
                        this.emit('end');
                    }
                }))
               .pipe($.sass({outputStyle: 'compressed'}))
               .pipe($.autoprefixer())
               .pipe(gulp.dest(config.css.dist));
}

/**
 *  Clean up files Task
 * 
 */
const del = require('del');
gulp.task('clean:dist', () => {
    return  del.sync('dist');
});

/**
 *  Combining Gulp Task
 *  - Clean up generated files
 *  - Create JS, CSS, Image, Fonts and put them into dist folder
 *  - Optimize JS and CSS
 * 
 */
const runSequence = require('run-sequence');
gulp.task('build', (callback) => {
    runSequence('clean:dist', ['browserify', 'css'], callback);
});

/**
 *  Watching Task
 *  - Reload server
 *  - Watch task with JS and CSS
 * 
 */
gulp.task('watch', ['watchify'], () => {
    // gulp.watch(config.css.app, ['css']);
});

// Default 
gulp.task('default', (callback) => {
    runSequence(['watch'], callback);
});

