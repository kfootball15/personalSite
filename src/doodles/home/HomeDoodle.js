import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
/** for homePage project below */
import clsx from 'clsx';
import sky from 'assets/home/sky_lottie.json';
import wall from 'assets/home/wall_lottie.json';
import desk from 'assets/home/desk_lottie.json';
import character from 'assets/home/character_lottie.json';
import sun from 'assets/home/sun_lottie.json';
import moon from 'assets/home/moon_lottie.json';
import chair from 'assets/home/chair_lottie.json';
import building1 from 'assets/home/building1_lottie.json';
import building2 from 'assets/home/building2_lottie.json';
import building3 from 'assets/home/building3_lottie.json';
import building4 from 'assets/home/building4_lottie.json';
import building4a from 'assets/home/building4a_lottie.json';
import building4b from 'assets/home/building4b_lottie.json';
import building5 from 'assets/home/building5_lottie.json';
import building6 from 'assets/home/building6_lottie.json';
import building7 from 'assets/home/building7_lottie.json';
import building8 from 'assets/home/building8_lottie.json';
import building9 from 'assets/home/building9_lottie.json';
import building10 from 'assets/home/building10_lottie.json';
import building11 from 'assets/home/building11_lottie.json';
import building12 from 'assets/home/building12_lottie.json';
import buildingWTC from 'assets/home/buildingWTC_lottie.json';

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
let skyAnimationObject = null;
let sunAnimationObject = null;
let moonAnimationObject = null;
let wallAnimationObject = null;
let deskAnimationObject = null;
let chairAnimationObject = null;
let characterAnimationObject = null;
let building1AnimationObject = null;
let building2AnimationObject = null;
let building3AnimationObject = null;
let building4AnimationObject = null;
let building4aAnimationObject = null;
let building4bAnimationObject = null;
let building5AnimationObject = null;
let building6AnimationObject = null;
let building7AnimationObject = null;
let building8AnimationObject = null;
let building9AnimationObject = null;
let building10AnimationObject = null;
let building11AnimationObject = null;
let building12AnimationObject = null;
let buildingWTCAnimationObject = null;

/** transition config */
const hrsPerSecond = 1;
const fps = 30;
const ease = 0;
const m = 1000;

// [sunrise, day, sunset, night]
const time = {
    'sunrise': 20 * fps,
    'day': 4 * fps,
    'sunset': 10 * fps,
    'night': 14 * fps
};
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
const renderer = 'svg';
const defaultAnimationObjectSettings = {
    renderer, // Required
    loop: false, // Optional
    autoplay: true // Optional
};

const setDuration = anim => e => {
    const curr = e.currentTime;
    const slow = 0.75;
    const fast = 1.5;

    /**
     * Uncommenting the code below will not allow you to set speed dynamically
     */
    
    // if (
    //     curr >= (time.sunrise) || 
    //     curr < (time.day)
    // ) {
    //     // console.log("sunrise", curr)
    //     anim.setSpeed(fast);
    // }
    // else if (
    //     curr >= (time.day) && 
    //     curr < (time.sunset)
    // ) {
    //     // console.log("day", curr)
    //     anim.setSpeed(slow);
    // }
    // else if (
    //     curr >= (time.sunset) && 
    //     curr < (time.night)
    // ) {
    //     // console.log("sunset", curr)
    //     anim.setSpeed(fast);
    // }
    // else if (
    //     curr >= (time.night) &&
    //     curr < (time.sunrise)
    // ) {
    //     // console.log("night", curr)
    //     anim.setSpeed(slow);
    // }
}

