# @PelagicCreatures/FlyingFish

### Sargasso supervised Lazy Loaded Images

[Demo Page](https://blog.PelagicCreatures.com/demos/flyingfish)

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
    width:100%;
    height:100%;
    background-size: contain; /* note: to make image crop to fill the frame use: cover; */
    background-repeat: no-repeat;
    background-position: center center;
  }

  /*
    optional classes for placeholder style and loading effects.
    .flying-fish-loaded is added to element when image is loaded
  */
  .flying-fish { opacity:0; transition: opacity .3s; background: linear-gradient(#eee, #fff); }
  .flying-fish-loaded { opacity: 1; }
</style>

<script src='https://cdn.jsdelivr.net/npm/@pelagiccreatures/sargasso/dist/sargasso.iife.js'></script>
<script src='https://cdn.jsdelivr.net/npm/@pelagiccreatures/flyingfish/dist/flyingfish.iife.js'></script>
<script defer>
  PelagicCreatures.Sargasso.utils.bootSargasso()
</script>

<p>Image tag</p>
<img data-sargasso-class="FlyingFish" data-src="/path-to-image.jpg" class="flying-fish">

<p>Responsive background image</p>
<div class="my-container">
  <div class="my-responsive-image flying-fish" data-sargasso-class="FlyingFish" data-src="/path-to-image.jpg"></div>
</div>
```
