import Modal from '@mui/material/Modal';
import { MuiBox } from '../../../../../../components/box/muiBox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DeliveriesReturnApiProps, TypeDeliveries } from '../../../..';
import { useState } from 'react';
import { DeliveryAddressChange } from './components/changeAddress';
import * as S from './style'
import { DateDelivered } from './components/dateDelivered';
import { DefaultButton } from '../../../../../../components/buttons/defaultButton';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../../../components/buttons/closeButtonModal';

interface ModalDeliveryChangesProps {
    isModalDeliveryChangesOpen: boolean,
    setIsModalDeliveryChangesOpen: (value: boolean) => void
    deliveriesFiltered: DeliveriesReturnApiProps[]
    searchDeliveries: () => void
    typeDelivery: TypeDeliveries
}

export const ModalDeliveryChanges = (props: ModalDeliveryChangesProps) => {

    function handleCloseModalDeliveryChanges() {
        props.setIsModalDeliveryChangesOpen(false)
    }

    const [selectedDeliveryModal, setSelectedDeliveryModal] = useState<DeliveriesReturnApiProps | null>(props.deliveriesFiltered.length === 1 ? props.deliveriesFiltered[0] : null)
    const moreOneDelivery = props.deliveriesFiltered.length > 1


    const payOnDeliveryFiltered = props.deliveriesFiltered.filter(delivery => delivery.onDeliveryPayValue)
    const isPayonDeliveryShipping = payOnDeliveryFiltered.length > 0 && props.typeDelivery === 'Shipping'
    const [selectedPayOnDeliveryModal, setselectedPayOnDeliveryModal] = useState<DeliveriesReturnApiProps | null>(payOnDeliveryFiltered.length === 1 ? payOnDeliveryFiltered[0] : null)

    return (
        <Modal open={props.isModalDeliveryChangesOpen} onClose={handleCloseModalDeliveryChanges}>
            <MuiBox desktopWidth={700} mobileWidthPercent='80%' padding='40px'>
                <h3 style={{ width: 'max-content', margin: '0 auto', marginBottom: 15 }}>
                    {props.typeDelivery === 'Pending' ?
                        'Editar Entrega' : 'Concluir Entrega'}
                </h3>
                <S.ModalDiv>
                    {props.typeDelivery === 'Shipping' &&
                        <>
                            <label style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <div>Informe a data em que a{moreOneDelivery && 's'} entrega{moreOneDelivery && 's'} {moreOneDelivery ? 'foram' : 'foi'} realizada{moreOneDelivery && 's'}:</div>
                                <DateDelivered />
                            </label>
                        </>
                    }
                    {
                        ((payOnDeliveryFiltered?.length ?? 0) > 0 && props.typeDelivery === 'Shipping') &&
                        <>
                        </>
                    }
                    {(props.typeDelivery === 'Pending' || isPayonDeliveryShipping) &&
                        <>
                            {(isPayonDeliveryShipping) &&
                                <> Existem vendas com metódo de pagamento "na entrega", informe qual foi o tipo de pagamento: </>}
                            <Autocomplete
                                value={isPayonDeliveryShipping ? selectedPayOnDeliveryModal : selectedDeliveryModal}
                                onChange={(event: any, newValue: DeliveriesReturnApiProps | null) => {
                                    isPayonDeliveryShipping ? setselectedPayOnDeliveryModal(newValue) : setSelectedDeliveryModal(newValue);
                                }}
                                noOptionsText="Não encontrado"
                                id="controllable-states-demo"
                                options={(isPayonDeliveryShipping) ? payOnDeliveryFiltered : props.deliveriesFiltered}
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
                        </>
                    }
                    {selectedDeliveryModal?.status === 'Pending' &&
                        <DeliveryAddressChange selectedDeliveryModal={selectedDeliveryModal} searchDeliveries={props.searchDeliveries} />
                    }
                    {
                        props.typeDelivery === 'Shipping' &&
                        <DefaultButton selectedColor='--Green'> Salvar</DefaultButton>
                    }
                </S.ModalDiv>
                <DefaultButtonCloseModal onClick={() => props.setIsModalDeliveryChangesOpen(false)}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>
    )
}