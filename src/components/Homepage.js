import React, {useState, useEffect, useRef, useCallback} from 'react';
import { HomeDoodle, RipplesDoodle } from 'components/doodles';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';
import Slide from '@material-ui/core/Slide';
import { makeStyles} from '@material-ui/core';
import { SocialIcon } from 'react-social-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import lottie from 'lottie-web';
import {
    useWindowSize
} from 'helpers';
import LOGO_TEXT_SVG from 'assets/home/logo_text.svg';
import EnterFocusPrompt from 'components/prompts/EnterFocusPrompt.js'
import ExitFocusPrompt from 'components/prompts/ExitFocusPrompt.js'


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

const twitter = "https://twitter.com/menshguy";
const github = "https://github.com/menshguy";
const email = "mailto:fenster.js@gmail.com";

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
                <SocialIcon target="_blank" className={classes.socialItem} url={twitter} />
                <SocialIcon target="_blank" className={classes.socialItem} url={github} />
                <SocialIcon target="_blank" className={classes.socialItem} url={email} />
            </div>
        </div>
    )
}



export default function HomePage (props) {
	const windowSize = useWindowSize();
	const [isMobile, setIsMobile] = useState(false);
	const [isTransitioning, setTransitioning] = useState(false);
	const [slideIsFocused, setSlideIsFocused] = useState(false); // After clicking a slide, we zoom in and allow interaction with the doodle. Allows/Prevents swiping on mobile
	const [showLogo, setShowLogo] = useState(true);
	const [showPrompt, setShowPrompt] = useState(true);
	const [showNav, setShowNav] = useState(true); // Hides Swiper Nav buttons (arrow keys)
	const classes = useStyles({ windowSize, isMobile, slideIsFocused });
	const navigation = (slideIsFocused || isMobile) ? false : true

	useEffect(() => {
		setIsMobile(windowSize.width <= 480);
	}, [windowSize]);

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
	}, [slideIsFocused, showLogo, showNav])

	return (<>
		{/* Logo */}
		<Slide direction="down" in={showLogo}>
			<div className={ classes.logoWrapper }>
				<Logo classes={classes} />
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

			{/* Focus Prompts - Focus on a slide or exit */}
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


const margin = 40;
const zIndexHierarchy = [10000, 1000, 100, 10, 1, 0];

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
		const unfocusedBorderSize = isMobile ? '10px' : '50px';
		const focusedBorderSize = '0px';
		return ({
			border: `${slideIsFocused ? focusedBorderSize : unfocusedBorderSize} solid white`,
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
	logoWrapper: ({ isMobile }) => {
        const base = {
            position: 'absolute',
            width: '100%',
			zIndex: zIndexHierarchy[0],
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
    socialItem: {
        margin: '0 10px 0 10px'
    },
	promptWrapper: ({isActive}) => ({
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: zIndexHierarchy[1], //sure always be behind the logo and in front of the slide
	})
}));