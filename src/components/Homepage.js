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
import LOGO_TEXT_SVG from 'assets/home/logo_text.svg'; // Clean Text
import MARKER_LOGO_TEXT_SVG from 'assets/logo.svg'; // Marker Text
import TWITTER from 'assets/social/social_twitter.svg';
import EMAIL from 'assets/social/social_email.svg';
import LINKEDIN from 'assets/social/social_li.svg';
import READING from 'assets/social/social_reading.svg';
import MUSIC from 'assets/social/social_music.svg';
import GITHUB from 'assets/social/social_github.svg';
import MAP from 'assets/social/social_map.svg';
import EnterFocusPrompt from 'components/prompts/EnterFocusPrompt.js'
import ExitFocusPrompt from 'components/prompts/ExitFocusPrompt.js'


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);
console.log("process.env", process.env)

/** @TODO - Replace with Environment Variable and deploy to sepearte domains  */
const isProfessionalSite = true;

const twitter = "https://twitter.com/menshguy";
const github = "https://github.com/menshguy";
const email = "mailto:fenster.js@gmail.com";
const linkedIn = "https://www.linkedin.com/in/jeff-fenster";
const map = "https://goo.gl/maps/SqMswZ82YL9TwoWYA";
const reading = "";
const music = "";

function Logo ({ classes, isProfessionalSite }) {
	let icons;
	if (isProfessionalSite) {
		// will only appear on professional site
		icons = []
	} else {
		// will only appear on personal site
	}
    return (
        <>
			{/* Clean Logo */}
            {/* <object
				className={ classes.logo }
                id="logo"
                data={ LOGO_TEXT_SVG }
                aria-label="logo"
                aria-required="true"
                type="image/svg+xml"
            >
                MENSH
            </object> */}

			{/* Marker Logo */}
            <object
				className={ classes.logo }
                id="logo"
                data={ MARKER_LOGO_TEXT_SVG }
                aria-label="logo"
                aria-required="true"
                type="image/svg+xml"
            >
                MENSH
            </object>

			{/* Clean Icons */}
            <div className={ classes.socialContainer }>
				{/* <SocialIcon target="_blank" className={classes.socialItem} url={twitter} /> */}
				{/* <SocialIcon target="_blank" className={classes.socialItem} url={github} /> */}
				{/* <SocialIcon target="_blank" className={classes.socialItem} url={email} /> */}
				{/* <SocialIcon target="_blank" className={classes.socialItem} url={linkedIn} /> */}
				{/* <SocialIcon target="_blank" className={classes.socialItem} url={map} /> */}
				{/* <SocialIcon target="_blank" className={classes.socialItem} url={reading} /> */}
				{/* <SocialIcon target="_blank" className={classes.socialItem} url={music} /> */}
            </div>

			{/* Marker Icons */}
            <div className={ classes.socialContainer }>
				{/* <MarkerSocialIcon src={TWITTER} url={twitter} target="_blank" classes={classes.markerSocialItem} /> */}
				{/* <MarkerSocialIcon src={EMAIL} url={twitter} target="_blank" classes={classes.markerSocialItem} /> */}
				{/* <MarkerSocialIcon src={LINKEDIN} url={linkedIn} target="_blank" classes={classes.markerSocialItem} /> */}
				<MarkerSocialIcon src={READING} url={reading} target="_blank" classes={classes.markerSocialItem} />
				<MarkerSocialIcon src={MUSIC} url={music} target="_blank" classes={classes.markerSocialItem} /> 
				<MarkerSocialIcon src={GITHUB} url={github} target="_blank" classes={classes.markerSocialItem} />
				<MarkerSocialIcon src={MAP} url={map} target="_blank" classes={classes.markerSocialItem} />
            </div>
        </>
    )
}

function MarkerSocialIcon ({ classes, url, src, ...props }) {
	return (
		<a className={classes} href={url} {...props} >
			<img src={src} />
		</a>
	)
}

export default function HomePage (props) {
	const windowSize = useWindowSize();
	const [isMobile, setIsMobile] = useState(false);
	const [isWideScreen, setIsWideScreen] = useState(true);
	const [isTransitioning, setTransitioning] = useState(false);
	const [slideIsFocused, setSlideIsFocused] = useState(false); // After clicking a slide, we zoom in and allow interaction with the doodle. Allows/Prevents swiping on mobile
	const [showLogo, setShowLogo] = useState(true);
	const [showPrompt, setShowPrompt] = useState(true);
	const [showNav, setShowNav] = useState(true); // Hides Swiper Nav buttons (arrow keys)
	const classes = useStyles({ windowSize, isMobile, isWideScreen, slideIsFocused });
	const navigation = (slideIsFocused || isMobile) ? false : true;

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
	}, [slideIsFocused, showLogo, showNav])

	return (<>
		{/* Logo */}
		<Slide direction="down" in={showLogo}>
			<div className={ classes.logoContainer }>
				<Logo classes={classes} isProfessionalSite={isProfessionalSite} />
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
		const mobileBorderSize = '10px';
		const desktopBorderSize = '5px';
		const unfocusedBorderSize = isMobile ? mobileBorderSize : desktopBorderSize;
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
	logo: {
		opacity: markerOpacity
	},
    socialContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 100,
        marginTop: 10
    },
    markerSocialItem: ({randomMargin}) => ({
		margin: `
			${margins[ randomInt(1, 4) ]}px 
			10px 
			${margins[ randomInt(1, 4) ]}px 
			10px
		`,
		opacity: markerOpacity,
		width: 100,
		height: 100
    }),
    socialItem: {
        margin: '0 10px 0 10px',
    },
	promptWrapper: {
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: zIndexHierarchy[1], //sure always be behind the logo and in front of the slide
	}
}));