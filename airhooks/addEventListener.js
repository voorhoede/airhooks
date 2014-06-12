(function (root, airhooks, factory) {
	var method = 'addEventListener';
	if (typeof define === 'function' && define.amd) {
		define([/*deps*/], factory);
	} else {
		airhooks[method] = factory(/*deps*/);
		root.airhooks = airhooks;
	}
}(this, this.airhooks || {}, function (/*deps*/) {
	/**
	 * @description
	 * Bind listener to event on target using whichever browser method is supported.
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener MDN: EventTarget.addEventListener}
	 *
	 * @module airhooks/addEventListener
	 * @alias airhooks.addEventListener
	 *
	 * @param {Element|Object} target - The event target like an Element, Document,
	 *   Window, or any other object that supports events (such as XMLHttpRequest).
	 * @param {String} type - The event type to listen for.
	 * @param {Function} listener - Event listener called when event is triggered.
	 *
	 * @example
	   <example name="addEventListener-amd" type="AMD" deps="vendor/require.min.js">
	   	<file name="index.html">
	   		<img data-image alt="get ready">
	   		<button class="button button-primary" data-dance>Dance</button>
	   	</file>
	   	<file name="app.js">
	   		require(['airhooks/addEventListener'], function(addEventListener) {
	   			var button = document.querySelector('[data-dance]');
	   			var image = document.querySelector('[data-image]');

	   			addEventListener(button, 'click', function() {
	   				image.src = 'http://www.stickerupper.com/images/detailed/002-breakdance-one-hand-stand-dance-sticker.gif';
	   			});
	   		});
	   	</file>
	   </example>

	   <example name="addEventListener-web" type="web" deps="airhooks/addEventListener.js">
	   	<file name="index.html">
	   		<img data-image alt="get ready">
	   		<button class="button button-primary" data-dance>Dance</button>
	   	</file>
	   	<file name="app.js">
	   		(function(airhooks){
	   			var button = document.querySelector('[data-dance]');
	   			var image = document.querySelector('[data-image]');

	   			airhooks.addEventListener(button, 'click', function(){
	   				image.src = 'http://www.stickerupper.com/images/detailed/002-breakdance-one-hand-stand-dance-sticker.gif';
	   			});
	   		}(this.airhooks));
	   	</file>
	   </example>
	 */
	return function addEventListener(target, type, listener) {
		if (document.addEventListener) {
			target.addEventListener(type, listener);
		} else {
			target.attachEvent('on' + type, function(){
				listener.call(target);
			});
		}
	}
}));