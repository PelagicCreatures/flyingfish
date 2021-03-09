var FlyingFishModule = (function (exports, sargasso) {
	'use strict';

	/* 	Made in Barbados 🇧🇧 Copyright © 2020-2021 Michael Rhodes */

	class FlyingFish extends sargasso.Sargasso {
		constructor (element, options = {}) {
			super(element, {
				watchViewport: true
			});
			this.triggered = false;
		}

		enterViewport () {
			if (!this.triggered) {
				this.triggered = true;

				const offload = `onmessage = async (e) => {
				const response = await fetch(e.data.url)
				const contentType = response.headers.get('content-type');
				const blob = await response.blob()
				self.postMessage({ uid: e.data.uid, blob: blob, contentType: contentType})
			}`;

				this.workerStart('FlyingFish', offload);

				let imgUrl = this.element.getAttribute('data-src');

				// not fully qualified...
				if (!imgUrl.match(/^http/)) {
					imgUrl = new URL(imgUrl, location.href).href;
				}

				// hand the url to the worker for loading
				this.workerPostMessage('FlyingFish', {
					url: imgUrl
				});
			}
		}

		// we got a message back from a worker
		workerOnMessage (id, data) {
			if (id === 'FlyingFish') {
				this.blobURL = URL.createObjectURL(data.blob);
				const frame = () => {
					if (this.element.tagName === 'IMG') {
						this.element.setAttribute('src', this.blobURL);
					} else {
						this.element.style.backgroundImage = 'url(' + this.blobURL + ')';
					}
					this.addClass('flying-fish-loaded');
					this.sleep(); // We're done. That was easy.
				};
				this.queueFrame(frame);
			}
			super.workerOnMessage(id, data);
		}

		destroy () {
			if (this.blobURL) {
				URL.revokeObjectURL(this.blobURL);
			}
			super.destroy();
		}
	}

	sargasso.utils.registerSargassoClass('FlyingFish', FlyingFish);

	/**
		@PelagicCreatures/FlyingFish

		Sargasso class that implements lazy loaded images using background-image
		css properties or the src attribute on an IMG tag. Image is loaded using
		a web worker and the DOM is updated in an Animation Frame for optimal
		performance.

		@author Michael Rhodes
		@license MIT
		Made in Barbados 🇧🇧 Copyright © 2020-2021 Michael Rhodes

	**/

	exports.FlyingFish = FlyingFish;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

}({}, SargassoModule));
