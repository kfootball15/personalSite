import React, {useEffect, useRef} from 'react';
import lottie from 'lottie-web';
import DESKTOP_TAP from 'assets/lottie_animations/desktop_click_temp.json';
import SWIPE_UP from 'assets/lottie_animations/swipe-up.json';
import TAP from 'assets/lottie_animations/tap.json';
import { makeStyles} from '@material-ui/core';


function TapPrompt ({ classes, togglePrompt }) {
	/** Refs */
	const animationRef = useRef(null);

	useEffect(() => {
		lottie.loadAnimation({
			renderer: 'svg',
			autoPlay: true,
			loop: true,
			container: animationRef.current,
			name: "tap", // Name for future reference. Optional.
			animationData: TAP,
		});
	}, []);

	return (
        <div
            // onClick={e => togglePrompt()}
            id="tap-prompt"
            className={classes.promptIcon}
            ref={ animationRef }
        />
	)
}

function SwipePrompt ({ classes, togglePrompt }) {
	/** Refs */
	const animationRef = useRef(null);

	useEffect(() => {
		lottie.loadAnimation({
			renderer: 'svg',
			autoPlay: true,
			loop: true,
			container: animationRef.current,
			name: "swipe",
			animationData: SWIPE_UP,
		});
	}, []);

	return (
		<div
            style={{paddingTop: 100}}
			// onClick={e => togglePrompt()}
			id="swipe-prompt"
			className={classes.promptIcon}
			ref={ animationRef }
		/>
	)
}

export default function EnterFocusPrompt ({showNav, isMobile, showPrompt}) {
	let PromptComponent;
    const classes = useStyles({isMobile});
	const promptText = isMobile ? "SWIPE / TAP" : "";

	if (showNav) {
		if (showPrompt) {
			PromptComponent = (
                <div className={classes.enterFocusPrompts}>
                    {/* <SwipePrompt
                        classes={classes}
                    />
                    <p className={classes.slash}> 
                        / 
                    </p> */}
                    <TapPrompt
                        classes={classes}
                    />
					<p className={classes.swipeUpIndicator}>
						{promptText}
					</p>
				</div>
			)
		} else {
			PromptComponent = (
				<div className={classes.enterFocusPrompts}></div>
			)
		}
	}
	else {
		PromptComponent = null
	}

	return PromptComponent
}

const useStyles = makeStyles(theme => ({
    enterFocusPrompts: {
		display: 'flex',
		boxSizing: 'border-box',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		width: '100vw',
		height: '100vh',
		padding: '0 25%',
    },
    slash: {
        color: 'white',
        fontSize: 145
    },
    promptIcon: ({isMobile}) => ({
		width: isMobile ? '100%' : '50%',
		// height: isMobile ? '100%' : '50%',
	}),
	swipeUpIndicator: {
		fontFamily: 'revert',
		color: 'white',
		fontSize: '27px',
		marginTop: '-37px',
		fontWeight: 800
	}
}));