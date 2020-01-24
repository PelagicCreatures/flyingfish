/**
	@PelagicCreatures/FlyingFish

	Sargasso class that impelments lazy loaded images using background-image which always
	fits image within its container's dimensions

	@author Michael Rhodes
	@license MIT
	Made in Barbados 🇧🇧 Copyright © 2020 Michael Rhodes

	The image is not loaded until visible in viewport

	Can be used on an img tag or any container that supports background-image style, usually a div.

	HTML:
	<img data-sargasso-class="FlyingFish" data-src="/path-to-image.jpg">

	<div class="my-container">
		div class="my-responsive-image" data-sargasso-class="FlyingFish" data-src="/path-to-image.jpg"></div>
	</div>

	CSS:
	.my-container { width: 30vw; height: 30vh; }
	.my-responsive-image {
		width:100%; height:100%; background-size: contain; background-repeat: no-repeat; background-position: center center;
	}

	To make image crop to fill the frame use:
		background-size: cover;

**/

class FlyingFish extends Sargasso {
	constructor (element, options = {}) {
		super(element, {
			watchViewport: true
		})
		this.triggered = false
	}

	enterViewport () {
		if (!this.triggered) {
			this.triggered = true

			const offload = `onmessage = async (e) => {
			  const response = await fetch(e.data.url)
			  const blob = await response.blob()
			  self.postMessage({ uid: e.data.uid, blob: blob })
			}`

			this.workerStart('FlyingFish', offload)

			let imgUrl = this.element.getAttribute('data-src')

			// not fully qualified...
			if (!imgUrl.match(/^http/)) {
				imgUrl = new URL(imgUrl, location.href).href
			}

			// hand the url to the worker for loading
			this.workerPostMessage('FlyingFish', {
				url: imgUrl
			})
		}
	}

	// we got a message back from a worker
	workerOnMessage (id, data) {
		if (id === 'FlyingFish') {
			if (data.uid === this.uid) {
				this.blobURL = URL.createObjectURL(data.blob)
				const frame = () => {
					if (this.element.tagName === 'img') {
						this.element.setAttribute('src', this.blobURL)
					} else {
						this.element.style.backgroundImage = 'url(' + this.blobURL + ')'
					}
					this.sleep() // We're done. That was easy.
				}
				this.queueFrame(frame)
			}
		}
		super.workerOnMessage(id, data)
	}

	destroy () {
		if (this.blobURL) {
			URL.revokeObjectURL(this.blobURL)
		}
		super.destroy()
	}
}

registerSargassoClass('FlyingFish', FlyingFish)

if (window) {
	window.FlyingFish = FlyingFish
}

export { FlyingFish }
