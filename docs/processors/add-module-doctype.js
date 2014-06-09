var forEach = require('lodash-node/modern/collections/forEach');


module.exports = {
	name: 'add-module-doctype',
	description: 'Add "module" as docType to docs that use the @module tag',
	runAfter: ['docs-processed'],
	runBefore: ['rendering-docs'],
	process: function(docs, config) {

		forEach(docs, function(doc) {
			if (doc.module) {
				doc.docType = 'module';
			}
		});
	}
};