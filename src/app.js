import React from 'react';
import Routes from './Routes.js';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';

export default function App() {
  return (
    <MuiThemeProvider theme={theme}> 
      <Routes />
    </MuiThemeProvider>
  );
}