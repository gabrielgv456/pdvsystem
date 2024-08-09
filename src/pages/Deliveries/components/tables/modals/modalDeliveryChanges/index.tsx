import Modal from '@mui/material/Modal';
import { MuiBox } from '../../../../../../components/box/muiBox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { TypeDeliveries } from '../../../..';
import { useState } from 'react';
import { DeliveryAddressChange } from '../components/changeAddress';
import * as S from './style'
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../../../components/buttons/closeButtonModal';
import { ResultDeliveryType } from '../../../../../../interfaces/useApi/findDeliveries';


interface ModalDeliveryChangesProps {
    isModalDeliveryChangesOpen: boolean,
    setIsModalDeliveryChangesOpen: (value: boolean) => void
    deliveriesFiltered: ResultDeliveryType[]
    searchDeliveries: () => void
    typeDelivery: TypeDeliveries
}

export const ModalDeliveryChanges = (props: ModalDeliveryChangesProps) => {

    const [selectedDeliveryModal, setSelectedDeliveryModal] = useState<ResultDeliveryType>(props.deliveriesFiltered[0])
    const moreOneDelivery = props.deliveriesFiltered.length > 1


    function handleCloseModalDeliveryChanges() {
        props.setIsModalDeliveryChangesOpen(false)
    }

    return (
        <Modal open={props.isModalDeliveryChangesOpen} onClose={handleCloseModalDeliveryChanges}>
            <MuiBox desktopWidth={700} mobileWidthPercent='80%' padding='40px'>
                <h3 style={{ width: 'max-content', margin: '0 auto', marginBottom: 15 }}>
                    Editar Entrega{moreOneDelivery && 's'}
                </h3>
                <S.ModalDiv>
                    <Autocomplete
                        value={selectedDeliveryModal}
                        onChange={(event: any, newValue: ResultDeliveryType | null) => {
                            if (newValue) setSelectedDeliveryModal(newValue);
                        }}
                        noOptionsText="Não encontrado"
                        id="controllable-states-demo"
                        options={props.deliveriesFiltered}
                        getOptionLabel={(option) => (
                            option.itemSell.sell.codRef + ' - ' +
                            (option.client?.name ?? 'Cliente não informado') + ' - ' +
                            option.itemSell.descriptionProduct
                        )}
                        sx={{ width: '100%' }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Selecione a entrega *"
                            />
                        } />
                    <DeliveryAddressChange selectedDeliveryModal={selectedDeliveryModal} setSelectedDeliveryModal={setSelectedDeliveryModal} moreOneDelivery={moreOneDelivery} searchDeliveries={props.searchDeliveries} />
                </S.ModalDiv>
                <DefaultButtonCloseModal onClick={() => props.setIsModalDeliveryChangesOpen(false)}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>
    )
}