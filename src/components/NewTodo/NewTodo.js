import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from '@material-ui/pickers';
import { Box, Fab as MuiFab, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { indigo, purple } from '@material-ui/core/colors';
import { styled } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const newTodoSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required')
});

const Fab = styled(MuiFab)({
  background: `linear-gradient(to bottom, ${ purple['300'] } 0%, ${ indigo['700'] } 100%);`
});

export const NewTodo = ({ addTodo }) => {
  return (
    <Box pt={ 2 }>
      <Paper>
        <Box p={ 2 }>
          <Formik
            validationSchema={ newTodoSchema }
            initialValues={ { name: '', dueDate: new Date() } }
            onSubmit={ addTodo }
          >
            { props => (
              <form onSubmit={ props.handleSubmit }>
                <Typography variant='h2' align='center'>Todo</Typography>

                <Grid item xs={ 12 }>
                  <TextField
                    error={ props.touched.name && !!props.errors.name }
                    helperText={ props.errors.name }
                    onChange={ props.handleChange }
                    onBlur={ props.handleBlur }
                    value={ props.values.name }
                    margin="normal"
                    fullWidth
                    label="Task name"
                    name="name"
                    disabled={ props.isSubmitting }
                  />
                </Grid>
                <Grid
                  container
                  alignItems="flex-end"
                  justify="space-between"
                >
                  <Grid item>
                    <DatePicker
                      disableToolbar
                      variant="inline"
                      format="dd-MM-yyyy"
                      margin="normal"
                      label="Due date"
                      value={ props.values.dueDate }
                      onChange={ (date) => props.setFieldValue('dueDate', date) }
                      autoOk
                    />
                  </Grid>
                  <Grid item xs={ 2 }>
                    <Box textAlign="center">
                      <Fab color="primary" aria-label="add" disabled={ props.isSubmitting } type='submit'>
                        <AddIcon/>
                      </Fab>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            ) }
          </Formik>
        </Box>
      </Paper>
    </Box>
  )
};