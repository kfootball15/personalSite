import React, {useState, useEffect, useRef, useCallback} from 'react';
import { HomeDoodle, RipplesDoodle, RainDoodle, FollowDoodle, FlockDoodle } from 'doodles';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';
import { makeStyles } from '@material-ui/core';
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



export default function HomePage (props) {
	const windowSize = useWindowSize();
	const [isMobile, setIsMobile] = useState(false);
	const [isTransitioning, setTransitioning] = useState(false);
	const [allowSlide, setAllowSlide] = useState(isMobile ? true : true); // Allows/Prevents swiping on mobile
	const [showLogo, setShowLogo] = useState(true);
	const [showNav, setShowNav] = useState(true); // Hides Swiper Nav buttons (arrow keys)
	const classes = useStyles({ windowSize, isMobile, allowSlide });

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
		console.log("allowSlide", allowSlide)
		lottie.pause()
		setAllowSlide(!allowSlide)
		setShowLogo(!showLogo)
		setShowNav(!showNav) 
	}, [allowSlide, showLogo, showNav])


	return (
		<>
		{/* Logo */}
		{ showLogo && 
			<div className={ classes.logoWrapper }>
				<Logo classes={classes} />
			</div>
		}

        <Swiper
			className={classes.slideWrapper} 
            spaceBetween={0}
			slidesPerView={1}
			allowSlideNext={allowSlide}
			allowSlidePrev={allowSlide}
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
					<>
					<div className={classes.actionWrapper}>
						{showNav
							? (<SwipePrompt
								classes={classes}
								togglePrompt={e => toggleActivateSlide()}
								/>)
							: (<ExitPrompt 
								togglePrompt={e => toggleActivateSlide()}
								classes={classes}
							/>)
						}
					</div>
					<HomeDoodle
						isTransitioning={isTransitioning}
						isActive={isActive}
						isMobile={isMobile}
					/>
					</>
				)}
			</SwiperSlide>

			{/* SKETCH: Rain Drops (2D raindrops) */}
            <SwiperSlide className={classes.slide} >
				{({ isActive }) => (
					<RipplesDoodle
						isTransitioning={isTransitioning}
						isActive={isActive}
						isMobile={isMobile}
					/>
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
		</>
	)
}

const useStyles = makeStyles(theme => ({
	slideWrapper: ({ allowSlide }) => {
		const margin = 40
		const height = allowSlide ? `calc(100% - ${margin * 2}px)` : `calc(100%)`
		return ({
			margin: allowSlide ? margin : 0,
			width: 'auto',
			height,
			transition: 'margin 1s, height 1s',
			transitionDelay: '0s',
			backgroundColor: 'red',
		})
	},
	slide: {
			overflow: 'hidden',
			height: '100% !important',
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
                 // bottom: '40%' 
                 top: '15%',
                 width: '27%',
                 left: '7%'
            },
            [theme.breakpoints.up('xl')]: {
                // bottom: '40%' 
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
	actionWrapper: ({isActive}) => ({
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