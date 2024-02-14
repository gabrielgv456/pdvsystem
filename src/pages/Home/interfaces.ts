export interface DoughnutChartType {
    femaleGender: number;
    masculineGender: number;
    notInformedGender: number;
}

export interface BarChartType {
    sumSells: number,
    month: number,
    medTicket: number,
    totalProfit: number
}

export interface AreaChartType {
    totalSells: number,
    day: number,
    nameDay: string,
    totalProfit: number
}

export interface HorizontalChartType {
    idProduct: number,
    quantity: number,
    productName: string
}

export interface RadarChartType {
    typepayment: string,
    quantity: number
}