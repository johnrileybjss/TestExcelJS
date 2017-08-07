module.exports = function(grunt) {

    grunt.initConfig({
        clean: ['tmp', 'dest'],
        exec: {
            dest_npm_install: {
                cmd: 'npm install --only=prod',
                cwd: 'dest'
            }
        },
        browserify: {
            dest: {
                files: {
                    'tmp/exceljs-bundle.js': ['dest/node_modules/exceljs/lib/exceljs.browser.js', 'tmp/bundle/**/*.js']
                },
                options: {
                    transform: [['babelify', { presets: ['es2015'] }]]
                }
            }
        },
        copy: {
            src: {
                files: [
                    {expand: true, flatten: true, src: ['app/src/js/**.*'], dest: 'tmp/bundle'},
                    {expand: true, flatten: true, src: ['app/src/vendor/**.js'], dest: 'dest/src/vendor'},
                    {expand: true, flatten: true, src: ['app/index.html', 'package.json'], dest: 'dest'}
                ]
            },
            final: {
                files: [
                    {expand: true, flatten: true, src: ['tmp/exceljs-bundle.js'], dest: 'dest/src/js'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', [
        'clean',
        'copy:src',
        'exec',
        'browserify',
        'copy:final'
    ]);
};
