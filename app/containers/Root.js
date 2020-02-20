import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '../styles/theme';
import { App } from './App';

class Root extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );
  }
}

export default hot(Root);
