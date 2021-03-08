import React, { useEffect, useRef, lazy } from 'react';
import { makeStyles } from '@material-ui/core';
import Placeholder from 'components/Placeholder';
import LazyLoad from 'react-lazyload';
import SNOWY_TREES2_MOV from 'assets/snowyTrees2/snowyTrees2.mp4';
import SNOWY_TREES2_GIF from 'assets/snowyTrees2/snowyTrees2.gif';

import { useWindowSize } from 'helpers';

export default function SnowyTrees2 ({ isActive, isMobile }) {
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

            <LazyLoad style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
            }}>
                {/* @TODO - Lazy Load / Code Split */}
                {
                    isMobile
                        ? <img
                            onLoad={removePlaceholder}
                            onError={removePlaceholder}
                            className={ classes.gif }
                            ref={ ref }
                            src={ SNOWY_TREES2_GIF }
                        />
                        : <video
                            onLoadedData={removePlaceholder}
                            onError={removePlaceholder}
                            autoPlay
                            loop
                            muted
                            className={ classes.vid }
                            ref={ ref }
                        >
                            <source
                                src={ SNOWY_TREES2_MOV }
                                type="video/mp4">
                            </source>
                        </video>
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
    vid: ({ isPortrait }) => {
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
        if (isPortrait) return {
            height: '100%'
        }

        return {
            width: '100%'
        }
    }
}));