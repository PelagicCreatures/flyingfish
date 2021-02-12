/**
	@PelagicCreatures/FlyingFish

	Sargasso class that impelments lazy loaded images using background-image which always
	fits image within its container's dimensions

	@author Michael Rhodes
	@license MIT
	Made in Barbados 🇧🇧 Copyright © 2020-2021 Michael Rhodes

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

import {
	FlyingFish
}
	from './lib/FlyingFish.js'

export {
	FlyingFish
}
