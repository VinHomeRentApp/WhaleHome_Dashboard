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
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: `Compare Year (${compareYear})`,
        data: dataChart?.compareYear.map((item) => item.revenue),
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
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
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <div style={{ width: '100%', marginTop: 20, marginBottom: 20, display: 'flex' }}>
      {contextHolder}

      <Card style={{ width: '65%' }}>
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
      <Card style={{ width: '35%' }}>
        <Pie data={pieChartData} />
      </Card>
    </div>
  )
}

export default DashboardChart
