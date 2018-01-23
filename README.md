# Getting Started

To run the application locally, you must provide your own Giphy API key by creating a file `constants/apikey.js` that exports an `API_KEY` string. See `constants/apikey.example.js` for an example.

After setting up the API key, you can start the app normally:

```
yarn install
yarn start
```

or

```
npm install
npm start
```

# Overview

This mobile-friendly application renders a list of gifs from Giphy and organizes them into a [lightbox layout](http://blog.vjeux.com/2012/image/image-layout-algorithm-lightbox.html). As the user scrolls down, more gifs are fetched. The images's perceived performance is optimized by rendering a still image preview before fetching the gif. Moreover, even before the image preview is rendered, there is already a colorful filler displayed. Fixed width images and gifs are used to keep request sizes down.

The lightbox layout places images based on the following heuristic:

1. split layout into equal width columns
1. for each image, place in the column with shortest length
1. while placing the image, round off the height to a fixed interval
1. when image is to be placed in a column with adjacent column of the same height, double the image's size around 60% of the time

In addition to React, I used Redux for state-management and Redux Saga middleware to handle side effects such as network requests. Flow is also used in the layout file to document and type-check the functions there.

# Trade-Offs

There are several trade-offs I made when implementing this application, such as:

### Lightbox Layout

I chose to use the lightbox layout to make image placement less monotonous. The layout works by absolutely positioning and calculating each image's `top` and `left` property. As a result, the layout has to be manually resized when the number of columns change (on a resize event). This gives the consumer more control over the layout at the expense of having to the work the browser normally does.

### Computing Layout in Reducer

At first, I computed the image gallery layout inside of a React component. I felt that doing so coupled the layout heuristic with a particular framework, so I separated out the lightbox layout logic to its own set of functions to be used in the `layoutReducer`. This introduced a level of opaqueness in the code base, but also eliminated a lot of complexity at the component level

### Saga Abstraction

On some level, it is a bit of overkill to bring in the Redux Saga abstraction when the only side-effect is a network request to Giphy. On the other hand, by using Sagas, we keep our actions simple functions that return objects and are able to easily test the async-flow that should happen when requesting gifs. We also get, out of the box, debouncing behavior for network requests. 
