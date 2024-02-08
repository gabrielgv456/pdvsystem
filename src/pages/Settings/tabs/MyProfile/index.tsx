import { useState, useContext, useEffect, DragEvent, ChangeEvent } from 'react';
import * as S from './style'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import { Divider } from "@mui/material";
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useApi } from '../../../../hooks/useApi';
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { cellNumberFormat, cepFormat, convertToBase64, cpfCnpjFormat, optionsUF, phoneNumberFormat, removeNotNumerics } from '../../../../utils/utils';
import { User } from '../../../../types/User';


export const TabMyProfile = () => {

    const [nameCorporation, setNameCorporation] = useState('')
    const [cnpjCorporation, setCnpjCorporation] = useState('')
    const [emailCorporation, setEmailCorporation] = useState('')
    const [ieCorporation,setIeCorporation] = useState('')
    const [phoneNumberCorporation, setPhoneNumberCorporation] = useState('')
    const [cellNumberCorporation, setCellNumberCorporation] = useState('')
    const [adressCepCorporation, setAdressCepCorporation] = useState('')
    const [adressStreetCorporation, setAdressStreetCorporation] = useState('')
    const [adressNumberCorporation, setAdressNumberCorporation] = useState('')
    const [adressNeighborhoodCorporation, setAdressNeighborhoodCorporation] = useState('')
    const [adressCityCorporation, setAdressCityCorporation] = useState('')
    const [adressStateCorporation, setAdressStateCorporation] = useState<string | null>('')
    const [fantasyNameCorporation, setFantasyNameCorporation] = useState('')
    const [actualPass, setActualPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmNewPass, setConfirmNewPass] = useState('')
    const [changeImage, setChangeImage] = useState(false)
    const auth = useContext(AuthContext)
    const { changePassword, changeAboutCorporation, findAboutCorporation, uploadFile, deleteLogo } = useApi()
    const { MessageBox } = useMessageBoxContext()
    const [dragOver, setDragOver] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

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
            const result = await uploadFile(formData, auth.idUser)
            if (!result.Success) {
                throw new Error('Sem sucesso ao atualizar o arquivo! ' + result.erro)
            }
            if (auth.user) {
                auth.setUser({ ...auth.user, urlLogo: result.url })
            }
            MessageBox('success', 'Arquivo atualizado com sucesso! ')
        } catch (error: any) {
            MessageBox('warning', error.message)
        }
    }

    const handleDeleteLogo = async () => {
        try {
            const result = await deleteLogo(auth.idUser)
            if (!result.Success) {
                throw new Error('Falha ao deletar logo! ' + result.erro)
            }
            if (auth.user) (
                auth.setUser({ ...auth.user, urlLogo: '' })
            )
            MessageBox('success', 'Logo exclusa com sucesso!')
        } catch (error: any) {
            MessageBox('error', error.message)
        }
    }


    useEffect(() => {
        const searchAboutCorporation = async () => {
            try {
                const dataFindAboutCorporation = await findAboutCorporation(auth.idUser)
                if (!dataFindAboutCorporation.Success) {
                    throw new Error("Falha ao buscar dados da empresa! " + dataFindAboutCorporation.erro)
                }
                const { resultAboutCorporation } = dataFindAboutCorporation
                setNameCorporation(resultAboutCorporation.name)
                setCnpjCorporation(cpfCnpjFormat(resultAboutCorporation.cnpj, resultAboutCorporation.cnpj))
                setEmailCorporation(resultAboutCorporation.email)
                setIeCorporation(resultAboutCorporation.ie)
                setPhoneNumberCorporation(phoneNumberFormat(resultAboutCorporation.phone, resultAboutCorporation.phone))
                setCellNumberCorporation(cellNumberFormat(resultAboutCorporation.cellPhone, resultAboutCorporation.cellPhone))
                setAdressCepCorporation(cepFormat(resultAboutCorporation.adressCep, resultAboutCorporation.adressCep))
                setAdressStreetCorporation(resultAboutCorporation.adressStreet)
                setAdressNumberCorporation(resultAboutCorporation.adressNumber)
                setAdressNeighborhoodCorporation(resultAboutCorporation.adressNeighborhood)
                setAdressCityCorporation(resultAboutCorporation.adressCity)
                setAdressStateCorporation(resultAboutCorporation.adressState)
                setFantasyNameCorporation(resultAboutCorporation.fantasyName)
            } catch (error: any) {
                MessageBox('warning', error.message)
            }

        }
        searchAboutCorporation()
    }, [])

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
        } catch (error: any) {
            MessageBox('error', error.message)
        }
    }
    async function handleChangeAboutCorporation() {
        try {
            const dataChangeAboutCorporation = await changeAboutCorporation(finalDataChangeAboutCorporation)
            if (!dataChangeAboutCorporation.Success) {
                throw new Error("Erro ao atualizar dados da empresa! " + dataChangeAboutCorporation.erro)
            }
            const newUser: User | null = dataChangeAboutCorporation.updateAbouteCorporation
            if (auth.user) {
                auth.setUser({ ...auth.user, ...newUser })
            }
            MessageBox('success', 'Dados atualizados com sucesso!')
        } catch (error: any) {
            MessageBox('error', error.message)
        }
    }

    const finalDataChangeAboutCorporation = {
        storeId: auth.idUser,
        name: nameCorporation === '' ? null : nameCorporation,
        cnpj: cnpjCorporation === '' ? null : removeNotNumerics(cnpjCorporation),
        //email: emailCorporation,
        phone: phoneNumberCorporation === '' ? null : removeNotNumerics(phoneNumberCorporation),
        cellPhone: cellNumberCorporation === '' ? null : removeNotNumerics(cellNumberCorporation),
        adressCep: adressCepCorporation === '' ? null : removeNotNumerics(adressCepCorporation),
        adressStreet: adressStreetCorporation === '' ? null : adressStreetCorporation,
        adressNumber: adressNumberCorporation === '' ? null : adressNumberCorporation,
        adressNeighborhood: adressNeighborhoodCorporation === '' ? null : adressNeighborhoodCorporation,
        adressCity: adressCityCorporation === '' ? null : adressCityCorporation,
        adressState: adressStateCorporation === '' ? null : adressStateCorporation,
        fantasyName: fantasyNameCorporation === '' ? null : fantasyNameCorporation,
        ie : ieCorporation === '' ? null : ieCorporation
    }

    const finalDataChangePass = {
        storeId: auth.idUser,
        actualPass,
        newPass,
        confirmNewPass
    }

    async function handleConsultCep(cep: string) {
        const cepformated = cep.replace(/[^0-9]/g, '')

        if (cepformated.length === 8) {
            try {
                const { data } = await axios.get(`https://viacep.com.br/ws/${cepformated}/json/`)

                if (data.erro) {
                    MessageBox('error', 'CEP invalido')
                }
                else {
                    setAdressStreetCorporation(data.logradouro)
                    setAdressNeighborhoodCorporation(data.bairro)
                    setAdressCityCorporation(data.localidade)
                    setAdressStateCorporation(data.uf)
                }
            }
            catch (error: any) {
                MessageBox('info', error.message)
            }
        }

    }

    return (
        <S.Container>
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
                        value={nameCorporation}
                        onChange={(e) => {
                            setNameCorporation(
                                e.target.value.length > 40 ?
                                    nameCorporation
                                    :
                                    e.target.value)
                        }}
                        id="outlined-basic"
                        label="Razão Social *"
                        variant="outlined"
                        autoFocus
                        sx={{ width: '100%' }}
                    />
                </label>

                <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <TextField
                        value={cnpjCorporation}
                        onChange={(e) => {
                            setCnpjCorporation(cpfCnpjFormat(e.target.value, cnpjCorporation))
                        }}
                        label="CNPJ"
                        id="outlined-basic"
                        variant="outlined"
                        sx={{ width: '49%' }}
                    />

                    <TextField
                        value={fantasyNameCorporation}
                        onChange={(e) => { setFantasyNameCorporation(e.target.value) }}
                        label="Nome Fantasia"
                        id="outlined-basic"
                        variant="outlined"
                        sx={{ width: '49%' }}
                    />



                </label>
                <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <TextField
                        value={emailCorporation}
                        onChange={(e) => {
                            setEmailCorporation(
                                e.target.value.length > 40 ?
                                    emailCorporation
                                    :
                                    e.target.value)
                        }}
                        id="outlined-basic"
                        label="E-mail"
                        variant="outlined"
                        sx={{ width: '70%' }}
                        disabled={true}
                    />
                    <TextField
                        value={ieCorporation}
                        onChange={(e) => {
                            setIeCorporation(
                                e.target.value.length > 20 ?
                                    ieCorporation
                                    :
                                    removeNotNumerics(e.target.value))
                        }}
                        id="outlined-basic"
                        label="Inscrição Estadual"
                        variant="outlined"
                        sx={{ width: '28%' }}
                    />
                </label>
                <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <TextField
                        value={phoneNumberCorporation}
                        onChange={(e) => {
                            setPhoneNumberCorporation(phoneNumberFormat(e.target.value, phoneNumberCorporation))
                        }}
                        id="outlined-basic"
                        label="Telefone"
                        variant="outlined"
                        sx={{ width: '49%' }}
                    />

                    <TextField
                        value={cellNumberCorporation}
                        onChange={(e) => {
                            setCellNumberCorporation(cellNumberFormat(e.target.value, cellNumberCorporation))
                        }}
                        id="outlined-basic"
                        label="Celular"
                        variant="outlined"
                        sx={{ width: '49%' }}
                    />

                </label>

                <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                    <TextField
                        value={adressCepCorporation}
                        onChange={(e) => {
                            setAdressCepCorporation(cepFormat(e.target.value, adressCepCorporation))
                        }}
                        onBlur={(e) => handleConsultCep(e.target.value)}
                        id="outlined-basic"
                        label="CEP"
                        variant="outlined"
                        sx={{ width: '27%' }}
                    />

                    <TextField
                        value={adressStreetCorporation}
                        onChange={(e) => {
                            setAdressStreetCorporation(
                                e.target.value.length > 50 ?
                                    adressStreetCorporation
                                    :
                                    e.target.value
                            )
                        }}
                        id="outlined-basic"
                        label="Endereço"
                        variant="outlined"
                        sx={{ width: '57%' }}
                    />

                    <TextField
                        value={adressNumberCorporation}
                        onChange={(e) => {
                            setAdressNumberCorporation(
                                e.target.value.length > 5 ?
                                    adressNumberCorporation
                                    :
                                    e.target.value
                            )
                        }}
                        id="outlined-basic"
                        label="Nº"
                        variant="outlined"
                        sx={{ width: '13%' }}
                    />

                </label>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

                    <TextField
                        value={adressNeighborhoodCorporation}
                        onChange={(e) => setAdressNeighborhoodCorporation(
                            e.target.value.length > 30 ?
                                adressNeighborhoodCorporation
                                :
                                e.target.value)}
                        type="text"
                        id="outlined-basic"
                        label="Bairro"
                        variant="outlined"
                        sx={{ width: '38%' }} />

                    <TextField
                        value={adressCityCorporation}
                        onChange={(e) => setAdressCityCorporation(
                            e.target.value.length > 30 ?
                                adressCityCorporation
                                :
                                e.target.value)}
                        type="text"
                        id="outlined-basic"
                        label="Cidade"
                        variant="outlined"
                        sx={{ width: '38%' }} />

                    <Autocomplete
                        value={adressStateCorporation}
                        onChange={(event: any, newValue: string | null) => {
                            setAdressStateCorporation(newValue);
                        }}
                        noOptionsText="Não encontrado"
                        id="controllable-states-demo"
                        options={optionsUF}
                        sx={{ width: '21%' }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="UF"

                            />
                        } />
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
                    label="Senha Atual"
                    variant="outlined"
                    sx={{ width: '250px' }} />
                <TextField
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    type="password"
                    id="outlined-basic"
                    label="Nova Senha"
                    variant="outlined"
                    sx={{ width: '250px' }} />
                <TextField
                    value={confirmNewPass}
                    onChange={(e) => setConfirmNewPass(e.target.value)}
                    type="password"
                    id="outlined-basic"
                    label="Repita Nova Senha"
                    variant="outlined"
                    sx={{ width: '250px' }} />

            </S.DivChangePass>
            <S.ButtonSave onClick={() => handleChangePass()}><b>Salvar</b></S.ButtonSave>

        </S.Container>



    )
}