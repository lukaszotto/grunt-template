/**
 * Grunt Module
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
        	dest: "html"
        },
        jshint: {
		    beforeuglify: ['js/*.js']
		},
        uglify: {
		    options: {
		        banner: '/*! package name <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		    },
		    build: {
		        src: 'js/*.js',
		        dest: '<%= dirs.dest %>/js/scripts.min.js'
		    }
		},
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= dirs.dest %>/css/style.css' : 'sass/style.sass'
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= dirs.dest %>/css/style.css' : 'sass/style.sass'
                }
            }
        },
        watch: {
            css: {
                files: 'sass/**.sass',
                tasks: 'sass'
            },
            js: {
            	files: 'js/**.js',
                tasks: 'produce-js'
            }            
        },
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default',['sass:dev', 'jshint', 'uglify']);
    grunt.registerTask('produce-js',['jshint', 'uglify']);
    
};    