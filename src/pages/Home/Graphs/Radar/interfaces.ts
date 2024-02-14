import { RadarChartType } from "../../interfaces"

export type RadarChartProps = {
    dataRadarChart: RadarChartType[] ,
    setdataRadarChart: (newValue: RadarChartType[] ) => void
}