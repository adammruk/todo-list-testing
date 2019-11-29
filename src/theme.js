import { grey, indigo, purple, red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: red
  },
  overrides: {
    MuiTypography: {
      root: {
        color: grey['800']
      },
      h4: {
        color: 'white'
      }
    },
    MuiCssBaseline: {
      '@global': {
        body: {
          background: `linear-gradient(to bottom, ${ purple['300'] } 0%, ${ indigo['700'] } 100%);`,
          minHeight: '100vh'
        }
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: 'white'
      }
    }
  }
});
