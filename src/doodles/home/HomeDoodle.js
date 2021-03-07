import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { gcd_two_numbers } from 'helpers';
/** for homePage project below */
import clsx from 'clsx';
import INTERIOR_LOTTIE from 'assets/home/full_interior_lottie.json';
import EXTERIOR_LOTTIE from 'assets/home/full_exterior_lottie.json';
import LOGO_TEXT_SVG from 'assets/home/logo_text.svg';
import SKY_LOTTIE from 'assets/home/full_sky_lottie.json';
import WINDOW_SVG from 'assets/home/window.svg';
import WINDOW_TOP_SVG from 'assets/home/window_top.svg';
import DESK_SVG from 'assets/home/desk.svg';
import CHARACTER_GIF from 'assets/home/character.gif';

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

// lottie.setQuality(2);

// https://josephkhan.me/lottie-web/
let skyAnimationObject = null;
let interiorAnimationObject = null;
let exteriorAnimationObject = null;

/** transition config */
const blur = "8";
const transitionDuration = "1s";
const fps = 30;
const speed = 2;
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
    // setSubframe: false, // if false, respects original AE file fps
    rendererSettings: {
        // context: canvasContext, // the canvas context, only support "2d" context
        // preserveAspectRatio: 'xMinYMin slice', // Supports the same options as the svg element's preserveAspectRatio property
        // clearCanvas: false,
        progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
        // hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
        // className: 'some-css-class-name',
        // id: 'some-id',
    }
};

const handleSetCurrentSegment = setCurrentSegment => e => {
    const curr = e.currentTime;
    if ( curr > segments.sunrise[0] && curr <= segments.sunrise[1] ) setCurrentSegment('sunrise');
    if ( curr > segments.day[0] && curr <= segments.day[1] ) setCurrentSegment('day');
    if ( curr > segments.sunset[0] && curr <= segments.sunset[1] ) setCurrentSegment('sunset');
    if ( curr > segments.night[0] && curr <= segments.night[1] ) setCurrentSegment('night');
};

