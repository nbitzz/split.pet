---
title: "Optimizing split.pet"
description: "What I've done in my attempts to make split.pet as small as possible, and what you can probably do too"
pubDate: 1732587081000
image:
    path: "mahiro/Sweat.png"
    alt: Mahiro Oyama sweating, eating a popsicle
    isTopper: true
unlisted: false
---

## Use WEBP/AVIF/JXL

Don't be stupid, embrace formats like webp, avif, and jxl. If you want to keep compatibility with older browsers and devices which don't support these formats, use [the `<picture>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture).

[Astro's `<Picture>` component](https://docs.astro.build/en/guides/images/#create-responsive-images-with-the-picture--component) is what I use on this site and will do all the conversion, optimization and setup shit for you.

## Resize your images

Stop loading a 1920x1080 image only to resize it to 300px wide in CSS. Post thumbnails on split.pet are resized to a maximum of 750px wide. If they're "toppers", a 10x3 image is used as a pseudo-blur.

## Optimize your background

This only applies if you have a background that isn't just a static color.

I did not need a 14MiB Lagtrain background video. You don't either.

If you _do_ use a background video, make sure to strip the audio from it instead of just muting it in HTML.

Save some space by optimizing any massive background asset you may have. If it's adaptive based on device theme, [you can use the `<picture>` element to **load** a different background based on media queries](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#using_the_media_attribute_with_picture).

The word "load" in the last sentence is in bold for a reason. Using media queries in CSS would only **show** a different image and waste bandwidth downloading an image that will never be shown to the user reading your site.

Something I also did which is extremely stupid and that probably won't apply to you was split my background into 2 parts - [a static background image](/laundry/laundry-stat.webp), which also has an avif version, and [a heavily compressed transparent webm](/laundry/laundry-crop.webm).

This helped me shave off about 150KiB more off my website, and as a bonus, I get a static background image on browsers that don't have support for webm/etc.

## Optimize your buttons

[Jack](https://jack.cab) helped me optimize my buttons. He has [a guide on optimizing 88x31 GIFs published on his blog](https://jack.cab/blog/optimize-88x31s/), which you should probably follow.

I scrapped together [a basic little script for passing all of the PNGs through ffmpeg](https://github.com/nbitzz/split.pet/blob/master/scripts/button-ffmpeg-pass.sh) with a ton of help from Google, which helped shave off ~10KiB or so.

## Be conservative with fonts

Fonts are fat as fuck. Use as little as possible. Removing Pinyon Script from my quotes section, though it ruined a bit of the humor, saved me ~50KiB.

If you really want to keep that font, [subset it](https://fonts.google.com/knowledge/glossary/subsetting). Jack does this for the script font on his site with the [`subset-font` package](https://npmjs.com/package/subset-font) and [a build script](https://github.com/Jack5079/Jack5079/blob/master/build.ts). [`subfont`](https://npmjs.com/package/subfont) is a tool which automates font subsetting, which is what Jack uses on [Etcetera's website](https://cetera.uk).

Or if you really want to conserve space, don't download a font at all. Use a web font like `sans-serif` or `system-ui` instead.

## Resize your favicon

Favicons are pretty damn big too. I don't remember how much I saved, but resizing my .ico and .png to 32x32 and 64x64 helped to reduce my page size.

## Reduce script size

If you write TypeScript, remember to use [`type` imports](https://www.typescriptlang.org/docs/handbook/2/modules.html#import-type) in your code wherever possible. This helped shave off ~80KiB from an `enum` import on my Lanyard widget.

## Bonus: preloading

This won't make your site smaller, but it might feel faster. split.pet uses a [background Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) to preload pages on hover, acting as an SPA. Notice how navigation is unnaturally quick? Yeah.
