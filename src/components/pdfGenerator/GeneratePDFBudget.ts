import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { cellNumberFormat, cpfCnpjFormat, phoneNumberFormat } from "../../utils/utils";
import { User } from "../../types/User";
import { ClientsType, SellersandClientsType } from "../../pages/Sell/Modals/CheckOut";
import { formatCurrencyNew } from "src/masks/CurrencyMask";

interface ProductsType {
    name: string;
    id: number;
    totalvalue: number;
    initialvalue: number;
    quantity: number;
    totalDiscount: number | null
};

export const GeneratePDFBudget = async (sumDiscount: number, sumValue: number, sumvalueformated: string, sumquantity: number, listProducts: ProductsType[], dataSell: String, codRef: number | null, userInfo: User | null, clientInfo: ClientsType | null, sellerInfo: SellersandClientsType | null) => {

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const ProductData = listProducts.map((product) => {
        return [
            { text: product.quantity }, { text: product.name }, { text: formatCurrencyNew(product.totalDiscount ?? 0) }, { text: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.totalvalue) }
        ]
    })

    const docParams = {
        pageMargins: 15,
        PageOrientation: 'landscape',
        pageSize: 'A4',
        //pageMargins: [15,50,15,40],

        //header:[],
        //content:[{
        //   text:"teste",
        //   fontSize:15,
        // }],
        //footer:[]

        content: [

            {
                table: {
                    widths: ['auto', 'star', 'auto'],
                    body: [
                        [
                            userInfo?.urlLogo ?
                                { image: 'logo', width: 150, rowSpan: 5 } :
                                { text: '', rowSpan: 5 },
                            { text: (userInfo?.name ?? '') + '\n', style: 'title' },

                            { text: dataSell, alignment: 'right', style: 'title' },

                        ],
                        [{}, { text: `${userInfo?.cnpj ? 'CNPJ: ' + cpfCnpjFormat(userInfo.cnpj, userInfo.cnpj) : ''}` }, {}],
                        [{}, { text: userInfo?.phone ? 'Telefone: ' + phoneNumberFormat(userInfo?.phone ?? '', userInfo?.phone ?? '') + '\n' : '' }, {}],
                        [{}, { text: userInfo?.cellPhone ? 'Celular: ' + cellNumberFormat(userInfo?.cellPhone ?? '', userInfo?.cellPhone ?? '') + '\n' : '' }, {}],
                        [{}, {
                            text: userInfo?.address?.addressStreet ? (
                                userInfo?.address?.addressStreet ?? '' + ', '
                                + userInfo?.address?.addressNumber ?? '' + ', '
                                + userInfo?.address?.addressNeighborhood ?? '' + ', '
                                + userInfo?.address?.city.name ?? '' + ' - '
                                + userInfo?.address?.city.state.uf ?? '') : ''
                        }, {}]
                    ]
                },
                layout: 'noBorders',
            },
            {
                style: 'subTitle',
                text: ['Orçamento'],
                alignment: 'center',
                layout: 'noBorders',
            },
            {
                style: 'client',
                layout: 'noBorders',
                table: {
                    widths: ['star', 'auto', 'auto'],
                    body: [
                        [{ text: `Cliente: ${clientInfo?.name ?? 'Não informado'} ` }, { text: `CPF/CNPJ: ${cpfCnpjFormat(clientInfo?.cpf ?? '', clientInfo?.cpf ?? '') ?? ''} ` }, { text: `E-mail: ${clientInfo?.email ?? ''} ` }],
                        [{ text: `Celular: ${cellNumberFormat(clientInfo?.cellNumber ?? '', clientInfo?.cellNumber ?? '') ?? ''} ` }, { text: `Telefone: ${phoneNumberFormat(clientInfo?.phoneNumber ?? '', clientInfo?.phoneNumber ?? '') ?? ''} `, colSpan: 2 }, {}],
                        [{
                            text: `Endereço: ${clientInfo?.address?.addressStreet ? (
                                clientInfo?.address.addressStreet + ', '
                                + clientInfo?.address.addressNumber + ', '
                                + clientInfo?.address.addressNeighborhood + ', '
                                + clientInfo?.address.city.name + ' - '
                                + clientInfo?.address.city.state.uf) : ''
                                }`, colSpan: 3
                        }, {}, {}],
                        [{ text: '' }, {}, {}],
                        [{ text: `Vendedor: ${sellerInfo?.name ?? 'Não informado'}` }, {}, {}]
                    ]
                }
            },
            {
                style: 'tableItens',
                table: {
                    widths: ['auto', 'star', 'auto', 'auto'],
                    body: [
                        [{ text: 'Qtd', style: 'bold' }, { text: 'Descrição do produto', style: 'bold' }, { text: 'Desconto Total', style: 'bold' }, { text: 'Valor Total', style: 'bold' }],
                        ...ProductData,
                        [{ text: ' ' }, { text: ' ' }, { text: ' ' }, { text: ' ' }],
                        [{ text: 'Qtd total itens', colSpan: 2 }, {}, { text: sumquantity, alignment: 'center', colSpan: 2 }, {}],
                        [{ text: 'Subtotal', colSpan: 2 }, {}, { text: formatCurrencyNew(sumValue + sumDiscount), colSpan: 2, alignment: 'center' }, {}],
                        [{ text: 'Desconto', colSpan: 2 }, {}, { text: formatCurrencyNew(sumDiscount), colSpan: 2, alignment: 'center' }, {}],
                        [{ text: 'TOTAL', colSpan: 2, style: 'highlight' }, {}, { text: sumvalueformated, colSpan: 2, alignment: 'center', style: 'highlight' }, {}],

                    ]
                }
            },
            {
                style: 'footer',
                alignment: 'bottom',
                text: ['Emitido com Safyra® - Gestão do seu negócio (safyra.com.br)']
            },
        ],

        styles: {

            title: {
                fontSize: 16, bold: true,
            },
            highlight:{
                fontSize: 14, bold: true,
            },
            bold: {
                bold: true
            },
            subTitle: {
                fontSize: 16, bold: true, decoration: "underline", margin: [0, 10, 0, 10]
            },
            client: {
                margin: [0, 0, 0, 10]
            },
            tableItens: {
                fontSize: 12
            },
            main: {
                fontSize: 12
            },
            footer: {
                margin: [0, 10, 0, 0], fontSize: 8
            }
        },
        images: {
            logo: userInfo?.urlLogo
        }

    }
    if (!userInfo?.urlLogo) {
        delete docParams.images.logo
    }
    //@ts-ignore
    pdfMake.createPdf(docParams).print()
}


