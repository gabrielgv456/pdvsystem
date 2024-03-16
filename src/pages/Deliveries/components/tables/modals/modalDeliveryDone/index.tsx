import Modal from '@mui/material/Modal';
import { MuiBox } from '../../../../../../components/box/muiBox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DeliveriesReturnApiProps, TypeDeliveries } from '../../../..';
import { useContext, useState } from 'react';
import * as S from './style'
import { DateDelivered } from '../components/dateDelivered';
import { DefaultButton } from '../../../../../../components/buttons/defaultButton';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../../../components/buttons/closeButtonModal';
import { MethodsType } from '../../../../../Sell';
import { PaymentDelivery } from '../components/Payment';
import { useMessageBoxContext } from '../../../../../../contexts/MessageBox/MessageBoxContext';
import { useApi } from '../../../../../../hooks/useApi';
import { AuthContext } from '../../../../../../contexts/Auth/AuthContext';

interface ModalDeliveryChangesProps {
    isModalDeliveryDoneOpen: boolean,
    setIsModalDeliveryDoneOpen: (value: boolean) => void
    deliveriesFiltered: DeliveriesReturnApiProps[]
    searchDeliveries: () => void
    typeDelivery: TypeDeliveries
    itensSelected: number[]
}

export interface typeSetPaymentsonDelivery {
    storeId: number,
    idDelivery: number | null
    idVenda: number | null
    codRef: number | null
    listMethods: MethodsType[]
}


export const ModalDeliveryDone = (props: ModalDeliveryChangesProps) => {

    const moreOneDelivery = props.deliveriesFiltered.length > 1
    const { MessageBox } = useMessageBoxContext()
    const auth = useContext(AuthContext)
    const { setPaymentsonDelivery, changeStatusDeliveries } = useApi()

    const [listMethods, setMethods] = useState<MethodsType[]>([])
    const [deliveredDate, setDeliveredDate] = useState<Date | null>(new Date())
    const [value, setValue] = useState([0])

    const payOnDeliveryFiltered = (props.deliveriesFiltered.filter(deliveryFilter => deliveryFilter.onDeliveryPayValue))
    const [selectedPayOnDeliveryModal, setselectedPayOnDeliveryModal] = useState<DeliveriesReturnApiProps | null>(payOnDeliveryFiltered.length === 1 ? payOnDeliveryFiltered[0] : null)


    function handleCloseModalDeliveryDone() {
        props.setIsModalDeliveryDoneOpen(false)
        setMethods([])
        setValue([0])
    }
    const isPayonDeliveryShipping = payOnDeliveryFiltered.length > 0 && props.typeDelivery === 'Shipping'


    const dataRequestApi: typeSetPaymentsonDelivery = {
        storeId: auth.idUser,
        idDelivery: selectedPayOnDeliveryModal?.id ?? null,
        idVenda: selectedPayOnDeliveryModal?.itemSell.sell.id ?? null,
        codRef: selectedPayOnDeliveryModal?.itemSell.sell.codRef ?? null,
        listMethods: listMethods
    }

    const totalPay = dataRequestApi.listMethods.reduce((acc, item) => {
        return acc + item.value
    }, 0)

    async function handleDoneDelivery(isPayonDeliveryShipping: boolean) {
        try {
            if (isPayonDeliveryShipping) {
                if (totalPay !== (selectedPayOnDeliveryModal?.onDeliveryPayValue ?? 0)) {
                    throw new Error(`Valor a receber diferente do recebido, informe o valor corretamente!`)
                }
                const response = await setPaymentsonDelivery(dataRequestApi)
                if (!response.Success) {
                    throw new Error(response.Erro)
                }
                props.searchDeliveries()
                MessageBox('success', 'Pagamento incluso com sucesso! Prossiga com a baixa da entrega')
            } else {
                if (String(deliveredDate) === 'Invalid Date' || !(deliveredDate)) {
                    throw new Error('Data inválida, confira e tente novamente!')
                }
                const response = await changeStatusDeliveries({ storeId: auth.idUser, itensSellToChange: props.itensSelected, newStatus: 'Done', deliveredDate: deliveredDate })
                if (!response.Success) {
                    throw new Error(response.Erro)
                }
                props.searchDeliveries()
                MessageBox('success', 'Entrega concluída com sucesso!')
            }
        } catch (error) {
            MessageBox('warning', 'Falha ao concluir entrega! ' + (error as Error).message)
        }
    }

    return (
        <Modal open={props.isModalDeliveryDoneOpen} onClose={handleCloseModalDeliveryDone}>
            <MuiBox desktopWidth={700} mobileWidthPercent='80%' padding='40px'>
                <h3 style={{ width: 'max-content', margin: '0 auto', marginBottom: 15 }}>
                    Concluir Entrega
                </h3>
                <S.ModalDiv>
                    {(!isPayonDeliveryShipping) &&
                        <label style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div>Informe a data em que a{moreOneDelivery && 's'} entrega{moreOneDelivery && 's'} {moreOneDelivery ? 'foram' : 'foi'} realizada{moreOneDelivery && 's'}:</div>
                            <DateDelivered deliveredDate={deliveredDate} setDeliveredDate={setDeliveredDate} />
                        </label>
                    }
                    {(isPayonDeliveryShipping) &&
                        <>
                            Existem vendas com metódo de pagamento "na entrega", antes informe qual foi o tipo de pagamento:
                            <Autocomplete
                                value={selectedPayOnDeliveryModal}
                                onChange={(event: any, newValue: DeliveriesReturnApiProps | null) => {
                                    setselectedPayOnDeliveryModal(newValue)
                                }}
                                noOptionsText="Não encontrado"
                                id="controllable-states-demo"
                                options={payOnDeliveryFiltered}
                                getOptionLabel={(option) => (
                                    option.itemSell.sell.codRef + ' - ' +
                                    (option.client?.name ?? 'Cliente não informado') + ' - ' +
                                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(option.onDeliveryPayValue)
                                )}
                                sx={{ width: '100%' }}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="Selecione a entrega *"
                                    />
                                } />
                            <label>Valor: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedPayOnDeliveryModal?.onDeliveryPayValue ?? 0)} -
                                Restante: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((selectedPayOnDeliveryModal?.onDeliveryPayValue ?? 0) - totalPay)}</label>

                            <PaymentDelivery listMethods={listMethods} setMethods={setMethods} value={value} setValue={setValue} />
                        </>
                    }
                    <label style={{ display: 'flex', alignSelf: 'flex-end' }}>
                        <DefaultButton selectedColor='--Green' onClick={() => handleDoneDelivery(isPayonDeliveryShipping)}> Salvar</DefaultButton>
                    </label>
                </S.ModalDiv>
                <DefaultButtonCloseModal onClick={() => props.setIsModalDeliveryDoneOpen(false)}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>
    )
}