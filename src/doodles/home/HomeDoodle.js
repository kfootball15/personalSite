import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WeatherDoodle } from 'doodles';
import { makeStyles } from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
/** for homePage project below */
import clsx from 'clsx';
import buildingData from 'assets/home/building1_update.json';
import building1SVG from 'assets/home/building1.svg';
import building2SVG from 'assets/home/building2.svg';
import skySVG from 'assets/home/sky.svg';
// import buildingOldData from 'assets/home/building1.json';
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

let animObj = null;

// https://josephkhan.me/lottie-web/

// [sunrise, day, sunset, night]
const time = {
    'sunrise': 5,
    'day': 9,
    'sunset': 17,
    'night': 24,
};

const sky = {
    bottom: {
        // colors: ["ffe8a8", "d9e9e9", "f6ae7b", "131312"]
        colors: {
            [time.sunrise] : "#ffe8a8",
            [time.day] : "#d9e9e9",
            [time.sunset] : "#f6ae7b",
            [time.night] : "#131312"
        }
    },
    lower: {
        colors: {
            [time.sunrise] : "#fff1ca",
            [time.day] : "#d9e9e9",
            [time.sunset] : "#e2b68d",
            [time.night] : "#131312"
        }
    },
    middle: {
        colors: {
            [time.sunrise] : "#fff6de",
            [time.day] : "#c1dbea",
            [time.sunset] : "#d2bea5",
            [time.night] : "#131312"
        }
    },
    higher: {
        colors: {
            [time.sunrise] : "#ffe8a8",
            [time.day] : "#d9e9e9",
            [time.sunset] : "#d2bea5",
            [time.night] : "#131312"
        }
    },
    top: {
        colors: {
            [time.sunrise] : "#ecfdff",
            [time.day] : "#88b7ec",
            [time.sunset] : "#aeb8bd",
            [time.night] : "#131312"
        }
    }
};

const building1 = {
    bottom: {
        a: {
            // colors: ["#edcfa1", "#999297", "#60594e", "#332921"],
            colors: {
                [time.sunrise] : "#edcfa1",
                [time.day] : "#999297",
                [time.sunset] : "#60594e",
                [time.night] : "#332921"
            }
        },
        b: {
            // colors: ["#8c8685", "#a8a29e", "#ed8453", "#494142"],
            colors: {
                [time.sunrise] : "#8c8685",
                [time.day] : "#a8a29e",
                [time.sunset] : "#ed8453",
                [time.night] : "#494142"
            }
        }
    },
    top: {
        a: {
            // colors: ["#5e6872", "#607b9e", "#1e1e1e", "#0c0805"],
            colors: {
                [time.sunrise] : "#5e6872",
                [time.day] : "#607b9e",
                [time.sunset] : "#1e1e1e",
                [time.night] : "#0c0805"
            }
        },
        b: {
            // colors: ["#8c8685", "#90a0b7", "#bb9587", "#31343a"]
            colors: {
                [time.sunrise] : "#8c8685",
                [time.day] : "#90a0b7",
                [time.sunset] : "#bb9587",
                [time.night] : "#31343a"
            }
        }
    },
    windows: {
        a: {
            // colors: ["#a1b7b1", "#85aab5", "#5d7066", "#434854"],
            colors: {
                [time.sunrise] : "#a1b7b1",
                [time.day] : "#85aab5",
                [time.sunset] : "#5d7066",
                [time.night] : "#434854"
            }
        },
        b: {
            // colors: ["#94bddb", "#90aece", "#e3f2de", "#191816"],
            colors: {
                [time.sunrise] : "#94bddb",
                [time.day] : "#90aece",
                [time.sunset] : "#e3f2de",
                [time.night] : "#191816"
            }
        }
    },
    /** windowsOn will just be toggled on/off, no colors */
    // windowsOn: {
    //     a: {
    //         colors: []
    //     },
    //     b: {
    //         colors: []
    //     }
    // }
};

const building2 = {
    windows: {
        // colors: ["#a2b8b6", "#85aab5", "#5d7066", "#434854"]
        colors: {
            [time.sunrise] : "#a2b8b6",
            [time.day] : "#85aab5",
            [time.sunset] : "#5d7066",
            [time.night] : "#434854"
        }
    },
    base: {
        a: {
            // colors: ["#edb2a1", "#a99b97", "#61534e", "#332622"]
            colors: {
                [time.sunrise] : "#edb2a1",
                [time.day] : "#a99b97",
                [time.sunset] : "#61534e",
                [time.night] : "#332622"
            }
        },
        b: {
            // colors: ["#8c7b7a", "#9c9795", "#ea8d73", "#494544"]
            colors: {
                [time.sunrise] : "#8c7b7a",
                [time.day] : "#9c9795",
                [time.sunset] : "#ea8d73",
                [time.night] : "#494544"
            }
        }
    },
};

