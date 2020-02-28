import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

import { colors } from '../../config';

const theme = createMuiTheme({
  spacing: 6,
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: colors.white,
      dark: colors.darkBackground,
    },
    foreground: {
      default: colors.lightForeground,
      dark: colors.darkForeground,
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
    MuiListItem: {
      button: {
        '&:hover': {
          backgroundColor: '#0d131a',
        }
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
