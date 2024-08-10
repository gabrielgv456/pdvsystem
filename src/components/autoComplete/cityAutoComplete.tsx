import Autocomplete from '@mui/material/Autocomplete';
import { CityStateType } from '../../pages/PeopleRegistration/Clients/Modals/addEditClient/interfaces';
import { Dispatch, SetStateAction, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useMessageBoxContext } from '../../contexts/MessageBox/MessageBoxContext';
import { useApi } from '../../hooks/useApi';

type CityAutoCompleteProps = {
    selectedCity: CityStateType | null,
    setSelectedCity: Dispatch<SetStateAction<CityStateType | null>>
    citiesOptions: CityStateType[] | null
    setCitiesOptions: Dispatch<SetStateAction<CityStateType[] | null>>
    widthPercent: number
    size: 'small' | 'medium'
}

export const CityAutoComplete = ({ citiesOptions, selectedCity, setCitiesOptions, setSelectedCity, widthPercent, size }: CityAutoCompleteProps) => {


    const { MessageBox } = useMessageBoxContext()
    const { getCities } = useApi()
    async function handleSelectCity(newValue: CityStateType | null) {
        setSelectedCity(newValue)
    }

    async function handleGetCities(city: string | null) {
        try {
            const response = await getCities(city)
            if (!response.Success) throw new Error(response.erro ?? 'Erro desconhecido')
            setCitiesOptions(response.cities)
        } catch (error) {
            MessageBox('error', (error as Error).message)
        }
    }

    return (

        <Autocomplete
            value={selectedCity}
            onChange={(event: any, newValue: CityStateType | null) => {
                handleSelectCity(newValue)
            }}
            noOptionsText="Não encontrado"
            id="controllable-states-demo"
            size={size}
            options={citiesOptions ?? []}
            getOptionLabel={(option) => (
                option.name + ' - ' + option.state.uf
            )}
            sx={{ width: widthPercent + '%' }}
            renderInput={(params) =>
                <TextField
                    {...params}
                    label="Cidade"
                    onChange={(e) => { handleGetCities(e.target.value) }}
                />
            } />
    )
}