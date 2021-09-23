import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import p5 from 'p5';
import BG_IMAGE from 'assets/test.jpeg';
import {
    useWindowSize,
} from 'helpers';

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

    //p5 instance mode requires a reference on the DOM to mount the sketch
    //So we use react's createRef function to give p5 a reference
    const sketchRef = useRef(null);

    // This uses p5's instance mode for sketch creation and namespacing
    /**
     * This Ripple alogrithm references this old web page: 
     * https://web.archive.org/web/20160418004149/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm
     * 
     * Original Coding train tut:
     * https://www.youtube.com/watch?v=BZUdGqeOD0w&ab_channel=TheCodingTrain 
     */
    const Sketch = useCallback( p5 => {
        let cols;
        let rows;
        let current;
        let previous;
        let timer = 0;
        let dampening = 0.99;
        let pressValue = 2500;
        let rainInterval = 100; //ms

        p5.mouseDragged = () => {
            let index = (p5.mouseX + p5.mouseY * cols) * 4;
            previous[index] = pressValue;
        }
        
        p5.mousePressed = () => {
            let index = (p5.mouseX + p5.mouseY * cols) * 4;
            previous[index] = pressValue;
        }
        
        p5.touchStarted = () => {
            let index = (p5.mouseX + p5.mouseY * cols) * 4;
            previous[index] = pressValue;
        }
        
        p5.touchMoved = () => {
            let index = (p5.mouseX + p5.mouseY * cols) * 4;
            previous[index] = pressValue;
        }

        /** @TODO Get window resize to work */
        // p5.windowResized = () => {
        //     cols = windowSize.width;
        //     rows = windowSize.height;
        //     current = new Array(cols * rows * 4).fill(0);
        //     previous = new Array(cols * rows * 4).fill(0);
        //     p5.resizeCanvas(windowSize.width, windowSize.height);
        // }

        p5.setup = () => {
            p5.pixelDensity(1);
            p5.createCanvas(windowSize.width, windowSize.height);
            cols = p5.width;
            rows = p5.height;
            
            /** Black Background */
            current = new Array(cols * rows * 4).fill(0);
            previous = new Array(cols * rows * 4).fill(0);
        }

        p5.draw = () => {
            p5.background(0)
            p5.loadPixels();

            /** brightness/flashlight: https://p5js.org/examples/image-brightness.html **/ 

            /** rain effect */
            let interval = Math.floor( Math.random() * rainInterval )
            if ( p5.millis() >= interval + timer ) {
                // background(random(255),random(255),random(255));
                let randomX = Math.floor( Math.random() * cols )
                let randomY = Math.floor( Math.random() * rows )
                let idx = (randomX + randomY * cols) * 4;
                previous[idx] = pressValue;
                timer = p5.millis();
            }

            for (let x = 1; x < cols - 1; x++) {
                for (let y = 1; y < rows - 1; y++) {

                    /** Single Dimension Ripple algo */
                    /** 
                     * Converted algo from required a 2D array to using 1D array
                     * This ste finds all of the neighboring pixels (not including the diagnols),
                     * adds them up, divides by 2 and subtracts the current pixel value 
                     * */
                    let index = (x + y * cols) * 4;
                    current[index] = (
                        previous[((x-1) + y * cols) * 4] 
                        + previous[((x+1) + y * cols) * 4]
                        + previous[(x + (y-1) * cols) * 4]
                        + previous[(x + (y+1) * cols) * 4]
                        ) / 2 - current[index];
                    current[index] = current[index] * dampening;
                    
                    /** Sets the r,g,b,a values of the pixels array to the current index */
                    p5.pixels[index + 0] = current[index];
                    p5.pixels[index + 1] = current[index];
                    p5.pixels[index + 2] = current[index] * 2; //b - multipling by 3 makes the ripples bluer
                    p5.pixels[index + 3] = current[index]; // Sets the value channel
                }
            }
            p5.updatePixels();
          
            /** Swaps the buffers */
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
        <>
        <img
            className={ classes.img }
            src={ BG_IMAGE }
        />
        {/* This div will contain our p5 sketch */}
        <div
            className={ classes.sketch }
            ref={ sketchRef }>

        </div>
        </>
    )
};

const useStyles = makeStyles(theme => ({
    img: {
        /* Set rules to fill background */
        minHeight: '100%',
        minWidth: 1024,
            
        /* Set up proportionate scaling */
        width: '100%',
        height: 'auto',
            
        /* Set up positioning */
        // position: 'fixed',
        top: 0,
        left: 0,
    },
    sketch: {
        position: 'fixed',
        top: 0,
        left: 0
    }
}));