export default function HomeDoodle (props) {
    const windowSize = useWindowSize();
    const isMobile = windowSize.width <= 480
    const classes = useStyles({ isMobile, windowSize });
    const [DOMReady, setDOMReady] = useState(false);
    
    /** Sky */
    const skyRef = useRef(null);
    const moonRef = useRef(null);
    const sunRef = useRef(null);

    /** Buildings */
    const building1Ref = useRef(null);
    const building2Ref = useRef(null);
    const building3Ref = useRef(null);
    const building4Ref = useRef(null);
    const building4aRef = useRef(null);
    const building4bRef = useRef(null);
    const building5Ref = useRef(null);
    const building6Ref = useRef(null);
    const building7Ref = useRef(null);
    const building8Ref = useRef(null);
    const building9Ref = useRef(null);
    const building10Ref = useRef(null);
    const building11Ref = useRef(null);
    const building12Ref = useRef(null);
    const buildingWTCRef = useRef(null);

    /** Interiors */
    const wallRef = useRef(null);
    // const characterRef = useRef(null);
    const deskRef = useRef(null);
    const chairRef = useRef(null);

    // Configure and instantiate Lottie Animations
    useEffect(() => {
        wallAnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: wallRef.current,
            name: "wall", // Name for future reference. Optional.
            animationData: wall
        });
        // characterAnimationObject = lottie.loadAnimation({
        //     ...defaultAnimationObjectSettings,
        //     container: characterRef.current,
        //     name: "character", // Name for future reference. Optional.
        //     animationData: character
        // });
        chairAnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: chairRef.current,
            name: "chair", // Name for future reference. Optional.
            animationData: chair
        });
        deskAnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: deskRef.current,
            name: "desk", // Name for future reference. Optional.
            animationData: desk
        });
        building1AnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: building1Ref.current,
            name: "building1", // Name for future reference. Optional.
            animationData: building1
        });
        building2AnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: building2Ref.current,
            name: "building2", // Name for future reference. Optional.
            animationData: building2
        });
        building3AnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: building3Ref.current,
            name: "building3", // Name for future reference. Optional.
            animationData: building3
        });
        building4AnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: building4Ref.current,
            name: "building4", // Name for future reference. Optional.
            animationData: building4
        });
        building4aAnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: building4aRef.current,
            name: "building4a", // Name for future reference. Optional.
            animationData: building4a
        });
        building4bAnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: building4bRef.current,
            name: "building4b", // Name for future reference. Optional.
            animationData: building4b
        });
        building5AnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: building5Ref.current,
            name: "building5", // Name for future reference. Optional.
            animationData: building5
        });
        building6AnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: building6Ref.current,
            name: "building6", // Name for future reference. Optional.
            animationData: building6
        });
        building7AnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: building7Ref.current,
            name: "building7", // Name for future reference. Optional.
            animationData: building7
        });
        building8AnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: building8Ref.current,
            name: "building8", // Name for future reference. Optional.
            animationData: building8
        });
        building9AnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: building9Ref.current,
            name: "building9", // Name for future reference. Optional.
            animationData: building9
        });
        building10AnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: building10Ref.current,
            name: "building10", // Name for future reference. Optional.
            animationData: building10
        });
        building11AnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: building11Ref.current,
            name: "building11", // Name for future reference. Optional.
            animationData: building11
        });
        building12AnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: building12Ref.current,
            name: "building12", // Name for future reference. Optional.
            animationData: building12
        });
        buildingWTCAnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: buildingWTCRef.current,
            name: "buildingWTC", // Name for future reference. Optional.
            // animationData: buildingWTC
            animationData: null
        });
        skyAnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: skyRef.current,
            name: "sky", // Name for future reference. Optional.
            animationData: sky
        });
        sunAnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: sunRef.current,
            name: "sun", // Name for future reference. Optional.
            animationData: null
        });
        moonAnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: moonRef.current,
            name: "moon", // Name for future reference. Optional.
            animationData: null
        });
        wallAnimationObject.onEnterFrame = setDuration(wallAnimationObject);
        // characterAnimationObject.onEnterFrame = setDuration(characterAnimationObject);
        chairAnimationObject.onEnterFrame = setDuration(chairAnimationObject);
        deskAnimationObject.onEnterFrame = setDuration(deskAnimationObject);
        building1AnimationObject.onEnterFrame = setDuration(building1AnimationObject);
        building2AnimationObject.onEnterFrame = setDuration(building2AnimationObject);
        building3AnimationObject.onEnterFrame = setDuration(building3AnimationObject);
        building4AnimationObject.onEnterFrame = setDuration(building4AnimationObject);
        building4aAnimationObject.onEnterFrame = setDuration(building4aAnimationObject);
        building4bAnimationObject.onEnterFrame = setDuration(building4bAnimationObject);
        building5AnimationObject.onEnterFrame = setDuration(building5AnimationObject);
        building6AnimationObject.onEnterFrame = setDuration(building6AnimationObject);
        building7AnimationObject.onEnterFrame = setDuration(building7AnimationObject);
        building8AnimationObject.onEnterFrame = setDuration(building8AnimationObject);
        building9AnimationObject.onEnterFrame = setDuration(building9AnimationObject);
        building10AnimationObject.onEnterFrame = setDuration(building10AnimationObject);
        building11AnimationObject.onEnterFrame = setDuration(building11AnimationObject);
        building12AnimationObject.onEnterFrame = setDuration(building12AnimationObject);
        buildingWTCAnimationObject.onEnterFrame = setDuration(buildingWTCAnimationObject);
        skyAnimationObject.onEnterFrame = setDuration(skyAnimationObject);
        sunAnimationObject.onEnterFrame = setDuration(sunAnimationObject);
        moonAnimationObject.onEnterFrame = setDuration(moonAnimationObject);
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
            skyAnimationObject,
            sunAnimationObject,
            moonAnimationObject,
            wallAnimationObject,
            characterAnimationObject,
            deskAnimationObject,
            chairAnimationObject,
            building1AnimationObject,
            building2AnimationObject,
            building3AnimationObject,
            building4AnimationObject,
            building4aAnimationObject,
            building4bAnimationObject,
            building5AnimationObject,
            building6AnimationObject,
            building7AnimationObject,
            building8AnimationObject,
            building9AnimationObject,
            building10AnimationObject,
            building11AnimationObject,
            building12AnimationObject,
            buildingWTCAnimationObject
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
    const handleFast = () => {
        lottie.setSpeed(15);
    }
    const handleSlow = () => {
        lottie.setSpeed(0.15);
    }
    
    return (<>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 0, left: 0}} onClick={handlePlay}>Play</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 50, left: 0}} onClick={handleStop}>Stop</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 100, left: 0}} onClick={handlePause}>Pause</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 150, left: 0}} onClick={handleFast}>Fast</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 200, left: 0}} onClick={handleSlow}>Slow</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 250, left: 0}} onClick={handlePlaySeg('sunrise', 1)}>Play Sunrise</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 300, left: 0}} onClick={handlePlaySeg('day', 1)}>Play Day</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 350, left: 0}} onClick={handlePlaySeg('sunset', 1)}>Play Sunset</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 400, left: 0}} onClick={handlePlaySeg('night', 1)}>Play Night</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 450, left: 0}} onClick={handleTurnOffLights}>Lights Off</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 500, left: 0}} onClick={handleTurnOnLights}>Lights On</button>
        <div className={classes.container}>
            
            {/* Sky */}
            <div className={classes.svgObj} ref={skyRef}></div>
            <div className={classes.svgObj} ref={sunRef}></div>
            <div className={classes.svgObj} ref={moonRef}></div>

            {/* Buildings - distance 4 */}
            <div className={classes.distance4}>
                <div className={classes.svgObj} ref={buildingWTCRef}></div>
                <div className={classes.svgObj} ref={building12Ref}></div>
                <div className={classes.svgObj} ref={building11Ref}></div>
            </div>
            {/* Buildings - distance 3 */}
            <div className={classes.distance3}>
                <div className={classes.svgObj} ref={building10Ref}></div>
                <div className={classes.svgObj} ref={building9Ref}></div>
                <div className={classes.svgObj} ref={building8Ref}></div>
                <div className={classes.svgObj} ref={building7Ref}></div>
            </div>
            {/* Buildings - distance 2 */}
            <div className={classes.distance2}>
                <div className={classes.svgObj} ref={building6Ref}></div>
                <div className={classes.svgObj} ref={building4bRef}></div>
            </div>
            {/* Buildings - distance 1 */}
            <div className={classes.distance1}>
                <div className={classes.svgObj} ref={building5Ref}></div>
                <div className={classes.svgObj} ref={building4aRef}></div>
                <div className={classes.svgObj} ref={building4Ref}></div>
                <div className={classes.svgObj} ref={building3Ref}></div>
                <div className={classes.svgObj} ref={building2Ref}></div>
                <div className={classes.svgObj} ref={building1Ref}></div>
            </div>

            {/* Interior */}
            <div className={classes.svgObj} ref={wallRef}></div>
            <div className={classes.svgObj} ref={deskRef}></div>
            <div className={classes.svgObj} ref={chairRef}></div>
            {/* <div className={classes.svgObj} ref={characterRef}></div> */}
        </div>
    </>)
}

