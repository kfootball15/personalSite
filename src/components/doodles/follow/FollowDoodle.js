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
export default function FollowDoodle ({
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

        let numBirds = 50;
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
                this.angle1 = angle1;
            }
        
            // Custom method for updating the variables
            update() {
                /**
                 * dx/dy  - Find center of ellipse
                 * angle1 - find angle of mouse to center of ellipse
                 * x/y    - Recalculate x/y based on angle1
                 */
                let dx = p5.mouseX - this.x; // this will find the birds (ellipse's) center x position
                let dy = p5.mouseY - this.y; // this will find the birds (ellipse's) center y position
                this.angle1 = p5.atan2(dy, dx); // the angle of the line between the mouse and the center of the birds (ellipse's). To understand atan2 better, see this sketch: https://editor.p5js.org/menshguy/sketches/8DEPJqpAk
                this.x = p5.mouseX - p5.cos(this.angle1) * this.segLength;
                this.y = p5.mouseY - p5.sin(this.angle1) * this.segLength;
            }
        
            // Custom method for drawing the object
            draw() {
                // segment(this); // this will draw a segment from coordinate (x, y), at an angle of *angle1*, at a distance of *segLength*
                p5.ellipse(this.x, this.y, 20, 20); // this will draw the ellipse at coordinate (x, y)
            }
        }
        
        p5.setup = () => {
            p5.createCanvas(710, 400);
            p5.strokeWeight(20.0);
            p5.stroke(255, 100); // rgba values

            for (let i = 0; i < numBirds; i++) {
                birds[i] = new Bird(
                    p5.random(10, 100), //x
                    p5.random(10, 100), //y
                    p5.random(50, 100), //segLength
                    p5.random(-3.14, 3.14) //angle1
                )
            }

        }

        p5.draw = () => {
            p5.background(0);
            for (let i = 0; i < birds.length; i++) {
                birds[i].update();
                birds[i].draw();
            }
        }

    }, [])

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