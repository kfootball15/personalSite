import React from 'react';
import { makeStyles} from '@material-ui/core';
import { SocialIcon as SocialIconProfessional } from 'react-social-icons';
import { randomInt } from 'helpers';
// import LOGO_TEXT_SVG from 'assets/home/logo_text.svg'; // Clean Text
import MARKER_LOGO_TEXT_SVG from 'assets/logo.svg'; // Marker Text
// import TWITTER from 'assets/social/social_twitter.svg';
// import EMAIL from 'assets/social/social_email.svg';
// import LINKEDIN from 'assets/social/social_li.svg';
import READING from 'assets/social/social_reading.svg';
import MUSIC from 'assets/social/social_music.svg';
import GITHUB from 'assets/social/social_github.svg';
import MAP from 'assets/social/social_map.svg';


// const twitter = "https://twitter.com/menshguy";
const github = "https://github.com/menshguy";
const email = "mailto:fenster.js@gmail.com";
const linkedIn = "https://www.linkedin.com/in/jeff-fenster";
const map = "https://goo.gl/maps/SqMswZ82YL9TwoWYA";
const reading = "";
const music = "";

export default function Logo ({ isProfessionalSite }) {
	
    const classes = useStyles()

	if (isProfessionalSite) return (
		<>
		{/* Clean Logo */}
		<h1
			className={ classes.logoProfessional }
			id="logo"
			aria-label="logo"
			aria-required="true"
		>
			FENSTER.
		</h1> 

		{/* Clean Icons */}
		<div className={ classes.socialContainer }>
			<SocialIconProfessional target="_blank" className={classes.socialIconProfessional} url={github} />
			<SocialIconProfessional target="_blank" className={classes.socialIconProfessional} url={email} />
			<SocialIconProfessional target="_blank" className={classes.socialIconProfessional} url={linkedIn} />
			{/* <SocialIconProfessional target="_blank" className={classes.socialIconProfessional} url={twitter} /> */}
			{/* <SocialIconProfessional target="_blank" className={classes.socialIconProfessional} url={map} /> */}
			{/* <SocialIconProfessional target="_blank" className={classes.socialIconProfessional} url={reading} /> */}
			{/* <SocialIconProfessional target="_blank" className={classes.socialIconProfessional} url={music} /> */}
		</div>
		</>
	)
	
    return (
        <>
		{/* Marker Logo */}
		<object
			className={ classes.logoPersonal }
			id="logo"
			data={ MARKER_LOGO_TEXT_SVG }
			// data={ LOGO_TEXT_SVG } // For clean text
			aria-label="logo"
			aria-required="true"
			type="image/svg+xml"
		>
			MENSH
		</object>

		{/* Marker Icons */}
		<div className={ classes.socialContainer }>
			{/* <SocialIconPersonal src={TWITTER} url={twitter} target="_blank" classes={classes.socialIconPersonal} /> */}
			{/* <SocialIconPersonal src={EMAIL} url={twitter} target="_blank" classes={classes.socialIconPersonal} /> */}
			{/* <SocialIconPersonal src={LINKEDIN} url={linkedIn} target="_blank" classes={classes.socialIconPersonal} /> */}
			<SocialIconPersonal src={READING} url={reading} target="_blank" classes={classes.socialIconPersonal} />
			<SocialIconPersonal src={MUSIC} url={music} target="_blank" classes={classes.socialIconPersonal} /> 
			<SocialIconPersonal src={GITHUB} url={github} target="_blank" classes={classes.socialIconPersonal} />
			<SocialIconPersonal src={MAP} url={map} target="_blank" classes={classes.socialIconPersonal} />
		</div>
        </>
    )
}

function SocialIconPersonal ({ classes, url, src, ...props }) {
	return (
		<a className={classes} href={url} {...props} >
			<img src={src} />
		</a>
	)
}


const markerOpacity = 0.6;
const margins = [0, 5, 10, 4];
const useStyles = makeStyles(theme => ({
	logoPersonal: {
		opacity: markerOpacity
	},
	logoProfessional: {
		color: 'wheat',
		fontSize: 80,
		margin: 0
	},
    socialContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        zIndex: 100,
        marginTop: 10
    },
    socialIconPersonal: {
		margin: `
			${margins[ randomInt(1, 4) ]}px 
			20px 
			${margins[ randomInt(1, 4) ]}px 
			0
		`,
		opacity: markerOpacity,
		width: 100,
		height: 100
    },
    socialIconProfessional: {
        margin: '0 20px 0 0px',
    },
}));