import { forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useMessageBoxContext } from '../contexts/MessageBox/MessageBoxContext';


export function removeNotNumerics(text: string) {
  if (!text) { return '' }
  return (text.replace(/[^0-9]/g, ''))
}

export const optionsUF = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"]

export function ReturnData() {
  let data = new Date();
  let day = String(data.getDate()).padStart(2, '0');
  let mes = String(data.getMonth() + 1).padStart(2, '0');
  let year = data.getFullYear();
  const CurrentData = year + '-' + mes + '-' + day;

  return (CurrentData)
}

export function cellNumberFormat(text: string, max?: string) {
  if (!text) { return '' }
  const localMax = text
  const cellNumber = removeNotNumerics(text)
  return cellNumber.length === 2 ?
    cellNumber.replace(/(\d{2})/g, "($1)")
    :
    cellNumber.length === 3 ?
      cellNumber.replace(/(\d{2})(\d{1})(\d{*})/g, "($1)$2")
      :
      cellNumber.length === 11 ?
        cellNumber.replace(/(\d{2})(\d{5})(\d{4})/g, "($1)$2-$3")
        :
        cellNumber.length > 11 ?
          max ?? localMax
          :
          cellNumber
}

export function cpfCnpjFormat(text: string | null, max?: string, onlyCpf: boolean = false): string {
  if (!text) { return '' }
  const localMax = text
  const cpfCnpj = removeNotNumerics(text)
  return text.replace(/\D/g, '').length === 11 ?
    cpfCnpj
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
    : text.replace(/\D/g, '').length === 14 ?
      cpfCnpj
        .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5")
      : cpfCnpj.length > 14 ?
        (max ?? localMax)
        :
        onlyCpf ? (max ?? localMax) : cpfCnpj
}

export function currencyFormat(value: number | null) {
  if (!value) return ''
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function percentFormatIntl(value: number | null) {
  if (!value) return ''
  return new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 100)
}

export function phoneNumberFormat(text: string, max?: string) {
  if (!text) { return '' }
  const localMax = text
  const phoneNumber = removeNotNumerics(text)
  return phoneNumber.length === 2 ?
    phoneNumber.replace(/(\d{2})/g, "($1)")
    :
    phoneNumber.length === 3 ?
      phoneNumber.replace(/(\d{2})(\d{1})(\d{*})/g, "($1)$2")
      :
      phoneNumber.length === 10 ?
        phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/g, "($1)$2-$3")
        :
        phoneNumber.length > 10 ?
          max ?? localMax
          :
          phoneNumber
}

export function cepFormat(text: string, max?: string) {
  if (!text) { return '' }
  const localMax = text
  const cep = removeNotNumerics(text)
  return cep.length === 8 ?
    text.toString().replace(/(\d{5})(\d{3})/g, "$1-$2")
    :
    text.length > 9 ?
      max ?? localMax
      :
      text
}
export function FormatCurrencytoFloatdb(value: string | null) {
  if (!value) { return 0 };
  let formatvalue = value
  formatvalue = formatvalue.replace(/[^\d.-]/g, '')
  formatvalue = formatvalue.replace(/(\d)(\d{2})$/, "$1.$2")
  return (parseFloat(formatvalue))
}

export function strTofixed2Float(value: string | null | undefined) {
  if (!value) return null
  return parseFloat(parseFloat(value).toFixed(2))
}

export function FormatChangePercent(value: string | null) {
  if (!value) { return '' }
  value = value.replace(/[^\d.-]/g, '');
  const valueInt = parseFloat(value)
  if (isNaN(valueInt)) { return value }
  return valueInt.toFixed(2) + ''
}

export function FormatPercent(value: string | null) {
  if (!value) { return '' }
  value = value.replace(/\D/g, "")
  value = value.replace(/(\d)(\d{2})$/, "$1.$2")
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  return value
}


export function currencyRemoveNotNumbers(value: string | null) {
  if (!value) { return '' }
  return value.replace(/[^\d.]/g, '')
}

export function DateFormatWeek(value: string | null) {
  if (!value) return ''
  return new Date(value).toLocaleString('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    weekday: 'long',
  })
}

export function validateCPForCNPJ(cpfCnpj: string): boolean {
  cpfCnpj = removeNotNumerics(cpfCnpj)
  if (cpfCnpj.length === 11)
    return validateCPF(cpfCnpj)
  else if (cpfCnpj.length === 14)
    return validateCNPJ(cpfCnpj)
  else return false
}

function validateCPF(cpf: string): boolean {

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.charAt(9))) {
    return false;
  }

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
}

function validateCNPJ(cnpj: string): boolean {

  if (cnpj.length !== 14) {
    return false;
  }

  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  let soma = 0;
  let peso = 5;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }
  let resto = soma % 11;
  const digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
  if (digitoVerificador1 !== parseInt(cnpj.charAt(12))) {
    return false;
  }

  soma = 0;
  peso = 6;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }
  resto = soma % 11;
  const digitoVerificador2 = resto < 2 ? 0 : 11 - resto;
  if (digitoVerificador2 !== parseInt(cnpj.charAt(13))) {
    return false;
  }
  return true;
}

export const convertToBase64 = (file: File | null): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result.toString());
        } else {
          reject(new Error('Failed to convert to base64'));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    }
  });
};


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