import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/core/styles';

const 

function App() {
  return (
    <StylesProvider jss={jss}>...</StylesProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));