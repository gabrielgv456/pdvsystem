import { ChangeEvent, DragEvent, useContext, useEffect, useState } from "react";
import { useMessageBoxContext } from "../../contexts/MessageBox/MessageBoxContext";
import * as S from './style'
import * as type from './interfaces'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useApi } from "../../hooks/useApi";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import certImage from '../../images/certificado-digital.png'

export const UploadImage = (props: type.uploadImageProps) => {
    const [dragOver, setDragOver] = useState(false);
    const [selectedImage, setSelectedImage] = useState(props.url);
    const { MessageBox } = useMessageBoxContext()
    const { uploadFile, deleteFile } = useApi()
    const auth = useContext(AuthContext)
    const [changeImage, setChangeImage] = useState(false)

    useEffect(() => {
        setSelectedImage(props.url)
    }, [props.url])

    const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setDragOver(false);
    };

    const handleDrop = async (event: DragEvent<HTMLLabelElement>, maxSize: number) => {
        event.preventDefault();
        setDragOver(false);
        const file = event.dataTransfer.files[0];
        sendFiletoApi(file, maxSize)
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>, maxSize: number) => {
        const file = event.target.files && event.target.files[0];
        sendFiletoApi(file, maxSize)
    };

    const sendFiletoApi = async (imageLogo: File | null, maxSize: number) => {
        try {
            if (!imageLogo) {
                throw new Error('Selecione um arquivo!')
            }
            if ((props.type === 'image') && !['image/jpeg', 'image/png', 'image/jpg'].includes(imageLogo.type)) {
                throw new Error('Formato de arquivo inválido!')
            }
            if ((props.type === 'cert') && !['application/x-pkcs12'].includes(imageLogo.type)) {
                throw new Error('Formato de arquivo inválido!')
            }
            if (imageLogo.size >= 1000000 * maxSize) {
                throw new Error('Tamanho do arquivo muito grande! Máximo ' + maxSize + 'mb!')
            }
            const formData = new FormData();
            formData.append('file', imageLogo);
            const result = await uploadFile(formData, { owner: 'local', userId: auth.idUser, host: process.env.REACT_APP_API ?? '' })
            if (!result.Success) {
                throw new Error('Sem sucesso ao atualizar o arquivo! ' + result.erro)
            }
            setSelectedImage(result.url)
            props.setIdImage(result.id)
            MessageBox('success', 'Arquivo enviado com sucesso! Clique em salvar para aplicar')
        } catch (error) {
            MessageBox('warning', (error as Error).message)
        }
    }

    const handleDelete = async () => {
        try {
            if (!props.idImage) throw new Error('Não foi encontrado o id do arquivo')
            const result = await deleteFile(props.idImage, auth.idUser)
            if (!result.Success) {
                throw new Error('Falha ao deletar arquivo! ' + result.erro ?? '')
            }
            props.setIdImage(null)
            setSelectedImage(null)
            MessageBox('success', 'Arquivo excluso com sucesso!')
        } catch (error) {
            MessageBox('error', (error as Error).message)
        }
    }


    return (

        <S.DivPicture>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>

                    {!selectedImage || changeImage ?
                        < >
                            <S.labelChangeImg onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, props.maxSize)}
                                dragOver={dragOver}>
                                <AiOutlineCloudUpload size='30' />
                                {(props.type === 'image') &&
                                    'Selecione ou arraste uma imagem'}
                                {(props.type === 'cert') &&
                                    'Selecione ou arraste um arquivo'}
                                <input type='file' onChange={(e) => handleFileChange(e, props.maxSize)} style={{ display: 'none' }} />
                            </S.labelChangeImg>
                        </>
                        :
                        <>
                            <img alt='' style={{ width: 'auto', maxHeight: 100 }} src={(props.type === 'cert') ? certImage : selectedImage}></img>
                            <S.ButtonChangeImg onClick={() => setChangeImage(true)}><b>Alterar</b></S.ButtonChangeImg>
                            <S.ButtonDeletar onClick={() => handleDelete()}><b>Deletar</b></S.ButtonDeletar>
                        </>
                    }
                </div>
                <S.labelRecomendationsImg>
                    {(props.type === 'image') &&
                        `Dimensões recomendadas: 170x50, tamanho maximo: ${props.maxSize}mb `}
                    {(props.type === 'cert') &&
                        `Arquivo .pfx`}

                </S.labelRecomendationsImg>
            </div>

        </S.DivPicture>
    )
}