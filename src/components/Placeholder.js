import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const Placeholder = forwardRef(({ size = '30vw' }, ref) => {
    const classes = useStyles();
    return (
        <div
            ref={ref}
            className={classes.placeholder}
        >
            <CircularProgress size={size} />
        </div>
    )
})

const useStyles = makeStyles(theme => ({
    placeholder: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top:0,
        left: 0
    },
}));

export default Placeholder;
