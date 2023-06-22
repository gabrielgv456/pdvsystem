import {forwardRef} from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useMessageBoxContext } from '../contexts/MessageBox/MessageBoxContext';


const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {

  const {openError,openInfo,openSuccess,openWarning,message,setOpenError,setOpenInfo,setOpenSuccess,setOpenWarning} = useMessageBoxContext()


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

  const handleCloseWarning= (event?: React.SyntheticEvent | Event, reason?: string) => {
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

      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess}  anchorOrigin={ {horizontal:'right',vertical:'bottom'} }>
        <Alert onClose={handleCloseSuccess} sx={{ width: '100%' }} severity="success">
          {message}
        </Alert>
      </Snackbar>

      <Snackbar open={openError}  autoHideDuration={3000} onClose={handleCloseError} anchorOrigin={ {horizontal:'right',vertical:'bottom'} }>
        <Alert onClose={handleCloseError} sx={{ width: '100%' }} severity="error">
            {message}
        </Alert>
      </Snackbar>

      <Snackbar open={openWarning} autoHideDuration={3000} onClose={handleCloseWarning}  anchorOrigin={ {horizontal:'right',vertical:'bottom'} }>  
        <Alert onClose={handleCloseWarning} sx={{ width: '100%' }} severity="warning">
            {message}
        </Alert>
      </Snackbar>

      <Snackbar open={openInfo} autoHideDuration={3000} onClose={handleCloseInfo}  anchorOrigin={ {horizontal:'right',vertical:'bottom'} }>  
        <Alert onClose={handleCloseInfo} sx={{ width: '100%' }} severity="info">
            {message}
        </Alert>
      </Snackbar>

      
    </Stack>
  );
}