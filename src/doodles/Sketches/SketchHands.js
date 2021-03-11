import React, { useEffect, useRef, lazy } from 'react';
import { makeStyles } from '@material-ui/core';
import SKETCH from 'assets/sketches/hands.png';
import Placeholder from 'components/Placeholder';
import LazyLoad from 'react-lazyload';

import { useWindowSize } from 'helpers';

export default function SketchHands ({ isActive, isMobile }) {
    const ref = useRef();
    const refPlaceholder  = useRef();
    const {height, width} = useWindowSize();
    const isPortrait = height > width
    const classes = useStyles({ isPortrait });

    const removePlaceholder = () => {
        console.log("removePlaceholder runs")
        refPlaceholder.current.remove();
    };

    return (<>

        {/* Main Content */}
        <div className={classes.container}>

            <Placeholder ref={refPlaceholder} />

            <LazyLoad>
                {/* @TODO - Lazy Load / Code Split */}
                {
                    <img
                        onLoad={removePlaceholder}
                        onError={removePlaceholder}
                        className={ classes.png }
                        ref={ ref }
                        src={ SKETCH }
                    />
                }
            </LazyLoad>
        </div>
    </>)
}

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    png: ({ isPortrait }) => {
        return {
            width: '100%'
        }
    }
}));