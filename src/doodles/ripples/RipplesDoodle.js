import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import p5 from 'p5';
import BG_IMAGE from 'assets/test.jpeg';
import {
	useEventListener,
    useWindowSize,
	hideElement,
} from 'helpers';

function to2DArray (pixels, width, height) {
    let pixelsCopy = [...pixels]
    let arr = new Array(width).fill(0) // [0,0,0,0,0,0...]
    arr = arr.map((n,idx) =>
        pixelsCopy.splice(0, height)
    );
    return arr;
}

/** Using p5 with react: 
 * https://dev.to/christiankastner/integrating-p5-js-with-react-i0d
 * https://github.dev/christiankastner/React-P5-Template/blob/master/src/App.js */
export default function RipplesDoodle ({
    isTransitioning,
    isActive,
    isMobile
}) {
    const classes = useStyles();
    const windowSize = useWindowSize();

    console.log("window", windowSize)

    //p5 instance mode requires a reference on the DOM to mount the sketch
    //So we use react's createRef function to give p5 a reference
    const sketchRef = useRef(null);

    // This uses p5's instance mode for sketch creation and namespacing
    const Sketch = useCallback( p5 => {
        let bg;
        let cols;
        let rows;
        let current; // = new float[cols][rows];
        let previous; // = new float[cols][rows];

        let dampening = 0.99; // a lower dampening value will cause the ripples to fade quciker

        // p5.preload = () => {
        //     bg = p5.loadImage(BG_IMAGE);
        // }

        p5.mouseDragged = () => {
            previous[p5.mouseX][p5.mouseY] = 2500;
        }

        p5.setup = () => {
            p5.pixelDensity(1)
            // p5.createCanvas(windowSize.width, windowSize.height);
            p5.createCanvas(windowSize.width, windowSize.height);
            // bg.loadPixels();
            cols = p5.width;
            rows = p5.height;

            // The following line initializes a 2D cols-by-rows array with zeroes
            // in every array cell, and is equivalent to this Processing line:
            // current = new float[cols][rows];

            // let pixelsData = to2DArray(bg.pixels, bg.width, bg.height)
            // current = pixelsData;
            // previous = pixelsData;

            // current = bg.pixels;
            // previous = bg.pixels;

            current = new Array(cols).fill(0).map(n => new Array(rows).fill(0));;
            previous = new Array(cols).fill(0).map(n => new Array(rows).fill(0));;
        }

        p5.draw = () => {
            p5.background(0)
            // p5.image(bg,0,0);

            p5.loadPixels();
            for (let i = 1; i < cols - 1; i++) {
                for (let j = 1; j < rows - 1; j++) {
                    current[i][j] =
                        (previous[i - 1][j]
                        + previous[i + 1][j]
                        + previous[i][j - 1]
                        + previous[i][j + 1] )
                        /
                        2 - current[i][j];
                    current[i][j] = current[i][j] * dampening;
                    // Unlike in Processing, the pixels array in p5.js has 4 entries
                    // for each pixel, so we have to multiply the index by 4 and then
                    // set the entries for each color component separately.
                    let index = (i + j * cols) * 4;
                    p5.pixels[index + 0] = current[i][j];
                    p5.pixels[index + 1] = current[i][j];
                    p5.pixels[index + 2] = current[i][j];

                    // Where i left things last night:
                    // let currentIndex = (bg.width * j) + i; //
                    // current[currentIndex] =
                    //     (   previous[ (bg.width * j) + (i - 1) ] +
                    //         previous[ (bg.width * j) + (i + 1) ] +
                    //         previous[ (bg.width * (j - 1)) + i ] +
                    //         previous[ (bg.width * (j + 1)) + i ] ) /
                    //         2 - current[currentIndex];
                    // current[currentIndex] = current[currentIndex] * dampening;
                    // // Unlike in Processing, the pixels array in p5.js has 4 entries
                    // // for each pixel, so we have to multiply the index by 4 and then
                    // // set the entries for each color component separately.
                    // let index = (currentIndex);
                    // p5.pixels[index + 0] = current[currentIndex];
                    // p5.pixels[index + 1] = current[currentIndex];
                    // p5.pixels[index + 2] = current[currentIndex];
                }
            }
            p5.updatePixels();

            let temp = previous;
            previous = current;
            current = temp;
        }
    }, [windowSize])

    //We create a new p5 object on component mount, feed it
    useEffect(() => {
        let myP5;
        console.log("runs", isActive, myP5)
        if (isActive) myP5 = new p5(Sketch, sketchRef.current)
        // else myP5 = new p5(() => {}, sketchRef.current)
    }, [isActive])

    return (
        //This div will contain our p5 sketch
        <div ref={sketchRef}>

        </div>
    )
};

const useStyles = makeStyles(theme => ({

}));


// 2D Water Ripples
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/102-2d-water-ripple.html
// https://youtu.be/BZUdGqeOD0w
// https://editor.p5js.org/codingtrain/sketches/tYXtzNSl

// Algorithm: https://web.archive.org/web/20160418004149/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm

let cols;
let rows;
let current; // = new float[cols][rows];
let previous; // = new float[cols][rows];

let dampening = 0.99;

function setup() {

}



function draw() {

}