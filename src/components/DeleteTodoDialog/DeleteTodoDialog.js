import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

export const DeleteTodoDialog = ({ todo, onCancel, onDelete, ...props }) => {
  return <Dialog
    maxWidth="xs"
    fullWidth
    open={ !!todo }
    onClose={ onCancel }
    { ...props }
  >
    <DialogTitle id="confirmation-dialog-title">Do you want to delete this todo?</DialogTitle>
    <DialogContent dividers>
      { todo && todo.name }
    </DialogContent>
    <DialogActions>
      <Button onClick={ onCancel } color="primary">
        Cancel
      </Button>
      <Button onClick={ onDelete } color="secondary">
        delete
      </Button>
    </DialogActions>
  </Dialog>
};