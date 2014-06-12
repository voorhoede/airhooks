(function (root, airhooks, factory) {
	var method = 'removeEventListener';
	if (typeof define === 'function' && define.amd) {
		define([/*deps*/], factory);
	} else {
		airhooks[method] = factory(/*deps*/);
		root.airhooks = airhooks;
	}
}(this, this.airhooks || {}, function (/*deps*/) {
	/**
	 * @description
	 * Removes the event listener previously registered with addEventListener.
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.removeEventListener MDN: EventTarget.removeEventListener}
	 *
	 * @module airhooks/removeEventListener
	 * @alias airhooks.removeEventListener
	 *
	 * @param {Element|Object} target - The event target like an Element, Document,
	 *   Window, or any other object that supports events (such as XMLHttpRequest).
	 * @param {String} type - The event type the listener is .
	 * @param {Function} listener - Event listener called when event is triggered.
	 *
	 * @example Trigger ony increments counter when enabled. Uses add- & removeEventListener.
		<example name="removeEventListener-amd" type="AMD" deps="vendor/require.min.js">
		<file name="index.html">
			<button class="button button-default" data-trigger>Trigger</button>
			<button class="button button-default" data-enable-trigger>Enable</button>
			<button class="button button-default" data-disable-trigger>Disable</button>
			<output data-output>0</output>
		</file>
		<file name="app.js">
			require(['airhooks/addEventListener', 'airhooks/removeEventListener'],
				function(addEventListener, removeEventListener) {
					var button = document.querySelector('[data-trigger]');
					var onButton = document.querySelector('[data-enable-trigger]');
					var offButton = document.querySelector('[data-disable-trigger]');
					var output = document.querySelector('[data-output]');
					var count = 0;

					function increment() {
						count++;
						output.value = count;
					}

					addEventListener(onButton, 'click', function() {
						addEventListener(button, 'click', increment);
					});
					addEventListener(offButton, 'click', function() {
						removeEventListener(button, 'click', increment);
					});
				});
		</file>
		</example>

		<example name="removeEventListener-web"
				type="web"
				deps="airhooks/addEventListener.js;airhooks/removeEventListener.js">
		<file name="index.html">
			<button class="button button-default" data-trigger>Trigger</button>
			<button class="button button-default" data-enable-trigger>Enable</button>
			<button class="button button-default" data-disable-trigger>Disable</button>
			<output data-output>0</output>
		</file>
		<file name="app.js">
			(function(airhooks) {
				var button = document.querySelector('[data-trigger]');
				var onButton = document.querySelector('[data-enable-trigger]');
				var offButton = document.querySelector('[data-disable-trigger]');
				var output = document.querySelector('[data-output]');
				var count = 0;

				function increment() {
					count++;
					output.value = count;
				}

				airhooks.addEventListener(onButton, 'click', function() {
					airhooks.addEventListener(button, 'click', increment);
				});
				airhooks.addEventListener(offButton, 'click', function() {
					airhooks.removeEventListener(button, 'click', increment);
				});

			}(this.airhooks));
		</file>
		</example>
	 */
	return function removeEventListener(target, type, listener) {
		if (document.removeEventListener) {
			target.removeEventListener(type, listener, false);
		} else {
			target.detachEvent('on' + type, listener);
		}
	};
}));