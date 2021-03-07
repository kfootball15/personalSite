import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import SNOWY_TREES_MOV from 'assets/snowyTrees/snowy_trees.mp4';
import Placeholder from 'components/Placeholder';
import LazyLoad from 'react-lazyload';
// import SNOWY_TREES_GIF from 'assets/snowyTrees/snowy_trees.gif';

import { useWindowSize } from 'helpers';

export default function SnowyTrees ({ isActive, isMobile }) {
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

            <Placeholder classes={classes} ref={refPlaceholder} />

            <LazyLoad style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                {/* MP4 */}
                <video
                    onLoadedData={removePlaceholder}
                    onError={removePlaceholder}
                    autoPlay
                    loop
                    muted
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