import { useState, useContext, useEffect, DragEvent, ChangeEvent } from 'react';
import * as S from './style'
import TextField from '@mui/material/TextField';
import axios from 'axios';

import { Divider } from "@mui/material";
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useApi } from '../../../../hooks/useApi';
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { cellNumberFormat, cepFormat, convertToBase64, cpfCnpjFormat, optionsUF, phoneNumberFormat, removeNotNumerics } from '../../../../utils/utils';
import { User } from '../../../../types/User';
import { editUserTypeReq } from '../../../../interfaces/useApi/editUserTypeReq';
import { CityStateType } from '../../../PeopleRegistration/Clients/Modals/addEditClient/interfaces';
import { CityAutoComplete } from '../../../../components/autoComplete/cityAutoComplete';
import { CircularProgressSpinner } from 'src/spinners/progress/CircularProgressSpinner';


export const TabMyProfile = () => {

    useEffect(() => {
        const searchAboutCorporation = async () => {
            try {
                const dataFindAboutCorporation = await findAboutCorporation(auth.idUser)
                if (!dataFindAboutCorporation.Success) { throw new Error(dataFindAboutCorporation.erro) }
                const { resultAboutCorporation } = dataFindAboutCorporation
                setDataProfile({
                    name: resultAboutCorporation.name,
                    cnpj: resultAboutCorporation.cnpj,
                    email: resultAboutCorporation.email,
                    fantasyName: resultAboutCorporation.fantasyName,
                    ie: resultAboutCorporation.ie,
                    phone: phoneNumberFormat(resultAboutCorporation.phone ?? ''),
                    cellPhone: cellNumberFormat(resultAboutCorporation.cellPhone ?? ''),
                    addressId: resultAboutCorporation.addressRelation?.id ?? null,
                    addressCep: cepFormat(resultAboutCorporation.addressRelation?.addressCep ?? ''),
                    addressCityId: resultAboutCorporation.addressRelation?.city.id ?? null,
                    addressNeighborhood: resultAboutCorporation.addressRelation?.addressNeighborhood ?? null,
                    addressNumber: resultAboutCorporation.addressRelation?.addressNumber ?? null,
                    addressStreet: resultAboutCorporation.addressRelation?.addressStreet ?? null,
                    storeId: auth.idUser
                })
                if (resultAboutCorporation.addressRelation?.city.ibge) {
                    const city = await handleGetCitiesIbge(resultAboutCorporation.addressRelation?.city.ibge)
                    if (city) setSelectedCity(city[0])
                }
            } catch (error) {
                MessageBox('warning', 'Ocorreu uma falha ao buscar as informações cadatrarais! ' + (error as Error).message)
            } finally {
                setIsLoading(false)
            }

        }
        searchAboutCorporation()
    }, [])

    const [isLoading, setIsLoading] = useState(true)
    const [dataProfile, setDataProfile] = useState<editUserTypeReq>({} as editUserTypeReq)
    const [citiesOptions, setCitiesOptions] = useState<CityStateType[] | null>(null)
    const [selectedCity, setSelectedCity] = useState<CityStateType | null>(null)
    const [actualPass, setActualPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmNewPass, setConfirmNewPass] = useState('')
    const [changeImage, setChangeImage] = useState(false)
    const auth = useContext(AuthContext)
    const { getCities, changePassword, changeAboutCorporation, findAboutCorporation, uploadFile, deleteLogo } = useApi()
    const { MessageBox } = useMessageBoxContext()
    const [dragOver, setDragOver] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    useEffect(() => {
        if (selectedCity?.id) handleChangeDataProfile('addressCityId', selectedCity?.id)
    }, [selectedCity])

    function handleChangeDataProfile<T extends keyof editUserTypeReq>(
        property: T, value: editUserTypeReq[T]) {
        setDataProfile(prevState => {
            return {
                ...prevState,
                [property]: value
            }
        })
    }


    const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setDragOver(false);
    };

    const handleDrop = async (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setDragOver(false);
        const file = event.dataTransfer.files[0];
        sendFiletoApi(file)
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        sendFiletoApi(file)
    };

    const sendFiletoApi = async (imageLogo: File | null) => {
        try {
            if (!imageLogo) {
                throw new Error('Selecione um arquivo!')
            }
            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(imageLogo.type)) {
                throw new Error('Formato de arquivo inválido!')
            }
            if (imageLogo.size >= 1000000 * 5) {
                throw new Error('Tamanho do arquivo muito grande! Máximo 5mb!')
            }
            setSelectedImage(imageLogo);
            const formData = new FormData();
            formData.append('file', imageLogo);
            const result = await uploadFile(formData, { 'userId': auth.idUser, owner: 'local', host: process.env.REACT_APP_API ?? '', module: 'User' })
            if (!result.Success) {
                throw new Error('Sem sucesso ao atualizar o arquivo! ' + result.erro)
            }
            if (auth.user) {
                auth.setUser({ ...auth.user, urlLogo: result.url })
            }
            MessageBox('success', 'Arquivo atualizado com sucesso! ')
        } catch (error) {
            MessageBox('warning', (error as Error).message)
        }
    }

    const handleDeleteLogo = async () => {
        try {
            const result = await deleteLogo(auth.idUser, 'User')
            if (!result.Success) {
                throw new Error('Falha ao deletar logo! ' + result.erro)
            }
            if (auth.user) (
                auth.setUser({ ...auth.user, urlLogo: '' })
            )
            MessageBox('success', 'Logo exclusa com sucesso!')
        } catch (error) {
            MessageBox('error', (error as Error).message)
        }
    }




    async function handleChangePass() {
        try {
            if (!newPass || !actualPass || !confirmNewPass) {
                throw new Error("Informe todos campos!")
            }
            if (newPass !== confirmNewPass) {
                throw new Error("Nova senha não confere com a confirmação da nova senha!")
            }
            if (newPass.length < 8) {
                throw new Error("Nova senha precisa ter no minimo 8 digitos!")
            }
            const dataChangePass = await changePassword(finalDataChangePass)
            if (!dataChangePass.Success) {
                throw new Error("Erro ao atualizar senha! " + dataChangePass.erro)
            }
            MessageBox('success', 'Senha atualizada com sucesso!')
            setNewPass('')
            setActualPass('')
            setConfirmNewPass('')
        } catch (error) {
            MessageBox('error', (error as Error).message)
        }
    }
    async function handleChangeAboutCorporation() {
        try {
            const dataChangeAboutCorporation = await changeAboutCorporation(dataProfile)
            if (!dataChangeAboutCorporation.Success) {
                throw new Error("Erro ao atualizar dados da empresa! " + dataChangeAboutCorporation.erro)
            }
            const newUser: User | null = dataChangeAboutCorporation.updateAbouteCorporation
            if (auth.user) {
                auth.setUser({ ...auth.user, ...newUser })
            }
            MessageBox('success', 'Dados atualizados com sucesso!')
        } catch (error) {
            MessageBox('error', (error as Error).message)
        }
    }

    const finalDataChangePass = {
        storeId: auth.idUser,
        actualPass,
        newPass,
        confirmNewPass
    }

    async function handleGetCitiesIbge(ibge: number | null): Promise<CityStateType[] | undefined> {
        try {
            const response = await getCities(undefined, ibge)
            if (!response.Success) throw new Error(response.erro ?? 'Erro desconhecido')
            return response.cities
        } catch (error) {
            MessageBox('error', (error as Error).message)
        }
    }

    async function handleConsultCep(cep: string) {
        const cepformated = removeNotNumerics(cep)

        if (cepformated.length === 8) {
            try {
                const { data } = await axios.get(`https://viacep.com.br/ws/${cepformated}/json/`)

                if (data.erro) {
                    MessageBox('error', 'CEP invalido')
                }
                else {
                    const city = await handleGetCitiesIbge(data.ibge)

                    if (city) {
                        setSelectedCity(city[0])
                        setDataProfile({
                            ...dataProfile,
                            addressStreet: data.logradouro,
                            addressNeighborhood: data.bairro,
                            addressCityId: city[0].id
                        })
                    }
                }
            }
            catch (error) {
                MessageBox('info', (error as Error).message)
            }
        }

    }


    return (

        <S.Container>
            {isLoading ? <CircularProgressSpinner /> :
                <>
                    <S.DivForm>
                        <S.DivPicture>
                            {/* URL.createObjectURL(selectedImage) */}
                            <img style={{ maxHeight: 50, maxWidth: 170 }} src={auth.user?.urlLogo ?? "https://cdn-icons-png.flaticon.com/512/4194/4194756.png"}></img>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 15 }}>
                                <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>

                                    {changeImage ?
                                        < >
                                            <S.labelChangeImg onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                                dragOver={dragOver}>
                                                <AiOutlineCloudUpload size='30' />
                                                Selecione ou arraste uma imagem
                                                <input type='file' onChange={handleFileChange} />
                                            </S.labelChangeImg>
                                        </>

                                        :
                                        <S.ButtonChangeImg onClick={() => setChangeImage(true)}><b>Alterar</b></S.ButtonChangeImg>
                                    }
                                    <S.ButtonDeletar onClick={() => handleDeleteLogo()}><b>Deletar</b></S.ButtonDeletar>
                                </div>
                                <S.labelRecomendationsImg> Dimensões recomendadas: 170x50, tamanho maximo: 5mb </S.labelRecomendationsImg>
                            </div>

                        </S.DivPicture>
                        <span style={{ marginBottom: 15, fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
                            {/* <input type='checkbox' />Exibir logo no menu */}
                        </span>
                        <b>Sobre o estabelecimento</b>
                        <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <TextField
                                value={dataProfile.name}
                                onChange={(e) => {
                                    handleChangeDataProfile('name',
                                        e.target.value.length > 40 ?
                                            dataProfile.name : e.target.value)
                                }}
                                id="outlined-basic"
                                label="Razão Social *"
                                InputLabelProps={{ shrink: !!dataProfile.name }}
                                variant="outlined"
                                autoFocus
                                sx={{ width: '100%' }}
                            />
                        </label>

                        <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <TextField
                                value={dataProfile.cnpj}
                                onChange={(e) => {
                                    handleChangeDataProfile('cnpj', cpfCnpjFormat(e.target.value, dataProfile.cnpj ?? ''))
                                }}
                                label="CNPJ"
                                InputLabelProps={{ shrink: !!dataProfile.cnpj }}
                                id="outlined-basic"
                                variant="outlined"
                                sx={{ width: '49%' }}
                                disabled={true}
                            />

                            <TextField
                                value={dataProfile.fantasyName}
                                onChange={(e) => { handleChangeDataProfile('fantasyName', e.target.value) }}
                                label="Nome Fantasia"
                                id="outlined-basic"
                                InputLabelProps={{ shrink: !!dataProfile.fantasyName }}
                                variant="outlined"
                                sx={{ width: '49%' }}
                            />



                        </label>
                        <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <TextField
                                value={dataProfile.email}
                                onChange={(e) => {
                                    handleChangeDataProfile('email',
                                        e.target.value.length > 40 ?
                                            dataProfile.email : e.target.value)
                                }}
                                id="outlined-basic"
                                InputLabelProps={{ shrink: !!dataProfile.email }}
                                label="E-mail"
                                variant="outlined"
                                sx={{ width: '70%' }}
                                disabled={true}
                            />
                            <TextField
                                value={dataProfile.ie}
                                onChange={(e) => {
                                    handleChangeDataProfile('ie',
                                        e.target.value.length > 20 ?
                                            dataProfile.ie : removeNotNumerics(e.target.value))
                                }}
                                id="outlined-basic"
                                InputLabelProps={{ shrink: !!dataProfile.ie }}
                                label="Inscrição Estadual"
                                variant="outlined"
                                sx={{ width: '28%' }}
                            />
                        </label>
                        <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <TextField
                                value={dataProfile.phone}
                                onChange={(e) => {
                                    handleChangeDataProfile('phone', phoneNumberFormat(e.target.value, dataProfile.phone ?? ''))
                                }}
                                id="outlined-basic"
                                InputLabelProps={{ shrink: !!dataProfile.phone }}
                                label="Telefone"
                                variant="outlined"
                                sx={{ width: '49%' }}
                            />

                            <TextField
                                value={dataProfile.cellPhone}
                                onChange={(e) => {
                                    handleChangeDataProfile('cellPhone', cellNumberFormat(e.target.value, dataProfile.cellPhone ?? ''))
                                }}
                                id="outlined-basic"
                                InputLabelProps={{ shrink: !!dataProfile.cellPhone }}
                                label="Celular"
                                variant="outlined"
                                sx={{ width: '49%' }}
                            />

                        </label>

                        <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                            <TextField
                                value={dataProfile.addressCep}
                                onChange={(e) => {
                                    handleChangeDataProfile('addressCep', cepFormat(e.target.value, dataProfile.addressCep ?? ''))
                                }}
                                onBlur={(e) => handleConsultCep(e.target.value)}
                                InputLabelProps={{ shrink: !!dataProfile.addressCep }}
                                id="outlined-basic"
                                label="CEP"
                                variant="outlined"
                                sx={{ width: '27%' }}
                            />

                            <TextField
                                value={dataProfile.addressStreet}
                                onChange={(e) => {
                                    handleChangeDataProfile('addressStreet',
                                        e.target.value.length > 50 ?
                                            dataProfile.addressStreet : e.target.value
                                    )
                                }}
                                id="outlined-basic"
                                InputLabelProps={{ shrink: !!dataProfile.addressStreet }}
                                label="Endereço"
                                variant="outlined"
                                sx={{ width: '57%' }}
                            />

                            <TextField
                                value={dataProfile.addressNumber}
                                onChange={(e) => {
                                    handleChangeDataProfile('addressNumber',
                                        e.target.value.length > 5 ?
                                            dataProfile.addressNumber : e.target.value
                                    )
                                }}
                                id="outlined-basic"
                                InputLabelProps={{ shrink: !!dataProfile.addressNumber }}
                                label="Nº"
                                variant="outlined"
                                sx={{ width: '13%' }}
                            />

                        </label>

                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                            <TextField
                                value={dataProfile.addressNeighborhood}
                                onChange={(e) => handleChangeDataProfile('addressNeighborhood',
                                    e.target.value.length > 30 ?
                                        dataProfile.addressNeighborhood : e.target.value)}
                                type="text"
                                id="outlined-basic"
                                InputLabelProps={{ shrink: !!dataProfile.addressNeighborhood }}
                                label="Bairro"
                                variant="outlined"
                                sx={{ width: '45%' }} />

                            <CityAutoComplete
                                citiesOptions={citiesOptions}
                                selectedCity={selectedCity}
                                setCitiesOptions={setCitiesOptions}
                                setSelectedCity={setSelectedCity}
                                widthPercent={53}
                                size='medium'
                            />

                        </div>

                        <S.ButtonSave onClick={() => handleChangeAboutCorporation()} ><b>Salvar</b></S.ButtonSave>
                    </S.DivForm>
                    <Divider sx={{ width: '100%' }} />

                    <div style={{ marginTop: 15 }}> <b>Alteração de senha</b></div>
                    <S.DivChangePass>

                        <TextField
                            value={actualPass}
                            onChange={(e) => setActualPass(e.target.value)}
                            type="password"
                            id="outlined-basic"
                            InputLabelProps={{ shrink: !!actualPass }}
                            label="Senha Atual"
                            variant="outlined"
                            sx={{ width: '250px' }} />
                        <TextField
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            type="password"
                            id="outlined-basic"
                            InputLabelProps={{ shrink: !!newPass }}
                            label="Nova Senha"
                            variant="outlined"
                            sx={{ width: '250px' }} />
                        <TextField
                            value={confirmNewPass}
                            onChange={(e) => setConfirmNewPass(e.target.value)}
                            type="password"
                            id="outlined-basic"
                            InputLabelProps={{ shrink: !!confirmNewPass }}
                            label="Repita Nova Senha"
                            variant="outlined"
                            sx={{ width: '250px' }} />

                    </S.DivChangePass>
                    <S.ButtonSave onClick={() => handleChangePass()}><b>Salvar</b></S.ButtonSave>
                </>
            }
        </S.Container>



    )
}