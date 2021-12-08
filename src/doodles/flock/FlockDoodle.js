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
export default function FlockDoodle ({
    isTransitioning,
    isActive,
    isMobile
}) {
    const classes = useStyles();
    const windowSize = useWindowSize();

    //p5 instance mode requires a reference on the DOM to mount the sketch
    //So we use react's createRef function to give p5 a reference
    const sketchRef = useRef(null);
    const imageBGRef = useRef(null);

    // This uses p5's instance mode for sketch creation and namespacing
    /**
     * This Ripple alogrithm references this old web page: 
     * https://web.archive.org/web/20160418004149/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm
     * 
     * Original Coding train tut:
     * https://www.youtube.com/watch?v=BZUdGqeOD0w&ab_channel=TheCodingTrain 
     */
    const Sketch = useCallback( p5 => {

        let x = 1;
        let y = 1;
        let easing = 0.01;
        let flockDistance = 100;
        let flockJitter = 5;
        let numBirds = 10;
        let birds = [];

        
        function segment(bird) {
            p5.push(); // starts a new drawing state/settings 
            p5.translate(bird.x, bird.y);
            p5.rotate(bird.angle1);
            p5.line(0, 0, bird.segLength, 0);
            p5.pop(); // sets drawing state/settings back to setup() defaults (see setup function)
        }
        
        class Bird {
            constructor(x, y, segLength, angle1) {
                this.x = x;
                this.y = y;
                this.segLength = segLength;
                // this.angle1 = angle1;
            }
        
            // Custom method for updating the variables
            update() {

                let targetX = x;
                let dx = targetX - this.x;
                // if (Math.abs(dx) > this.segLength) this.x += dx * easing; //Math.abs will return the absolute value of a number, avoding negative values
                this.x += dx * easing; //Math.abs will return the absolute value of a number, avoding negative values
    
                let targetY = y;
                let dy = targetY - this.y;
                // if ( Math.abs(dy) > this.segLength) this.y += dy * easing;
                this.y += dy * easing;
   
            }
        
            // Custom method for drawing the object
            draw() {
                p5.ellipse(this.x, this.y, 50, 50);
            }
        }

        p5.mousePressed = () => {
            /** Create a new Bird */
            // for (let i = 0; i < numBirds; i++) {
            //     let bird = new Bird(p5.mouseX, p5.mouseY, p5.random(10, 20), p5.random(0, 2 * Math.PI));
            //     birds.push(bird);
            // }


            x = p5.mouseX
            y = p5.mouseY
        }
       
        p5.setup = () => {
            p5.createCanvas(windowSize.width, windowSize.height);
            p5.noStroke();

            // create birds
            for (let i = 0; i < numBirds; i++) {
                let newBird = new Bird(
                    1,
                    1,
                    p5.random( flockDistance - (flockJitter / 2), flockDistance + (flockJitter * 2) ),
                    // angle1
                )
                console.log(newBird)

                birds[i] = newBird;
            }

        }

        p5.draw = () => {
            p5.background(237, 34, 93);

            for (let i = 0; i < birds.length; i++) {
                birds[i].update();
                birds[i].draw();
            }
        }

    }, [windowSize])

    /** Create a new p5 object on component mount, feed it */
    useEffect(() => {
        let myP5;
        if (isActive) myP5 = new p5(Sketch, sketchRef.current)
    }, [isActive])

    return (
        <div className={classes.container} >
            {/* Rain Drop Sktch */}
            <div
                className={ classes.sketch }
                ref={ sketchRef } 
            />
        </div>
    )
};

const useStyles = makeStyles( theme => ({
    container: {

    },
    img: {

    },
    sketch: {

    }
}));