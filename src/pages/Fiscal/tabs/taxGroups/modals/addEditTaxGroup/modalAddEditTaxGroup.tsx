import { Modal } from '@mui/material'
import * as S from './style'
import { MuiBox } from 'src/components/box/muiBox'
import { DefaultButtonCloseModal, DefaultIconCloseModal } from 'src/components/buttons/closeButtonModal'
import { Dispatch, SetStateAction } from 'react'

export const ModalAddEditTaxGroup = (props: ModalAddEditTaxGroupType) => {
    return (
        <Modal open={props.isModalOpen} onClose={() => props.setIsModalOpen(false)}>
            <MuiBox desktopWidth={700} mobileWidthPercent='80%' padding='40px'>
                <h3 style={{ width: 'max-content', margin: '0 auto', marginBottom: 15 }}>
                    {` ${props.type === 'Add' ? 'Adicionar' : 'Editar'} Grupo de Tributação`}
                </h3>
                <DefaultButtonCloseModal onClick={() => props.setIsModalOpen(false)}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>
    )
}

type ModalAddEditTaxGroupType = {
    type: 'Add' | 'Edit'
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<any>>
}