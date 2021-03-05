import React from 'react';
import { WeatherDoodle, HomeDoodle } from 'doodles';
import { makeStyles } from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useWindowSize } from 'helpers';


const SwiperUpper = () => {
	const classes = useSwiperStyles();
	return (
		<div className={classes.root} > ^  </div>
	);
}


export default function HomePage (props) {
	const windowSize = useWindowSize();
	const isMobile = windowSize.width <= 480;
	const showVerticalNavigation = false;
	const showHorizontalNavigation = false;
	const classes = useStyles({ windowSize, isMobile });
	
	return (
        <Swiper
			className={classes.container}
            spaceBetween={0}
			slidesPerView={1}
            direction='vertical'
			navigation={showVerticalNavigation}
            // pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}
			grabCursor
            // onSwiper={(swiper) => console.log(swiper)}
        >
            {/* <SwiperSlide className={classes.slide}>
            	<WeatherDoodle />
				<SwiperUpper />
            </SwiperSlide> */}
            <SwiperSlide className={classes.slide}>
			{({ isActive }) => (
				<HomeDoodle isActive={isActive} isMobile={isMobile} />
			)}
			</SwiperSlide>
            <SwiperSlide className={classes.slide2}>
				<Swiper
					navigation={showHorizontalNavigation}
					className={classes.swiperContainer}
					spaceBetween={50}
					slidesPerView={1}
				>
					<SwiperSlide className={classes.slide2}> Slide 1a </SwiperSlide>
					<SwiperSlide className={classes.slide}> Slide 1b </SwiperSlide>
					<SwiperSlide className={classes.slide2}> Slide 1c </SwiperSlide>
					<SwiperSlide className={classes.slide}> Slide 1d </SwiperSlide>
				</Swiper>
			</SwiperSlide>
			<SwiperSlide className={classes.slide}> Slide 3 </SwiperSlide>
			<SwiperSlide className={classes.slide2}> Slide 4 </SwiperSlide>
			<SwiperSlide className={classes.slide}> Slide 5 </SwiperSlide>
		</Swiper>
	)
}

const useStyles = makeStyles(theme => ({
	container: ({ windowSize }) => {
		return {
			height: '100vh'
		}
	},
	swiperContainer: {
		height: '100%'
	},
	slide: ({ windowSize, isMobile }) => ({
		backgroundColor: 'blue',
	}),
	slide2: {
		backgroundColor: 'red',
	},
	swiperUpper: {
		backgroundColor: 'pink',
		width: 100,
		height: 100,
		position: 'absolute',
		bottom: 0
	}
}))

const useSwiperStyles = makeStyles(theme => ({
	root: {
		backgroundColor: 'pink',
		width: 100,
		height: 100,
		position: 'absolute',
		bottom: 0,
		left: 'calc(50vw - 50px)',
		textAlign: 'center',
		cursor: 'grab' // or 'grabbing'
	}
}))