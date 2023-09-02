import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { cellNumberFormat, cpfCnpjFormat, phoneNumberFormat } from "../../utils/utils";
import { User } from "../../types/User";

interface ProductsType {
    name: string;
    id: number;
    totalvalue: number;
    initialvalue: number;
    quantity: number;
};

export const GeneratePDFSell = (sumvalueformated: string, sumquantity: number, listProducts: ProductsType[], dataSell: String, codRef: number | null, userInfo: User | null) => {

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const ProductData = listProducts.map((product) => {
        return [
            { text: product.quantity }, { text: product.name }, { text: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.totalvalue) }
        ]
    })



    const docParams = {
        pageSize: {
            width: 200,
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
                    widths: [170],
                    alignment: 'center',
                    body: [
                        [userInfo?.urlLogo ? { image: 'logo', width:170,  alignment: 'center' } : { text: '' }],
                    ]
                },
                layout: 'noBorders',
            },
            {
                style: `${userInfo?.urlLogo ? 'main' : 'title'}'`,
                text: [
                    (userInfo?.name ?? '') + '\n',
                ],
                margins: [0, 0, 0, 0]
            },
            {
                style: 'main',
                text: [
                    (userInfo?.cnpj ? 'Cnpj: ' + cpfCnpjFormat(userInfo.cnpj, userInfo.cnpj) + '\n' : ''),
                    userInfo?.phone ? 'Telefone: ' + phoneNumberFormat(userInfo?.phone ?? '', userInfo?.phone ?? '') + '\n' : '',
                    userInfo?.cellPhone ? 'Celular: ' + cellNumberFormat(userInfo?.cellPhone ?? '', userInfo?.cellPhone ?? '') + '\n' : '',
                    userInfo?.adressStreet ? (
                        userInfo?.adressStreet + ', '
                        + userInfo?.adressNumber + ', '
                        + userInfo?.adressNeighborhood + ', '
                        + userInfo?.adressCity + ' - '
                        + userInfo?.adressState) + '\n\n' : '',
                ],
                margins: [0, 0, 0, 0]
            },
            {
                style: 'title',
                table: {
                    widths: [170],
                    alignment: 'center',
                    body: [
                        [{ text: 'Comprovante de venda \n\n', alignment: 'center' }],
                    ]
                },
                layout: 'noBorders',
            },
            {
                style: 'main',
                text: [
                    'Itens da venda\n',
                    '_________________________________________\n',
                ],
                margins: [0, 0, 0, 0]
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
                        [{ text: 'VENDA Nº:', colSpan: 2 }, {}, { text: codRef, alignment: 'right' }],
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
            {
                style: 'footer',
                text: ['Emitido com Safyra® - Gestão do seu negócio (safyra.com.br)'],
                
            }
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
            },
            footer: {
                fontSize: 5,margin: [0, 20, 0, 0]
            }
        },
        images : {
            logo: userInfo?.urlLogo ?? ''
        }

    }
    //@ts-ignorex
    pdfMake.createPdf(docParams).print()
}


