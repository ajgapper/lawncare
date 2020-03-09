import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = {
  breakpoints: ['0px', '600px', '960px', '1280px', '1920px'],   
  fontSizes: ['75%', '100%', '120%', '144%', '172.8%', '207.4%', '248.8%'],
  initialColorMode: 'light',
  useCustomProperties: true,
  palette: {
      background: {
        default: '#2f3644',
      },
      primary: {
          // light: will be calculated from palette.primary.main,
          light: '#656681',
          main: '#2f3644',
          text: '#fff',
          background: '#2f3644',
          active: '#90C03E',
          grey: '#2B2C3E',
          shade: '#f5f5f5',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
    secondary: {
        main: '#89B940',
            // dark: will be calculated from palette.secondary.main,
        contrastText: '#000',
          },
    contrastThreshold: 3,
    tonalOffset: 0.2,
       },
  typography: {
    fontFamily: [
      'Open Sans',
    ].join(','),
  },
  space: [
      '0',
      '0.25rem',
      '0.5rem',
      '0.75rem',
      '1rem',
      '1.25rem',
      '1.5rem',
      '2rem',
      '2.5rem',
      '3rem',
      '4rem',
      '6rem',
      '8rem',
      '12rem',
      '16rem',
    ],
  fontWeights: {
      normal: 400,
      bold: 600,
    },
  sidebar: {
      width: {
        big: '275px',
        normal: '240px',
      },
  height: '100%',
    },
  toolbar: {
      height: {
        big: '150px',
        normal: '120px',
          },
      width: '100%',
    },};

    
    

function App() {
  return (
    <ThemeProvider theme={theme}>...</ThemeProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));