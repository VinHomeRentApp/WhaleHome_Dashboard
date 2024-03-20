import {
  AppstoreOutlined,
  CalendarOutlined,
  CommentOutlined,
  FileTextOutlined,
  LineChartOutlined
} from '@ant-design/icons'
import { ProChat } from '@ant-design/pro-chat'
import { ChatRequest } from '@ant-design/pro-chat/es/ProChat/store/initialState'
import { FloatButton, Modal, message } from 'antd'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import FormAddAppointment from '../../Pages/Dashboard/AppointmentPage/FormAddAppointment'
import FormAddPostModal from '../../Pages/Dashboard/PostPage/FormAddPostModal'
import { getDataChartYearRevenue } from '../../apis/chart.apis'
import { typoColor } from '../../constants/mainColor'
import { ChartDataTypes } from '../../types/chart.types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const HoverField = () => {
  const [isOpenChat, setIsOpenChat] = useState(false)
  const [isOpenAppointment, setIsOpenAppointment] = useState(false)
  const [isOpenPost, setIsOpenPost] = useState(false)
  const [isOpenChart, setIsOpenChart] = useState(false)
  const [dataChart, setDataChart] = useState<ChartDataTypes>()
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const fetchDataChart = async () => {
      await getDataChartYearRevenue({ compareYear: '2023', messageApi, setDataChart })
    }

    fetchDataChart()
  }, [])
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Chart Line Revenue This Year'
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false
        }
      }
    }
  }

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

  const data = {
    labels,
    datasets: [
      {
        label: String(new Date(Date.now()).getFullYear()),
        data: dataChart?.currentYear.map((item) => item.revenue),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y'
      }
    ]
  }

  const handleChatRequest: ChatRequest = async () => {
    const response = {
      ok: true,
      json: async () => 'Hello'
    }

    return new Response(JSON.stringify(await response.json()), {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  return (
    <>
      <FloatButton.Group
        trigger='click'
        type='default'
        style={{ right: 20, color: typoColor.yellow1 }}
        icon={<AppstoreOutlined style={{ color: typoColor.yellow1 }} />}
      >
        <FloatButton
          onClick={() => setIsOpenChart(true)}
          icon={<LineChartOutlined style={{ color: typoColor.yellow1 }} />}
        />
        <FloatButton
          onClick={() => setIsOpenAppointment(true)}
          icon={<CalendarOutlined style={{ color: typoColor.yellow1 }} />}
        />
        <FloatButton
          onClick={() => setIsOpenPost(true)}
          icon={<FileTextOutlined style={{ color: typoColor.yellow1 }} />}
        />
        <FloatButton
          onClick={() => setIsOpenChat(true)}
          icon={<CommentOutlined style={{ color: typoColor.yellow1 }} />}
        />
      </FloatButton.Group>
      {contextHolder}
      {/* Chat Modal */}
      <Modal style={{ height: '500px' }} title='Chat Box' open={isOpenChat} onCancel={() => setIsOpenChat(false)}>
        <ProChat
          assistantMeta={{ title: 'Chat Pro', avatar: '/public/kien.jpg' }}
          helloMessage={'Hi what can I do for you ?'}
          style={{ height: '400px' }}
          request={handleChatRequest}
        />
      </Modal>
      {/* Form add Appointment */}
      <FormAddAppointment isOpenAddAppointment={isOpenAppointment} setIsOpenAddAppointment={setIsOpenAppointment} />
      <FormAddPostModal
        isOpenModalAdd={isOpenPost}
        setIsOpenModalAdd={setIsOpenPost}
        isOpenModalEdit={false}
        setEditPost={null}
        setIsOpenModalEdit={null}
        postEdit={null}
      />
      <Modal open={isOpenChart} onCancel={() => setIsOpenChart(false)}>
        <Line style={{ height: '500px' }} options={options} data={data} />
      </Modal>
    </>
  )
}

export default HoverField
