import { BarChartType } from "../../interfaces"

export type barChartProps = {
    dataBarChart: BarChartType[] | null,
    setdataBarChart: (newValue: BarChartType[] | null) => void
}