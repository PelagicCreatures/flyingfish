this.PelagicCreatures = this.PelagicCreatures || {};
this.PelagicCreatures.FlyingFish = (function (exports, Sargasso) {
	'use strict';

	class FlyingFish extends Sargasso.Sargasso {
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

	Sargasso.utils.registerSargassoClass('FlyingFish', FlyingFish);

	exports.FlyingFish = FlyingFish;

	return exports;

}({}, PelagicCreatures.Sargasso));
//# sourceMappingURL=flyingfish.iife.js.map
