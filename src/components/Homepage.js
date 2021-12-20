import React, {useState, useEffect, useRef, useCallback} from 'react';
import { HomeDoodle, RipplesDoodle, RainDoodle, FollowDoodle, FlockDoodle } from 'doodles';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';
import Slide from '@material-ui/core/Slide';
import { makeStyles, } from '@material-ui/core';
import { SocialIcon } from 'react-social-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import lottie from 'lottie-web';
import {
    useWindowSize
} from 'helpers';
import MOBILE_TAP from 'assets/lottie_animations/mobile_tap_temp.json';
import DESKTOP_TAP from 'assets/lottie_animations/desktop_click_temp.json';
import SWIPE from 'assets/lottie_animations/swipe_temp.json';
import LOGO_TEXT_SVG from 'assets/home/logo_text.svg';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

let clickAnimationObject;
let swipeAnimationObject;

function Logo ({ classes }) {
    return (
        <div className={ classes.logoContainer}>
            <object
                id="logo"
                data={ LOGO_TEXT_SVG }
                aria-label="logo"
                aria-required="true"
                type="image/svg+xml"
            >
                MENSH
            </object>
            <div className={ classes.socialContainer }>
                <SocialIcon target="_blank" className={classes.social} url="https://twitter.com/menshguy" />
                <SocialIcon target="_blank" className={classes.social} url="https://github.com/menshguy" />
                <SocialIcon target="_blank" className={classes.social} url="mailto:fenster.js@gmail.com" />
            </div>
        </div>
    )
}

function ClickPrompt ({ classes, togglePrompt }) {
	/** Refs */
	const animationRef = useRef(null);


	useEffect(() => {
		clickAnimationObject = lottie.loadAnimation({
			renderer: 'svg',
			autoPlay: true,
			loop: true,
			container: animationRef.current,
			name: isMobile ? "mobile_tap" : "desktop_click", // Name for future reference. Optional.
			// animationData: isMobile ? MOBILE_TAP : DESKTOP_TAP,
			animationData: DESKTOP_TAP,
		});
	}, []);

	return (
			<div
				onClick={e => togglePrompt()}
				id="action-prompt"
				className={classes.actionAnimation}
				ref={ animationRef }
			/>
	)
}

function SwipePrompt ({ classes, togglePrompt }) {
	/** Refs */
	const animationRef = useRef(null);

	useEffect(() => {
		swipeAnimationObject = lottie.loadAnimation({
			renderer: 'svg',
			autoPlay: true,
			loop: true,
			container: animationRef.current,
			name: "swipe",
			animationData: SWIPE,
		});
	}, []);

	return (
		<div
			onClick={e => togglePrompt()}
			id="swipe-prompt"
			className={classes.actionAnimation}
			ref={ animationRef }
		/>
	)
}

function ExitPrompt ({ classes, togglePrompt}) {
	return (
		<div
			onClick={e => togglePrompt()}
			id="action-exit"
			className={classes.actionExit}
		>
			<svg viewBox="0 0 20 20">
				<path fill="white" d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
			</svg>
		</div>
	)
}

function Prompt ({ classes, promptType, showNav, showPrompt, toggleActivateSlide}) {

	// renderSwitch(param) {
	// 	switch(param) {
	// 		case 'foo':
	// 			return 'bar';
	// 		default:
	// 			return 'foo';
	// 	}
	// }

	return (
		<div className={classes.promptWrapper}>
			{showNav
				? showPrompt
					? (
						<SwipePrompt
							classes={classes}
							togglePrompt={e => toggleActivateSlide()}
						/>
					)
					: (
						<div
							style={{ width: '100%', height: '100%'}}
							onClick={e => toggleActivateSlide()}
						>
						</div>
					)
				: (
					<ExitPrompt 
						togglePrompt={e => toggleActivateSlide()}
						classes={classes}
					/>
				)
			}
		</div>
	)
}



