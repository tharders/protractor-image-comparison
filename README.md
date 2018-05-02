protractor-image-comparison
==========

[![Join the chat at https://gitter.im/wswebcreation/protractor-image-comparison](https://badges.gitter.im/wswebcreation/protractor-image-comparison.svg)](https://gitter.im/wswebcreation/protractor-image-comparison?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![dependencies Status](https://david-dm.org/wswebcreation/protractor-image-comparison/status.svg)](https://david-dm.org/wswebcreation/protractor-image-comparison) [![Build Status](https://travis-ci.org/wswebcreation/protractor-image-comparison.svg?branch=master)](https://travis-ci.org/wswebcreation/protractor-image-comparison) [![Sauce Test Status](https://saucelabs.com/buildstatus/wswebcreation-nl)](https://saucelabs.com/u/wswebcreation-nl)

[![NPM](https://nodei.co/npm/protractor-image-comparison.png)](https://nodei.co/npm/protractor-image-comparison/)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/wswebcreation-nl.svg)](https://saucelabs.com/u/wswebcreation-nl)

## What can it do?
*protractor-image-comparison* is a lightweight *protractor* plugin for browsers / mobile browsers / hybrid apps to do image comparison on screens or elements.

You can:

- save or compare screens / elements against a baseline
- save or compare a fullpage screenshot against a baseline (**desktop AND mobile are now supported**)
- automatically create a baseline when no baseline is there
- disable css animations by default
- ignore anti-aliasing differences
- compare images by ignoring their colors (do a grayscale comparison)
- blockout custom regions during comparison (all)
- ignore regions by making them transparent in the base image (all) thanks to [tharders](https://github.com/tharders)
- parameter to hide / show scrollbars [pnad](https://github.com/pnad)
- increase the element dimenisions screenshots (all)
- provide custom iOS and Android offsets for status-/address-/toolbar (mobile only)
- automatically exclude a statusbar during screencomparison (mobile only)
- taking a screenshot directly from canvas, tnx to [tuomas2](https://github.com/tuomas2), see [here](https://github.com/wswebcreation/protractor-image-comparison/blob/master/docs/index.md#saveelementelement-tag-options--promise). **!!This isn't supported in IE11 and Safari 9!!**
- **NEW**, use a tolerance property called `saveAboveTolerance` that prevents saving result image to diff folder, tnx to [IgorSasovets](https://github.com/IgorSasovets )**

Comparison is based on [ResembleJS](https://github.com/Huddle/Resemble.js).

## Installation
Install this module locally with the following command:

```shell
npm install protractor-image-comparison
```

Save to dependencies or dev-dependencies:

```shell
npm install --save protractor-image-comparison
npm install --save-dev protractor-image-comparison
```

## Usage
*protractor-image-comparison* can be used for:

- desktop browsers (Chrome / Firefox / Safari / Internet Explorer 11 / Microsoft Edge)
- mobile / tablet browsers (Chrome / Safari on emulators / real devices) via Appium
- Hybrid apps via Appium

For more information about mobile testing see the [Appium](./docs/appium.md) documentation.

If you run for the first time without having a baseline the `check`-methods will reject the promise with the following warning:

    `Image not found, saving current image as new baseline.`

This means that the current screenshot is saved and you **manually need to copy it to your baseline**.
If you instantiate `protractor-image-comparsion` with `autoSaveBaseline: true`, see [docs](./docs/index.md), the image will automatically be saved into the baselinefolder.


*protractor-image-comparison* provides:

- two comparison methods `checkScreen` and `checkElement`.
- two helper methods `saveScreen` and `saveElement` for saving images.
- **NEW** a helper `saveFullPageScreens` and a comparison method `checkFullPageScreen` for saving and comparing a fullpage screenshot.

The comparison methods return a result in percentages like `0` or `3.94`.
*protractor-image-comparison* can work with Jasmine and Cucumber.js. See [Examples](./docs/examples.md) for or a *protractor*-config setup, or a Jasmine or a CucumberJS implementation.

More information about the **methods** can be found [here](./docs/methods.md).

## Conventions
See [conventions.md](./docs/conventions.md).

## Contribution
See [CONTRIBUTING.md](./docs/CONTRIBUTING.md).

## FAQ
### Width and height cannot be negative
It could be that the error `Width and height cannot be negative` is thrown. 9 out of 10 times this is related to creating an image of an element that is not in the view. Please be sure you always make sure the element in is in the view before you try to make an image of the element.

### Changing the color on an element is not detected by protractor-image-comparison
When using Chrome and using the `chromeOptions.args:['--disable-gpu']` it could be possible that the images can't be compared in the correct way. If you remove this argument all will work again. See [here](https://github.com/wswebcreation/protractor-image-comparison/issues/33#issuecomment-333409063)

## Credits
- Basic logic of `index.js` based on [PixDiff](https://github.com/koola/pix-diff)
- Comparison core of `./lib/resemble.js` [node-resemble](https://github.com/lksv/node-resemble.js) + [ResembleJS](https://github.com/Huddle/Resemble.js)

## TODO
* Update documentation for Mobile
* New (mobile friendly) testpage
