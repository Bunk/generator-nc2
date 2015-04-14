(function() {
    'use strict';

    var gulp = require('gulp'),
        plugins = require('gulp-load-plugins')({
            lazy: false, pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'event-stream']
        }),
        options = require('./options');

    function rootPath(isDist) {
        return (isDist) ? options.paths.dist : options.paths.local;
    }

    function onError(err) {
        console.log(err);
        this.emit('end');
    }

    module.exports = {
        // Runs any independent
        vendor: function (isDist) {
            var dest = rootPath(isDist),
                jsFilter = plugins.filter('**/*.js');

            if(!isDist) {
                dest += options.paths.bower;
            } else {
                dest += 'vendor/';
            }

            var pipeline = gulp.src(plugins.mainBowerFiles(), { base: options.paths.bower })
                .pipe(plugins.plumber(onError))
                .pipe(plugins.changed(dest))
                .pipe(jsFilter);

            if (isDist) {
                pipeline = pipeline
                    .pipe(plugins.sourcemaps.init())
                    .pipe(plugins.uglify())
                    .pipe(plugins.concat('vendor.js'))
                    .pipe(plugins.rev())
                    .pipe(plugins.sourcemaps.write(options.paths.maps));
            }

            pipeline = pipeline
                .pipe(gulp.dest(dest))
                .pipe(plugins.size({ title: 'Vendor.js: ' + dest }));

            return pipeline;
        }
    };
})();
