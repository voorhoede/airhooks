module.exports = function (grunt) {
	'use strict';

	var metaFiles = ['bower.json', 'package.json'];
	grunt.config.init({
		bump: {
			options: {
				files: metaFiles,
				updateConfigs: [],
				commit: true,
				commitMessage: 'Release v%VERSION%',
				commitFiles: metaFiles,
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%'
			}
		}
	});

	// Load all npm installed grunt tasks.
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// load all project grunt tasks.
	grunt.registerTask('default', ['']);

	grunt.registerTask('docs', 'Generate docs via dgeni.', function() {
		var dgeni = require('dgeni');
		var done = this.async();

		var generateDocs = dgeni.generator('docs/dgeni.conf.js');
		generateDocs().then(done);
	});
};
