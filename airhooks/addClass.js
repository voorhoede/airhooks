(function (root, airhooks, factory) {
	var method = 'addClass';
	if (typeof define === 'function' && define.amd) {
		define([/*deps*/], factory);
	} else {
		airhooks[method] = factory(/*deps*/);
		root.airhooks = airhooks;
	}
}(this, this.airhooks || {}, function (/*deps*/) {
	/**
	 * @description
	 * Adds a class to an element's list of classes.
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element.classList MDN: Element.classList}
	 * @see {@link http://hacks.mozilla.org/2010/01/classlist-in-firefox-3-6/ Original source}
	 *
	 * @module airhooks/addClass
	 * @alias airhooks.addClass
	 *
	 * @param {HtmlElement} element
	 * @param {String} className
	 *
	 * @example
		<example name="addClass-amd" type="AMD" deps="vendor/require.min.js">
		<file name="index.html">
			<button class="button" data-trigger>color me</button>
		</file>
		<file name="app.js">
			require(['airhooks/addClass'], function(addClass){
				var button = document.querySelector('[data-trigger]');

				button.addEventListener('click', function() {
					addClass(button, 'button-primary');
				}, false);
			});
		</file>
		</example>

		<example name="addClass-web" type="web" deps="airhooks/addClass.js">
		<file name="index.html">
			<button class="button" data-trigger>color me</button>
		</file>
		<file name="app.js">
			(function(airhooks){
				var button = document.querySelector('[data-trigger]');

				button.addEventListener('click', function() {
					airhooks.addClass(button, 'button-primary');
				}, false);
			}(this.airhooks));
		</file>
		</example>
	 */
	return function addClass(element, className) {
		if (document.documentElement.classList) {
			element.classList.add(className);
		} else {
			var re = new RegExp('(^|\\s)' + className + '(\\s|$)');
			if (!element.className.match(re)) {
				element.className += (element.className ? ' ' : '') + className;
			}
		}
	};
}));

