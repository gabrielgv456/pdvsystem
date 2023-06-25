import { forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useMessageBoxContext } from '../contexts/MessageBox/MessageBoxContext';


export function removeNotNumerics(text: string) {
  return (text.replace(/[^0-9]/g, ''))
}

export function cellNumberFormat(text: string, max: string) {
  return text.replace(/[^0-9]/g, '').length === 2 ?
    text.replace(/[^0-9]/g, '').replace(/(\d{2})/g, "($1)")
    :
    text.replace(/[^0-9]/g, '').length === 3 ?
      text.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{1})(\d{*})/g, "($1)$2")
      :
      text.replace(/[^0-9]/g, '').length === 11 ?
        text.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{5})(\d{4})/g, "($1)$2-$3")
        :
        text.replace(/[^0-9]/g, '').length > 11 ?
          max
          :
          text.replace(/[^0-9]/g, '')
}

export function cpfCnpjFormat(text: string, max: string,onlyCpf : boolean = false) {
  return text.replace(/\D/g, '').length === 11 ?
    text.replace(/[^0-9]/g, '')
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
    : text.replace(/\D/g, '').length === 14 ?
      text.replace(/[^0-9]/g, '')
        .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5")
      : text.replace(/[^0-9]/g, '').length > 14 ?
        max
        :
       onlyCpf ? max : text.replace(/[^0-9]/g, '')
}

export function phoneNumberFormat(text: string, max: string) {
  return text.replace(/[^0-9]/g, '').length === 2 ?
    text.replace(/[^0-9]/g, '').replace(/(\d{2})/g, "($1)")
    :
    text.replace(/[^0-9]/g, '').length === 3 ?
      text.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{1})(\d{*})/g, "($1)$2")
      :
      text.replace(/[^0-9]/g, '').length === 10 ?
        text.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{4})(\d{4})/g, "($1)$2-$3")
        :
        text.replace(/[^0-9]/g, '').length > 10 ?
          max
          :
          text.replace(/[^0-9]/g, '')
}

export function cepFormat(text: string, max: string) {
  return text.replace(/[^0-9]/g, '').length === 8 ?
    text.toString().replace(/(\d{5})(\d{3})/g, "$1-$2")
    :
    text.replace(/[^0-9]/g, '').length > 8 ?
      max
      :
      text
}

export function CustomizedSnackbars() {

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const { openError, openInfo, openSuccess, openWarning, message, setOpenError, setOpenInfo, setOpenSuccess, setOpenWarning } = useMessageBoxContext()


  const handleCloseSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };
  const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  const handleCloseWarning = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenWarning(false);
  };

  const handleCloseInfo = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenInfo(false);
  };


  return (
    <Stack spacing={2} sx={{ width: '100%' }}>

      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <Alert onClose={handleCloseSuccess} sx={{ width: '100%' }} severity="success">
          {message}
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <Alert onClose={handleCloseError} sx={{ width: '100%' }} severity="error">
          {message}
        </Alert>
      </Snackbar>

      <Snackbar open={openWarning} autoHideDuration={3000} onClose={handleCloseWarning} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <Alert onClose={handleCloseWarning} sx={{ width: '100%' }} severity="warning">
          {message}
        </Alert>
      </Snackbar>

      <Snackbar open={openInfo} autoHideDuration={3000} onClose={handleCloseInfo} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <Alert onClose={handleCloseInfo} sx={{ width: '100%' }} severity="info">
          {message}
        </Alert>
      </Snackbar>


    </Stack>
  );
}