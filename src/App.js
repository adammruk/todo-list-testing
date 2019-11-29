import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ROUTES } from './routes';
import { LandingPage } from 'views/LandingPage/LandingPage';
import { LoginView } from 'views/Login/LoginView';
import { TodoList } from 'views/TodoList/TodoList';
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from 'theme';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <MuiPickersUtilsProvider utils={ DateFnsUtils }>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={ 3 }
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'center'
        } }
      >
        <Container maxWidth="sm">
          <Router>
            <Switch>
              <Route
                path={ ROUTES.LOGIN }
                exact={ true }
                component={ LoginView }
              />
              <Route
                path={ ROUTES.ROOT }
                exact={ true }
                component={ LandingPage }
              />
              <Route
                path={ ROUTES.APP }
                exact={ true }
                component={ TodoList }
              />
            </Switch>
          </Router>
        </Container>
      </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
