import { Select, message } from 'antd'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { getDataChartYearRevenue } from '../../apis/chart.apis'
import { typoColor } from '../../constants/mainColor'
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
        backgroundColor: typoColor.yellow1
      },
      {
        label: `Compare Year (${compareYear})`,
        data: dataChart?.compareYear.map((item) => item.revenue),
        backgroundColor: typoColor.blue1
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
        text: `Chart Comparing Current Year Revenue to ${compareYear}.`,
        color: typoColor.white1,
        padding: 10
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

  const styleLayoutChart: React.CSSProperties = {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    display: 'flex'
  }

  const styleCardChart: React.CSSProperties = {
    width: '65%',
    marginRight: 10
  }

  return (
    <div style={styleLayoutChart}>
      {contextHolder}

      <div style={styleCardChart}>
        <div
          style={{
            backgroundColor: typoColor.subMainBackground,
            padding: 20,
            borderTopLeftRadius: '14px',
            borderTopRightRadius: '14px',
            borderTop: '2px solid #1e1e1e',
            borderLeft: '2px solid #1e1e1e',
            borderRight: '2px solid #1e1e1e'
          }}
        >
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
        <Bar
          style={{
            backgroundColor: typoColor.subMainBackground,
            borderBottomLeftRadius: '14px',
            borderBottomRightRadius: '14px',
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 10,
            borderBottom: '2px solid #1e1e1e',
            borderLeft: '2px solid #1e1e1e',
            borderRight: '2px solid #1e1e1e'
          }}
          options={options}
          data={barChartData}
        />
      </div>
      <div
        style={{
          width: '35%',
          backgroundColor: typoColor.subMainBackground,
          padding: 20,
          borderRadius: '14px',
          border: '2px solid #1e1e1e'
        }}
      >
        <Pie data={pieChartData} />
      </div>
    </div>
  )
}

export default DashboardChart
