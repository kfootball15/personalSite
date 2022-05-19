import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { gcd_two_numbers } from 'helpers';
import clsx from 'clsx';
import INTERIOR_LOTTIE from 'assets/home/full_interior_lottie.json';
// import EXTERIOR_LOTTIE from 'assets/home/full_exterior_lottie.json';
import SKY_LOTTIE from 'assets/home/full_sky_lottie.json';
import WINDOW_SVG_MOBILE from 'assets/home/window_bottom_mobile.svg';
import WINDOW_SVG_DESKTOP from 'assets/home/window_bottom_desktop.svg';
import WINDOW_TOP_SVG from 'assets/home/window_top.svg';
import DESK_SVG from 'assets/home/desk.svg';
import BG_VIDEO_CHROME from 'assets/home/full_exterior_all.webm';
import BG_VIDEO_SAFARI from 'assets/home/full_mobile.mp4';
import CHARACTER_PERSONAL_GIF from 'assets/home/character.gif';
import CHARACTER_PROFESSIONAL_GIF from 'assets/home/character_work.gif';
import {
	useEventListener,
    useWindowSize,
	hideElement,
} from 'helpers';
import lottie from 'lottie-web';

// https://josephkhan.me/lottie-web/
let skyAnimationObject = null;
let interiorAnimationObject = null;

/** config */
const fps = 30;
const speed = 1;
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

