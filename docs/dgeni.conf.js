var path = require('canonical-path');


module.exports = function(config) {
	// Use Voorhoede jsdoc package
	require('voorhoede-dgeni-packages/jsdoc')(config);

	// And Dgeni's nunjucks template renderer and runnable examples
	require('dgeni-packages/nunjucks')(config);
	require('dgeni-packages/examples')(config);

	// Set logging level
	config.set('logging.level', 'info');


	/* NUNJUCKS PACKAGE
	 * ================ */

	// Use the Angular nunjucks style so that we can render their runnable
	// example templates without modification
	config.merge('rendering.nunjucks.config.tags', {
		variableStart: '{$',
		variableEnd: '$}'
	});

	// Add the nunjucks code filter & tag from ngdoc
	config.append('rendering.filters', [
		require('dgeni-packages/ngdoc/rendering/filters/code')
	]);
	config.append('rendering.tags', [
		require('dgeni-packages/ngdoc/rendering/tags/code')
	]);


	/* VOORHOEDE PACKAGE
	 * ================= */

	// Use a custom site name
	config.set('rendering.voorhoede.siteName', 'Airhooks');

	// Base href will be prefixed to all internal links on the website
	config.set('rendering.voorhoede.baseHref', '/build/docs/');

	// Move the core CSS file into 'assets/'
	config.set('rendering.voorhoede.coreCss.outputFile', 'assets/voorhoede-core.css');


	/* AIRHOOKS CUSTOM FILE READERS
	 * ============================ */

	config.append('source.fileReaders', require('./file-readers/readme'));


	/* AIRHOOKS CUSTOM PROCESSORS
	 * ========================== */

	config.append('processing.processors', [
		require('./processors/add-module-doctype'),
		require('./processors/add-requirejs'),
		require('./processors/add-airhooks')
	]);

	config.set('rendering.requirejs', {
		sourceFile: '../bower_components/requirejs/require.js',
		targetFile: 'assets/vendor/require.min.js',
		baseUrl: path.resolve(config.get('rendering.voorhoede.baseHref'), 'assets')
	});

	config.set('rendering.airhooks', {
		sourceFolder: '../airhooks',
		targetFolder: 'assets/airhooks'
	});


	/* AIRHOOKS CUSTOM TAG DEFINITIONS
	 * =============================== */

	config.append('processing.tagDefinitions', require('./tag-defs'));

	config.append('processing.inlineTagDefinitions', [
		require('./inline-tag-defs/link')
	]);


	/* AIRHOOKS TEMPLATES
	 * ================== */

	// Add your own templates to render docs
	config.prepend('rendering.templateFolders', [
		path.resolve(__dirname, 'templates')
	]);

	// You can specifiy which template should be used based on a pattern.
	config.prepend('rendering.templatePatterns', [
		'${ doc.template }',
		'${ doc.docType }.template.html'
	]);


	/* DEPLOYMENT CONFIG
	 * =================
	 * Currently only used for runnable examples...
	 */

	config.merge('deployment', {
		environments: [
			{
				name: 'default',
				examples: {
					commonFiles: {
						stylesheets: [
							path.resolve(config.get('rendering.voorhoede.baseHref'), config.get('rendering.voorhoede.coreCss.outputFile'))
						]
					},
					dependencyPath: path.resolve(config.get('rendering.voorhoede.baseHref'), 'assets')
				}
			}
		]
	});


	/* DGENI SOURCE & OUTPUT PATTERNS
	 * ==============================  */

	// This tells dgeni where to look for stuff
	config.set('source.projectPath', '.');

	config.set('source.files', [
		{
			// Process all js files in airhooks/.
			pattern: 'airhooks/**/*.js',
			// Some processors use the relative path of the source file to compute properties, such as
			// the outputPath. The basePath allows us to ensure that the "relative" path to each source
			// file is accurate no matter where the source files are relative to the projectPath.
			basePath: path.resolve(__dirname, '..')
		},
		{
			// Use the README as index page
			pattern: 'README.md',
			basePath: path.resolve(__dirname, '..')
		}
	]);

	// Our generated docs will be written here:
	config.set('rendering.outputFolder', path.resolve(__dirname, '../build/docs/'));
	// The contentsFolder is the path relative to the outputFolder, which identifies the place where
	// the "standard" content files are stored.  For example, in the AngularJS application, the output
	// folder is `build/docs` but the way that the application is stored, means that we want the
	// content files (i.e. the files that contain the content of each "doc") to be stored in
	// `build/docs/partials`
	config.set('rendering.contentsFolder', '.');

	return config;
};