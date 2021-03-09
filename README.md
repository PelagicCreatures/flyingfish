# [@pelagiccreatures/flyingfish](https://www.npmjs.com/package/@pelagiccreatures/flyingfish)

### Easy Lazy Loaded Images

Flying Fish implements lazy loaded images (defer loading until image is in the browser viewport) for background-image css or the src attribute for an IMG tag. For optimal performance, the image is loaded using a web worker and the DOM is updated in Animation Frame. CSS transitions can also be added for smoother feeling page load. This can vastly reduce page weight and load time on image heavy pages.

**Note**: *The images must be served over http(s)*

FlyingFish works as a standalone image loader on any html page or as part of the [@pelagiccreatures/sargasso](https://www.npmjs.com/package/@pelagiccreatures/sargasso) framework app.

```
@author Michael Rhodes
@license MIT
Made in Barbados 🇧🇧 Copyright © 2020-2021 Michael Rhodes
```

The FlyingFish element controller class can be used on an IMG tag or any container that supports background-image style.

#### define an image tag to lazy load:

Using an `img` tag
```html
<img data-sargasso-class="FlyingFish" data-src="https://url-and-path-to-image">
```

Using a custom element tag as a responsive image
```html
<style>
  .container {
    width: 100vw;
    height: 30vh;
  }

  .responsive {
    display: block;
    width: 100%;
    height: 100%;
    background-size: contain; /* or cover */
    background-repeat: no-repeat;
    background-position: center center;
  }
</style>

<div class="container">
  <sargasso-flying-fish class="responsive" data-src="https://url-and-path-to-image"></sargasso-flying-fish>
</div>
```

[Try It](https://stackblitz.com/edit/flying-fish-responsive)

#### Load and boot FlyingFish using CDN

usually at the bottom of the <body></body>

```html
<script src='https://cdn.jsdelivr.net/npm/@pelagiccreatures/sargasso/dist/sargasso.iife.js'></script>
<script src='https://cdn.jsdelivr.net/npm/@pelagiccreatures/flyingfish/dist/flyingfish.iife.js'></script>

<script defer>
	window.onload = () => { SargassoModule.utils.bootSargasso() }
</script>
```

Sargasso will perform the lazy load behavior for all the tags (and, thanks to sargasso, any tags added programmatically after the page loads.)


**Some optional css sugar:**

Once loaded the framework adds the css class `flying-fish-loaded` to the element. To implement a smooth transition and cover the image load, add an initial css class and a CSS transition by defining the classes:

```css
.flying-fish { opacity: 0; transition: opacity .3s; }
.flying-fish-loaded { opacity: 1; }
```

Then add the initial css state class to the tag:
```html
<img class="flying-fish" data-sargasso-class="FlyingFish" data-src="https://url">
```

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
