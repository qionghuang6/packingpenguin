import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#4facfe',
    },
    secondary: {
      main: '#FF8E53', //'#ffbd53', //'#00f2fe',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiInputBase: {
      root: {
        '&:hover': {
          background: '#eefcff33', //'rgba(238, 252, 255, 0.3)'
        },
      },
    },
  },
  props: {
    MuiInput: {
      disableUnderline: true
    },
  },
});

export default theme;
