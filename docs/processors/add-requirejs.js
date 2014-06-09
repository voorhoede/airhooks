var forEach = require('lodash-node/modern/collections/forEach');
var fs = require('q-io/fs');
var path = require('canonical-path');
var log = require('winston');


module.exports = {
	name: 'add-requirejs',
	description: 'Add the RequireJS file to the build folder',
	runAfter: ['docs-processed'],
	runBefore: ['rendering-docs'],
	process: function(config, docs) {

		var source = path.resolve(config.get('basePath'), config.get('rendering.requirejs.sourceFile'));
		var target = path.resolve(config.get('rendering.outputFolder'), config.get('rendering.requirejs.targetFile'));

		return fs.makeTree(fs.directory(target)).then(function() {
			return fs.copy(source, target).then(function() {
				log.info('Copied RequireJS into ' + target);
				return docs;
			});
		});
	}
};