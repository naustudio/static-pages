/*jshint node:true*/
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({
		config: {
			app: '.',
			dist: '~dist'
		},

		sass: {
			careers: { // Target
				options: { // Target options
					outputStyle: 'expanded'
					// sourcemap: true //need SASS 3.3, install with: gem install sass --pre
				},

				files: [{
					expand: true,
					cwd: '<%= config.app %>/careers/css/',
					src: ['*.scss'],
					dest: '<%= config.app %>/careers/css/',
					ext: '.css'
				}]
			},
			dist: { // Target
				options: { // Target options
					outputStyle: 'compressed'
				},

				files: [{
					expand: true,
					cwd: '<%= config.app %>/css/',
					src: ['*.scss'],
					dest: '<%= config.dist %>/css/',
					ext: '.css'
				}]
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie >= 9', 'opera >= 12']
			},
			careers: {
				src: '<%= config.app %>/careers/css/*.css'
			},
			dist: {
				src: '<%= config.dist %>/css/*.css'
			}
		},

		watch: {
			sass: {
				files: [
					'<%= config.app %>/careers/css/*.scss'
				],
				tasks: ['sass:careers', 'autoprefixer:careers']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= config.app %>/*.html',
					'<%= config.app %>/js/**/*.js',
					'<%= config.app %>/css/*.css'
				]
			}
		},
		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.dist %>/*',
						'!<%= config.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},

		connect: {
			options: {
				port: 8080,
				livereload: 35729,
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					open: true, //open nearest browser automatically
					base: [
						'<%= config.app %>'
					]
				}
			}
		}
	});


	// Default task
	grunt.registerTask('default', ['serve']);

	// Compile CSS
	grunt.registerTask('css-dev', ['sass:careers']);

	grunt.registerTask('serve', 'Server the app for testing', function() {
		grunt.task.run([
			'css-dev',
			'connect',
			'watch'
		]);
	});
};
