/**
 * Grunt Module
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
        	dest: "html",
        	bower: "bower_components"
        },
        jshint: {
		    beforeuglify: ['js/*.js']
		},
        uglify: {
		    options: {
		        banner: '/*! package name <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		    },
		    build: {
		    	files: {
		    		'<%= dirs.dest %>/js/scripts.js': ['js/*.js'],
			        '<%= dirs.dest %>/js/libs.js': 
			        	['<%= dirs.bower %>/jQuery/dist/jQuery.js']
			    }
		    }
		},
		connect: {
		    server: {
		        options: {
		          port: 9001,
		          base: 'html',
		          liveReload: true,
		          open: true
		        }
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
            },
            html: {
		        files: ['<%= dirs.dest %>/*.html'],
		    },
            options: {
            	livereload: true
            }            
        },
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.registerTask('default',['sass:dev', 'jshint', 'uglify']);
    grunt.registerTask('produce-js',['jshint', 'uglify']);
    grunt.registerTask('server',['connect', 'watch']);
};    