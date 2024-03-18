import { Card, Select, message } from 'antd'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { getDataChartYearRevenue } from '../../apis/chart.apis'
import { countBuildingByZone } from '../../redux/actions/zone.actions'
import { RootState, useAppDispatch } from '../../redux/containers/store'
import { ChartDataTypes } from '../../types/chart.types'
import { getYearList } from '../../utils/getYearsList'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
ChartJS.register(ArcElement, Tooltip, Legend)

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const DashboardChart: React.FC = () => {
  const { countBuildingList } = useSelector((state: RootState) => state.zone)
  const dispatch = useAppDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  const [dataChart, setDataChart] = useState<ChartDataTypes>()
  const [compareYear, setCompareYear] = useState<string>('2023')

  useEffect(() => {
    dispatch(countBuildingByZone())
  }, [])

  useEffect(() => {
    const fetchDataChart = async () => {
      await getDataChartYearRevenue({ compareYear, messageApi, setDataChart })
    }

    fetchDataChart()
  }, [compareYear])

  // for Pie Chart
  const filteredData = countBuildingList.filter((zone) => zone.countBuilding > 0)

  // BarChart
  const barChartData = {
    labels,
    datasets: [
      {
        label: 'This Year',
        data: dataChart?.currentYear.map((item) => item.revenue),
        backgroundColor: 'rgb(255, 160, 42, 0.7)'
      },
      {
        label: `Compare Year (${compareYear})`,
        data: dataChart?.compareYear.map((item) => item.revenue),
        backgroundColor: 'rgb(0, 21, 41,0.7)'
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: `Chart Comparing Current Year Revenue to ${compareYear}.`
      }
    }
  }

  const pieChartData = {
    labels: filteredData.map((zone) => zone.zoneName),
    datasets: [
      {
        label: 'Buildings of Zone',
        data: filteredData.map((zone) => zone.countBuilding),
        backgroundColor: ['#2485A5', '#1C657E', '#3FF3BD', '#11BDA2', '#1FA4CF', '#08A99A'],
        borderColor: ['#2485A5', '#1C657E', '#3FF3BD', '#11BDA2', '#1FA4CF', '#08A99A'],
        borderWidth: 1
      }
    ]
  }

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <div style={{ width: '100%', marginTop: 20, marginBottom: 20, display: 'flex', gap: 10 }}>
      {contextHolder}

      <Card style={{ width: '62%', marginLeft: 10, boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)' }}>
        <div>
          <Select
            showSearch
            value={compareYear}
            placeholder='Select'
            optionFilterProp='children'
            onChange={(value) => setCompareYear(value)}
            filterOption={filterOption}
            options={getYearList().map((item) => ({ value: String(item), label: String(item) }))}
          />
        </div>
        <Bar options={options} data={barChartData} />
      </Card>
      <Card style={{ width: '35%', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.05)' }}>
        <Pie data={pieChartData} />
      </Card>
    </div>
  )
}

export default DashboardChart
