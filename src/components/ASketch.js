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

export default function ASketch ({ SKETCH, date, isActive, isMobile }) {
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
            
            <DateDisplay date={date} />

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
        position: 'relative',
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

const useDateStyles = makeStyles(theme => ({
    date: {
        position: 'absolute',
        top: 0,
        right: 0
    },
}));