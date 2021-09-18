import { createTheme } from '@material-ui/core/styles';

/**
 * Theme properties
 * Add colors and other mui theme properties here
 * https://material-ui.com/customization/themes/
 */
const fontFamily = '';
const primaryColor = '#039BE4';
const primaryColorLight = '#039BE4';
const primaryColorDark = '#3C4251';
const secondaryColor = '#00577D';
const secondaryColorLight = '#A3BCC3';
const secondaryColorDark = '#3F5360'; //#161E29';
const textColorDark = '#000000';
const textColorLight = '#777';//'#e0e0e0';
const errorColor = '#FF5E5E';
const errorColorLight = '#FFADAD';
const errorColorDark = '#C01717';

export default createTheme({
    mixins: {
        toolbar: {
          '@media (min-width:0px) and (orientation: landscape)': {
            minHeight: 50,
          },
          '@media (min-width:600px)': {
            minHeight: 50
          },
          minHeight: 50,
        }
    },
    palette: {
        primary: {
            light   : primaryColorLight,
            main    : primaryColor,
            dark    : primaryColorDark
        },
        secondary: {
            light   : secondaryColorLight,
            main    : secondaryColor,
            dark    : secondaryColorDark,
        },
        text: {
            primary     : textColorDark,
            secondary   : textColorLight
        },
        error: {
            light   : errorColorLight,
            main    : errorColor,
            dark    : errorColorDark
        }
    },
    typography: {
        fontFamily: `${fontFamily}, Roboto`,
    },
    overrides: {
        /**
         * Sign-Up/Sign-In inputs
         * Get rid of this if you want the input backgrounds to be transparent
         */
        MuiPrivateNotchedOutline: {
            root: {
                backgroundColor: '#fff'
            }
        },
        /**
         * We can uncomment this override if we dont like the !important flags in our AppBars
         */
        // MuiPaper: {
        //     root: {
        //         backgroundColor: 'transparent',
        //         color: 'white'
        //     },
        //     elevation4: {
        //         boxShadow: 'none'
        //     }
        // }
    }
});