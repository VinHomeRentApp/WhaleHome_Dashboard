import { faker } from '@faker-js/faker'
import { Card } from 'antd'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import React, { useEffect } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { countBuildingByZone } from '../../redux/actions/zone.actions'
import { RootState, useAppDispatch } from '../../redux/containers/store'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
ChartJS.register(ArcElement, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart'
    }
  }
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const barChartData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }
  ]
}

const DashboardChart: React.FC = () => {
  const { countBuildingList } = useSelector((state: RootState) => state.zone)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(countBuildingByZone())
  }, [])

  const filteredLabels = countBuildingList.filter((zone) => zone.countBuilding > 0).map((zone) => zone.zoneName)

  const pieChartData = {
    labels: filteredLabels,
    datasets: [
      {
        label: '# of Buildings',
        data: countBuildingList.map((zone) => zone.countBuilding),
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

  return (
    <div style={{ width: '100%', marginTop: 20, marginBottom: 20, display: 'flex' }}>
      <Card style={{ width: '65%' }}>
        <Bar options={options} data={barChartData} />
      </Card>
      <Card style={{ width: '35%' }}>
        <Pie data={pieChartData} />
      </Card>
    </div>
  )
}

export default DashboardChart
