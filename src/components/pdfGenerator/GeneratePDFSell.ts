import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { cellNumberFormat, cpfCnpjFormat, phoneNumberFormat } from "../../utils/utils";
import { User } from "../../types/User";
import { SharedUser } from "@shared/api/login/validate";
import { formatCurrencyNew } from "src/masks/CurrencyMask";

interface ProductsType {
    name: string;
    id: number;
    totalvalue: number;
    initialvalue: number;
    quantity: number;
    totalDiscount: number | null;
};

export const GeneratePDFSell = (sumDiscount: number, sumValue: number, sumvalueformated: string, sumquantity: number, listProducts: ProductsType[], dataSell: String, codRef: number | null, userInfo: SharedUser | null) => {

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const ProductData = listProducts.map((product) => {
        return [
            { text: product.quantity }, { text: product.name }, { text: formatCurrencyNew(product.totalDiscount) }, { text: formatCurrencyNew(product.totalvalue) }
        ]
    })



    const docParams = {
        pageSize: {
            width: 210,
            height: 'auto'
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
                    alignment: 'center',
                    body: [
                        [userInfo?.urlLogo ? { image: 'logo', width: 180, alignment: 'center' } : { text: '' }],
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
                    userInfo?.addressRelation?.addressStreet ? (
                        (userInfo?.addressRelation?.addressStreet ?? '') + ', '
                        + (userInfo?.addressRelation?.addressNumber ?? '') + ', '
                        + (userInfo?.addressRelation?.addressNeighborhood ?? '') + ', '
                        + (userInfo?.addressRelation?.city.name ?? '') + ' - '
                        + (userInfo?.addressRelation?.city.state.uf ?? '') + '\n\n') : '',
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
                    '____________________________________________\n',
                ],
                margins: [0, 0, 0, 0]
            },
            {
                style: 'tableItens',
                table: {
                    widths: ['auto', 65, 'auto', 'auto'],
                    body: [
                        [{ text: 'Qtd' }, { text: 'Item' }, { text: 'Desc.' }, { text: 'Valor' }],
                        ...ProductData
                    ]
                },
                layout: 'noBorders'
            },
            {
                style: 'main',
                alignment: 'left',
                margin: [0, 3],
                columns: [
                    {
                        text: 'Qtd Total Itens:',
                        alignment: 'left'
                    }, {
                        text: sumquantity,
                        alignment: 'right'
                    }
                ]
            },
            {
                style: 'main',
                alignment: 'left',
                margin: [0, 0],
                columns: [
                    {
                        text: 'Subtotal:',
                        alignment: 'left'
                    }, {
                        text: formatCurrencyNew(sumValue + sumDiscount),
                        alignment: 'right'
                    }
                ]
            },
            {
                style: 'main',
                alignment: 'left',
                margin: [0, 0],
                columns: [
                    {
                        text: 'Desconto:',
                        alignment: 'left'
                    }, {
                        text: formatCurrencyNew(sumDiscount),
                        alignment: 'right'
                    }
                ]
            },
            {
                style: 'highLight',
                alignment: 'left',
                margin: [0, 0],
                columns: [
                    {
                        text: 'Total:',
                        alignment: 'left'
                    }, {
                        text: sumvalueformated,
                        alignment: 'right'
                    }
                ]
            },
            {
                style: 'main',
                alignment: 'left',
                margin: [0, 8],
                columns: [
                    {
                        text: 'Venda Nº:',
                        alignment: 'left'
                    }, {
                        text: codRef,
                        alignment: 'right'
                    }
                ]
            },
            {
                style: 'main',
                alignment: 'center',
                text: 'SEM VALOR FISCAL'
            },
            {
                style: 'main',
                alignment: 'center',
                text: `${dataSell}`
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
            highLight: {
                fontSize: 11, bold: true
            },
            main: {

                fontSize: 9
            },
            footer: {
                fontSize: 5, margin: [0, 20, 0, 0]
            },
            bold: {
                bold: true
            }
        },
        images: {
            logo: userInfo?.urlLogo ?? ''
        }

    }
    //@ts-ignorex
    pdfMake.createPdf(docParams).print()
}


