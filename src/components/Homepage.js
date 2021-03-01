import React from 'react';
import { WeatherDoodle, HomeDoodle } from 'doodles';
import { makeStyles } from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useWindowSize } from 'helpers';


const SwiperUpper = () => {
	const classes = useSwiperStyles();
	return (
	    <div className={classes.root} > ^ </div>
	);
}


export default function HomePage (props) {
	const windowSize = useWindowSize();
	const isMobile = windowSize.width <= 480;
	const classes = useStyles({ windowSize, isMobile });
	
	return (
        <Swiper
			className={classes.container}
            spaceBetween={0}
			slidesPerView={1}
			// navigation
            direction='vertical'
            // pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={(x) => {
				console.log('slide change');
			}}
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
            <SwiperSlide className={classes.slide2}> Slide 2 </SwiperSlide>
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
	slide: ({ windowSize, isMobile }) => ({
		backgroundColor: 'blue',
	}),
	slide2: {
		backgroundColor: 'red'
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