export default function HomePage (props) {
	const windowSize = useWindowSize();
	const [isMobile, setIsMobile] = useState(false);
	const [isTransitioning, setTransitioning] = useState(false);
	const [slideIsFocused, setSlideIsFocused] = useState(isMobile ? true : true); // After clicking a slide, we zoom in and allow interaction. Allows/Prevents swiping on mobile
	const [showLogo, setShowLogo] = useState(true);
	const [showPrompt1, setShowPrompt1] = useState(true);
	const [showPrompt2, setShowPrompt2] = useState(false);
	const [showNav, setShowNav] = useState(true); // Hides Swiper Nav buttons (arrow keys)
	const classes = useStyles({ windowSize, isMobile, slideIsFocused });

	useEffect(() => {
		setIsMobile(windowSize.width <= 480);
	}, [windowSize]);

	const handleSlideChangeTransitionStart = () => {
		setTransitioning(true);
	};
	
	const handleSlideChangeTransitionEnd = () => {
		setTransitioning(false);
	};

	const toggleActivateSlide = useCallback(() => {
		console.log("slideIsFocused", slideIsFocused)
		lottie.pause()
		if (showPrompt1) setShowPrompt1(false); //
		// if (showPrompt2) setShowPrompt2(false); //
		setSlideIsFocused(!slideIsFocused)
		setShowLogo(!showLogo)
		setShowNav(!showNav) 
	}, [slideIsFocused, showLogo, showNav])


	return (
		<>
		{/* Logo */}
		<Slide direction="down" in={showLogo}>
			<div className={ classes.logoWrapper }>
				<Logo classes={classes} />
			</div>
		</Slide>

		{/* Swiper Slides */}
		<div className={classes.slideWrapper} >
        <Swiper
            spaceBetween={0}
			slidesPerView={1}
			allowSlideNext={slideIsFocused}
			allowSlidePrev={slideIsFocused}
			direction={'vertical'}
			// navigation={{
			// 	hideOnClick: true,
			// }} //shows navigation arrows
			// // initialSlide={1}
			// effect={'fade'} //'slide', 'fade', 'cube', 'coverflow', 'flip' or 'creative'
			// pagination={{ clickable: true}} // Will display pagination dots on side
			// scrollbar={{ draggable: true }}
			onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
			onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
        >
			{/* SKETCH: Home Page Doodle (desk animation project) */}
            <SwiperSlide className={classes.slide} >
				{({ isActive }) => (
        			<div className={classes.slideContent} >
						<Prompt
							classes={classes}
							showNav={showNav}
							showPrompt={showPrompt1}
							toggleActivateSlide={toggleActivateSlide}
						/>
						<HomeDoodle
							isTransitioning={isTransitioning}
							isActive={isActive}
							isFocused={slideIsFocused}
							isMobile={isMobile}
						/>
					</div>

				)}
			</SwiperSlide>

			{/* SKETCH: Rain Drops (2D raindrops) */}
            <SwiperSlide className={classes.slide} >
				{({ isActive }) => (
					<div className={classes.slideContent} >
						<Prompt
							classes={classes}
							showNav={showNav}
							showPrompt={showPrompt2}
							toggleActivateSlide={toggleActivateSlide}
						/>
						<RipplesDoodle
							isTransitioning={isTransitioning}
							isActive={isActive}
							isMobile={isMobile}
						/>
					</div>
				)}
			</SwiperSlide>

			{/* SKETCH: Raindrops (3d Raindrops) */}
            {/* <SwiperSlide className={classes.slide} >
				{({ isActive }) => (
					<RainDoodle
						isTransitioning={isTransitioning}
						isActive={isActive}
						isMobile={isMobile}
					/>
				)}
			</SwiperSlide> */}
			
			{/* SKETCH: Duck Project? */}
			{/* <SwiperSlide className={classes.slide} >
				{({ isActive }) => (
					<FollowDoodle
						isTransitioning={isTransitioning}
						isActive={isActive}
						isMobile={isMobile}
					/>
				)}
			</SwiperSlide> */}
			
			{/* SKETCH: Flock Project */}
			{/* <SwiperSlide className={classes.slide} >
				{({ isActive }) => (
					<FlockDoodle
						isTransitioning={isTransitioning}
						isActive={isActive}
						isMobile={isMobile}
					/>
				)}
			</SwiperSlide> */}
			
		</Swiper>
		</div>
		</>
	)
}


const margin = 40;

const useStyles = makeStyles(theme => ({
	slideWrapper: ({ slideIsFocused }) => {
		return ({
			boxSizing: 'border-box',	
			margin: slideIsFocused ? margin : 0,
			height: '100%',
			transition: 'margin 1s, height 1s',
			transitionDelay: '0s',
		})
	},
	slide: ({slideIsFocused}) => {
		// const height = '100%'
		const height = slideIsFocused ? `calc(100% - ${margin*2}px)` : `calc(100%)`
		return ({
			height,
			overflow: 'hidden',
			boxSizing: 'border-box',
		})	
	},
	slideContent: ({ windowSize, slideIsFocused }) => {
        return ({
            backgroundColor: '#3b3b3b',
            position: 'absolute',
            top: 0,
            left: 0,
            overflow: 'hidden',
            // height: '100%',
            height: slideIsFocused ? windowSize.height - 80 : windowSize.height,
            width: '100%',
            transition: 'height 1s',
			transitionDelay: '0s',
        })
    },
	logoWrapper: ({ isMobile }) => {
        const base = {
            position: 'absolute',
            width: '100%',
			zIndex: 10,
            [theme.breakpoints.down('sm')]: {
                left: 0,
                top: '5%',
            },
            [theme.breakpoints.only('md')]: {
                left: 0,
                top: '4%'
            },
            [theme.breakpoints.only('lg')]: {
                 top: '15%',
                 width: '27%',
                 left: '7%'
            },
            [theme.breakpoints.up('xl')]: {
                top: '15%',
                width: '27%',
                left: '7%'
            },
        }

        return { ...base }
    },
    logoContainer:{
        display: 'flex',
        flexDirection: 'column'
    },
    socialContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 100,
        marginTop: 10
    },
    social: {
        margin: '0 10px 0 10px'
    },
	promptWrapper: ({isActive}) => ({
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 100,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	actionAnimation: ({isMobile}) => ({
		width: isMobile ? '100%' : '50%',
		height: isMobile ? '100%' : '50%',
	}),
	actionExit: ({isMobile}) => ({
		top: 0,
		right: 0,
		position: 'absolute',
		margin:"10px 10px 0 0",
		height: 100,
		width: 100,
	})
}));