import React, {useState, useEffect, useRef, useCallback} from 'react';
import { HomeDoodle, RipplesDoodle, RainDoodle, FollowDoodle, FlockDoodle } from 'doodles';
import { makeStyles } from '@material-ui/core';
import { ASketch } from 'components';
import { Swiper, SwiperSlide } from 'swiper/react';
import lottie from 'lottie-web';
// import SKETCH_FRUIT from 'assets/sketches/fruit.png';
// import SKETCH_HANDS from 'assets/sketches/hands.png';
// import SKETCH_WOOT from 'assets/sketches/woot.png';
// import SKETCH_AFRICAN from 'assets/sketches/african.png';
// import SKETCH_BBALL from 'assets/sketches/bball.gif';
// import SKETCH_DRFENSTER from 'assets/sketches/drfenster.png';
// import SKETCH_MARVELOUS from 'assets/sketches/marvelous.png';
// import SNOWY_TREES2_MOV from 'assets/snowyTrees2/snowyTrees2.mp4';
// import SNOWY_TREES2_GIF from 'assets/snowyTrees2/snowyTrees2.gif';
// import SNOWY_TREES_MOV from 'assets/snowyTrees/snowy_trees.mp4';
// import SNOWY_TREES_GIF from 'assets/snowyTrees/snowy_trees.gif';
import {
	useEventListener,
    useWindowSize
} from 'helpers';
import MOBILE_TAP from 'assets/lottie_animations/mobile_tap_temp.json';
import DESKTOP_TAP from 'assets/lottie_animations/desktop_click_temp.json';

let animObject;