const useStyles = makeStyles(theme => ({
    show: {
        opacity: 100,
        filter: 'alpha(opacity=100)'
    },
    hide: {
        opacity: 0,
        filter: 'alpha(opacity=0)'
    },
    distance1: ({ weather }) => {
        const filter = {};
        
        if (weather === 'rain') {}
        if (weather === 'snow') {}
        if (weather === 'storm') {}
        
        return {
            '& div': filter
        }
    },
    distance2: ({ weather }) => {
        const filter = {};
        
        if (weather === 'rain') {}
        if (weather === 'snow') {}
        if (weather === 'storm') {}

        return {
            '& div': filter
        }
    },
    distance3: ({ weather }) => {
        const filter = {
            filter: 'brightness(0.9) grayscale(20%)'
        };
        
        if (weather === 'rain') {}
        if (weather === 'snow') {}
        if (weather === 'storm') {}

        return {
            '& div': filter
        }
    },
    distance4: ({ weather }) => {
        const filter = {
            filter: 'brightness(0.8) grayscale(30%)'
        };
        
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
            transform: 'scale(1)',
            bottom: isMobile ? 0 : 0,
            right: isMobile ? -56 : 0,
            height: '100vh'
        }
        
        return largerWidthSceen
            ? { ...base, width: '100%' }
            // : { ...base, height: '100vh' }
            : { ...base, width: '100%' }
    },
    container: {
        position: 'absolute',
        // bottom: 0,
        top: 0,
        right: 0,
        height: '100vh',
        width: '100vw'
    }
}))
