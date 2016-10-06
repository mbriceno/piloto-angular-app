module.exports = function (config) {
    config.set({
        basePath: './',
        files: [
            'app/bower_components/**/*.js',
            'app/scripts/**/*.js',
            'test/**/*.js'
        ],
        autoWatch: false,
        frameworks: ['jasmine'],
        browsers: ['Chrome', 'Firefox'],
        singleRun: true,
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ]
    });
};
