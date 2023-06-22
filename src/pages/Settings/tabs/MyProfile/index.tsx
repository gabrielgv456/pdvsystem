import { useState ,useContext} from 'react';
import * as S from './style'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import { Divider } from "@mui/material";
import { AuthContext } from '../../../../contexts/Auth/AuthContext';
import { useApi } from '../../../../hooks/useApi';
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';


export const TabMyProfile = () => {

    const [nameCorporation, setNameCorporation] = useState('')
    const [cnpjCorporation, setCnpjCorporation] = useState('')
    const [emailCorporation, setEmailCorporation] = useState('')
    const [phoneNumberCorporation, setPhoneNumberCorporation] = useState('')
    const [cellNumberCorporation, setCellNumberCorporation] = useState('')
    const [adressCepCorporation, setAdressCepCorporation] = useState('')
    const [adressStreetCorporation, setAdressStreetCorporation] = useState('')
    const [adressNumberCorporation, setAdressNumberCorporation] = useState('')
    const [adressNeighborhoodCorporation, setAdressNeighborhoodCorporation] = useState('')
    const [adressCityCorporation, setAdressCityCorporation] = useState('')
    const [adressStateCorporation, setAdressStateCorporation] = useState<string | null>('')
    const [fantasyNameCorporation,setFantasyNameCorporation] = useState('')
    const [actualPass, setActualPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmNewPass, setConfirmNewPass] = useState('') 
    const optionsUF = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"]
    const auth = useContext(AuthContext)
    const {changePassword} = useApi()
    const {MessageBox} = useMessageBoxContext()

    async function handleChangePass(){
        try{
            if (!newPass||!actualPass||!confirmNewPass){
                throw new Error("Informe todos campos!")
            }
            const dataChangePass = await changePassword(finalDataChangePass)
            if (!dataChangePass.Success){
                throw new Error("Erro ao atualizar senha! " + dataChangePass.erro)
            }
            MessageBox('success','Senha atualizada com sucesso!')
            setNewPass('')
            setActualPass('')
            setConfirmNewPass('')
        }catch(error:any){
            MessageBox('error',error.message)
        }
    }
    
    const finalDataChangeAboutCorporation = {
        storeId: auth.idUser,
        nameCorporation,
        cnpjCorporation,
        emailCorporation,
        phoneNumberCorporation,
        cellNumberCorporation,
        adressCepCorporation, 
        adressStreetCorporation, 
        adressNumberCorporation, 
        adressNeighborhoodCorporation, 
        adressCityCorporation, 
        adressStateCorporation, 
        fantasyNameCorporation,
    }

    const finalDataChangePass = {
        storeId:auth.idUser,
        actualPass,
        newPass,
        confirmNewPass
    }

    async function handleConsultCep(cep: string) {
        const cepformated = cep.replace(/[^0-9]/g, '')

        if (cepformated.length === 8) {
            try {
                const { data } = await axios.get(`https:\\viacep.com.br/ws/${cepformated}/json/`)

                if (data.erro) {
                    alert('CEP invalido')
                }
                else {
                    setAdressStreetCorporation(data.logradouro)
                    setAdressNeighborhoodCorporation(data.bairro)
                    setAdressCityCorporation(data.localidade)
                    setAdressStateCorporation(data.uf)
                }
            }
            catch (error) {
                console.log(error)
            }
        }

    }

    return (
        <S.Container>
            <S.DivForm>
                <S.DivPicture>
                    <img width={100} src="https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2013%2F09%2F18%2F23%2FWDL-Logo-31737_33419_054801853_1173429928.jpg"></img>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',marginLeft:15 }}>
                        <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                            <S.ButtonChangeImg><b>Alterar</b></S.ButtonChangeImg>
                            <S.ButtonDeletar><b>Deletar</b></S.ButtonDeletar>
                        </div>
                        <S.labelRecomendationsImg> Dimensões recomendadas: 200x200, tamanho maximo: 5mb </S.labelRecomendationsImg>
                    </div>

                </S.DivPicture>
                <span style={{ marginBottom: 15, fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
                    <input type='checkbox' />Exibir logo no menu
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
                            setCnpjCorporation(e.target.value.replace(/\D/g, '').length === 11 ?
                                e.target.value.replace(/[^0-9]/g, '')
                                    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
                                : e.target.value.replace(/\D/g, '').length === 14 ?
                                    e.target.value.replace(/[^0-9]/g, '')
                                        .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5")
                                    : e.target.value.replace(/[^0-9]/g, '').length > 14 ?
                                        cnpjCorporation
                                        :
                                        e.target.value.replace(/[^0-9]/g, '')
                            )
                        }}
                        label="CNPJ"
                        id="outlined-basic"
                        variant="outlined"
                        sx={{ width: '49%' }}
                    />

                    <TextField
                        value={fantasyNameCorporation}
                        onChange={(e) => {setFantasyNameCorporation(e.target.value) }}
                        label="Nome Fantasia"
                        id="outlined-basic"
                        variant="outlined"
                        sx={{ width: '49%' }}
                    />

                   
                   
                </label>

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
                    sx={{ width: '100%' }}
                />


                <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <TextField
                        value={phoneNumberCorporation}
                        onChange={(e) => {
                            setPhoneNumberCorporation(
                                e.target.value.replace(/[^0-9]/g, '').length === 2 ?
                                    e.target.value.replace(/[^0-9]/g, '').replace(/(\d{2})/g, "($1)")
                                    :
                                    e.target.value.replace(/[^0-9]/g, '').length === 3 ?
                                        e.target.value.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{1})(\d{*})/g, "($1)$2")
                                        :
                                        e.target.value.replace(/[^0-9]/g, '').length === 10 ?
                                            e.target.value.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{4})(\d{4})/g, "($1)$2-$3")
                                            :
                                            e.target.value.replace(/[^0-9]/g, '').length > 10 ?
                                                phoneNumberCorporation
                                                :
                                                e.target.value.replace(/[^0-9]/g, '')
                            )
                        }}
                        id="outlined-basic"
                        label="Telefone"
                        variant="outlined"
                        sx={{ width: '49%' }}
                    />

                    <TextField
                        value={cellNumberCorporation}
                        onChange={(e) => {
                            setCellNumberCorporation(
                                e.target.value.replace(/[^0-9]/g, '').length === 2 ?
                                    e.target.value.replace(/[^0-9]/g, '').replace(/(\d{2})/g, "($1)")
                                    :
                                    e.target.value.replace(/[^0-9]/g, '').length === 3 ?
                                        e.target.value.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{1})(\d{*})/g, "($1)$2")
                                        :
                                        e.target.value.replace(/[^0-9]/g, '').length === 11 ?
                                            e.target.value.replace(/[^0-9]/g, '').replace(/(\d{2})(\d{5})(\d{4})/g, "($1)$2-$3")
                                            :
                                            e.target.value.replace(/[^0-9]/g, '').length > 11 ?
                                                cellNumberCorporation
                                                :
                                                e.target.value.replace(/[^0-9]/g, '')
                            )
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
                            setAdressCepCorporation(
                                e.target.value.replace(/[^0-9]/g, '').length === 8 ?
                                    e.target.value.toString().replace(/(\d{5})(\d{3})/g, "$1-$2")
                                    :
                                    e.target.value.replace(/[^0-9]/g, '').length > 8 ?
                                        adressCepCorporation
                                        :
                                        e.target.value)
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

                <S.ButtonSave ><b>Salvar</b></S.ButtonSave>
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
            <S.ButtonSave onClick={()=>handleChangePass()}><b>Salvar</b></S.ButtonSave>

        </S.Container>


        
    )
}