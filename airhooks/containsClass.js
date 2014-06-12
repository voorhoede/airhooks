(function (root, airhooks, factory) {
	var method = 'containsClass';
	if (typeof define === 'function' && define.amd) {
		define([/*deps*/], factory);
	} else {
		airhooks[method] = factory(/*deps*/);
		root.airhooks = airhooks;
	}
}(this, this.airhooks || {}, function (/*deps*/) {
	/**
	 * @description
	 * Checks if an element's list of classes contains a specific class.
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element.classList MDN: Element.classList}
	 * @see {@link http://hacks.mozilla.org/2010/01/classlist-in-firefox-3-6/ Original source}
	 *
	 * @module airhooks/containsClass
	 * @alias airhooks.containsClass
	 *
	 * @param {HtmlElement} element
	 * @param {String} className
	 */
	return function containsClass(element, className) {
		if (document.documentElement.classList) {
			return element.classList.contains(className);
		} else {
			var re = new RegExp('(^|\\s)' + className + '(\\s|$)');
			return element.className.match(re);
		}
	};
}));