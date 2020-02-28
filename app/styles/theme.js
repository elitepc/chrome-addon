import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  spacing: 6,
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      dark: '#0f1720',
    },
    foreground: {
      default: '#101820',
      dark: '#878b8f',
    },
  },
  typography: {
    fontFamily: ['Work Sans', 'Arial', 'sans-serif'].join(','),
  },
  overrides: {
    MuiListSubheader: {
      root: {
        color: '#878b8f'
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'rgba(255, 255, 255, 0.54)',
      },
    },
  },
});

export default theme;
