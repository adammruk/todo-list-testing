import { useSnackbar as useNotistackSnackbar } from 'notistack';

export const useSnackbar = () => {
  const { enqueueSnackbar } = useNotistackSnackbar();

  const showDefaultSnackbar = (message) => {
    enqueueSnackbar(message, {
      variant: 'default'
    });
  };

  const showErrorSnackbar = (message) => {
    enqueueSnackbar(message, {
      variant: 'error'
    });
  };

  const showSuccessSnackbar = (message) => {
    enqueueSnackbar(message, {
      variant: 'success'
    });
  };

  return {
    showDefaultSnackbar,
    showErrorSnackbar,
    showSuccessSnackbar
  }
};