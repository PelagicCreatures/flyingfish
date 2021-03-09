# [@pelagiccreatures/flyingfish](https://www.npmjs.com/package/@pelagiccreatures/flyingfish)

### Sargasso supervised Lazy Loaded Images

Sargasso subclass that implements lazy loaded images for background-image css or the src attribute for an IMG tag. For optimal performance, the image is loaded using a web worker and the DOM is updated in Animation Frame updates.

FlyingFish works as a standalone image loader on any page or as part of the [@pelagiccreatures/sargasso](https://www.npmjs.com/package/@pelagiccreatures/sargasso) framework.
```
@author Michael Rhodes
@license MIT
Made in Barbados 🇧🇧 Copyright © 2020-2021 Michael Rhodes
```

The FlyingFish Sargasso class can be used on an IMG tag or any container that supports background-image style.

Quick HTML example using CDN:
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .my-container { width: 30vw; height: 30vh; margin-top: 150vh;}
    .my-responsive-image {
      width:100%;
      height:100%;
      background-size: contain; /* note: to make image crop to fill the frame use: cover; */
      background-repeat: no-repeat;
      background-position: center center;
    }

		img { height: 30vh; }

    /* optional classes for placeholder style and loading effects.
      .flying-fish-loaded class is added to element when image is loaded
      so in this example the images quickly fades in once loaded.
      */
    .flying-fish { opacity: 0; transition: opacity .3s; }
    .flying-fish-loaded { opacity: 1; }
  </style>
</head>
<body>
  <p>
    Scroll Down to load images below the fold
  </p>

  <div class="my-container">
    <p>Image tag</p>
    <img data-sargasso-class="FlyingFish" data-src="https://raw.githubusercontent.com/PelagicCreatures/flyingfish/master/test.jpg" class="flying-fish">
  </div>

  <p>
    Scroll more.
  </p>

  <div class="my-container">
    <p>Responsive background image</p>
    <div class="my-responsive-image flying-fish" data-sargasso-class="FlyingFish" data-src="https://raw.githubusercontent.com/PelagicCreatures/flyingfish/master/test.jpg"></div>
  </div>

  <script src='https://cdn.jsdelivr.net/npm/@pelagiccreatures/sargasso/dist/sargasso.iife.js'></script>
  <script src='https://cdn.jsdelivr.net/npm/@pelagiccreatures/flyingfish/dist/flyingfish.iife.js'></script>

  <script defer>
    window.onload = () => {
      SargassoModule.utils.bootSargasso()
    }
  </script>
</body>
</html>
```

[Try It](https://stackblitz.com/edit/sargasso-flyingfish)

**Note**: *The image has to be served over http(s)*

### Serving modules from your project
```
npm install @pelagiccreatures/sargasso --save-dev
npm install @pelagiccreatures/flyingfish --save-dev
```

You can use the .iife.js bundles in the /dist directory of the \@PelagicCreatures modules by copying them to a public directory on your server and referencing them in script tags in your html.
```
node_modules/@PelagicCreatures/Sargasso/dist/sargasso.iife.js
node_modules/@PelagicCreatures/FlyingFish/dist/flyingfish.iife.js
```

-or-

You can also bundle sargasso modules with your own es6 code using rollup.

```
npm install npx -g
npm install rollup --save-dev
npm install @rollup/plugin-json --save-dev
npm install @rollup/plugin-commonjs --save-dev
npm install @rollup/plugin-node-resolve --save-dev
npm install rollup-plugin-terser --save-dev
```

app.js
```javascript
import { Sargasso, utils, loadPageHandler } from '@pelagiccreatures/sargasso'

import { FlyingFish } from '@pelagiccreatures/flyingfish'

const boot = () => {
  utils.bootSargasso({})
}

export {
  boot
}
```

html
```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <img data-jsclass="FlyingFish" data-src="/some-image.jpg">
    <script src="public/dist/js/userapp.iife.js" defer></script>
    <script defer>
      window.onload= () => {
        App.boot()
      }
    </script>
  </body>
</html>
```

#### Create a rollup config file
Set input and output ass needed.

rollup.config.js
```javascript
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'

import {
  terser
}
  from 'rollup-plugin-terser'

export default {
  input: './app.js', // <<< location of your es6 code

  output: {
    format: 'iife',
    file: 'public/dist/js/userapp.iife.js', // <<< where to save the browser bundle
    name: 'App', // <<< global variable where app.js exports are exposed
    sourcemap: true,
    compact: true
  },

  plugins: [
    json(),
    commonjs({}),
    nodeResolve({
      preferBuiltins: false,
      dedupe: (dep) => {
        return dep.match(/^(@pelagiccreatures|lodash|js-cookie)/)
      }
    }),
    terser({
      output: {
        comments: false
      },
      keep_classnames: true,
      keep_fnames: true
    })
  ]
}
```

Make the bundle
```
npx rollup --no-treeshake --no-freeze -c rollup.config.js
```
