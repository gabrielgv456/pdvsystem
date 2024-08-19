import { onlyNumbers } from "../utils/utils";

export const formatCurrencyNew = (value: number|null, noSymbol = false): string => {
    if(!value) value = 0;
    return value.toLocaleString('pt-BR', {
        style: noSymbol ? 'decimal' : 'currency',
        ...(noSymbol ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } : { currency: 'BRL' })
    })
}

export const removeCurrencyMaskNew = (value: string) => {
    return Number(onlyNumbers(value)) / 100
}
