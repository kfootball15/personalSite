import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
/** for homePage project below */
import clsx from 'clsx';
import INTERIOR_LOTTIE from 'assets/home/full_interior_lottie.json';
import EXTERIOR_LOTTIE from 'assets/home/full_exterior_lottie.json';
import SKY_LOTTIE from 'assets/home/full_sky_lottie.json';

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
    

    /** Sky */
    const skyRef = useRef(null);
    /** Exterior */
    const exteriorRef = useRef(null);
    /** Interior */
    const interiorRef = useRef(null);
    /** SVG Animation Elements */
    const animBlurExterior1Ref = useRef(null);
    const animBlurExterior2Ref = useRef(null);
    const animBlurExterior3Ref = useRef(null);
    const animBlurExterior4Ref = useRef(null);
    const animBlurExterior5Ref = useRef(null);
    const animBlurExterior6Ref = useRef(null);
    /** SVG Blur Animations */
    const blurExterior1Ref = useRef(null);
    const blurExterior2Ref = useRef(null);
    const blurExterior3Ref = useRef(null);
    const blurExterior4Ref = useRef(null);
    const blurExterior5Ref = useRef(null);
    const blurExterior6Ref = useRef(null);

    // Configure and instantiate Lottie Animations
    useEffect(() => {
        console.log("instantiate animations")
        
        // Lottie settings
        // lottie.setQuality(2);
        
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
        // This will set the curAppend this to any of the layers
        interiorAnimationObject.onEnterFrame = handleSetCurrentSegment(setCurrentSegment);
    }, []);

    // Listens for dom ready - can use SVGs
    useEventListener('load', function() {
        console.log("dom loaded");
        setDOMReady(true);
    });

    /** Lottie Animation buttons */
    const handleTurnBuilding1Light = (on=true) => {
        // const building1 = exteriorRef.current;
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
    
    /** Can latch on on 'segments' and play animations here (in future, maybe change segment to keyframes so we can be more granular about when animations play) */
    useEffect(() => {
        console.log("segment change: ", currentSegment);

        // const anim_contrast = document.getElementById('anim_contrast');
        // anim_contrast.beginElement();
    }, [ currentSegment ])

    useEffect(() => {
        // https://properdesign.co.uk/animating-svg-with-beginelement/
        // https://stackoverflow.com/questions/8455773/svg-trigger-animation-with-event
        const blurVal = focus === 'interior' ? "4" : "0" 
        animBlurExterior1Ref.current.beginElement();
        animBlurExterior1Ref.current.onbegin = () => {
            blurExterior1Ref.current.setStdDeviation(blurVal, blurVal); //https://developer.mozilla.org/en-US/docs/Web/API/SVGFEGaussianBlurElement
        }
        animBlurExterior2Ref.current.beginElement();
        animBlurExterior2Ref.current.onbegin = () => {
            blurExterior2Ref.current.setStdDeviation(blurVal, blurVal); //https://developer.mozilla.org/en-US/docs/Web/API/SVGFEGaussianBlurElement
        }
        animBlurExterior3Ref.current.beginElement();
        animBlurExterior3Ref.current.onbegin = () => {
            blurExterior3Ref.current.setStdDeviation(blurVal, blurVal); //https://developer.mozilla.org/en-US/docs/Web/API/SVGFEGaussianBlurElement
        }
        animBlurExterior4Ref.current.beginElement();
        animBlurExterior4Ref.current.onbegin = () => {
            blurExterior4Ref.current.setStdDeviation(blurVal, blurVal); //https://developer.mozilla.org/en-US/docs/Web/API/SVGFEGaussianBlurElement
        }
        animBlurExterior5Ref.current.beginElement();
        animBlurExterior5Ref.current.onbegin = () => {
            blurExterior5Ref.current.setStdDeviation(blurVal, blurVal); //https://developer.mozilla.org/en-US/docs/Web/API/SVGFEGaussianBlurElement
        }
        animBlurExterior6Ref.current.beginElement();
        animBlurExterior6Ref.current.onbegin = () => {
            blurExterior6Ref.current.setStdDeviation(blurVal, blurVal); //https://developer.mozilla.org/en-US/docs/Web/API/SVGFEGaussianBlurElement
        }
    }, [focus])

    const blur = "3";
    const transitionDuration = "1s";
    
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

            <svg>
            <defs>
                <filter id="exterior_1">
                    <feGaussianBlur
                        ref={blurExterior1Ref}
                        id="blur_exterior_1"
                    />
                    <animate
                        ref={ animBlurExterior1Ref }
                        xlinkHref="#blur_exterior_1"
                        id="anim_blur_exterior_1" 
                        attributeName="stdDeviation"
                        values={focus === 'interior' ? "0;4" : "4;0"}
                        dur={ transitionDuration }
                        begin='indefinite'
                    />
                </filter>
                <filter id="exterior_2">
                    <feGaussianBlur
                        ref={blurExterior2Ref}
                        id="blur_exterior_2"
                    />
                    <animate
                        ref={ animBlurExterior2Ref }
                        xlinkHref="#blur_exterior_2"
                        id="anim_blur_exterior_2" 
                        attributeName="stdDeviation"
                        values={focus === 'interior' ? "0;4" : "4;0"}
                        dur={ transitionDuration }
                        begin='indefinite'
                    />
                </filter>
                <filter id="exterior_3">
                    <feGaussianBlur
                        ref={blurExterior3Ref}
                        id="blur_exterior_3"
                    />
                    <animate
                        ref={ animBlurExterior3Ref }
                        xlinkHref="#blur_exterior_3"
                        id="anim_blur_exterior_3" 
                        attributeName="stdDeviation"
                        values={focus === 'interior' ? "0;4" : "4;0"}
                        dur={ transitionDuration }
                        begin='indefinite'
                    />
                </filter>
                <filter id="exterior_4">
                    <feGaussianBlur
                        ref={blurExterior4Ref}
                        id="blur_exterior_4"
                    />
                    <feComponentTransfer id="contrast">
                        <feFuncR type="linear" slope="1.1"/>
                        <feFuncG type="linear" slope="1.1"/>
                        <feFuncB type="linear" slope="1.1"/>
                    </feComponentTransfer>

                    <animate
                        ref={ animBlurExterior4Ref }
                        xlinkHref="#blur_exterior_4"
                        id="anim_blur_exterior_4" 
                        attributeName="stdDeviation"
                        values={focus === 'interior' ? "0;4" : "4;0"}
                        dur={ transitionDuration }
                        begin='indefinite'
                    />
                </filter>
                <filter id="exterior_5">
                    <feGaussianBlur
                        ref={blurExterior5Ref}
                        id="blur_exterior_5"
                    />

                    <feComponentTransfer id="contrast">
                        <feFuncR type="linear" slope="1.2"/>
                        <feFuncG type="linear" slope="1.2"/>
                        <feFuncB type="linear" slope="1.2"/>
                    </feComponentTransfer>

                    {/* <feColorMatrix type="saturate" values="0.6"/> */}

                    {/* https://codepen.io/chriscoyier/pen/dPRVqL?editors=1000 */}
                    <animate
                        ref={ animBlurExterior5Ref }
                        xlinkHref="#blur_exterior_5"
                        id="anim_blur_exterior_5" 
                        attributeName="stdDeviation"
                        values={focus === 'interior' ? "0;4" : "4;0"}
                        dur={ transitionDuration }
                        begin='indefinite'
                        // repeatCount="indefinite"
                        // fill="freeze"
                    />
                    {/* <animate 
                        xlinkHref="#contrast"
                        id="anim_contrast" 
                        attributeName="slope"
                        from={ currentSegment === 'sunset' ? "1.9" : "0.1" }
                        to={ currentSegment === 'sunrise' ? "0.1" : "1.9" }
                        dur={ transitionDuration }
                        begin='indefinite'
                        // repeatCount="indefinite"
                        // fill="freeze"
                    /> */}
                </filter>
                <filter id="exterior_6">
                    <feGaussianBlur
                        ref={blurExterior6Ref}
                        id="blur_exterior_6"
                    />

                    <feComponentTransfer id="contrast">
                        <feFuncR type="linear" slope="1.1"/>
                        <feFuncG type="linear" slope="1.1"/>
                        <feFuncB type="linear" slope="1.1"/>
                    </feComponentTransfer>

                    <animate
                        ref={ animBlurExterior6Ref }
                        xlinkHref="#blur_exterior_6"
                        id="anim_blur_exterior_6" 
                        attributeName="stdDeviation"
                        values={focus === 'interior' ? "0;4" : "4;0"}
                        dur={ transitionDuration }
                        begin='indefinite'
                    />
                </filter>
                <filter id="sky">
                    <feComponentTransfer id="contrast">
                        <feFuncR type="linear" slope="1.2"/>
                        <feFuncG type="linear" slope="1.2"/>
                        <feFuncB type="linear" slope="1.2"/>
                    </feComponentTransfer>
                </filter>
            </defs>
            </svg>

            
            {/* Extertior SVGs */}
            <div className={classes.exterior}>
                <div className={classes.svgObj} ref={skyRef}></div>
                <div className={classes.svgObj} ref={exteriorRef}></div>
            </div>

            {/* Interior SVGs */}
            <div className={classes.interior}>
                <div className={classes.interiorContainer}>
                    <div className={classes.svgObj} ref={interiorRef}></div>
                </div>
            </div>
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
    exterior: ({ weather, currentSegment, focus }) => {

        const exterior_1 = {
            filter: 'url(#exterior_1)'
        };
        const exterior_2 = {
            filter: 'url(#exterior_2)'
        };
        const exterior_3 = {
            filter: 'url(#exterior_3)'
        };
        const exterior_4 = {
            filter: 'url(#exterior_4)'
        };
        const exterior_5 = {
            filter: 'url(#exterior_5)'
        };
        const exterior_6 = {
            filter: 'url(#exterior_6)'
        };
        const sky = {
            filter: 'url(#sky)',
        }
        
        if (weather === 'rain') {}
        if (weather === 'snow') {}
        if (weather === 'storm') {}

        return {
            // '& div': filter,
            '& .exterior_1' : exterior_1,
            '& .exterior_2' : exterior_2,
            '& .exterior_3' : exterior_3,
            '& .exterior_4' : exterior_4,
            '& .exterior_5' : exterior_5,
            '& .exterior_6' : exterior_6,
            '& .sky' : sky
        } 
    },
    interior: ({ focus }) => {
        const interior = focus === 'interior';
        const blur = interior ? '0px' : '3px';

        return {
            '& div': {
                filter: `blur(${ blur })`,
                transition: `filter ${ transitionSpeed } linear`
            }
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
    interiorContainer: {
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
