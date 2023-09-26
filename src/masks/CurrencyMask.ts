import React from "react";

export const CurrencyMask = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let format = e.target.value
    format = format.replace(/\D/g, "")
    format = format.replace(/(\d)(\d{2})$/, "$1,$2")
    format = format.replace(/(?=(\d{3})+(\D))\B/g, ".");
    format = `R$${format}`
    e.target.value = format
    return e
}

export const CurrencyNumberMask = (e:number) => {
    if (!e) { return ''}
    let format = String(e)
    format = parseFloat(String(e)).toFixed(2)
    format = "R$" + format.replace('.', ',')
    return format
}

export const CurrencyMaskValue = (e: string) => {
    let format = e
    format = format.replace(/\D/g, "")
    format = format.replace(/(\d)(\d{2})$/, "$1,$2")
    format = format.replace(/(?=(\d{3})+(\D))\B/g, ".");
    format = `R$${format}`
    e = format
    return e
}

export const CurrencyMaskWithOutRS = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let format = e.target.value
    format = format.replace(/\D/g, "")
    format = format.replace(/(\d)(\d{2})$/, "$1,$2")
    format = format.replace(/(?=(\d{3})+(\D))\B/g, ".");
    e.target.value = format
    return e
}

