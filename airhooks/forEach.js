(function (root, airhooks, factory) {
	var method = 'forEach';
	if (typeof define === 'function' && define.amd) {
		define([/*deps*/], factory);
	} else {
		airhooks[method] = factory(/*deps*/);
		root.airhooks = airhooks;
	}
}(this, this.airhooks || {}, function (/*deps*/) {
	/**
	 * @description
	 * forEach executes a provided function once per array element.
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach MDN: forEach}
	 * @see {@link http://underscorejs.org/docs/underscore.html#section-15 UnderscoreJS reference: forEach}
	 *
	 * @module airhooks/forEach
	 * @alias airhooks.forEach
	 *
	 * @param {Array} array
	 * @param {Function} iterator - Function to execute for each element.
	 * @param {Object} [context] - Value to use as this when executing callback.
	 *
	 * @example
		<example name="forEach-amd" type="AMD" deps="vendor/require.min.js">
		<file name="index.html">
			<ul data-list>
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
			</ul>

			<button class="button button-primary" data-trigger>square each</button>
		</file>
		<file name="app.js">
			require(['airhooks/forEach'], function(forEach) {
				var button = document.querySelector('[data-trigger]');
				var items = document.querySelectorAll('[data-list] li');

				button.addEventListener('click', function() {
					forEach(items, function(item, index) {
						var num = index + 1;
						item.innerHTML = num + ' * ' + num + ' = ' + num * num;
					});
				}, false);
			});
		</file>
		</example>

		<example name="forEach-web" type="web" deps="airhooks/forEach.js">
		<file name="index.html">
			<ul data-list>
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
			</ul>

			<button class="button button-primary" data-trigger>square each</button>
		</file>
		<file name="app.js">
			(function(airhooks){
				var button = document.querySelector('[data-trigger]');
				var items = document.querySelectorAll('[data-list] li');

				button.addEventListener('click', function() {
					airhooks.forEach(items, function(item, index) {
						var num = index + 1;
						item.innerHTML = num + ' * ' + num + ' = ' + num * num;
					});
				}, false);
			}(this.airhooks));
		</file>
		</example>
	 */
	return function forEach(array, iterator, context) {
		var nativeForEach = Array.prototype.forEach;
		if (nativeForEach && array.foreach === nativeForEach) {
			array.forEach(iterator, context);
		} else {
			for (var i = 0, length = array.length; i < length; i++) {
				iterator.call(context, array[i], i, array);
			}
		}
	};
}));
