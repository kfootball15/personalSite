import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import p5 from 'p5';
import BG_IMAGE from 'assets/test.jpeg';
import {
	useEventListener,
    useWindowSize,
	hideElement,
} from 'helpers';
import { prev } from 'dom7';

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
        /**
         *  Unlike in Processing, the pixels array in p5.js has 4 entries
         *  for each pixel, so we have to multiply the index by 4 and then
         *  set the entries for each color component separately.
         */
        let pixelMultiplier = 4;
        let pixelDensity;
        let array2D = [];
        let current; // = new float[cols][rows];
        let previous; // = new float[cols][rows];
        /**
         * Dampening
         *      lower values --> ripples dissapear faster
         *      higher values --> ripples dissapear slower
         */
        let dampening = 0.9; 
        /** 
         *  Press Value: This number will ultimately be effected by dampening. 
         *      lower values --> smaller/faster ripples
         *      higher values --> larger/slower ripples
         * **/
        let pressValue = 5000; 

        p5.mouseDragged = () => {
            previous[p5.mouseX * pixelDensity][p5.mouseY * pixelDensity] = pressValue
        }
        
        p5.mousePressed = () => {
            previous[p5.mouseX * pixelDensity][p5.mouseY * pixelDensity] = pressValue
        }

        p5.preload = () => {
            bg = p5.loadImage(BG_IMAGE);
        }

        p5.setup = () => {
            p5.pixelDensity(1) // ciritcal we set this to 1, but not sure why yet
            pixelDensity = p5.pixelDensity();
            console.log("pixel density", pixelDensity)
            p5.createCanvas(bg.width, bg.height);
            cols = bg.width;
            rows = bg.height;

            bg.loadPixels();

            /** Creates an array of pixel values for each row in the image */
            let rowLength = cols * pixelMultiplier
            // bg.pixels.map((x, i) => {
            //     if ( i % rowLength === 0) {
            //         let arr = [ ...bg.pixels.slice( i, i + rowLength )]
            //         array2D.push(arr)
            //     }
            // })
            let counter = 0;
            while (counter < bg.pixels.length) {
                // console.log("counter", counter, bg.pixels.length)
                array2D.push(bg.pixels.slice(counter, counter + rowLength))
                counter = counter + rowLength
            }

            /** Set current and previous to array2D - we will reference this when updating pixels in our ripple algorithm */
            current = array2D
            previous = array2D

            console.log("bg", bg.height, bg.width)
            console.log("p5", rows, cols)
            
            // Setup the picture
            p5.background(0);
            p5.loadPixels();
            console.log("current:", current, current.length * current[0].length)
            console.log("bg pixels:", bg.pixels, bg.pixels.length)
            console.log("This should be true:", current.length * current[0].length === bg.pixels.length, current.length * current[0].length - bg.pixels.length)

            let c = 0
            for (let x = 0; x < rows; x++) {
                for (let y = 0; y < cols; y++) {
                    // console.log(x,y) // 469, 0
                    /** pixelIdx is equal to the index of the current pixel in the 1 dimensional p5 pixel array */
                    // let pixelIndex = (x + y * cols) * 4;
                    // console.log(pixelIndex)
                    p5.pixels[c + 0] = current[x][y];
                    p5.pixels[c + 1] = current[x][y]+1;
                    p5.pixels[c + 2] = current[x][y]+2;

                    c = c + 4
                    /** The 4th value is the alpha channel, so no need to change p5.pixels[pixelIndex + 3] **/
                }
            }
            p5.updatePixels();

            
            // Sets the 2d Array to just blank pixels 
            // current = new Array(cols*4).fill(0).map(n => new Array(rows*4).fill(100));
            // previous = new Array(cols*4).fill(0).map(n => new Array(rows*4).fill(100));

            // for (let x = 0; x < cols; x++) {
            //     for (let y = 0; y < rows; y++) {
            //         current[x][y] = bg.pixels
            //         previous[x][y] = 100
            //     }
            // }

            /** Test: Sets all pixels to color 100 */
            // for (let x = 0; x < cols; x++) {
            //     for (let y = 0; y < rows; y++) {
            //         current[x][y] = 100
            //         previous[x][y] = 100
            //     }
            // }

            /** Test: sets to pixel to 100 to tigger the ripple algo */
            // previous[100][100] = 100
        }

        p5.draw = () => {

            // p5.background(0);
            // p5.background(0);
            p5.loadPixels();
            for (let x = 1; x < rows - 1; x++) {
                for (let y = 1; y < cols - 1; y++) {


                    // console.log("x,y", x, y)
                    // console.log("current", current[x])
                    /* 
                        This is essentially:
                        1. Finding all the neighboring pixels of the current pixel (current[i][j]),
                        2. Adding them all together
                        3. Dividing them by 2
                        4. Subtracting the value of the current pixel (current[i][j])
                    **/
                    // current[x][y] = (
                    //     previous[x - 1][y] 
                    //     + previous[x + 1][y]
                    //     + previous[x][y - 1]
                    //     + previous[x][y + 1] )
                    //     / 2 - current[x][y];
                    // current[x][y] = current[x][y] * dampening;

                    /* 
                        Since the pixels are being stored in a 1 dimensional array, and we are writing this algorithm as a 2 dimensional array,
                        this algorithm will find the current pixel index in the 1 dimensional array
                    **/
                    // let pixelIndex = (x + y * cols) * 4; // pixelIdx is equal to the index of the current pixel in the 1 dimensional p5 pixel array
                    // p5.pixels[pixelIndex] = current[x][y];
                    // p5.pixels[pixelIndex + 1] = current[x][y]+1;
                    // p5.pixels[pixelIndex + 2] = current[x][y]+2;
                    /** The 4th value is the alpha channel, so no need to change p5.pixels[pixelIndex + 3] **/
                }
            }
            p5.updatePixels();
            
            /** this will swap the values of previous and current */
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