const lottieConfig = {
    renderer: 'svg', // Required
    loop: true, // Optional
    autoplay: false, // Optional
    setSubframe: false, // if false, respects original AE file fps
    rendererSettings: {
        // context: canvasContext, // the canvas context, only support "2d" context
        // preserveAspectRatio: 'xMinYMin slice', // Supports the same options as the svg element's preserveAspectRatio property
        // clearCanvas: false,
        progressiveLoad: true, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
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

function WindowTop ({ classes, svgData }) {
    return (
        <object
            className={classes.interior_windowTop}
            id="window_top"
            data={ svgData }
            aria-label="window_top"
            aria-required="true"
            type="image/svg+xml"
        >
            Window
        </object>
    )
}

function WindowBottom ({ classes, svgData }) {
    return (
        <object
            className={classes.interior_windowBottom}
            id="window_bottom"
            data={ svgData }
            aria-label="window"
            aria-required="true"
            type="image/svg+xml"
        >
            Window
        </object>
    )
}

function Desk ({ classes, svgData }) {
    return (
        <object
            className={classes.interior_desk}
            id="interior_desk"
            data={ svgData }
            aria-label="desk"
            aria-required="true"
            type="image/svg+xml"
        >
            Desk
        </object>
    )
}

export default function HomeDoodle ({ isActive:isActiveSlide, isFocused:isFocusedSlide, isMobile, isWideScreen, isTransitioning:isTransitioningSlides }) {
    const windowSize = useWindowSize();
    const [currentSegment, setCurrentSegment] = useState(''); 
    const classes = useStyles({ currentSegment, isFocusedSlide, isMobile, windowSize, isWideScreen });
    const CHARACTER_GIF = process.env.REACT_APP_IS_PROFESSIONAL_SITE ? CHARACTER_PERSONAL_GIF : CHARACTER_PROFESSIONAL_GIF;

    /** SVG Refs */
    const skyRef = useRef(null);
    const interiorRef = useRef(null);
    
    /** Video Ref **/
    const exteriorVideoRef = useRef(null)

    const play = () => {
        console.log("play")
        lottie.play('sky');
        lottie.play('interior');
        exteriorVideoRef.current.play();
    };

    const pause = () => {
        console.log("pause")
        lottie.pause('sky');
        lottie.pause('interior');
        exteriorVideoRef.current.pause();
    };

    /** Adds character gif to correct spot behind chair */
    const addCharacterGIF = () => {
        const elem = interiorRef.current.querySelector('[id^="chair_back"]');
        var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
        svgimg.setAttribute('height','100%');
        svgimg.setAttribute('width','100%');
        svgimg.setAttribute('id','character');
        svgimg.setAttribute("href", CHARACTER_GIF);
        elem.appendChild(svgimg);
        hideElement('character_placeholder', document);
    }

    // Configure and instantiate Lottie Animations
    useEffect(() => {
        skyAnimationObject = lottie.loadAnimation({
            ...lottieConfig,
            container: skyRef.current,
            name: "sky", // Name for future reference. Optional.
            animationData: SKY_LOTTIE
        });
        interiorAnimationObject = lottie.loadAnimation({
            ...lottieConfig,
            container: interiorRef.current,
            name: "interior", // Name for future reference. Optional.
            animationData: INTERIOR_LOTTIE
        });

        /** Replace Placeholder Character with animation */
        addCharacterGIF();
        
        // To count loops, uncomment
        // interiorAnimationObject.onLoopComplete = () => { setCurrentLoop( currentLoop + 1 ) };

        /** Set Animation speed (find a better place for this?) */
        lottie.setSpeed(speed);

        // This will set the current segment by checking every frame of an animation (can append this handler to any of the layers)
        interiorAnimationObject.onEnterFrame = handleSetCurrentSegment( setCurrentSegment );
    }, [])

    // Play/Pause when changing slides
    useEffect(() => {
        if (isActiveSlide && !isTransitioningSlides)
            play();
        else if (!isActiveSlide && isTransitioningSlides)
            pause();
    }, [isActiveSlide, isTransitioningSlides]);
    
    // Listens for touchstart events (mobile only)
    useEventListener('touchstart', function() {
        console.log("touch start", isActiveSlide);
        pause();
    });
    
    // Listens for touchend events (mobile only)
    useEventListener('touchend', function() {
        console.log("touch end", isActiveSlide);
        if (isActiveSlide) play();
    });


    return (
        <div className={classes.homeDoodleContainer}>

        {/* Main Content */}
        {/* Sky */}
        <div
            className={classes.sky}
            ref={skyRef}
        >
        </div>
        
        {/* Exterior */}
        <div className={ classes.exteriorContainer }>
            {/* Video */} 
            {/* For Transparent Videos (https://www.rotato.app/read/transparent-videos-for-the-web)
                    Safari supports HEVC with alpha (.mp4, .mov) (AE export: Quicktime - Apple ProRes4444 with Alpha) 
                    Chrome supports VP9 (.webm) (AE export: WebM)
                Neither browsers supports the other type, so we need to export both WITH transparency
                from AE (make sur webM plugin is installed: https://www.fnordware.com/WebM/
            */}
            <video
                loop 
                muted
                playsInline
                className={ isMobile ? classes.mobileVideo : classes.desktopVideo }
                ref={ exteriorVideoRef }
            >
                {/* Chrome */}
                <source
                    src={ BG_VIDEO_CHROME }
                    type="video/webm" 
                />

                {/* Safari - BROKEN CURRENTLY, does not display */}
                <source
                    src={ BG_VIDEO_SAFARI }
                    type='video/mp4'
                />
            </video>
        </div>

        {/* Interior */}
        <div className={ classes.interiorContainer }>
            <div className={classes.interior_windowContainer}>
                <WindowTop
                    classes={classes}
                    svgData={WINDOW_TOP_SVG}
                />
                <WindowBottom
                    classes={classes}
                    svgData={isMobile ? WINDOW_SVG_MOBILE : WINDOW_SVG_DESKTOP}
                />
            </div>
            <div className={ classes.interior_desk_and_character_container }>
                <Desk
                    classes={classes}
                    svgData={DESK_SVG}
                />
                {/* Chair / Character is appended here by addCharacterGif() */}
                <div id="interior_chair" ref={ interiorRef } />
            </div>
        </div>
        </div>
    )
}


const videoBlur = '6px';
const useStyles = makeStyles(theme => ({
    homeDoodleContainer:{},
    exteriorContainer: {},
    interiorContainer: {},
    interior_windowContainer: {},
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
    interior_windowTop: ({ isWideScreen }) => ({
        position: 'absolute',
        width: '100%',
        display: isWideScreen ? 'none' : 'block',
    }),
    interior_windowBottom: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTop: 'solid 1000px transparent',
        overflow: 'hidden'
    },
    interior_desk_and_character_container: ({ isMobile }) => {

        const base = {
            transform: 'scaleX(-1)',
            position: 'absolute',
            bottom: 0,
        }

        const mobile = {
            ...base,
            width: '126%',
            left: 0
        };

        const desktop = {
            ...base,
            width: '86%',
            left: 0
        };

        return isMobile ? mobile : desktop;
    },
    interior_desk: {
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    desktopVideo: ({ isWideScreen }) => {

        const base = {
            '-o-filter': `blur(${videoBlur})`,
            'filter': `blur(${videoBlur})`,
        }

        const wideScreen = {
            ...base,
            width: '100%',
            position: 'absolute',
            bottom: '-30%'
        };

        const tallScreen = {
            ...base,
            width: '100%',
            position: 'absolute',
            bottom: '-15%'
        };
        
        return isWideScreen
            ? wideScreen
            : tallScreen
    },
    mobileVideo: ({ isMobile, isWideScreen }) => {

        const base = {
            '-o-filter': `blur(${videoBlur})`,
            'filter': `blur(${videoBlur})`,
        }

        const wideScreen = {
            ...base,
            width: '100%',
            position: 'absolute',
            bottom: 0
        };

        const tallScreen = {
            ...base,
            height: '100%',
            position: 'absolute',
            bottom: isMobile ? '-20%' : 0,
            right: '-35%'
        }
        
        return isWideScreen
            ? wideScreen
            : tallScreen
    }
}))
