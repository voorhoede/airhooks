module.exports = {
	pattern: /^README\.md$/,
	processFile: function(filePath, contents, basePath) {
		var file = [{
			content: contents,
			file: 'index',
			basePath: basePath,
			docType: 'readme',
			fileType: 'md',
			startingLine: 1
		}];
		return file;
	}
};