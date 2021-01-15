import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { gcd_two_numbers } from 'helpers';
/** for homePage project below */
import clsx from 'clsx';
import INTERIOR_LOTTIE from 'assets/home/full_interior_lottie.json';
import EXTERIOR_LOTTIE from 'assets/home/full_exterior_lottie.json';
import SKY_LOTTIE from 'assets/home/full_sky_lottie.json';
import WINDOW_SVG from 'assets/home/window.svg';

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
import { LinearScale } from '@material-ui/icons';

// lottie.setQuality(2);

// https://josephkhan.me/lottie-web/
let skyAnimationObject = null;
let interiorAnimationObject = null;
let exteriorAnimationObject = null;

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
    // setSubframe: false // if false, respects original AE file fps
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
    const [currentLoop, setCurrentLoop] = useState(0); 
    const classes = useStyles({ weather, currentSegment, focus, isMobile, windowSize });

    /** Sky */
    const skyRef = useRef(null);
    /** Exterior */
    const exteriorRef = useRef(null);
    /** Window */
    const windowSVGRef = useRef(null);    
    /** Interior */
    const interiorRef = useRef(null);
    /** SVG Animation Elements */
    const animBlurExterior1Ref = useRef(null);
    /** SVG Blur Animations */
    const blurExterior1Ref = useRef(null);

    // Configure and instantiate Lottie Animations
    useEffect(() => {
        console.log("instantiate animations")
        // Animation Settings
        skyAnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: skyRef.current,
            name: "sky", // Name for future reference. Optional.
            animationData: SKY_LOTTIE
        });
        interiorAnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: interiorRef.current,
            name: "interior", // Name for future reference. Optional.
            animationData: INTERIOR_LOTTIE
        });
        exteriorAnimationObject = lottie.loadAnimation({
            ...defaultAnimationObjectSettings,
            container: exteriorRef.current,
            name: "exterior", // Name for future reference. Optional.
            animationData: EXTERIOR_LOTTIE
        });
        // This will set the current segment by checking every frame of an animation (can append this handler to any of the layers)
        interiorAnimationObject.onEnterFrame = handleSetCurrentSegment(setCurrentSegment);
        interiorAnimationObject.onLoopComplete = () => {setCurrentLoop(currentLoop + 1)};
    }, []);

    // Listens for dom ready - can use SVGs
    useEventListener('load', function() {
        console.log("dom loaded");
        setDOMReady(true);
    });

    /** Lottie Animation buttons */
    const handleTurnBuilding1Light = (on=true) => {
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
            interiorAnimationObject,
            exteriorAnimationObject,
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
    
    /** Runs when segment changes - day,sunset,night,sunrise (in future, maybe change segment to keyframes so we can be more granular about when animations play) */
    useEffect(() => {
        console.log("segment change: ", currentSegment);
    }, [ currentSegment ])

    /** Runs when Focus changes (interior/exterior) */
    useEffect(() => {
        // https://properdesign.co.uk/animating-svg-with-beginelement/
        // https://stackoverflow.com/questions/8455773/svg-trigger-animation-with-event
        const blurVal = focus === 'interior' ? "4" : "0" 
        animBlurExterior1Ref.current.beginElement();
        animBlurExterior1Ref.current.onbegin = () => {
            blurExterior1Ref.current.setStdDeviation(blurVal, blurVal); //https://developer.mozilla.org/en-US/docs/Web/API/SVGFEGaussianBlurElement
        }
    }, [focus])

    const blur = "3";
    const transitionDuration = "1s";

    return (<>
        
        {/* SVG Animation */}
        <svg style={{height: 0}}>
        <defs>
            <filter id="exterior_filter">
                <feGaussianBlur
                    ref={blurExterior1Ref}
                    id="blur_exterior_filter"
                />
                <animate
                    ref={ animBlurExterior1Ref }
                    xlinkHref="#blur_exterior_filter"
                    id="anim_blur_exterior_filter" 
                    attributeName="stdDeviation"
                    values={focus === 'interior' ? `0;${blur}` : `${blur};0`}
                    dur={ transitionDuration }
                    begin='indefinite'
                />
            </filter>
        </defs>
        </svg>

        {/* Buttons */}
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
        <div
            onMouseDown={() => {lottie.pause()}}
            onMouseUp={() => {console.log("bye")}}
            className={classes.container}
        >

            {/* Sky */}
            <div
                className={clsx(
                    classes.svgObj,
                    classes.sky
                )}
                ref={skyRef}
            />
            
            {/* Extertior */}
            <div className={classes.exterior}>    
                <div className={classes.svgObj} ref={exteriorRef}></div>
            </div>

            {/* Window / Wall */}
            <div className={classes.window}>
                <object
                    className={classes.svgObj}
                    ref={ windowSVGRef }
                    id="window"
                    data={ WINDOW_SVG }
                    aria-label="window"
                    aria-required="true"
                    type="image/svg+xml"
                >
                        Window
                </object>
            </div>

            {/* Interior */}
            <div
                className={clsx(
                    classes.svgObj,
                    classes.interor
                )}
                ref={interiorRef}
            />
        </div>
    </>)
}

// CSS configs
const transitionSpeed = '2s';

const useStyles = makeStyles(theme => ({
    buttons: {},
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
    container: {
        backgroundColor: '#3b3b3b',
        position: 'absolute',
        // bottom: 0,
        bottom: 0,
        right: 0,
        height: '100%',
        width: '100%',
        // filter: 'blur(5px)'
    },
    sky: ({ windowSize }) => {

        // 4:3 --> 0.75 //ratio of the image
        // 100:200 --> 2 //example ratio of a mobile window (height > width)
        // In this case we need our height to be 2x its width 
        // So we get the new aspect ratio and devide(ratioW/ratioH)


        const gcf = gcd_two_numbers(windowSize.width, windowSize.height);
        const ratioW = windowSize.width / gcf;
        const ratioH = windowSize.height / gcf;
        const ratio = ratioH / ratioW;

        return {
            transform: `scale(1, ${ ratio + 1 })`, // This math isnt quite right - makes the scaleY a little too large
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0
        }
    
    },
    exterior: ({ weather, currentSegment, focus }) => {

        const exterior_filter = {
            height: 0,
            filter: 'url(#exterior_filter)' // refers to the ID of the svg <filter />
        };
        
        if (weather === 'rain') {}
        if (weather === 'snow') {}
        if (weather === 'storm') {}

        return {
            '& .full_exterior_all' : exterior_filter,
        } 
    },
    interior: ({ focus }) => {
        const interior = focus === 'interior';
        const blur = interior ? '0px' : '3px';

        return {
            '& div': {
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100%',
                filter: `blur(${ blur })`,
                transition: `filter ${ transitionSpeed } linear`
            }
        }
    },
    svgObj: ({ windowSize, isMobile }) => {
        const { height, width } = windowSize
        const largerWidthSceen = width > height;

        const base = {
            width: '100%',
            position: 'absolute',
            bottom: 0
        }
        
        return largerWidthSceen
            ? { ...base }
            : { ...base }
    }
}))
