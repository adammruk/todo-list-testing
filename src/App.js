import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import DateFnsUtils from '@date-io/date-fns';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { LoginView } from 'views/Login/LoginView';
import { TodoList } from 'views/TodoList/TodoList';
import { theme } from './theme';
import { ROUTES } from './routes';

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <MuiPickersUtilsProvider utils={ DateFnsUtils }>
        <CssBaseline/>
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
                  exact
                  component={ LoginView }
                />
                <Route
                  path={ ROUTES.APP }
                  exact
                  component={ TodoList }
                />
                <Route path="*">
                  <Redirect to={ ROUTES.LOGIN }/>
                </Route>
              </Switch>
            </Router>
          </Container>
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