function ActionPrompt ({ classes, isMobile, togglePrompt, display }) {
	/** Refs */
	const animationRef = useRef(null);

	console.log("display", display)

	useEffect(() => {
		if (animObject) animObject.destroy();
		animObject = lottie.loadAnimation({
			renderer: 'svg',
			autoPlay: true,
			loop: true,
			container: animationRef.current,
			name: isMobile ? "mobile_tap" : "desktop_click", // Name for future reference. Optional.
			animationData: isMobile ? MOBILE_TAP : DESKTOP_TAP,
		});
	}, [isMobile]);

	return (
		<div className={classes.actionWrapper}>
			<div
				style={{display: display ? 'block' : 'none'}}
				onClick={e => togglePrompt()}
				id="action-prompt"
				className={classes.actionAnimation}
				ref={ animationRef }
			/>
		
			{
				!display && 
				<div
					onClick={e => togglePrompt()}
					id="action-exit"
					className={classes.actionExit}
				>
					<svg viewBox="0 0 20 20">
						<path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
					</svg>
				</div>
			}
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
	const classes = useStyles({ windowSize, isMobile });

	useEffect(() => {
		setIsMobile(windowSize.width <= 480)
	}, [windowSize]);
	

	const handleSlideChangeTransitionStart = () => {
		setTransitioning(true);
	};
	
	const handleSlideChangeTransitionEnd = () => {
		setTransitioning(false);
	};

	const toggleActivateSlide = useCallback(() => {
		console.log("allowSlide", allowSlide)
		setAllowSlide(!allowSlide)
		setShowLogo(!showLogo)
		setShowNav(!showNav) 
	}, [allowSlide, showLogo, showNav])

	return (
		true && (
        <Swiper
			className={classes.swiperContainer}
            spaceBetween={0}
			slidesPerView={1}
            direction='vertical'
			navigation={isMobile ? true : true}
			allowTouchMove={true}
			allowSlideNext={allowSlide}
			allowSlidePrev={allowSlide}
			scrollbar={{ draggable: isMobile ? false : false }}
			// grabCursor
			onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
			onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
        >
			{/* SKETCH: Home Page Doodle (desk animation project) */}
            <SwiperSlide className={classes.homeSlide} >
				{({ isActive }) => (
					<>
					<ActionPrompt
						classes={classes}
						display={showNav}
						togglePrompt={e => toggleActivateSlide()}
						isMobile={isMobile}
					/>
					<HomeDoodle
						isTransitioning={isTransitioning}
						isActive={isActive}
						isMobile={isMobile}
					/>
					</>
				)}
			</SwiperSlide>

			{/* SKETCH: Rain Drops (2D raindrops) */}
            <SwiperSlide className={classes.homeSlide} >
				{({ isActive }) => (
					<RipplesDoodle
						isTransitioning={isTransitioning}
						isActive={isActive}
						isMobile={isMobile}
					/>
				)}
			</SwiperSlide>

			{/* SKETCH: Raindrops (3d Raindrops) */}
            {/* <SwiperSlide className={classes.homeSlide} >
				{({ isActive }) => (
					<RainDoodle
						isTransitioning={isTransitioning}
						isActive={isActive}
						isMobile={isMobile}
					/>
				)}
			</SwiperSlide> */}
			
			{/* SKETCH: Duck Project? */}
			{/* <SwiperSlide className={classes.homeSlide} >
				{({ isActive }) => (
					<FollowDoodle
						isTransitioning={isTransitioning}
						isActive={isActive}
						isMobile={isMobile}
					/>
				)}
			</SwiperSlide> */}
			
			{/* SKETCH: Flock Project */}
			{/* <SwiperSlide className={classes.homeSlide} >
				{({ isActive }) => (
					<FlockDoodle
						isTransitioning={isTransitioning}
						isActive={isActive}
						isMobile={isMobile}
					/>
				)}
			</SwiperSlide> */}
			
			{/* Static Images */}
			{/* <SwiperSlide>
				<Swiper
					className={classes.swiperContainer}
					navigation={showHorizontalNavigation}
					spaceBetween={50}
					slidesPerView={1}
				>
					<SwiperSlide>
						<ASketch type={'image'} date={'3/14/20'} SKETCH={SKETCH_DRFENSTER} />
					</SwiperSlide>
					<SwiperSlide>
						<ASketch type={'image'} date={'3/13/20'} SKETCH={SKETCH_MARVELOUS} />
					</SwiperSlide>
					<SwiperSlide>
						<ASketch type={'gif'} date={'3/12/20'} SKETCH={SKETCH_BBALL} />
					</SwiperSlide>
					<SwiperSlide>
						<ASketch type={'image'} date={'3/11/20'} SKETCH={SKETCH_AFRICAN} />
					</SwiperSlide>
					<SwiperSlide>
						<ASketch type={'image'} date={'3/10/20'} SKETCH={SKETCH_HANDS} />
					</SwiperSlide>
					<SwiperSlide>
						<ASketch type={'image'} date={'3/09/20'} SKETCH={SKETCH_FRUIT} />
					</SwiperSlide>
					<SwiperSlide>
						<ASketch type={'image'} date={'3/08/20'} SKETCH={SKETCH_WOOT} />
					</SwiperSlide>
				</Swiper>
			</SwiperSlide> */}
			
			{/* Animations */}
			{/* <SwiperSlide> 
				{({ isActive }) => (
					isActive && 
					<Swiper
						className={classes.swiperContainer}
						navigation={showHorizontalNavigation}
						spaceBetween={0}
						slidesPerView={1}
					>
						<SwiperSlide>
							<ASketch
								type={isMobile ? 'gif' : 'video'}
								date={'3/07/20'}
								SKETCH={isMobile ? SNOWY_TREES2_GIF : SNOWY_TREES2_MOV}
							/>
						</SwiperSlide>
						<SwiperSlide>
							<ASketch
								type={isMobile ? 'gif' : 'video'}
								date={'3/06/20'}
								SKETCH={isMobile ? SNOWY_TREES_GIF : SNOWY_TREES_MOV}
							/>
						</SwiperSlide>
					</Swiper>
				)}
			</SwiperSlide> */}

			{/* Extra blank Slides  */}
			{/* <SwiperSlide className={classes.slide}> Slide 3 </SwiperSlide> */}
			{/* <SwiperSlide className={classes.slide}> Slide 4 </SwiperSlide> */}
			{/* <SwiperSlide className={classes.slide}> Slide 5 </SwiperSlide> */}
		</Swiper>
		)
	)
}

const useStyles = makeStyles(theme => ({
	homeSlide: {
		overflow: 'hidden'
	},
	swiperContainer: {
		height: '100%',
		overflow: 'hidden'
	},
	slide: ({ windowSize, isMobile }) => ({
		width: '100%',
		height: '100%',
		overflow: 'hidden'
	}),
	snowyTreesSlide: {
		backgroundColor: '#cecdce'
	},
	actionWrapper: ({isActive}) => ({
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 1,
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
		height: 50,
		width: 50,
	})
}));