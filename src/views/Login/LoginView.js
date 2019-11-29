import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik } from 'formik';
import { object } from 'prop-types';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { apiClient } from 'api/api';
import { ROUTES } from 'routes';
import { useSnackbar } from 'utils/useSnackbar/useSnackbar';

const useStyles = makeStyles(({ spacing, palette }) => ({
  paper: {
    marginTop: spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: spacing(1),
    backgroundColor: palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: spacing(1)
  },
  submit: {
    margin: spacing(3, 0, 2)
  }
}));

const propTypes = {
  api: object
};

const defaultProps = {
  api: apiClient
};

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

export const LoginView = ({ api }) => {
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbar();
  const history = useHistory();
  const handleSubmit = useCallback(async ({ email, password }, actions) => {
      try {
        await api.login({ email, password });
        showSuccessSnackbar('Welcome back!');
        history.push(ROUTES.APP)
      } catch (error) {
        if (error.code === 401) {
          showErrorSnackbar('Invalid username or password');
          actions.setValues({ email, password: '' })
        } else {
          showErrorSnackbar('Unexpected error. Try again later.');
        }
      } finally {
        actions.setSubmitting(false);
      }
    },
    [showSuccessSnackbar, showErrorSnackbar, history, api]
  );

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={ classes.paper }>
        <Avatar className={ classes.avatar }>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          validationSchema={ loginSchema }
          initialValues={ { email: 'todo@test.com', password: 'password' } }
          onSubmit={ handleSubmit }
        >
          { props => (
            <form onSubmit={ props.handleSubmit } className={ classes.form }>
              <TextField
                error={ props.touched.email && !!props.errors.email }
                helperText={ props.errors.email }
                onChange={ props.handleChange }
                onBlur={ props.handleBlur }
                value={ props.values.email }
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                autoFocus
              />
              <TextField
                error={ props.touched.password && !!props.errors.password }
                helperText={ props.errors.password }
                onChange={ props.handleChange }
                onBlur={ props.handleBlur }
                value={ props.values.password }
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={ classes.submit }
                disabled={ props.isSubmitting }
              >
                Sign In
              </Button>
              <Box textAlign="center">
                { props.isSubmitting && <CircularProgress size={ 20 }/> }
              </Box>
            </form>
          ) }
        </Formik>
      </div>
    </Container>
  )
};

LoginView.propTypes = propTypes;
LoginView.defaultProps = defaultProps;