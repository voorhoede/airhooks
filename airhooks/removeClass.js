(function (root, airhooks, factory) {
	var method = 'removeClass';
	if (typeof define === 'function' && define.amd) {
		define([/*deps*/], factory);
	} else {
		airhooks[method] = factory(/*deps*/);
		root.airhooks = airhooks;
	}
}(this, this.airhooks || {}, function (/*deps*/) {
	/**
	 * @description
	 * Remove a class from an element's list of classes.
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element.classList MDN: Element.classList}
	 * @see {@link http://hacks.mozilla.org/2010/01/classlist-in-firefox-3-6/ Original source}
	 *
	 * @module airhooks/removeClass
	 * @alias airhooks.removeClass
	 *
	 * @param {HtmlElement} element
	 * @param {String} className
	 *
	 * @example
		<example name="removeClass-amd" type="AMD" deps="vendor/require.min.js">
		<file name="index.html">
			<button class="button button-primary" data-trigger>uncolor me</button>
		</file>
		<file name="app.js">
			require(['airhooks/removeClass'], function(removeClass) {
				var button = document.querySelector('[data-trigger]');

				button.addEventListener('click', function() {
					removeClass(button, 'button-primary');
				}, false);
			});
		</file>
		</example>

		<example name="removeClass-web" type="web" deps="airhooks/removeClass.js">
		<file name="index.html">
			<button class="button button-primary" data-trigger>uncolor me</button>
		</file>
		<file name="app.js">
			(function(airhooks) {
				var button = document.querySelector('[data-trigger]');

				button.addEventListener('click', function() {
					airhooks.removeClass(button, 'button-primary');
				}, false);
			}(this.airhooks));
		</file>
		</example>
	 */
	return function removeClass(element, className) {
		if (document.documentElement.classList) {
			element.classList.remove(className);
		} else {
			var regexp = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
			element.className = element.className.replace(regexp, '$2');
		}
	};
}));

