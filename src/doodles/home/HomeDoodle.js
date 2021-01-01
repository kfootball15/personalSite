import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
/** for homePage project below */
import clsx from 'clsx';
import wall from 'assets/home/full_interior_lottie.json';
import building1 from 'assets/home/full_exterior_lottie.json';

import {
	useEventListener,
    useWindowSize,
    fillElement,
	hideElement,
    showElement,
    transitionFill,
	setCursor,
	appendAnimation
} from 'helpers';
import lottie from 'lottie-web';

// https://josephkhan.me/lottie-web/
let wallAnimationObject = null;
let building1AnimationObject = null;

/** transition config */
const fps = 30;
const animationSegments = {
    'sunrise': 0 * fps,
    'day': 6 * fps,
    'sunset': 12 * fps,
    'night': 18 * fps,
    'end': 24 * fps 
};

const segments = {
    'sunrise': [animationSegments.sunrise, animationSegments.day],
    'day': [animationSegments.day, animationSegments.sunset],
    'sunset': [animationSegments.sunset, animationSegments.night],
    'night': [animationSegments.night, animationSegments.end]
};

const defaultAnimationObjectSettings = {
    renderer: 'svg', // Required
    loop: true, // Optional
    autoplay: true, // Optional
};

const handleSetCurrentSegment = setCurrentSegment => e => {
    const curr = e.currentTime;
    if ( curr > segments.sunrise[0] && curr <= segments.sunrise[1] ) setCurrentSegment('sunrise');
    if ( curr > segments.day[0] && curr <= segments.day[1] ) setCurrentSegment('day');
    if ( curr > segments.sunset[0] && curr <= segments.sunset[1] ) setCurrentSegment('sunset');
    if ( curr > segments.night[0] && curr <= segments.night[1] ) setCurrentSegment('night');
};

export default function HomeDoodle (props) {
    const [DOMReady, setDOMReady] = useState(false);
    const windowSize = useWindowSize();
    const isMobile = windowSize.width <= 480
    const [weather, setWeather] = useState('clear'); 
    const [focus, setFocus] = useState('interior'); 
    const [currentSegment, setCurrentSegment] = useState(''); 
    const classes = useStyles({ weather, currentSegment, focus, isMobile, windowSize });
    

    /** Exterior */
    const building1Ref = useRef(null);

    /** Interior */
    const wallRef = useRef(null);

    // Configure and instantiate Lottie Animations
    useEffect(() => {
        console.log("instantiate animations")
        
        // Lottie settings
        // lottie.setQuality(2);
        
        // Animation Settings
        wallAnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: wallRef.current,
            name: "wall", // Name for future reference. Optional.
            animationData: wall
        });
        building1AnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: building1Ref.current,
            name: "building1", // Name for future reference. Optional.
            animationData: building1
        });
        // This will set the curAppend this to any of the layers
        wallAnimationObject.onEnterFrame = handleSetCurrentSegment(setCurrentSegment);
    }, []);

    // Listens for dom ready - can use SVGs
    useEventListener('load', function() {
        console.log("dom loaded");
        setDOMReady(true);
    });

    /** Lottie Animation buttons */
    const handleTurnBuilding1Light = (on=true) => {
        // const building1 = building1Ref.current;
        const func = on ? showElement : hideElement;
        func('parent_building1-layer_windowsON-side_a', document);
        func('parent_building1-layer_windowsON-side_b', document);
    }
    const handleTurnOffLights = () => {
        handleTurnBuilding1Light(false);
    }
    const handleTurnOnLights = () => {
        handleTurnBuilding1Light(true);
    }
    const handlePlaySeg = (segment, duration=1, loop=false) => () => {
        const animationObjects = [
            wallAnimationObject,
            building1AnimationObject,
        ];
        animationObjects.forEach( obj => {
            obj.setSpeed(duration);
            obj.playSegments(segments[segment], true);
            obj.loop = loop;
        })
    }
    const handleStop = () => {
        lottie.stop();
    }
    const handlePlay = () => {
        lottie.play();
    }
    const handlePause = () => {
        lottie.pause();
    }
    const handleSpeed = speed => () => {
        lottie.setSpeed(speed);
    }
    const handleToggleFocus = () => {
        const newFocus = focus === 'interior' ? 'exterior' : 'interior';
        setFocus(newFocus);
    }
    
    return (<>
        <div className={classes.container}>
            <div className={classes.buttons}>
                <button className={classes.button} style={{ top: 0 }} onClick={handleToggleFocus}>Focus</button>
                <button className={classes.button} style={{ top: 50 }} onClick={handleStop}>Stop</button>
                <button className={classes.button} style={{ top: 100 }} onClick={handlePause}>Pause</button>
                <button className={classes.button} style={{ top: 150 }} onClick={handleSpeed(15)}>Fast</button>
                <button className={classes.button} style={{ top: 200 }} onClick={handleSpeed(1)}>Normal</button>
                <button className={classes.button} style={{ top: 250 }} onClick={handleSpeed(0.15)}>Slow</button>
                <button className={classes.button} style={{ top: 300 }} onClick={handlePlaySeg('sunrise', 1)}>Play Sunrise</button>
                <button className={classes.button} style={{ top: 350 }} onClick={handlePlaySeg('day', 1)}>Play Day</button>
                <button className={classes.button} style={{ top: 400 }} onClick={handlePlaySeg('sunset', 1)}>Play Sunset</button>
                <button className={classes.button} style={{ top: 450 }} onClick={handlePlaySeg('night', 1)}>Play Night</button>
                <button className={classes.button} style={{ top: 500 }} onClick={handleTurnOffLights}>Lights Off</button>
                <button className={classes.button} style={{ top: 550 }} onClick={handleTurnOnLights}>Lights On</button>
                <button className={classes.button} style={{ top: 550 }} onClick={handlePlay}>Play</button>
            </div>
            
            <div className={classes.exterior}>
                {/* Buildings - distance 0 */}
                <div className={classes.distance0}>
                    <div className={classes.svgObj} ref={building1Ref}></div>
                </div>
            </div>

            {/* Interior */}
            <div className={classes.interior}>
                <div className={classes.wall}>
                    <div className={classes.svgObj} ref={wallRef}></div>
                </div>
            </div>
        </div>
    </>)
}

