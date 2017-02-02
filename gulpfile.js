const gulp = require('gulp'),
    webpack = require('webpack-stream'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    tsc = require('gulp-typescript'),
    merge = require('merge2');


gulp.task('typescript', () => {
    let project = tsc.createProject('tsconfig.json', {
        declaration: true
    });

    let result = gulp.src('./src/*.{ts,tsx}')
        .pipe(project());



    return merge([
        result.js.pipe(gulp.dest('lib')),
        result.dts.pipe(gulp.dest('lib'))
    ]);

})

gulp.task('webpack', ['typescript'], () => {

    return gulp.src('./src/index.ts')
        .pipe(webpack({
            resolve: {
                extensions: ['', '.js', '.ts', '.tsx'],
            },
            module: {
                loaders: [{
                    test: /\.ts(x?)$/,
                    loader: 'babel-loader?presets[]=es2015!ts-loader'
                }, {
                    test: /\.js(x?)$/,
                    loader: 'babel-loader?presets[]=es2015'
                }]
            },
            output: {
                library: ["slick", "react"],
                libraryTarget: "umd",
                filename: 'slick-react.js'
            },
            externals: {
                "slick": "slick",
                'react': {
                    root: 'React',
                    commonjs: 'react',
                    commonjs2: 'react',
                    amd: 'react'
                },
                'react-dom': {
                    root: 'ReactDOM',
                    commonjs: 'react-dom',
                    commonjs2: 'react-dom',
                    amd: 'react-dom'
                },
                "eventsjs": "eventsjs"
            }

        }))
        .on('error', function () {
            this.emit('end');
        })
        .pipe(gulp.dest('dist'))

});

gulp.task('uglify', ['webpack'], () => {
    gulp.src('dist/slick-react.js')
        .pipe(uglify())
        .pipe(rename('slick-react.min.js'))
        .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
    gulp.watch('src/**/*.{ts,tsx}', ['webpack']);
});


gulp.task('default', ['webpack', 'typescript', 'uglify']);