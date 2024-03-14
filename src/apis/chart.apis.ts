import { MessageInstance } from 'antd/es/message/interface'
import { ChartDataTypes } from '../types/chart.types'
import { ResponseSuccessful } from '../types/response.type'
import { handleErrorMessage } from '../utils/HandleError'
import { http } from '../utils/http'

type getDataChartYearRevenueTypes = {
  compareYear: string
  setDataChart: React.Dispatch<React.SetStateAction<ChartDataTypes | undefined>>
  messageApi: MessageInstance
}

export const getDataChartYearRevenue = async ({
  setDataChart,
  compareYear,
  messageApi
}: getDataChartYearRevenueTypes) => {
  try {
    const response = await http.get<ResponseSuccessful<ChartDataTypes>>(`/payment/compareRevenue?year=${compareYear}`)
    setDataChart(response.data.data)
  } catch (error) {
    handleErrorMessage({ error, messageApi, title: 'Chart Data' })
  }
}
