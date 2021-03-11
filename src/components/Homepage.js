import React, {useState, useEffect} from 'react';
import { HomeDoodle, SketchWoot, SketchFruit, SnowyTrees, SnowyTrees2, SketchHands } from 'doodles';
import { makeStyles } from '@material-ui/core';
import { ASketch } from 'components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SKETCH_FRUIT from 'assets/sketches/fruit.png';
import SKETCH_HANDS from 'assets/sketches/hands.png';
import SKETCH_WOOT from 'assets/sketches/woot.png';
import clsx from 'clsx';
import {
	useEventListener,
    useWindowSize
} from 'helpers';


export default function HomePage (props) {
	const [DOMReady, setDOMReady] = useState(false);
	const [isTransitioning, setTransitioning] = useState(false);
	const windowSize = useWindowSize();
	const isMobile = windowSize.width <= 480;
	const showVerticalNavigation = false;
	const showHorizontalNavigation = isMobile ? false : true;
	const classes = useStyles({ windowSize, isMobile });

	// Listens for dom ready - can use SVGs
	useEventListener('load', function() {
		setDOMReady(true);
	});

	// Code that runs on DOMReady should go here
	useEffect(() => {
		console.log("DOMReady:", DOMReady)
	}, [DOMReady]);

	const handleSlideChangeTransitionStart = () => {
		setTransitioning(true);
	};
	
	const handleSlideChangeTransitionEnd = () => {
		setTransitioning(false);
	};
	
	return (
        <Swiper
			className={classes.swiperContainer}
            spaceBetween={0}
			slidesPerView={1}
            direction='vertical'
			navigation={showVerticalNavigation}
			scrollbar={{ draggable: true }}
			grabCursor
			autoHeight
			onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
			onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
        >
            <SwiperSlide className={ clsx(classes.slide) }>
				{({ isActive }) => (
					<HomeDoodle
						isTransitioning={isTransitioning}
						isActive={isActive}
						isMobile={isMobile}
					/>
				)}
			</SwiperSlide>
			<SwiperSlide className={ clsx(classes.slide) }> 
				{({ isActive }) => (
					isActive && 
					<Swiper
						navigation={showHorizontalNavigation}
						spaceBetween={0}
						slidesPerView={1}
					>
						<SwiperSlide className={ clsx(classes.slide, classes.snowyTreesSlide) }>
							<SnowyTrees isActive={isActive} isMobile={isMobile} />
						</SwiperSlide>
						<SwiperSlide className={ clsx(classes.slide, classes.snowyTreesSlide) }>
							<SnowyTrees2 isActive={isActive} isMobile={isMobile} />
						</SwiperSlide>
					</Swiper>
				)}
			</SwiperSlide>
            <SwiperSlide className={classes.sketchSlide}>
				<Swiper
					navigation={showHorizontalNavigation}
					spaceBetween={50}
					slidesPerView={1}
				>
					<SwiperSlide className={clsx(classes.slide, classes.sketchSlide) }>
						<ASketch date={'3/08/20'} SKETCH={SKETCH_WOOT} />
					</SwiperSlide>
					<SwiperSlide className={clsx(classes.slide, classes.sketchSlide) }>
						<ASketch date={'3/09/20'} SKETCH={SKETCH_HANDS} />
					</SwiperSlide>
					<SwiperSlide className={clsx(classes.slide, classes.sketchSlide) }>
						<ASketch date={'3/10/20'} SKETCH={SKETCH_FRUIT} />
					</SwiperSlide>
				</Swiper>
			</SwiperSlide>
			<SwiperSlide className={classes.slide}> Slide 3 </SwiperSlide>
			<SwiperSlide className={classes.slide}> Slide 4 </SwiperSlide>
			<SwiperSlide className={classes.slide}> Slide 5 </SwiperSlide>
		</Swiper>
	)
}

const useStyles = makeStyles(theme => ({
	container: ({ windowSize }) => {
		return {
			width: '100%',
      		height: '100%',
		}
	},
	swiperContainer: {
		height: '100%'
	},
	slide: ({ windowSize, isMobile }) => ({
		width: '100%',
		height: '100%',
		overflow: 'hidden'
	}),
	snowyTreesSlide: {
		backgroundColor: '#cecdce'
	},
	sketchSlide: {
		backgroundColor: 'white',
	},
	swiperUpper: {
		backgroundColor: 'pink',
		width: 100,
		height: 100,
		position: 'absolute',
		bottom: 0
	}
}));