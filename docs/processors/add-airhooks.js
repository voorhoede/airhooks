var forEach = require('lodash-node/modern/collections/forEach');
var fs = require('q-io/fs');
var path = require('canonical-path');
var log = require('winston');


module.exports = {
	name: 'add-airhooks',
	description: 'Add the airhooks source code the the build folder',
	runAfter: ['docs-processed'],
	runBefore: ['rendering-docs'],
	process: function(config, docs) {

		var source = path.resolve(config.get('basePath'), config.get('rendering.airhooks.sourceFolder'));
		var target = path.resolve(config.get('rendering.outputFolder'), config.get('rendering.airhooks.targetFolder'));

		return fs.copyTree(source, target).then(function() {
			log.info('Copied Airhooks source code into ' + target);
			return docs;
		});
	}
};