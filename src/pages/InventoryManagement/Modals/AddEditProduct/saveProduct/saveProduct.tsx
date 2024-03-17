import { useDarkMode } from '../../../../../contexts/DarkMode/DarkModeProvider';
import * as S from './style'
import * as type from './interfaces'
import { MdFileDownloadDone } from 'react-icons/md';
import { useApi } from '../../../../../hooks/useApi';
import { useMessageBoxContext } from '../../../../../contexts/MessageBox/MessageBoxContext';
import { DefaultButton } from '../../../../../components/buttons/defaultButton';
import { Divider } from '@mui/material';

export const SaveProduct = (props: type.SaveProductProps) => {

    const Theme = useDarkMode()
    const { editProducts, addProducts } = useApi()
    const { MessageBox } = useMessageBoxContext()

    const AddProductApi = async () => {
        try {
            validateFields()
            delete props.dataToSend.principal.id
            const data = await addProducts(props.dataToSend)
            if (!data.Success) {
                throw new Error('Falha ao adicionar produto! ' + data.erro)
            }
            props.setisModalAddEditProductOpen(false)
            props.setisModalSucessOpen(true)
            props.setDataAddEditProduct(props.defaultDataEditProduct)
        } catch (error) {
            MessageBox('error', (error as Error).message)
        }
    }

    const EditProductApi = async () => {
        try {
            validateFields()
            const data = await editProducts(props.dataToSend)
            if (!data.Success) {
                throw new Error('Falha ao editar produto! ' + data.erro)
            }
            props.setisModalAddEditProductOpen(false)
            props.setisModalSucessOpen(true)
            props.setDataAddEditProduct(props.defaultDataEditProduct)
        }
        catch (error) {
            MessageBox('error', (error as Error).message)
        }
    }

    function validateFields() {
        if (!(props.dataToSend.principal.name !== ""
            && (props.dataToSend.principal.value ?? 0) > 0
            && (props.dataToSend.principal.cost ?? 0) > 0
            && props.dataToSend.principal.profitMargin
        )) {
            throw new Error('Informe todos os campos obrigatórios!')
        }
    }

    return (
        <>
            <Divider />

            <div style={{ display: 'flex', marginTop: 20, width: '100%', justifyContent: 'center' }}>
                {props.type === 'Add' ?
                    <DefaultButton selectedColor='--Green' onClick={AddProductApi} >
                        <MdFileDownloadDone size="22" />
                        Adicionar Produto
                    </DefaultButton>
                    :
                    <DefaultButton selectedColor='--Green' onClick={EditProductApi}>
                        <MdFileDownloadDone size="22" />
                        Editar Produto
                    </DefaultButton>
                }
            </div> :

        </>
    )
}