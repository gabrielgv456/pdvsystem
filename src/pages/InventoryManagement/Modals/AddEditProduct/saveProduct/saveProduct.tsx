import { useDarkMode } from '../../../../../contexts/DarkMode/DarkModeProvider';
import * as S from './style'
import * as type from './interfaces'
import { MdFileDownloadDone } from 'react-icons/md';
import { useApi } from '../../../../../hooks/useApi';
import { useMessageBoxContext } from '../../../../../contexts/MessageBox/MessageBoxContext';

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
        } catch (error: any) {
            MessageBox('error', error.message)
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
        catch (error: any) {
            MessageBox('error', error.message)
        }
    }

    function validateFields() {
        console.log(props.dataToSend.principal)
        if (!(props.dataToSend.principal.name !== ""
            && (props.dataToSend.principal.value ?? 0) > 0
            && (props.dataToSend.principal.cost ?? 0) > 0
            && props.dataToSend.principal.profitMargin
        )) {
            throw new Error('Informe todos os campos obrigatórios!')
        }
    }

    return (

        <S.ButtonAddProductModal onClick={props.type === 'Add' ? AddProductApi : EditProductApi} isDarkMode={Theme.DarkMode} style={{ margin: '0 auto' }}>
            <MdFileDownloadDone size="22" />
            {props.type === 'Add' ?
                <b>ADICIONAR PRODUTO</b>
                :
                <b>EDITAR PRODUTO</b>
            }
        </S.ButtonAddProductModal>
    )
}