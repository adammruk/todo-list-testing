import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export const renderApp = (Component) => {
  return render(
    <MuiPickersUtilsProvider utils={ DateFnsUtils }>
      <SnackbarProvider>
        <Router>
          { Component }
        </Router>
      </SnackbarProvider>
    </MuiPickersUtilsProvider>
  )
};