import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

export const DeleteTodoDialog = ({ todo, onCancel, onDelete, ...props }) => {
  if (!todo) {
    return null;
  }

  return <Dialog
    maxWidth="xs"
    fullWidth
    open={ !!todo }
    onClose={ onCancel }
    { ...props }
  >
    <DialogTitle id="confirmation-dialog-title">Do you want to delete this todo?</DialogTitle>
    <DialogContent dividers>
      { todo.name }
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