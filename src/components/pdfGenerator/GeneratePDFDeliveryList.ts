import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { DateFormatWeek, cellNumberFormat, cpfCnpjFormat, phoneNumberFormat } from "../../utils/utils";
import { User } from "../../types/User";
import { ResultDeliveryType } from "../../interfaces/useApi/findDeliveries";

export const GeneratePDFDeliveryList = (deliveries: ResultDeliveryType[], storeName: string, userInfo: User | null) => {

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const lastDeliveries: Array<number> = []
    const DeliveriesData = deliveries.map((delivery,) => {
        const countRowSpam = deliveries.reduce((acc, item) => {
            if (item.itemSell.sell.codRef === delivery.itemSell.sell.codRef) { return acc + 1; } else { return acc; }
        }, 0);
        if (delivery.itemSell.sell.codRef) lastDeliveries.push(delivery.itemSell.sell.codRef)
        const countLastDeliveries = lastDeliveries.reduce((acc, item) => {
            if (item === delivery.itemSell.sell.codRef) { return acc + 1 } else { return acc }
        }, 0)
        return [
            { text: `${countLastDeliveries <= 1 ? delivery.itemSell.sell.codRef : ''}`, rowSpan: countRowSpam },
            { text: `${countLastDeliveries <= 1 ? delivery.client?.name ?? 'Não informado' : ''}`, rowSpan: countRowSpam },
            {
                text: `${countLastDeliveries <= 1 ?
                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(delivery.itemSell.sell.sellValue)
                    : ''}`, rowSpan: countRowSpam
            },
            {
                text: `${countLastDeliveries <= 1 ?
                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(delivery.onDeliveryPayValue ?? 0)
                    : ''}`, rowSpan: countRowSpam
            },
            { text: delivery.itemSell.descriptionProduct },
            { text: delivery.itemSell.quantity },
            {
                text: delivery.address.addressStreet + ', '
                    + delivery.address.addressNumber + ', '
                    + delivery.address.addressNeighborhood + ', '
                    + (delivery.address.city?.name ?? '') + ' - '
                    + (delivery.address.city?.state.uf ?? '')
            },
            {
                text: DateFormatWeek(delivery.scheduledDate)
            }
        ]
    })
    // [{ text: 'Venda' }, { text: 'Produto' }, { text: 'Qnt' }, { text: 'Valor' }, { text: 'Cliente' }, { text: 'Endereço' }],


    const docParams = {

        pageMargins: 15,
        PageOrientation: 'landscape',
        //pageMargins: [15,50,15,40],

        //header:[],
        //content:[{
        //   text:"teste",
        //   fontSize:15,
        // }],
        //footer:[]
        content: [
            // {
            //     style: 'title',
            //     text: 'Comprovante de Venda'
            // },
            {
                table: {
                    widths: ['auto', 'star', 'auto'],
                    body: [
                        [
                            userInfo?.urlLogo ?
                                { image: 'logo', width: 150, rowSpan: 5 } :
                                { text: '', rowSpan: 5 },
                            { text: (userInfo?.name ?? '') + '\n', style: 'title' },

                            { text: (new Date().toLocaleDateString()), alignment: 'right', style: 'title' },

                        ],
                        [{}, { text: `${userInfo?.cnpj ? 'CNPJ: ' + cpfCnpjFormat(userInfo.cnpj, userInfo.cnpj) : ''}` }, {}],
                        [{}, { text: userInfo?.phone ? 'Telefone: ' + phoneNumberFormat(userInfo?.phone ?? '', userInfo?.phone ?? '') + '\n' : '' }, {}],
                        [{}, { text: userInfo?.cellPhone ? 'Celular: ' + cellNumberFormat(userInfo?.cellPhone ?? '', userInfo?.cellPhone ?? '') + '\n' : '' }, {}],
                        [{}, {
                            text: userInfo?.adressStreet ? (
                                userInfo?.adressStreet + ', '
                                + userInfo?.adressNumber + ', '
                                + userInfo?.adressNeighborhood + ', '
                                + userInfo?.adressCity + ' - '
                                + userInfo?.adressState + '\n\n') : ''
                        }, {}]
                    ]
                },
                layout: 'noBorders',
            },

            {
                style: 'subTitle',
                text: ['Roteiro Logístico \n'],
                alignment: 'center',
                layout: 'noBorders',
            },
            {
                style: 'main',
                text: ['\n'
                    //         //'\nLoja Modelo\n',
                    //         //'CNPJ: 25.302.229/0001-01\n',
                    //         //'Av Benjamim Constat - Ns Sra Fatima
                    //         '\n\n',

                    //         'Itens da venda\n',
                    //         '_______________________________________________\n',


                ],
                // margins: [0, 0, 0, 20]



            },
            {
                style: 'tableItens',
                table: {
                    // widths: ['auto'],
                    body: [
                        [{ text: 'Venda' }, { text: 'Cliente' }, { text: 'Total' }, { text: 'A receber' }, { text: 'Produto' }, { text: 'Qnt' }, { text: 'Endereço' }, { text: 'Data Agendada' }],
                        ...DeliveriesData,
                        // [{ text: ' ' }, { text: ' ' }, { text: ' ' }],
                        // [{ text: 'VALOR TOTAL:', colSpan: 2 }, {}, { text: 's' }],
                        // [{ text: 'QTD ITENS:', colSpan: 2 }, {}, { text: 'a', alignment: 'right' }],
                        // [{ text: ' ' }, { text: ' ' }, { text: ' ' }],
                        // [{ text: 'SEM VALOR FISCAL', colSpan: 3, alignment: 'center' }, {}, {}],
                        // [{ text: `testeee`, colSpan: 3, alignment: 'center' }, {}, {}],
                    ]
                },
                // layout: 'noBorders'
            },
            {
                style: 'main',
                text: [
                    //'\n****************Sem valor fiscal***************\n',
                    //`${CurrentData}`,



                ],


            },
            {
                style: 'footer',
                alignment: 'bottom',
                text: ['Emitido com Safyra® - Gestão do seu negócio (safyra.com.br)']
            },
        ],

        styles: {

            title: {
                fontSize: 15, bold: true
            },
            subTitle: {
                fontSize: 16, bold: true, decoration: "underline",
            },
            tableItens: {
                fontSize: 9
            },
            main: {

                fontSize: 9
            },
            footer: {
                margin: [0, 20, 0, 0], fontSize: 8
            }
        },
        images: {
            logo: userInfo?.urlLogo
        }

    }
    //@ts-ignore
    pdfMake.createPdf(docParams).print()
}