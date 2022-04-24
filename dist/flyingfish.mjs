import {Sargasso as $feOm8$Sargasso, utils as $feOm8$utils} from "@pelagiccreatures/sargasso";


class $17d3b678c549d55d$export$a5606c2709ebad88 extends $feOm8$Sargasso {
    constructor(element, options = {}){
        super(element, {
            watchViewport: true
        });
        this.triggered = false;
    }
    enterViewport() {
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
            if (!imgUrl.match(/^http/)) imgUrl = new URL(imgUrl, location.href).href;
            // hand the url to the worker for loading
            this.workerPostMessage('FlyingFish', {
                url: imgUrl
            });
        }
    }
    // we got a message back from a worker
    workerOnMessage(id, data) {
        if (id === 'FlyingFish') {
            this.blobURL = URL.createObjectURL(data.blob);
            const frame = ()=>{
                if (this.element.tagName === 'IMG') this.element.setAttribute('src', this.blobURL);
                else this.element.style.backgroundImage = 'url(' + this.blobURL + ')';
                this.addClass('flying-fish-loaded');
                this.element.dispatchEvent(new CustomEvent('sargasso-flying-fish-loaded'));
                this.sleep() // We're done. That was easy.
                ;
            };
            this.queueFrame(frame);
        }
        super.workerOnMessage(id, data);
    }
    destroy() {
        if (this.blobURL) URL.revokeObjectURL(this.blobURL);
        super.destroy();
    }
}
$feOm8$utils.registerSargassoClass('FlyingFish', $17d3b678c549d55d$export$a5606c2709ebad88);




export {$17d3b678c549d55d$export$a5606c2709ebad88 as FlyingFish};
//# sourceMappingURL=flyingfish.mjs.map
