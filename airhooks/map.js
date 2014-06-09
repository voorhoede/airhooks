(function (root, airhooks, factory) {
	var method = 'map';
	if (typeof define === 'function' && define.amd) {
		define(['./forEach'], factory);
	} else {
		airhooks[method] = factory(airhooks.forEach);
		root.airhooks = airhooks;
	}
}(this, this.airhooks || {}, function (forEach) {
	/**
	 * @description
	 * forEach executes a provided function once per array element.
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach MDN: forEach}
	 * @see {@link http://underscorejs.org/docs/underscore.html#section-16 UnderscoreJS reference: map}
	 *
	 * @module airhooks/map
	 * @alias airhooks.map
	 *
	 * @param {Array} array
	 * @param {Function} iterator - Function to execute for each element.
	 * @param {Object} [context] - Value to use as this when executing callback.
	 *
	 * @example
	   <example name="map-amd" type="AMD" deps="vendor/require.min.js">
	   	<file name="index.html">
	   		<ul data-list>
	   			<li>1</li>
	   			<li>2</li>
	   			<li>3</li>
	   			<li>4</li>
	   			<li>5</li>
	   		</ul>

	   		<output data-output></output>

	   		<button class="button button-primary" data-trigger>show sequence</button>
	   	</file>
	   	<file name="app.js">
	   		require(['airhooks/map'], function(map) {
	   			var button = document.querySelector('[data-trigger]');
	   			var output = document.querySelector('[data-output]');
	   			var items = document.querySelectorAll('[data-list] li');

	   			button.addEventListener('click', function() {
	   				var sequence = map(items, function(item, index, list) {
	   					return item.innerHTML;
	   				});
	   				output.value = sequence;
	   			}, false);
	   		});
	   	</file>
	   </example>

	   <example name="map-web" type="web" deps="airhooks/forEach.js;airhooks/map.js">
	   	<file name="index.html">
	   		<ul data-list>
	   			<li>1</li>
	   			<li>2</li>
	   			<li>3</li>
	   			<li>4</li>
	   			<li>5</li>
	   		</ul>

	   		<output data-output></output>

	   		<button class="button button-primary" data-trigger>show sequence</button>
	   	</file>
	   	<file name="app.js">
	   		(function(airhooks) {
	   			var button = document.querySelector('[data-trigger]');
	   			var output = document.querySelector('[data-output]');
	   			var items = document.querySelectorAll('[data-list] li');

	   			button.addEventListener('click', function() {
	   				var sequence = airhooks.map(items, function(item, index, list) {
	   					return item.innerHTML;
	   				});
	   				output.value = sequence;
	   			}, false);
	   		}(this.airhooks));
	   	</file>
	   </example>
	 */
	return function map(array, iterator, context) {
		var nativeMap = Array.prototype.map;
		if (nativeMap && array.map === nativeMap){
			return array.map(iterator, context);
		} else {
			var results = [];
			forEach(array, function(value, index, list) {
				results.push(iterator.call(context, value, index, list));
			});
			return results;
		}
	};
}));
