import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import Placeholder from 'components/Placeholder';
import LazyLoad from 'react-lazyload';

import { useWindowSize } from 'helpers';

function DateDisplay ({ date }) {
    const classes = useDateStyles();
    return (
        <span className={classes.date} >
            {date}
        </span>
    )
}

export default function ASketch ({
    SKETCH,
    date,
    isActive,
    isMobile,
    type
}) {
    const ref = useRef();
    const refPlaceholder  = useRef();
    const {height, width} = useWindowSize();
    const isPortrait = height > width
    const classes = useStyles({ isPortrait });

    const removePlaceholder = () => {
        console.log("removePlaceholder runs")
        refPlaceholder.current.remove();
    };

    const renderSwitch = (type) => {
        switch(type) {
            case 'image':
                return (
                    <img
                        className={ classes.image }
                        onLoad={removePlaceholder}
                        onError={removePlaceholder}
                        ref={ ref }
                        src={ SKETCH }
                    />
                )
            case 'video':
                return (
                    <video
                        onLoadedData={removePlaceholder}
                        onError={removePlaceholder}
                        autoPlay
                        loop
                        muted
                        className={ classes.video }
                        ref={ ref }
                    >
                        <source
                            src={ SKETCH }
                            type="video/mp4">
                        </source>
                    </video>
                )
            case 'gif':
                return (
                    <img
                        onLoad={removePlaceholder}
                        onError={removePlaceholder}
                        className={ classes.gif }
                        ref={ ref }
                        src={ SKETCH }
                    />
                );
            case 'svg':
                return 'bar';
            case 'lottie':
                return 'bar';
            default:
                return null;
        }
    }

    return (<>

        {/* Main Content */}
        <div className={classes.container}>
            
            <DateDisplay date={date} />

            <Placeholder ref={refPlaceholder} />

            <LazyLoad style={isMobile
                ? {
                    height: '100%',
                }
                : {
                    width: '100%'
                }
            }>
                {/* @TODO - Lazy Load / Code Split */}
                {
                    renderSwitch(type)
                }
            </LazyLoad>
        </div>
    </>)
}

const useStyles = makeStyles(theme => ({
    container: {
        // position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    image: ({ isPortrait }) => {
        return {
            width: '100%',
            height: '100%'
        }
    },
    video: ({ isPortrait }) => {
        const base = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }

        if (isPortrait) return {
            ...base,
            height: '100%'
        }

        return {
            ...base,
            width: '100%'
        }
    },
    gif: ({ isPortrait }) => {
        return {
            width: '100%',
            height: '100%'
        }
    }
}));

const useDateStyles = makeStyles(theme => ({
    date: {
        position: 'absolute',
        top: 0,
        right: 0
    },
}));