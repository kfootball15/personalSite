import React from 'react';
import Routes from './Routes.js';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  );
}