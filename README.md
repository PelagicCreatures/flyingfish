# @PelagicCreatures/FlyingFish

### Sargasso supervised Lazy Loaded Images

[Demo Page](https://blog.myanti.social/demos/flyingfish)

Sargasso class that implements lazy loaded images using background-image css properties which always fits image within its container's dimensions or the src attribute on an IMG tag. Image is loaded in a web worker and the DOM is updated in an Animation Frame for optimal performance.

```
@author Michael Rhodes
@license MIT
Made in Barbados 🇧🇧 Copyright © 2020 Michael Rhodes
```

The FlyingFish Sargasso class can be used on an IMG tag or any container that supports background-image style, usually a div.

Install in your project
```
npm install @PelagicCreatures/Sargasso
npm install @PelagicCreatures/FlyingFish
```

Quick HTML example using CDN:
```html
<style>
	.my-container { width: 30vw; height: 30vh; }
	.my-responsive-image {
		width:100%; height:100%; background-size: contain; background-repeat: no-repeat; background-position: center center;
	}
</style>

<script type='module' src='https://cdn.jsdelivr.net/npm/@pelagiccreatures/sargasso/dist/sargasso.es.js'></script>
<script type="module" src='https://cdn.jsdelivr.net/npm/@pelagiccreatures/flyingfish/dist/flyingfish.es.js'></script>
<script type='module'>
	bootSargasso()
</script>

<img data-sargasso-class="FlyingFish" data-src="/path-to-image.jpg">

<div class="my-container">
	<div class="my-responsive-image" data-sargasso-class="FlyingFish" data-src="/path-to-image.jpg"></div>
</div>
```

To make image crop to fill the frame use: `background-size: cover;`
