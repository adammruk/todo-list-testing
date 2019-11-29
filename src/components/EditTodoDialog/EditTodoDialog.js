import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const newTodoSchema = Yup.object().shape({
  name: Yup.string()
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
                margin="normal"
                fullWidth
                label="Task name"
                name="name"
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