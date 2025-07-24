import { enqueueSnackbar as baseEnqueueSnackbar, type SnackbarMessage } from 'notistack';

let useSnackbarRef: typeof baseEnqueueSnackbar;

export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = baseEnqueueSnackbar;
  return null;
};

export const SnackbarUtils = {
  success(msg: SnackbarMessage) {
    useSnackbarRef?.(msg, { variant: 'success' });
  },
  error(msg: SnackbarMessage) {
    useSnackbarRef?.(msg, { variant: 'error' });
  },
  warning(msg: SnackbarMessage) {
    useSnackbarRef?.(msg, { variant: 'warning' });
  },
  info(msg: SnackbarMessage) {
    useSnackbarRef?.(msg, { variant: 'info' });
  },
};