export default function HomeDoodle ({ isActive, isMobile }) {
    const [DOMReady, setDOMReady] = useState(false);
    const windowSize = useWindowSize();
    const [weather, setWeather] = useState('clear'); 
    const [focus, setFocus] = useState('interior'); 
    const [currentSegment, setCurrentSegment] = useState(''); 
    const [currentLoop, setCurrentLoop] = useState(0); 
    const classes = useStyles({ weather, currentSegment, focus, isMobile, windowSize });

    /** SVG Refs */
    const skyRef = useRef(null);
    const exteriorRef = useRef(null);
    const windowSVGRef = useRef(null);    
    const logoSVGRef = useRef(null);    
    const deskSVGRef = useRef(null);    
    const windowTopSVGRef = useRef(null);    
    const interiorRef = useRef(null);
    /** SVG Animation */
    const animBlurExterior1Ref = useRef(null);
    const blurExterior1Ref = useRef(null);

    const handleToggleFocus = (val) => {
        const newFocus = focus === 'interior'
                ? 'exterior'
                : 'interior';
        setFocus(newFocus);
    }

    // Configure and instantiate Lottie Animations
    useEffect(() => {
        if (isActive) {
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
                animationData: EXTERIOR_LOTTIE,
                // animationData: null
            });
    
            // This will set the current segment by checking every frame of an animation (can append this handler to any of the layers)
            interiorAnimationObject.onEnterFrame = handleSetCurrentSegment( setCurrentSegment );
            interiorAnimationObject.onLoopComplete = () => { setCurrentLoop( currentLoop + 1 ) };
    
            /** Set Animation speed (find a better place for this?) */
            lottie.setSpeed(speed);

            /** Replace Placeholder Character with animation */
            const elem = interiorRef.current.querySelector('[id^="chair_back"]');
            var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
            svgimg.setAttribute('height','100%');
            svgimg.setAttribute('width','100%');
            svgimg.setAttribute('id','character');
            svgimg.setAttribute("href", CHARACTER_GIF);
            elem.appendChild(svgimg);
            hideElement('character_placeholder', document);
        } else {
            /** Destory animation - destroys lottie animations after slide change to free up resoucres */
            if (skyAnimationObject) skyAnimationObject.destroy();
            if (interiorAnimationObject) interiorAnimationObject.destroy();
            if (exteriorAnimationObject) exteriorAnimationObject.destroy();
        }
    }, [isActive]);


    // Listens for dom ready - can use SVGs
    useEventListener('load', function() {
        console.log("dom loaded", isMobile);
        setDOMReady(true);
    });
    
    // Listens for touchstart events (mobile only)
    useEventListener('touchstart', function() {
        console.log("touch start", isActive);
        lottie.pause();
    });
    
    // Listens for touchend events (mobile only)
    useEventListener('touchend', function() {
        console.log("touch end", isActive);
        if (isActive) lottie.play();
    });

    /** Runs when segment changes - day,sunset,night,sunrise (in future, maybe change segment to keyframes so we can be more granular about when animations play) */
    useEffect(() => {
        console.log("segment change: ", currentSegment);
        if (currentSegment === 'sunset') handleToggleFocus();
    }, [ currentSegment ])

    /** Runs when Focus changes (interior/exterior) */
    useEffect(() => {
        // https://properdesign.co.uk/animating-svg-with-beginelement/
        // https://stackoverflow.com/questions/8455773/svg-trigger-animation-with-event
        const exteriorBlurVal = focus === 'interior' ? blur : "0";
        animBlurExterior1Ref.current.beginElement();
        animBlurExterior1Ref.current.onbegin = () => {
            blurExterior1Ref.current.setStdDeviation(exteriorBlurVal, exteriorBlurVal); //https://developer.mozilla.org/en-US/docs/Web/API/SVGFEGaussianBlurElement
        }
    }, [focus])

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

        {/* Main Content */}
        <div className={classes.container}>

            {/* Sky */}
            <div
                className={clsx( classes.svgObj, classes.sky )}
                ref={skyRef}
            />
            
            {/* Extertior */}
            <div className={ classes.exterior }>
                
                {/* Buildings  */}
                <div
                    className={ classes.svgObj }
                    ref={ exteriorRef }>    
                </div>

                {/* Window / Wall Top */}
                <div className={clsx( classes.interior_window_top )}>
                    <object
                        className={ clsx( classes.svgObj )}
                        ref={ windowTopSVGRef }
                        id="window_top"
                        data={ WINDOW_TOP_SVG }
                        aria-label="window_top"
                        aria-required="true"
                        type="image/svg+xml"
                    >
                        Window
                    </object>
                </div>

                {/* Window / Wall Bottom */}
                <object
                    className={ clsx( classes.interior_window, classes.svgObj )}
                    ref={ windowSVGRef }
                    id="window_bottom"
                    data={ WINDOW_SVG }
                    aria-label="window"
                    aria-required="true"
                    type="image/svg+xml"
                >
                    Window
                </object>
            
            </div>


            {/* Interior */}
            <div className={ classes.interior } >    

                {/* Logo */}
                <div className={ classes.logoWrapper }>
                    <object
                        ref={ logoSVGRef }
                        id="logo"
                        data={ LOGO_TEXT_SVG }
                        aria-label="logo"
                        aria-required="true"
                        type="image/svg+xml"
                    >
                        MENSH
                    </object>
                </div>
                
                {/* Interior */}
                <div className={ classes.interior_room }>
                    
                    {/* Desk */}
                    <object
                        className={ clsx( classes.svgObj )}
                        ref={ deskSVGRef }
                        id="interior_desk"
                        data={ DESK_SVG }
                        aria-label="desk"
                        aria-required="true"
                        type="image/svg+xml"
                    >
                        Desk
                    </object>

                    {/* Chair / Character */}
                    <div id="interior_chair" ref={ interiorRef } />
                
                </div>

            </div>

        </div>
    </>)
}

// CSS configs
const transitionSpeed = '2s';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: '#3b3b3b',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
    },
    logoWrapper: ({ isMobile }) => {
        const base = {
            position: 'absolute',
            left: 0,
            width: '100%',
            [theme.breakpoints.down('sm')]: {
                top: 2,
            },
            [theme.breakpoints.only('md')]: {
                top: '4%'
            },
            [theme.breakpoints.only('lg')]: {
                top: '15%' 
            },
            [theme.breakpoints.up('xl')]: {
                bottom: '40%' 
            },
        }

        return { ...base }
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
            transform: `scale(${ ratio + 1 })`, // This math isnt quite right - makes the scaleY a little too large
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
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            filter: `blur(${ blur })`,
            transition: `filter ${ transitionSpeed } linear`,
        }
    },
    interior_room: ({ isMobile }) => ({
        width: isMobile ? '126%' : '100%',
        position: 'absolute',
        bottom: 0,
        right: isMobile ? '2%' : 0
    }),
    interior_window: {
        bottom: 0,
        '& object': {
            bottom: 0
        }
    },
    interior_window_top: {
        top: 0,
        '& object': {
            top: 0
        }
    },
    svgObj: ({ windowSize, isMobile }) => {
        const { height, width } = windowSize
        const largerWidthSceen = width > height;

        const base = {
            width: '100%',
            position: 'absolute',
            bottom: 0
        };
        
        return largerWidthSceen
            ? { ...base }
            : { ...base }
    }
}))
