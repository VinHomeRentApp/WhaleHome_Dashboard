import { faker } from '@faker-js/faker'
import { Card } from 'antd'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'

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

export const data = {
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

export const PieChartData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
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

const DashboardChart: React.FC = () => {
  return (
    <div style={{ width: '100%', marginTop: 20, marginBottom: 20, display: 'flex' }}>
      <Card style={{ width: '70%' }}>
        <Bar options={options} data={data} />
      </Card>
      <Card style={{ width: '30%' }}>
        <Pie data={PieChartData} />
      </Card>
    </div>
  )
}

export default DashboardChart
