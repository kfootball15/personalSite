import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import SNOWY_TREES_MOV from 'assets/snowyTrees/snowy_trees.mp4';
// import SNOWY_TREES_GIF from 'assets/snowyTrees/snowy_trees.gif';

import {
    useEventListener,
    useWindowSize,
} from 'helpers';



export default function SnowyTrees ({ isActive, isMobile }) {
    const [DOMReady, setDOMReady] = useState(false);
    const ref = useRef(null);
    const {height, width} = useWindowSize();
    const isPortrait = height > width
    const classes = useStyles({ isPortrait });

    // Listens for dom ready - can use SVGs
    useEventListener('load', function() {
        console.log("dom loaded", isMobile);
        setDOMReady(true);
    });

    return (<>

        {/* Main Content */}
        <div className={classes.container}>

            {/* MP4 */}
            <video
                autoPlay
                loop
                className={ classes.vid }
                ref={ ref }
            >
                <source
                    src={ SNOWY_TREES_MOV }
                    type="video/mp4">
                </source>
            </video>

            {/* GIF */}
            {/* <img
                className={ classes.gif }
                ref={ ref }
                src={ SNOWY_TREES_GIF }
            /> */}
        </div>
    </>)
}

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: '#3b3b3b',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
    },
    vid: ({ isPortrait }) => {
        if (isPortrait) return {
            height: '100%'
        }

        return {
            width: '100%'
        }
    },
    gif: ({ isPortrait }) => {
        if (isPortrait) return {
            height: '100%'
        }

        return {
            width: '100%'
        }
    }
}))
