import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from '@material-ui/pickers';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

const newTodoSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required')
});

export const EditTodoDialog = ({ todo, onCancel, onSave, ...props }) => {
  const formik = useFormik({
    initialValues: {
      name: todo ? todo.name : ''
    },
    validationSchema: newTodoSchema,
    enableReinitialize: true,
    onSubmit: onSave
  });

  return <Dialog
    maxWidth="xs"
    fullWidth
    onClose={ onCancel }
    open={ !!todo }
    { ...props }
  >
    <DialogTitle id="confirmation-dialog-title">Edit todo</DialogTitle>
    <DialogContent dividers>
      <form onSubmit={ formik.handleSubmit }>
        <TextField
          error={ formik.touched.name && !!formik.errors.name }
          helperText={ formik.errors.name }
          onChange={ formik.handleChange }
          onBlur={ formik.handleBlur }
          value={ formik.values.name }
          fullWidth
          label="Task name"
          name="name"
        />

        <DatePicker
          disableToolbar
          variant="inline"
          format="dd-MM-yyyy"
          margin="normal"
          label="Due date"
          value={ formik.values.dueDate }
          onChange={ (date) => formik.setFieldValue('dueDate', date) }
          fullWidth
          autoOk
        />
      </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={ onCancel } color="primary" disabled={ formik.isSubmitting }>
        Cancel
      </Button>
      <Button onClick={ () => formik.submitForm() } color="primary" disabled={ formik.isSubmitting }>
        Save
      </Button>
    </DialogActions>
  </Dialog>
};