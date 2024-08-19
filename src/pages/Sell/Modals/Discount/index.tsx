import Modal from '@mui/material/Modal';
import { MuiBox } from '../../../../components/box/muiBox';
import { DefaultButtonCloseModal, DefaultIconCloseModal } from '../../../../components/buttons/closeButtonModal';
import * as S from './style'
import { Divider } from '@mui/material';
import { DefaultButton } from '../../../../components/buttons/defaultButton';
import { ListSellProps } from '../../ListSell/ListSell';
import { useState } from 'react'
import {  formatCurrencyNew, removeCurrencyMaskNew } from '../../../../masks/CurrencyMask';
import { FormatChangePercent, FormatPercent } from '../../../../utils/utils';
import { useMessageBoxContext } from '../../../../contexts/MessageBox/MessageBoxContext';

interface ModalDiscountProps {
    isModalDiscountOpen: boolean
    setIsModalDiscountOpen: (value: boolean) => void
    props: ListSellProps
}

export const ModalDiscount = (props: ModalDiscountProps) => {

    const [DiscountValues, setDiscountValues] = useState({
        valueProduct: props.props.item.initialvalue - (props.props.item.discountValue ?? 0),
        percentDiscount: FormatPercent((props.props.item.discountPercent ?? 0) + ''),
        realDiscount: (props.props.item.discountValue ?? 0)
    })
    const { MessageBox } = useMessageBoxContext()

    const changeRealDiscount = async (value: string) => {

        const valueDiscount = removeCurrencyMaskNew(value ?? '0')

        if (valueDiscount >= props.props.item.initialvalue) {
            MessageBox('info', `Valor do desconto não pode ser maior ou igual a R$${props.props.item.initialvalue}`)
            return
        }
        setDiscountValues({
            realDiscount: (valueDiscount),
            percentDiscount: FormatChangePercent(((valueDiscount / props.props.item.initialvalue) * 100) + ''),
            valueProduct: ((props.props.item.initialvalue - valueDiscount))
        })
    }

    const changePercentDiscount = async (value: string) => {
        const floatPercentDiscount = parseFloat(FormatPercent(value ?? 0) ?? 0)
        if (floatPercentDiscount >= 100) {
            MessageBox('info', 'Percentual de desconto pode ser no máximo 99,9%!')
            return
        }
        const discountValue = isNaN(floatPercentDiscount) ? 0 : (floatPercentDiscount / 100) * props.props.item.initialvalue

        setDiscountValues({
            realDiscount: (discountValue),
            percentDiscount: FormatPercent(value),
            valueProduct: (props.props.item.initialvalue - discountValue)
        })
    }

    const changeValueProduct = async (value: string) => {

        const newValueProduct = removeCurrencyMaskNew(value ?? 0)

        if (newValueProduct <= 0) {
            MessageBox('info', 'Preço do produto precisa ser maior que zero!')
            return
        }
        if (newValueProduct > props.props.item.initialvalue) {
            MessageBox('info', `Preço do produto pode ser no máximo R$${props.props.item.initialvalue} ! Se precisar aumentar o valor do produto acesse o modulo de "Gestão de Estoque" `)
            return
        }
        setDiscountValues({
            realDiscount: (props.props.item.initialvalue - newValueProduct),
            percentDiscount: FormatPercent((((props.props.item.initialvalue - newValueProduct) / props.props.item.initialvalue) * 100).toFixed(2) + ''),
            valueProduct: (newValueProduct)
        })
    }

    const handleSave = async () => {
        if (props.props.item.initialCost > DiscountValues.valueProduct) {
            if (!window.confirm('Deseja realmente vender o item abaixo do valor de custo?')) return
        }
        props.props.handleDiscount(props.props.item.id, DiscountValues.realDiscount > 0 ? DiscountValues.realDiscount : null, parseFloat(FormatPercent(DiscountValues.percentDiscount)))
        MessageBox('success', 'Desconto aplicado com sucesso!')
        props.setIsModalDiscountOpen(false)
    }

    return (
        <Modal open={props.isModalDiscountOpen} onClose={() => props.setIsModalDiscountOpen(false)}>
            <MuiBox desktopWidth={650} mobileWidthPercent='90%' padding='25px'>
                <S.DivMain>
                    <h3 style={{ width: 'max-content', margin: '0 auto', marginBottom: 15 }}> Conceder Desconto </h3>

                    <label><b>Produto:</b> {props.props.item.name}</label>
                    <Divider />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Preço unitário original: R${props.props.item.initialvalue}</label>
                        Custo: R${props.props.item.initialCost}
                    </div>
                    <S.DivInputs>
                        <S.InputTextField
                            value={formatCurrencyNew(DiscountValues.valueProduct)}
                            onChange={(e) => { changeValueProduct(e.target.value) }}
                            label='Preço Unitário'
                            variant="outlined"
                        />
                        <S.InputTextField
                            value={DiscountValues.percentDiscount}
                            onChange={(e) => { changePercentDiscount(e.target.value) }}
                            label='Desconto (%)'
                            variant="outlined"
                        />
                        <S.InputTextField
                            value={formatCurrencyNew(DiscountValues.realDiscount)}
                            onChange={(e) => { changeRealDiscount(e.target.value) }}
                            label='Desconto (R$)'
                            variant="outlined"
                        />
                    </S.DivInputs>
                    <DefaultButton onClick={handleSave} selectedColor='--Green' style={{ width: '100px', alignSelf: 'center' }}>Salvar</DefaultButton>
                </S.DivMain>

                <DefaultButtonCloseModal onClick={() => props.setIsModalDiscountOpen(false)}>
                    <DefaultIconCloseModal />
                </DefaultButtonCloseModal>
            </MuiBox>
        </Modal>
    )
}