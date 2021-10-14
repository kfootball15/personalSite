import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import WaterWave from 'react-water-wave';
import BG_IMAGE from 'assets/test.jpeg';
import {
    useWindowSize,
    useEventListener
} from 'helpers';

/** Keen to try this with ThreeJS: 
 * https://tympanus.net/codrops/2019/10/08/creating-a-water-like-distortion-effect-with-three-js/ */

// https://github.com/homerchen19/react-water-wave
export default function RainDoodle ({
    isTransitioning,
    isActive,
    isMobile
}) {
    const classes = useStyles();
    const [seconds, setSeconds] = useState(0)
    const windowSize = useWindowSize();
    const rainElement= useRef(null);
    const [rainDropInterval, setRainDropInterval] = useState(500);
    let interval; //fix

    const ripples = useCallback((e, drop) => {
        interval = setInterval(() => {
            let randomX = Math.floor( Math.random() * windowSize.width )
            let randomY = Math.floor( Math.random() * windowSize.height )
            drop({
                x: randomX,
                y: randomY,
                radius: 15,
                strength: 0.01
            })
            setSeconds(seconds => seconds + 1);
        }, rainDropInterval);
    }, [seconds, windowSize, rainDropInterval])
    
    // useEventListener('mousemove', onMouseMove);

    useEffect(() => {
        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        /** Trigger click even to kick off the rain effect */
        rainElement.current.click()
    }, [rainElement.current]);


    return (
        // <div className={classes.container} id="canvas_container" >
            <WaterWave
                style={{ width: '100%', height: '100%', backgroundSize: 'cover' }}
                imageUrl={BG_IMAGE}
                interactive={false}
                // dropRadius={20}
                // perturbance={0.02}
                // resolution={256} // The width and height of the WebGL texture to render to. The larger this value, the smoother the rendering and the slower the ripples will propagate.
            >
                {({ drop }) => (
                    <div
                        ref={rainElement}
                        onClick={e => ripples(e,drop)}
                        // onDrag={e => ripples(e,drop)}
                        className={classes.container}>

                    </div>
                )}
            </WaterWave>
        // </div>
    )
};

const useStyles = makeStyles( theme => ({
    container: {
        position: 'absolute',
        // top: '25%',
        // left: '25%',
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '8px',
        background: 'hsla(0, 0%, 100%, 0.5)',
        boxSizing: 'border-box',
        boxShadow: '0px 0px 6px black',
        // fontFamily: 'Lobster', cursive, Arial, Helvetica, sans-'serif',
    },
    sketch: {}
}));