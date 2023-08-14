import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ReturnData } from "../utils/utils";
import { DeliveriesReturnApiProps } from "../pages/Deliveries";

interface ProductsType {
    name: string;
    id: number;
    totalvalue: number;
    initialvalue: number;
    quantity: number;
};
interface SellsProductsReceiveApi {
    id: number;
    storeId: number,
    sellId: number;
    idProduct: number;
    quantity: number,
    valueProduct: number;
    totalValue: number;
    descriptionProduct: string;
    created_at: Date;
};

export const GeneratePDF = (listProducts: ProductsType[], sumvalueformated: string, sumquantity: number) => {

    const CurrentData = ReturnData()
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const DeliveriesData = listProducts.map((product) => {
        return [
            { text: product.quantity }, { text: product.name }, { text: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.totalvalue) }
        ]
    })


    const docParams = {
        pageSize: {
            width: 180,
            height: 'auto' as number | "auto",
        },
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
                style: 'title',
                table: {
                    widths: [180],
                    body: [
                        [{ text: '          Comprovante de venda' }],

                    ]
                },
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
                    widths: ['auto', 90, 'auto'],
                    body: [
                        [{ text: 'Qnt' }, { text: 'Item' }, { text: 'Valor' }],
                        ...DeliveriesData,
                        [{ text: ' ' }, { text: ' ' }, { text: ' ' }],
                        [{ text: 'VALOR TOTAL:', colSpan: 2 }, {}, { text: sumvalueformated }],
                        [{ text: 'QTD ITENS:', colSpan: 2 }, {}, { text: sumquantity, alignment: 'right' }],
                        [{ text: ' ' }, { text: ' ' }, { text: ' ' }],
                        [{ text: 'SEM VALOR FISCAL', colSpan: 3, alignment: 'center' }, {}, {}],
                        [{ text: `${CurrentData}`, colSpan: 3, alignment: 'center' }, {}, {}],
                    ]
                },
                layout: 'noBorders'
            },
            {
                style: 'main',
                text: [
                    //'\n****************Sem valor fiscal***************\n',
                    //`${CurrentData}`,



                ],


            },
        ],

        styles: {

            title: {
                fontSize: 15, bold: true
            },
            tableItens: {
                fontSize: 9
            },

            main: {

                fontSize: 9
            }
        }

    }
    pdfMake.createPdf(docParams).print()
}





export const GeneratePDFSalesControl = (listProducts: SellsProductsReceiveApi[], sumvalueformated: string, sumquantity: number, dataSell: String, UserStore: number) => {

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const ProductData = listProducts.map((product) => {
        if (product.sellId === UserStore) {
            return [
                { text: product.quantity }, { text: product.descriptionProduct }, { text: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.totalValue) }
            ]
        }
        else {
            return [{}, {}, {}]
        }
    })


    const docParams = {
        pageSize: {
            width: 180,
            height: 'auto' as number | "auto",
        },
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
                style: 'title',
                table: {
                    widths: [180],
                    body: [
                        [{ text: '          Comprovante de venda' }],

                    ]
                },
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
                    widths: ['auto', 90, 'auto'],
                    body: [
                        [{ text: 'Qnt' }, { text: 'Item' }, { text: 'Valor' }],
                        ...ProductData,
                        [{ text: ' ' }, { text: ' ' }, { text: ' ' }],
                        [{ text: 'VALOR TOTAL:', colSpan: 2 }, {}, { text: sumvalueformated }],
                        [{ text: 'QTD ITENS:', colSpan: 2 }, {}, { text: sumquantity, alignment: 'right' }],
                        [{ text: ' ' }, { text: ' ' }, { text: ' ' }],
                        [{ text: 'SEM VALOR FISCAL', colSpan: 3, alignment: 'center' }, {}, {}],
                        [{ text: `${dataSell}`, colSpan: 3, alignment: 'center' }, {}, {}],
                    ]
                },
                layout: 'noBorders'
            },
            {
                style: 'main',
                text: [
                    //'\n****************Sem valor fiscal***************\n',
                    //`${CurrentData}`,



                ],


            },
        ],

        styles: {

            title: {
                fontSize: 15, bold: true
            },
            tableItens: {
                fontSize: 9
            },
            main: {

                fontSize: 9
            }
        }

    }
    pdfMake.createPdf(docParams).print()
}




export const GeneratePDFDeliveryList = (deliveries: DeliveriesReturnApiProps[], storeName: string) => {

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    // { text: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(delivery.itemSell.totalValue) },

    const DeliveriesData = deliveries.map((delivery) => {
        return [
            { text: delivery.itemSell.sell.codRef },
            { text: delivery.itemSell.descriptionProduct },
            { text: delivery.itemSell.quantity },
            { text: delivery.client?.name ?? 'Não informado' },
            {
                text: delivery.address.addressStreet + ', '
                    + delivery.address.addressNumber + ', '
                    + delivery.address.addressNeighborhood + ', '
                    + delivery.address.addressCity + ' - '
                    + delivery.address.addressState
            },
            {
                text: new Date(delivery.scheduledDate).toLocaleString('pt-BR', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                    weekday: 'long'
                })
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
                style: 'title',
                table: {
                    // widths: [180],
                    body: [
                        [{ text: 'Roteiro Logístico - ' + storeName + ' -  ' + (new Date().toLocaleDateString()) }],

                    ]

                },
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
                        [{ text: 'Venda' }, { text: 'Produto' }, { text: 'Qnt' }, { text: 'Cliente' }, { text: 'Endereço' }, { text: 'Data Agendada' }],
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
        ],

        styles: {

            title: {
                fontSize: 15, bold: true
            },
            tableItens: {
                fontSize: 9
            },
            main: {

                fontSize: 9
            }
        }

    }
    pdfMake.createPdf(docParams).print()
}