import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'dayjs/locale/pt-br'
import { useState } from 'react';
import TextField from '@mui/material/TextField';

export const DateDelivered = () => {

    const [deliveredDate,setDeliveredDate] = useState<Date|null>(new Date())

    return (
        <>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBR}>
                    <DatePicker
                        label={"Data de Entrega"}
                        openTo="day"
                        views={['year', 'month', 'day']}
                        className='TextField'
                        disableFuture={true}
                        value={deliveredDate}
                        onChange={(newValue) => {
                            setDeliveredDate(newValue);
                        }}
                        renderInput={(params) => <TextField  sx={{ width: '60%' }} {...params} />}
                    />
                </LocalizationProvider>

        </>
    )
}