/** transition config */
const hrsPerSecond = 1;
const ease = 0;

function getDuration ( destinationTime ) {
    //returns the amount of time a fake hour should lost in the animation
    if (destinationTime === time.sunrise) return time.day - time.sunrise;
    if (destinationTime === time.day) return time.sunset - time.day;
    if (destinationTime === time.sunset) return time.night - time.sunset;
    if (destinationTime === time.night) return 6;
}

const findNextTime = time => {
    if (time < 24 ) return time + 1
    if (time === 24) return 0;
}

export default function HomeDoodle (props) {
	const classes = useStyles();
	const skySVGRef = useRef(null);
	const building1SVGRef = useRef(null);
	const building2SVGRef = useRef(null);
    const lottieSVGRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(time.day);
    const [destinationTime, setDestinationTime] = useState(time.sunset);
    const [DOMReady, setDOMReady] = useState(false);
    const [duration, setDuration] = useState(getDuration(time.sunset));
    const [interval, setNewInterval] = useState(hrsPerSecond * 1000);

    const setSky = useCallback((elem, time) => {
        /** sky */
        transitionFill('parent-sky_layer-bottom', elem, sky.bottom.colors[time], duration, ease );
        transitionFill('parent-sky_layer-lower', elem, sky.lower.colors[time], duration, ease );
        transitionFill('parent-sky_layer-middle', elem, sky.middle.colors[time], duration, ease );
        transitionFill('parent-sky_layer-higher', elem, sky.higher.colors[time], duration, ease );
        transitionFill('parent-sky_layer-top', elem, sky.top.colors[time], duration, ease );
    }, [duration]);

    const setBuilding1 = useCallback((elem, time) => {
        transitionFill('parent-building1_layer-bottom_side-a', elem, building1.bottom.a.colors[time], duration, ease );
        transitionFill('parent-building1_layer-bottom_side-b', elem, building1.bottom.b.colors[time], duration, ease );
        transitionFill('parent-building1_layer-top_side-a', elem, building1.top.a.colors[time], duration, ease );
        transitionFill('parent-building1_layer-top_side-b', elem, building1.top.b.colors[time], duration, ease );
        transitionFill('parent-building1_layer-windows_side-a', elem, building1.windows.a.colors[time], duration, ease );
        transitionFill('parent-building1_layer-windows_side-b', elem, building1.windows.b.colors[time], duration, ease );
    }, [duration]);

    const setBuilding2 = useCallback((elem, time) => {
        transitionFill('parent-building2_layer-windows', elem, building2.windows.colors[time], duration, ease );
        transitionFill('parent-building2_layer-base_side-a', elem, building2.base.a.colors[time], duration, ease );
        transitionFill('parent-building2_layer-base_side-b', elem, building2.base.b.colors[time], duration, ease );
    }, [duration]);

    useEffect(() => {
        console.log("runs 1")
        animObj = lottie.loadAnimation({
            container: lottieSVGRef.current,
            renderer: 'svg', // Required
            loop: true, // Optional
            autoplay: true, // Optional
            name: "building1", // Name for future reference. Optional.
            animationData: buildingData
        })
    }, [])

    const setLayers = (currentTime) => {
        console.log("runs", currentTime)
        const building1Elem = building1SVGRef.current.contentDocument;
        const building2Elem = building2SVGRef.current.contentDocument;
        const skyElem = skySVGRef.current.contentDocument;


        if (currentTime === time.sunrise) {
            /** sky */
            hideElement('parent-sky_layer-stars', skyElem);
            /** building1 */
            hideElement('parent-building1_layer-windowsOn_side-a', building1Elem);
            hideElement('parent-building1_layer-windowsOn_side-b', building1Elem);
            /** building2 */
            hideElement('parent-building2_layer-windowsOn', building2Elem);
        }
        if (currentTime === time.day) {
            /** sky */
            hideElement('parent-sky_layer-stars', skyElem);
            /** building1 */
            hideElement('parent-building1_layer-windowsOn_side-a', building1Elem);
            hideElement('parent-building1_layer-windowsOn_side-b', building1Elem);
            /** building2 */
            hideElement('parent-building2_layer-windowsOn', building2Elem);
        }
        if (currentTime === time.sunset) {
            /** sky */
            hideElement('parent-sky_layer-stars', skyElem);
            /** building1 */
            hideElement('parent-building1_layer-windowsOn_side-a', building1Elem);
            hideElement('parent-building1_layer-windowsOn_side-b', building1Elem);
            /** building2 */
            hideElement('parent-building2_layer-windowsOn', building2Elem);
        }
        if (currentTime === time.night) {
            /** sky */
            showElement('parent-sky_layer-stars', skyElem);
            // /** building1 */
            // showElement('parent-building1_layer-windowsOn_side-a', building1Elem);
            // showElement('parent-building1_layer-windowsOn_side-b', building1Elem);
            // /** building2 */
            // showElement('parent-building2_layer-windowsOn', building2Elem);
        }
    }

    useEffect(() => {
        if (DOMReady){
            const building1Elem = building1SVGRef.current.contentDocument;
            const building2Elem = building2SVGRef.current.contentDocument;
            const skyElem = skySVGRef.current.contentDocument;

            /** If we are tracking the time, update */
            if (currentTime === time.sunrise ||
                currentTime === time.day ||
                currentTime === time.sunset ||
                currentTime === time.night){
                setDuration( getDuration(destinationTime) * hrsPerSecond );
                setLayers(currentTime);
                setSky(skyElem, currentTime); //sky
                setBuilding1(building1Elem, currentTime); //building1
                setBuilding2(building2Elem, currentTime); //building2
            }
        }
    }, [DOMReady, currentTime, destinationTime, setSky, setBuilding1, setBuilding2])


    useEffect(() => {
        const int = setInterval(() => {
            console.log('interval', currentTime);
            setCurrentTime(findNextTime(currentTime))
        }, interval);
        return () => clearInterval(int);
    }, [DOMReady, interval, currentTime]);

    useEventListener('load', function() {
        console.log("dom loaded");
        setDOMReady(true);
    });


    /** Lottie Anmiations */
    // const handleStop = () => {
    //     animObj.stop();
    // }
    // const handlePlay = () => {
    //     animObj.play();
    // }
    // const handlePause = () => {
    //     animObj.pause();
    // }
    // const handleSlow = () => {
    //     animObj.setSpeed(0.15);
    // }
    // const handleSunrise = () => {
    //     animObj.goToAndPlay(10000 , false);
    // }
    // const handleDay = () => {
    //     animObj.goToAndPlay(2500 , false);
    // }
    // const handleSunset = () => {
    //     animObj.goToAndPlay(5000 , false);
    // }
    // const handleNight = async () => {
    //     animObj.setSpeed(2);
    //     await animObj.playSegments([1,400], false);
    //     await animObj.setSpeed(1);
    //     animObj.goToAndPlay(7500 , false);
    // }

    /** Manual Animations */
    const handleMSunrise = () => {
        setDestinationTime(time.sunrise);
    };
    const handleMDay = () => {
        setDestinationTime(time.day);
    };
    const handleMSunset = () => {
        setDestinationTime(time.sunset);
    };
    const handleMNight = () => {
        setDestinationTime(time.night);
    };

    return (<>
        <div ref={lottieSVGRef}></div>
        <div>
            <object
                className={classes.svgObj}
                ref={skySVGRef}
                id="sky"
                data={ skySVG }
                aria-label="sky-label"
                aria-required="true"
                type="image/svg+xml"
            >
                    Sky
            </object>
            <object
                className={classes.svgObj}
                ref={building2SVGRef}
                id="building1"
                data={ building2SVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Building2
            </object>
            <object
                className={classes.svgObj}
                ref={building1SVGRef}
                id="building1"
                data={ building1SVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Building1
            </object>
        </div>
        {/* <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 0, left: 0}} onClick={handlePlay}>Play</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 50, left: 0}} onClick={handleStop}>Stop</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 100, left: 0}} onClick={handlePause}>Pause</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 150, left: 0}} onClick={handleSlow}>Slow</button> */}
        {/* <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 200, left: 0}} onClick={handleSunrise}>Sunrise</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 250, left: 0}} onClick={handleDay}>Day</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 300, left: 0}} onClick={handleSunset}>Sunset</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 350, left: 0}} onClick={handleNight}>Night</button> */}
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 200, left: 0}} onClick={handleMSunrise}>M Sunrise</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 250, left: 0}} onClick={handleMDay}>M Day</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 300, left: 0}} onClick={handleMSunset}>M Sunset</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 350, left: 0}} onClick={handleMNight}>M Night</button>
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
    svgObj: {
        position: 'absolute'
    }
}))
