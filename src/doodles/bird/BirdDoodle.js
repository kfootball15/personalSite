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
export default function BirdDoodle ({
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
        let x           = 100,
            y           = 100,
            angle1      = 0.0,
            easing      = 0.05,
            segLength   = 50;

        function segment(x, y, a) {
            p5.push(); // starts a new drawing state/settings 
            p5.translate(x, y);
            p5.rotate(a);
            p5.line(0, 0, segLength, 0);
            p5.pop(); // sets drawing state/settings back to setup() defaults (see setup function)
        }
       
        p5.setup = () => {
            /** Create canvas and set the stroke properties */
            p5.createCanvas(710, 400);
            p5.strokeWeight(20.0);
            p5.stroke(255, 100, 100, 50); // rgba values
        }

        p5.draw = () => {
            p5.background(0);

            /**
             * dx/dy  - Find center of ellipse
             * angle1 - find angle of mouse to center of ellipse
             * x/y    - Recalculate x/y based on angle1
             */
            let dx = p5.mouseX - x; // this will find the ellipses's center x position
            let dy = p5.mouseY - y; // this will find the ellipses's center y position
            angle1 = p5.atan2(dy, dx); // the angle of the line between the mouse and the center of the ellipses. To understand atan2 better, see this sketch: https://editor.p5js.org/menshguy/sketches/8DEPJqpAk
            x = p5.mouseX - p5.cos(angle1) * segLength; // 
            y = p5.mouseY - p5.sin(angle1) * segLength;

            /** Redraw segment and Ellipse */
            segment(x, y, angle1); // this will draw a segment from coordinate (x, y), at and angle of *angle1*, at a distance of *segLength*
            p5.ellipse(x, y, 20, 20); // this will draw the ellipse at coordinate (x, y)
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