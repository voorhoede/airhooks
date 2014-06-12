var INLINE_LINK = /(\S+)(?:\s+([\s\S]+))?/;
var path = require('canonical-path');
var where = require('lodash-node/modern/collections/where');

module.exports = {
	name: 'link',
	description: 'Process inline link tags (of the form {@link some/uri Some Title}), replacing them with HTML anchors',
	handlerFactory: function(docs) {

		return function handleLinkTags(doc, tagName, tagDescription) {

			// Parse out the uri and title
			return tagDescription.replace(INLINE_LINK, function(match, uri, title) {

				var linkInfo;

				if (uri.match(/^http(s)?:\/\//)) {
					// Don't validate external links
					linkInfo = {
						href: uri
					};
				} else {
					linkInfo = where(docs, {codeName: uri});

					if (linkInfo.length < 1) {
						throw new Error('Invalid link: ' + uri);
					} else if (linkInfo.length > 1) {
						throw new Error('Ambiguous link: ' + uri);
					}

					linkInfo = linkInfo[0];
				}

				return '<a href="' + linkInfo.href + '">' + (title || linkInfo.codeName || uri) + '</a>';
			});
		};
	}
};