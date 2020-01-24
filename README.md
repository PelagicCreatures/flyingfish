# @PelagicCreatures/FlyingFish

### Sargasso supervised Lazy Loaded Images

[Demo Page](https://blog.myanti.social/demos/lazyload)

Sargasso class that implements lazy loaded images using background-image css properties which always fits image within its container's dimensions or the src attribute on an IMG tag. Image is loaded in a web worker and the DOM is updated in an Animation Frame for optimal performance.

@author Michael Rhodes
@license MIT
Made in Barbados 🇧🇧 Copyright © 2020 Michael Rhodes

The image is not loaded until visible in viewport

This class can be used on an IMG tag or any container that supports background-image style, usually a div.

HTML:
```html
<img data-sargasso-class="FlyingFish" data-src="/path-to-image.jpg">

<div class="my-container">
	div class="my-responsive-image" data-sargasso-class="FlyingFish" data-src="/path-to-image.jpg"></div>
</div>
```

CSS:
```css
.my-container { width: 30vw; height: 30vh; }
.my-responsive-image {
	width:100%; height:100%; background-size: contain; background-repeat: no-repeat; background-position: center center;
}
```

To make image crop to fill the frame use:
	background-size: cover;
