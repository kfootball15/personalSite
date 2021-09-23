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
        let cols;
        let rows;
        let img;
        let current; // = new float[cols][rows];
        let previous; // = new float[cols][rows];
        let dampening = 0.9;
        let pressValue = 2500;

        p5.mouseDragged = () => {
            let index = (p5.mouseX + p5.mouseY * cols) * 4;
            previous[index] = pressValue;
            previous[index + 1] = pressValue;
            previous[index + 2] = pressValue;
        }
        
        p5.mousePressed = () => {
            let index = (p5.mouseX + p5.mouseY * cols) * 4;
            previous[index] = pressValue;
            previous[index + 1] = pressValue;
            previous[index + 2] = pressValue;
        }

        p5.preload = () => {
            img = p5.loadImage(BG_IMAGE);
        }

        p5.setup = () => {
            p5.pixelDensity(1);
            p5.createCanvas(img.width, img.height);
            cols = p5.width;
            rows = p5.height;
            // The following line initializes a 2D cols-by-rows array with zeroes
            // in every array cell, and is equivalent to this Processing line:
            // current = new float[cols][rows];
            
            /** Black Background */
            // p5.background(0)
            current = new Array(cols * rows * 4).fill(0);
            previous = new Array(cols * rows * 4).fill(0);
            
            /** Image Background */
            p5.image(img, 0, 0)
            p5.loadPixels()
            img.loadPixels()
            // current = img.pixels;
            // previous = [...p5.pixels];

            for (let x = 0; x < cols; x++) {
                for (let y = 0; y < rows; y++) {
                    let index = (x + y * cols) * 4;
                    current[index] = img.pixels[index]
                    previous[index] = img.pixels[index]
                }
            }
            p5.updatePixels();

        }

        p5.draw = () => {
            // p5.image(img, 0, 0)
            p5.loadPixels();
            // img.loadPixels()

            //brightness
            // for (let x = 0; x < img.width; x++) {
            //     for (let y = 0; y < img.height; y++ ) {
            //     // Calculate the 1D location from a 2D grid
            //     let loc = (x + y * img.width ) * 4;
            //     // Get the R,G,B values from image
            //     let r,g,b;
            //     r = img.pixels[loc];
            //     // g = img.pixels[loc+1];
            //     // b = img.pixels[loc+2];
            //     // Calculate an amount to change brightness based on proximity to the mouse
            //     // The closer the pixel is to the mouse, the lower the value of "distance"
            //     let maxdist = 50;//dist(0,0,width,height);
            //     let d = p5.dist(x, y, p5.mouseX, p5.mouseY);
            //     let adjustbrightness = 255*(maxdist-d)/maxdist;
            //     r += adjustbrightness;
            //     // g += adjustbrightness;
            //     // b += adjustbrightness;
            //     // Constrain RGB to make sure they are within 0-255 color range
            //     r = p5.constrain(r, 0, 255);
            //     // g = constrain(g, 0, 255);
            //     // b = constrain(b, 0, 255);
            //     // Make a new color and set pixel in the window
            //     let pixloc = (y*p5.width + x)*4;
            //         p5.pixels[pixloc] = r;
            //         p5.pixels[pixloc+1] = r;
            //         p5.pixels[pixloc+2] = r;
            //         p5.pixels[pixloc+3] = 255; // Always have to set alpha
            //     }
            // }

            for (let x = 1; x < img.width - 1; x++) {
                for (let y = 1; y < img.height - 1; y++) {
                    
                    let index = (x + y * img.width) * 4;
                    
                    /** Ripple ALgo */
                    // current[x][y] = (
                    //     previous[x - 1][y] 
                    //     + previous[x + 1][y]
                    //     + previous[x][y - 1]
                    //     + previous[x][y + 1] )
                    //     / 2 - current[x][y];
                    // current[x][y] = current[x][y] * dampening;

                    /** Fairly certain this algo will work and find the correct neighbors */
                    current[index] = (
                        previous[((x-1) + y * img.width) * 4] 
                        + previous[((x+1) + y * img.width) * 4]
                        + previous[(x + (y-1) * img.width) * 4]
                        + previous[(x + (y+1) * img.width) * 4]
                        ) / 2 - current[index];
                    current[index] = current[index] * dampening;
                    current[index + 1] = current[index + 1] * dampening;
                    current[index + 2] = current[index + 2] * dampening;
                    
                    // current[index] = (
                    //     previous[index - 4] 
                    //     + previous[index + 4]
                    //     + previous[index - (img.width * 4)]
                    //     + previous[index + (img.width * 4)])
                    //     / 2 - current[index];
                    // current[index] = current[index] * dampening;
                    
                    // console.log(p5.pixels[index], p5.pixels[index + 1], p5.pixels[index + 2], p5.pixels[index + 3])
                    // console.log(current[index], current[index+1], current[index+2], current[index+3])
                    p5.pixels[index + 0] = current[index];
                    p5.pixels[index + 1] = current[index];
                    p5.pixels[index + 2] = current[index];
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
        if (isActive) myP5 = new p5(Sketch, sketchRef.current)
        console.log("runs", isActive, myP5)
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