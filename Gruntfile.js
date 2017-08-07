module.exports = function(grunt) {

    grunt.initConfig({
        clean: ['tmp', 'dest'],
        exec: {
            dest_npm_install: {
                cmd: 'npm install --only=prod',
                cwd: 'dest'
            }
        },
        copy: {
            src: {
                files: [
                    {expand: true, flatten: true, src: ['app/src/js/**.*'], dest: 'dest/src/js'},
                    {expand: true, flatten: true, src: ['app/src/vendor/**.js'], dest: 'dest/src/vendor'},
                    {expand: true, flatten: true, src: ['app/index.html', 'package.json'], dest: 'dest'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('build', [
        'clean',
        'copy:src',
        'exec'
    ]);
};
