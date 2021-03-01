import React from 'react';
import { WeatherDoodle, HomeDoodle } from 'doodles';
import { makeStyles } from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import lottie from 'lottie-web';


const SwiperUpper = () => {
	const classes = useSwiperStyles();
	return (
	    <div className={classes.root} > ^ </div>
	);
}


export default function HomePage (props) {
	const classes = useStyles();
	return (
        // <div className={classes.wrapper}>
        <Swiper
			className={classes.wrapper}
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
				<HomeDoodle isActive={isActive} />
			)}
			</SwiperSlide>
            <SwiperSlide className={classes.slide2}> Slide 2 </SwiperSlide>
			<SwiperSlide className={classes.slide}> Slide 3 </SwiperSlide>
			<SwiperSlide className={classes.slide2}> Slide 4 </SwiperSlide>
			<SwiperSlide className={classes.slide}> Slide 5 </SwiperSlide>
		</Swiper>
        // </div>
	)
}

const useStyles = makeStyles(theme => ({
	wrapper: {
		height: '100vh'
	},
	slide: {
		backgroundColor: 'blue'
	},
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