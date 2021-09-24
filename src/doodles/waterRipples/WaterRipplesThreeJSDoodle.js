import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import {
    useWindowSize,
    useEventListener
} from 'helpers';
import WaterTexture from './WaterTexture';



export default function WaterRipplesThreeJSDoodle ({
    isTransitioning,
    isActive,
    isMobile
}) {
    const classes = useStyles();
    const canvasRef = useRef(null);
    const [waterTexture, setWaterTexture] = useState()
    const windowSize = useWindowSize();
    
    const onMouseMove = useCallback((ev) => {
        const point = {
            x: ev.clientX / window.innerWidth,
            y: ev.clientY / window.innerHeight
        };
        if (waterTexture) waterTexture.addPoint(point);
    }, [waterTexture])

    const tick = useCallback(() => {
        // console.log("tick runs", waterTexture)
        if (waterTexture) waterTexture.update();
        requestAnimationFrame(tick);  
    }, [waterTexture])

    const init = useCallback(() => {
        console.log("init runs")
        tick();
    }, [tick])

    useEventListener('mousemove', onMouseMove);

    useEffect(() => {
        console.log("runs useeffect", windowSize)
        if (!waterTexture && windowSize.width && windowSize.height ) 
            setWaterTexture(new WaterTexture({ 
                debug: true,
                width: windowSize.width,
                height: windowSize.height
            }, canvasRef.current))
        if (waterTexture) init();
    }, [waterTexture, windowSize])

    return (
        <div className={classes.container} id="canvas_container" >
            <canvas ref={canvasRef} />
        </div>
    )
};

const useStyles = makeStyles( theme => ({
    container: {
        // backgroundColor: 'black',
        width: '100%',
        height: '100%'
    },
    sketch: {}
}));