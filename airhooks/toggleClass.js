(function (root, airhooks, factory) {
	var method = 'toggleClass';
	if (typeof define === 'function' && define.amd) {
		define(['airhooks/addClass','airhooks/containsClass', 'airhooks/removeClass'], factory);
	} else {
		airhooks[method] = factory(airhooks.addClass, airhooks.containsClass, airhooks.removeClass);
		root.airhooks = airhooks;
	}
}(this, this.airhooks || {}, function (addClass, containsClass, removeClass) {
	/**
	 * @description
	 * Remove a class from an element's list of classes.
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element.classList MDN: Element.classList}
	 * @see {@link http://hacks.mozilla.org/2010/01/classlist-in-firefox-3-6/ Original source}
	 *
	 * @module airhooks/toggleClass
	 * @alias airhooks.toggleClass
	 *
	 * @requires addClass
	 * @requires containsClass
	 * @requires removeClass
	 *
	 * @param {HtmlElement} element
	 * @param {String} className
	 * @param {Boolean} [force] - Force the class name to be added or removed based on value's truthiness.
	 *
	 * @example
		<example name="toggleClass-amd" type="AMD" deps="vendor/require.min.js">
		<file name="index.html">
			<button class="button button-primary" data-trigger>color me</button>
		</file>
		<file name="app.js">
			require(['airhooks/toggleClass'], function(toggleClass){
				var button = document.querySelector('[data-trigger]');

				button.addEventListener('click', function() {
					toggleClass(button, 'button-primary');
					toggleClass(button, 'button-inverse');
				}, false);
			});
		</file>
		</example>

		<example name="toggleClass-web"
				type="web"
				deps="airhooks/addClass.js;airhooks/containsClass.js;airhooks/removeClass.js;airhooks/toggleClass.js">
		<file name="index.html">
			<button class="button button-primary" data-trigger>color me</button>
		</file>
		<file name="app.js">
			(function(airhooks){
				var button = document.querySelector('[data-trigger]');

				button.addEventListener('click', function() {
					airhooks.toggleClass(button, 'button-primary');
					airhooks.toggleClass(button, 'button-inverse');
				}, false);
			}(this.airhooks));
		</file>
		</example>
	 */
	return function toggleClass(element, className, force) {
		var isForced = (typeof force !== 'undefined');
		if (document.documentElement.classList) {
			if(isForced){
				return element.classList.toggle(className, force);
			} else {
				return element.classList.toggle(className);
			}
		} else {
			if (containsClass(element, className) || (isForced && !force)){
				removeClass(element, className);
				return false;
			} else {
				addClass(element, className);
				return true;
			}
		}
	};
}));

