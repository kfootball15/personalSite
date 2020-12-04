import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
/** for homePage project below */
import clsx from 'clsx';
// Moved these assets to ./asets/home/old image files
// import buildingData from 'assets/home/building1_update.json';
// import building1SVG from 'assets/home/building1.svg';
// import building2SVG from 'assets/home/building2.svg';
// import building3SVG from 'assets/home/building3.svg';
// import building4SVG from 'assets/home/building4.svg';
// import building5SVG from 'assets/home/building5.svg';
// import building6SVG from 'assets/home/building6.svg';
// import building7SVG from 'assets/home/building7.svg';
// import building8SVG from 'assets/home/building8.svg';
// import building9SVG from 'assets/home/building9.svg';
// import building10SVG from 'assets/home/building10.svg';
// import building11SVG from 'assets/home/building11.svg';
// import building12SVG from 'assets/home/building12.svg';
// import building13SVG from 'assets/home/building13.svg';
// import wallSVG from 'assets/home/wall.svg';
// import interiorSVG from 'assets/home/interior.svg';
// import characterSVG from 'assets/home/character.svg';
// import wc1SVG from 'assets/home/wc1.svg';
// import skySVG from 'assets/home/sky.svg';
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
                [time.night] : "#191816"
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

const building3 = {
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

const building4 = {
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

const building5 = {
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

const building6 = {
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

const building7 = {
    fireEscape: {
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
    plants: {
        colors: {
            [time.sunrise] : "#94bddb",
            [time.day] : "#90aece",
            [time.sunset] : "#e3f2de",
            [time.night] : "#191816"
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

const building8 = {
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

const building9 = {
    windows: {
        colors: {
            [time.sunrise] : "#94bddb",
            [time.day] : "#90aece",
            [time.sunset] : "#e3f2de",
            [time.night] : "#191816"
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

const building10 = {
    windows: {
        a: {
            colors: {
                [time.sunrise] : "#a1b7b1",
                [time.day] : "#85aab5",
                [time.sunset] : "#5d7066",
                [time.night] : "#434854"
            }
        },
        b: {
            colors: {
                [time.sunrise] : "#a1b7b1",
                [time.day] : "#85aab5",
                [time.sunset] : "#5d7066",
                [time.night] : "#434854"
            }
        }
    },
    base: {
        colors: {
            [time.sunrise] : "#edb2a1",
            [time.day] : "#a99b97",
            [time.sunset] : "#61534e",
            [time.night] : "#332622"
        }
    },
};

const building11 = {
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
    top: {
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

const building12 = {
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
                [time.sunrise] : "#edb2a1",
                [time.day] : "#a99b97",
                [time.sunset] : "#61534e",
                [time.night] : "#332622"
            }
        }
    },
};

const building13 = {
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

const wc1 = {
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
    bottom: {
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
    const windowSize = useWindowSize();
    const isMobile = windowSize.width <= 480
    const classes = useStyles({ isMobile, windowSize });
	const skySVGRef = useRef(null);
	const building1SVGRef = useRef(null);
	const building2SVGRef = useRef(null);
	const building3SVGRef = useRef(null);
	const building4SVGRef = useRef(null);
	const building5SVGRef = useRef(null);
	const building6SVGRef = useRef(null);
	const building7SVGRef = useRef(null);
	const building8SVGRef = useRef(null);
	const building9SVGRef = useRef(null);
	const building10SVGRef = useRef(null);
	const building11SVGRef = useRef(null);
	const building12SVGRef = useRef(null);
	const building13SVGRef = useRef(null);
	const wallSVGRef = useRef(null);
	const interiorSVGRef = useRef(null);
	const characterSVGRef = useRef(null);
	const wc1SVGRef = useRef(null);
    const lottieSVGRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(time.day);
    const [destinationTime, setDestinationTime] = useState(time.sunset);
    const [DOMReady, setDOMReady] = useState(false);
    const [duration, setDuration] = useState(getDuration(time.sunset));
    const [loop, setLoop] = useState(true);
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

    const setBuilding3 = useCallback((elem, time) => {
        transitionFill('parent-building3_layer-windows', elem, building3.windows.colors[time], duration, ease );
        transitionFill('parent-building3_layer-base_side-a', elem, building3.base.a.colors[time], duration, ease );
        transitionFill('parent-building3_layer-base_side-b', elem, building3.base.b.colors[time], duration, ease );
    }, [duration]);

    const setBuilding4 = useCallback((elem, time) => {
        transitionFill('parent-building4_layer-windows', elem, building4.windows.colors[time], duration, ease );
        transitionFill('parent-building4_layer-base_side-a', elem, building4.base.a.colors[time], duration, ease );
        transitionFill('parent-building4_layer-base_side-b', elem, building4.base.b.colors[time], duration, ease );
    }, [duration]);

    const setBuilding5 = useCallback((elem, time) => {
        transitionFill('parent-building5_layer-windows_side-a', elem, building5.windows.a.colors[time], duration, ease );
        transitionFill('parent-building5_layer-windows_side-b', elem, building5.windows.b.colors[time], duration, ease );
        transitionFill('parent-building5_layer-base_side-a', elem, building5.base.a.colors[time], duration, ease );
        transitionFill('parent-building5_layer-base_side-b', elem, building5.base.b.colors[time], duration, ease );
    }, [duration]);

    const setBuilding6 = useCallback((elem, time) => {
        transitionFill('parent-building6_layer-windows_side-a', elem, building6.windows.a.colors[time], duration, ease );
        transitionFill('parent-building6_layer-windows_side-b', elem, building6.windows.b.colors[time], duration, ease );
        transitionFill('parent-building6_layer-base_side-a', elem, building6.base.a.colors[time], duration, ease );
        transitionFill('parent-building6_layer-base_side-b', elem, building6.base.b.colors[time], duration, ease );
    }, [duration]);

    const setBuilding7 = useCallback((elem, time) => {
        transitionFill('parent-building7_layer-windows_side-a', elem, building7.windows.a.colors[time], duration, ease );
        transitionFill('parent-building7_layer-windows_side-b', elem, building7.windows.b.colors[time], duration, ease );
        transitionFill('parent-building7_layer-fireEscape_side-a', elem, building7.fireEscape.a.colors[time], duration, ease );
        transitionFill('parent-building7_layer-fireEscape_side-b', elem, building7.fireEscape.b.colors[time], duration, ease );
        transitionFill('parent-building7_layer-plants', elem, building7.plants.colors[time], duration, ease );
        transitionFill('parent-building7_layer-base_side-a', elem, building7.base.a.colors[time], duration, ease );
        transitionFill('parent-building7_layer-base_side-b', elem, building7.base.b.colors[time], duration, ease );
    }, [duration]);

    const setBuilding8 = useCallback((elem, time) => {
        transitionFill('parent-building8_layer-windows_side-a', elem, building8.windows.a.colors[time], duration, ease );
        transitionFill('parent-building8_layer-windows_side-b', elem, building8.windows.b.colors[time], duration, ease );
        transitionFill('parent-building8_layer-base_side-a', elem, building8.base.a.colors[time], duration, ease );
        transitionFill('parent-building8_layer-base_side-b', elem, building8.base.b.colors[time], duration, ease );
    }, [duration]);

    const setBuilding9 = useCallback((elem, time) => {
        transitionFill('parent-building9_windows', elem, building9.windows.colors[time], duration, ease );
        transitionFill('parent-building9_layer-base_side-a-2', elem, building9.base.a.colors[time], duration, ease );
        transitionFill('parent-building9_layer-base_side-a', elem, building9.base.a.colors[time], duration, ease );
        transitionFill('parent-building9_layer-base_side-b', elem, building9.base.b.colors[time], duration, ease );
    }, [duration]);

    const setBuilding10 = useCallback((elem, time) => {
        transitionFill('parent-building10_layer-windows_side-a', elem, building10.windows.a.colors[time], duration, ease );
        transitionFill('parent-building10_layer-windows_side-b', elem, building10.windows.b.colors[time], duration, ease );
        transitionFill('parent-building10_layer-base', elem, building10.base.colors[time], duration, ease );
    }, [duration]);

    const setBuilding11 = useCallback((elem, time) => {
        transitionFill('parent-building11_layer-windows_side-a', elem, building11.windows.a.colors[time], duration, ease );
        transitionFill('parent-building11_layer-windows_side-b', elem, building11.windows.b.colors[time], duration, ease );
        transitionFill('parent-building11_layer-top_side-a', elem, building11.top.a.colors[time], duration, ease );
        transitionFill('parent-building11_layer-top_side-b', elem, building11.top.b.colors[time], duration, ease );
        transitionFill('parent-building11_layer-base_side-a', elem, building11.base.a.colors[time], duration, ease );
        transitionFill('parent-building11_layer-base_side-b', elem, building11.base.b.colors[time], duration, ease );
    }, [duration]);

    const setBuilding12 = useCallback((elem, time) => {
        transitionFill('parent-building12_layer-base_side-a', elem, building12.base.a.colors[time], duration, ease );
        transitionFill('parent-building12_layer-base_side-b', elem, building12.base.b.colors[time], duration, ease );
    }, [duration]);

    const setBuilding13 = useCallback((elem, time) => {
        transitionFill('parent-building13_layer-base_side-a', elem, building13.base.a.colors[time], duration, ease );
        transitionFill('parent-building13_layer-base_side-b', elem, building13.base.b.colors[time], duration, ease );
    }, [duration]);

    const setWC1 = useCallback((elem, time) => {
        transitionFill('parent-wc1_layer-base_side-a', elem, wc1.base.a.colors[time], duration, ease );
        transitionFill('parent-wc1_layer-base_side-b', elem, wc1.base.b.colors[time], duration, ease );
        transitionFill('parent-wc1_layer-base_side-a-2', elem, wc1.bottom.a.colors[time], duration, ease );
        transitionFill('parent-wc1_layer-base_side-b-2', elem, wc1.bottom.b.colors[time], duration, ease );
    }, [duration]);

    // Lottie Animation Exmaple
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
            const building3Elem = building3SVGRef.current.contentDocument;
            const building4Elem = building4SVGRef.current.contentDocument;
            const building5Elem = building5SVGRef.current.contentDocument;
            const building6Elem = building6SVGRef.current.contentDocument;
            const building7Elem = building7SVGRef.current.contentDocument;
            const building8Elem = building8SVGRef.current.contentDocument;
            const building9Elem = building9SVGRef.current.contentDocument;
            const building10Elem = building10SVGRef.current.contentDocument;
            const building11Elem = building11SVGRef.current.contentDocument;
            const building12Elem = building12SVGRef.current.contentDocument;
            const building13Elem = building13SVGRef.current.contentDocument;
            const wallElem = wallSVGRef.current.contentDocument;
            const interiorElem = interiorSVGRef.current.contentDocument;
            const characterElem = characterSVGRef.current.contentDocument;
            const wc1Elem = wc1SVGRef.current.contentDocument;
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
                setBuilding3(building3Elem, currentTime); //building2
                setBuilding4(building4Elem, currentTime); //building2
                setWC1(wc1Elem, currentTime); //building2
                setBuilding5(building5Elem, currentTime); //building2
                setBuilding6(building6Elem, currentTime); //building2
                setBuilding7(building7Elem, currentTime); //building2
                setBuilding8(building8Elem, currentTime); //building2
                setBuilding9(building9Elem, currentTime); //building2
                setBuilding10(building10Elem, currentTime); //building2
                setBuilding11(building11Elem, currentTime); //building2
                setBuilding12(building12Elem, currentTime); //building2
                setBuilding13(building13Elem, currentTime); //building2
            }
        }
    }, [
        DOMReady,
        currentTime,
        destinationTime,
        setSky,
        setBuilding1,
        setBuilding2,
        setBuilding3,
        setBuilding4,
        setWC1,
        setBuilding5,
        setBuilding6,
        setBuilding7,
        setBuilding8,
        setBuilding9,
        setBuilding10,
        setBuilding11,
        setBuilding12,
        setBuilding13,
    ])


    useEffect(() => {
        const int = setInterval(() => {
            console.log('interval', currentTime);
            if (loop) setCurrentTime(findNextTime(currentTime))
        }, interval);
        return () => clearInterval(int);
    }, [DOMReady, interval, currentTime, loop]);

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
    const showBuildingIDs = () => {
        setLoop(false);
        const refs = [building1SVGRef,
        building2SVGRef,
        building3SVGRef,
        building4SVGRef,
        building5SVGRef,
        building6SVGRef,
        building7SVGRef,
        building8SVGRef,
        building9SVGRef,
        building10SVGRef,
        building11SVGRef,
        building12SVGRef,
        building13SVGRef,
        wc1SVGRef];
        refs.forEach(ref => { console.log(ref.current.contentDocument) })
        refs.forEach(ref => {
            //just grabs first elem with a match for each ref, which is all we really need
            const elem = ref.current.contentDocument.querySelector('[id^="parent-"]');
            const elemID = ref.current.contentDocument.querySelector('[id^="parent-"]').id.split('-')[1].split('_')[0];
            console.log(elem.parentElement, " : ", elemID)
            const labelElem = document.createElement('text')
            labelElem.innerText = elemID
            // labelElem.style = '{color: black; z-index: 1000;}';
            elem.parentElement.appendChild(labelElem)
        })
    };
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
        <div className={classes.container}>
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
            {/* 
                WTC PLACEHOLDER
            */}
            <object
                className={classes.svgObj}
                ref={building13SVGRef}
                id="building13"
                data={ building13SVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Building13
            </object>
            <object
                className={classes.svgObj}
                ref={building12SVGRef}
                id="building12"
                data={ building12SVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Building12
            </object>
            <object
                className={classes.svgObj}
                ref={building11SVGRef}
                id="building11"
                data={ building11SVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Building11
            </object>
            <object
                className={classes.svgObj}
                ref={building10SVGRef}
                id="building10"
                data={ building10SVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Building10
            </object>
            <object
                className={classes.svgObj}
                ref={building9SVGRef}
                id="building9"
                data={ building9SVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Building9
            </object>
            <object
                className={classes.svgObj}
                ref={building8SVGRef}
                id="building8"
                data={ building8SVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Building8
            </object>
            <object
                className={classes.svgObj}
                ref={building7SVGRef}
                id="building7"
                data={ building7SVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Building7
            </object>
            <object
                className={classes.svgObj}
                ref={building2SVGRef}
                id="building2"
                data={ building2SVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Building2
            </object>
            <object
                className={classes.svgObj}
                ref={building6SVGRef}
                id="building6"
                data={ building6SVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Building6
            </object>
            <object
                className={classes.svgObj}
                ref={building5SVGRef}
                id="building5"
                data={ building5SVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Building5
            </object>
            <object
                className={classes.svgObj}
                ref={building4SVGRef}
                id="building4"
                data={ building4SVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Building4
            </object>
            <object
                className={classes.svgObj}
                ref={building3SVGRef}
                id="building3"
                data={ building3SVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Building3
            </object>
            <object
                className={classes.svgObj}
                ref={wc1SVGRef}
                id="wc1"
                data={ wc1SVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    WC1
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

            {/* Interior Scene */}
            <object
                className={classes.svgObj}
                ref={wallSVGRef}
                id="wall"
                data={ wallSVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Wall
            </object>
            <object
                className={classes.svgObj}
                ref={interiorSVGRef}
                id="interior"
                data={ interiorSVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Interior
            </object>
            <object
                className={classes.svgObj}
                ref={characterSVGRef}
                id="character"
                data={ characterSVG }
                aria-label="Doodle"
                aria-required="true"
                type="image/svg+xml"
            >
                    Character
            </object>
        </div>
        <button
            style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 0, left: 0}}
            onClick={showBuildingIDs}
        >
            IDs
        </button>
        {/* <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 0, left: 0}} onClick={handlePlay}>Play</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 50, left: 0}} onClick={handleStop}>Stop</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 100, left: 0}} onClick={handlePause}>Pause</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 150, left: 0}} onClick={handleSlow}>Slow</button> */}
        {/* <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 200, left: 0}} onClick={handleSunrise}>Sunrise</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 250, left: 0}} onClick={handleDay}>Day</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 300, left: 0}} onClick={handleSunset}>Sunset</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 350, left: 0}} onClick={handleNight}>Night</button> */}
        {/* <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 200, left: 0}} onClick={handleMSunrise}>M Sunrise</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 250, left: 0}} onClick={handleMDay}>M Day</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 300, left: 0}} onClick={handleMSunset}>M Sunset</button>
        <button style={{ width: 50, height: 50, zIndex: 100, position: 'absolute', top: 350, left: 0}} onClick={handleMNight}>M Night</button> */}
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
            : { ...base, height: '100vh' }
    },
    container: {
        position: 'absolute',
        // bottom: 0,
        top: 1000,
        right: 0,
        height: '100vh',
        width: '100vw'
    }
}))
