import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'dayjs/locale/pt-br'
import { useState } from 'react';
import TextField from '@mui/material/TextField';

interface DateDeliveredProps {
    setDeliveredDate: (value: Date | null) => void
    deliveredDate: Date | null
}

export const DateDelivered = (props:DateDeliveredProps) => {

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ptBR}>
                <DatePicker
                    label={"Data de Entrega"}
                    openTo="day"
                    views={['year', 'month', 'day']}
                    className='TextField'
                    disableFuture={true}
                    value={props.deliveredDate}
                    onChange={(newValue) => {
                        props.setDeliveredDate(newValue);
                    }}
                    renderInput={(params) => <TextField sx={{ width: '60%' }} {...params} />}
                />
            </LocalizationProvider>

        </>
    )
}