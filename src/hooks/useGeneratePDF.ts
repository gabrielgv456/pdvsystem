import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


export const useGeneratePDF = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const docParams = {
        //pageSize: 'A4',
        //pageMargins: [15,50,15,40],

        //header:[],
        //content:[{
         //   text:"teste",
         //   fontSize:15,
       // }],
        //footer:[]
content: [
    {
        style:'title',
        text: 'Comprovante de Venda\n'
        
    },

    {
        style:'main',
        text: [
            '****************Sem valor fiscal***************\n\n\n',
            'Itens da venda\n',
            '_______________________________________________\n',
            
            
        ],
        
        
    },

    {
        style: 'tableItens',
        table: {
            //widths: [200,'auto'],
            body: [
                //[{text: 'aaa', colSpan:2, alignment: 'center'}],
                ['Qnt', 'Item', 'Valor'],
                ['1', 'Blusa de frio M/ssd', 'R$0']
            ]
        },
        layout: 'noBorders'
    },
],

styles: {

    title:{
        fontSize:20, bold:true
    },
    tableItens:{
        fontSize:12
    },

    main:{
        fontSize:10
    }
}
        
    }
    pdfMake.createPdf(docParams).print()
}