import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const Placeholder = forwardRef((props, ref) => {
    const classes = useStyles();
    return (
        <div
            ref={ref}
            className={classes.placeholder}
        >
            <CircularProgress />
        </div>
    )
})

const useStyles = makeStyles(theme => ({
    placeholder: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

export default Placeholder;