// CSS configs
const transitionSpeed = '2s';

const useStyles = makeStyles(theme => ({
    buttons: {
        
    },
    button: {
        width: 50,
        height: 50,
        zIndex: 100,
        position: 'absolute',
        left: 0
    },
    show: {
        opacity: 100,
        filter: 'alpha(opacity=100)'
    },
    hide: {
        opacity: 0,
        filter: 'alpha(opacity=0)'
    },
    characterContainer: {
        bottom: 0,
        right: 0,
    },
    distance0: ({ weather, currentSegment, focus }) => {
        const nightTheme = currentSegment === 'night' || currentSegment === 'sunset';
        const interior = focus === 'interior';

        const brightness = '1';
        const saturate = '100%';
        const contrast = '100%';
        const blur = interior ? '3px' : '0px';
        
        const filter = {
            filter: `brightness(${brightness}) saturate(${saturate}) contrast(${contrast}) blur(${blur})`,
            transition: `filter ${transitionSpeed} linear`
        };
        
        if (weather === 'rain') {}
        if (weather === 'snow') {}
        if (weather === 'storm') {}

        return {
            '& div': filter
        } 
    },
    distance1: ({ weather, currentSegment, focus }) => {

        const nightTheme = currentSegment === 'night' || currentSegment === 'sunset';
        const interior = focus === 'interior';

        const brightness = '1';
        const saturate = '100%';
        const contrast = '100%';
        const blur = interior ? '2px' : '0px';
        
        const filter = {
            filter: `brightness(${brightness}) saturate(${saturate}) contrast(${contrast}) blur(${blur})`,
            transition: `filter ${transitionSpeed} linear`
        };
        
        if (weather === 'rain') {}
        if (weather === 'snow') {}
        if (weather === 'storm') {}

        return {
            '& div': filter
        }
    },
    distance2: ({ weather, currentSegment, focus }) => {
        
        const nightTheme = currentSegment === 'night' || currentSegment === 'sunset';
        const interior = focus === 'interior';

        const brightness = '1';
        const saturate = '100%';
        const contrast = '100%';
        const blur = interior ? '2px' : '0px';
        
        const filter = {
            filter: `brightness(${brightness}) saturate(${saturate}) contrast(${contrast}) blur(${blur})`,
            transition: `filter ${transitionSpeed} linear`
        };
        
        if (weather === 'rain') {}
        if (weather === 'snow') {}
        if (weather === 'storm') {}

        return {
            '& div': filter
        }
    },
    distance3: ({ weather, currentSegment, focus }) => {

        const nightTheme = currentSegment === 'night' || currentSegment === 'sunset';
        const interior = focus === 'interior';

        const brightness = nightTheme ? '1' : '1.3';
        const saturate = nightTheme ? '50%' : '70%';
        const contrast = nightTheme ? '100%' : '50%';
        const blur = interior ? '2px' : '0px';

        const filter = {
            filter: `brightness(${brightness}) saturate(${saturate}) contrast(${contrast}) blur(${blur})`,
            transition: `filter ${transitionSpeed} linear`
        };
        
        if (weather === 'rain') {}
        if (weather === 'snow') {}
        if (weather === 'storm') {}

        return {
            '& div': filter
        }
    },
    distance4: ({ weather, currentSegment, focus }) => {

        const nightTheme = currentSegment === 'night' || currentSegment === 'sunset';
        const interior = focus === 'interior';

        const brightness = nightTheme ? '1' : '1.5';
        const saturate = nightTheme ? '50%' : '100%';
        const contrast = nightTheme ? '100%' : '50%';
        const blur = interior ? '3px' : '0px';

        const filter = {
            filter: `brightness(${brightness}) saturate(${saturate}) contrast(${contrast}) blur(${blur})`,
            transition: `filter ${transitionSpeed} linear`
        };
        // const filter = {
        //     filter: 'brightness(1.2) saturate(70%) contrast(50%)',
        //     // transition: ''
        // };
        
        if (weather === 'rain') {}
        if (weather === 'snow') {}
        if (weather === 'storm') {}

        return {
            '& div': filter
        }
    },
    svgObj: ({ windowSize, isMobile }) => {
        const { height, width } = windowSize
        const largerWidthSceen = width > height;

        const base = {
            position: 'absolute',
            // transform: 'scale(1)',
            // bottom: isMobile ? 0 : 0,
            // right: isMobile ? -56 : 0,
            width: '100%',
            position: 'absolute',
            bottom: 0
        }
        
        return largerWidthSceen
            ? { ...base, width: '100%' }
            // : { ...base, height: '100vh' }
            : { ...base, width: '100%' }
    },
    exterior: ({}) => {},
    interior: ({ focus }) => {

        const interior = focus === 'interior';

        const blur = interior ? '0px' : '5px';

        return {
            '& div': {
                filter: `blur(${blur})`,
                transition: `filter ${transitionSpeed} linear`
            }
        }
    },
    wall: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    container: {
        backgroundColor: '#3b3b3b',
        position: 'absolute',
        // bottom: 0,
        bottom: 0,
        right: 0,
        height: '100vh',
        width: '100vw',
        // filter: 'blur(5px)'
    }
}))
