import React, {useState, useEffect, useCallback} from 'react';
import { HomeDoodle, RipplesDoodle } from 'components/doodles';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';
import Slide from '@material-ui/core/Slide';
import { makeStyles} from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import lottie from 'lottie-web';
import {
    useWindowSize
} from 'helpers';
import Logo from 'components/Logo.js'
import EnterFocusPrompt from 'components/prompts/EnterFocusPrompt.js'
import ExitFocusPrompt from 'components/prompts/ExitFocusPrompt.js'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

export default function HomePage (props) {
	const windowSize = useWindowSize();
	const [isMobile, setIsMobile] = useState(false);
	const [isWideScreen, setIsWideScreen] = useState(true);
	const [isTransitioning, setTransitioning] = useState(false);
	const [slideIsFocused, setSlideIsFocused] = useState(false); // After clicking a slide, we zoom in and allow interaction with the doodle. Allows/Prevents swiping on mobile
	const [isProfessionalSite, setIsProfessionalSite] = useState(process.env.REACT_APP_IS_PROFESSIONAL_SITE === "true");
	const [showLogo, setShowLogo] = useState(true);
	const [showPrompt, setShowPrompt] = useState(true);
	const [showNav, setShowNav] = useState(true); // Hides Swiper Nav buttons (arrow keys)
	const classes = useStyles({ windowSize, isMobile, isWideScreen, slideIsFocused });
	const navigation = (slideIsFocused || isMobile) ? false : true;
	const personalSite = 'https://www.menshguy.com';
	const professionalSite = 'https://www.fensterjs.com';

	useEffect(() => {
		setIsMobile(windowSize.width <= 480);
		setIsWideScreen(windowSize.width > windowSize.height);
	}, [windowSize.width, windowSize.height]);

	const handleSlideChangeTransitionStart = () => {
		setTransitioning(true);
	};
	
	const handleSlideChangeTransitionEnd = () => {
		if (showPrompt) setShowPrompt(false); // Only show prompt once
		setTransitioning(false);
	};

	const toggleActivateSlide = useCallback(() => {
		lottie.pause()
		setSlideIsFocused(!slideIsFocused)
		setShowLogo(!showLogo)
		if (showPrompt) setShowPrompt(false); // Only show prompt once
		setShowNav(!showNav) // Toggle nav on/off depending on whether or not a slide is "active"
	}, [slideIsFocused, showLogo, showNav, showPrompt])

	const linkDirect = useCallback(() => {
		if (process.env.NODE_ENV === "development") {
			// If dev, just toggle site between personal and professional
			setIsProfessionalSite(!isProfessionalSite)
		} else {
			// redirect to opposite site
			window.location.replace( isProfessionalSite ? personalSite : professionalSite );
		}

	}, [isProfessionalSite])

	return (
		<>
		
		{/* Link to Personal/Professional site */}
		{
			!slideIsFocused && // Only show link on this page
			<a className={ classes.siteLink } onClick={ linkDirect } >
				Go to {isProfessionalSite ? 'Personal' : 'Professional'} Site 
			</a>
		}

		{/* Logo */}
		<Slide direction="down" in={showLogo}>
			<div className={ classes.logoContainer }>
				<Logo isProfessionalSite={ isProfessionalSite } />
			</div>
		</Slide>

		{/* Swiper Slides */}
		<div className={classes.swiperContainer} >
        <Swiper
            spaceBetween={0}
			slidesPerView={1}
			allowSlideNext={!slideIsFocused}
			allowSlidePrev={!slideIsFocused}
			direction={isMobile ? 'vertical' : 'horizontal'}
			onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
			onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
			navigation={navigation} //shows navigation arrows
			// // initialSlide={1}
			// effect={'fade'} //'slide', 'fade', 'cube', 'coverflow', 'flip' or 'creative'
			// pagination={{ clickable: true}} // Will display pagination dots on side
			// scrollbar={{ draggable: true }}
        >

			{/* Focus Prompts (swipe, tap, etc) - Focuses screen in on a slide or exits */}
			<div
				onClick={e => toggleActivateSlide()}
				className={classes.promptWrapper}
			>
				{slideIsFocused 
					? (
						<ExitFocusPrompt 
							isMobile={isMobile}
							togglePrompt={e => toggleActivateSlide()}
						/>
					)
					: (
						<EnterFocusPrompt
							isMobile={isMobile}
							showNav={showNav}
							showPrompt={showPrompt}
							toggleActivateSlide={toggleActivateSlide}
						/>
					)
				}
			</div>

			{/* Slides */}
            <SwiperSlide className={classes.slide} >
				{({ isActive }) => (
        			<div className={classes.slideContent} >
						<HomeDoodle
							isTransitioning={isTransitioning}
							isActive={isActive}
							isFocused={slideIsFocused}
							isMobile={isMobile}
							isWideScreen={isWideScreen}
							isProfessionalSite={isProfessionalSite}
						/>
					</div>
				)}
			</SwiperSlide>
            <SwiperSlide className={classes.slide} >
				{({ isActive }) => (
					<div className={classes.slideContent} >
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
					<div className={classes.slideContent} >
						<RainDoodle
							isTransitioning={isTransitioning}
							isActive={isActive}
							isMobile={isMobile}
						/>
					</div>
				)}
			</SwiperSlide>
			 */}
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


function randomInt(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
}

const zIndexHierarchy = [10000, 1000, 100, 10, 1, 0];
const markerOpacity = 0.6;
const margins = [0, 5, 10, 4];
const mobileBorderSize = 10;
const desktopBorderSize = 5;
const useStyles = makeStyles(theme => ({
	/**
	 * Addiontal Swiper CSS overrieds in index.css
	 */
	swiperContainer: ({ slideIsFocused }) => {
		return ({
			width: '100%',
			height: '100%',
			zIndex: zIndexHierarchy[2], // Should be behind logo and prompts (click and exit focus prompt)
		})
	},
	slide: ({isMobile, slideIsFocused}) => {

		const unfocusedBorderSize = isMobile ? mobileBorderSize : desktopBorderSize;
		const focusedBorderSize = '0px';
		return ({
			border: `${slideIsFocused ? focusedBorderSize : unfocusedBorderSize}px solid white`,
			transition: 'border 1s, height 1s',
			transitionDelay: '0s',
    		boxSizing: 'border-box',
		})	
	},
	slideContent: ({ windowSize, slideIsFocused }) => {
        return ({
			height: '100%',
			width: '100%',
			zIndex: slideIsFocused ? zIndexHierarchy[1] : zIndexHierarchy[zIndexHierarchy.length - 1] // content should either be all the way in the back if unfocused, or up front behind the prompts if focused
        })
    },
	siteLink: ({ isMobile }) => {
		const unfocusedBorderSize = isMobile ? mobileBorderSize : desktopBorderSize;
		return ({
			position: 'absolute',
			bottom: unfocusedBorderSize + 10, // move the link inside the border
			right: unfocusedBorderSize + 10,
			zIndex: zIndexHierarchy[0],
			fontSize: 16,
			cursor: 'pointer',
			textDecoration: 'underline',
			color: 'blue'
		});
	},
	logoContainer: ({ isMobile }) => {
        const base = {
            position: 'absolute',
			zIndex: zIndexHierarchy[0],
			display: 'flex',
			flexDirection: 'column',
			[theme.breakpoints.down('sm')]: {
				left: 0,
                top: '5%',
				width: '100%',
				padding: '0 10%',
				boxSizing: 'border-box',
            },
            [theme.breakpoints.only('md')]: {
				right: 0,
                top: '4%',
				width: '100%',
				padding: '0 10%',
				boxSizing: 'border-box',
            },
            [theme.breakpoints.only('lg')]: {
				top: '31%',
				right: '11%',
				width: '27%',
            },
            [theme.breakpoints.up('xl')]: {
				top: '31%',
				right: '11%',
				width: '27%',
            },
        }

        return base
    },
	promptWrapper: {
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: zIndexHierarchy[1], //sure always be behind the logo and in front of the slide
	}
}));