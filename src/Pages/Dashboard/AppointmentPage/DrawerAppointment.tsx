import {
  CalendarOutlined,
  CarryOutOutlined,
  ContainerOutlined,
  FieldTimeOutlined,
  HomeOutlined
} from '@ant-design/icons'
import { Card, Drawer, Select, Spin, Typography } from 'antd'
import Meta from 'antd/es/card/Meta'
import { appointments } from '../../../types/appointments.type'
import { convertToAMPM } from '../../../utils/formatDate'

type Props = {
  selectedRecord: appointments | null
  onClose: () => void
  isLoadingAppointmentList: boolean
  // eslint-disable-next-line no-unused-vars
  onChangeStatus: (value: string) => void
}

const DrawerAppointment = (props: Props) => {
  const { selectedRecord, onClose, isLoadingAppointmentList, onChangeStatus } = props

  const handleStatusChange = async (value: string) => {
    onChangeStatus(value)
    if (selectedRecord) {
      selectedRecord.statusAppointment = value
    }
  }

  return (
    <Drawer
      title={
        <>
          <CarryOutOutlined />
          {' Detail Appointment'}
        </>
      }
      onClose={onClose}
      open={!!selectedRecord}
    >
      <Spin spinning={isLoadingAppointmentList}>
        <Card hoverable style={{ width: '100%' }} cover={<img alt='example' src={selectedRecord?.users.image} />}>
          <Meta title={selectedRecord?.users.fullName} />
          <Typography.Title level={5}>
            <HomeOutlined size={10} />
            {'  '}
            Place
          </Typography.Title>
          <Typography.Paragraph>
            {`${selectedRecord?.apartment.name} - ${selectedRecord?.apartment.building.name} - ${selectedRecord?.apartment.building.zone.name} - ${selectedRecord?.apartment.building.zone.area.name}`}
          </Typography.Paragraph>
          <Typography.Title level={5}>
            <CalendarOutlined /> Date
          </Typography.Title>
          <Typography.Paragraph>{`${selectedRecord?.dateTime}`}</Typography.Paragraph>
          <Typography.Title level={5}>
            <FieldTimeOutlined /> Time
          </Typography.Title>
          <Typography.Paragraph>{`${convertToAMPM(selectedRecord?.time)}`}</Typography.Paragraph>
          <Typography.Title level={5}>
            <ContainerOutlined /> Note
          </Typography.Title>
          <Typography.Paragraph>{selectedRecord?.note || 'Nothing'}</Typography.Paragraph>
          <Typography.Title level={5}>
            <ContainerOutlined />
            Status
          </Typography.Title>
          <Select
            style={{ width: 120 }}
            value={selectedRecord?.statusAppointment}
            onChange={(value) => handleStatusChange(value)}
            options={[
              { value: 'Pending', label: 'Pending' },
              { value: 'Completed', label: 'Completed' },
              { value: 'Canceled', label: 'Canceled' }
            ]}
          />
        </Card>
      </Spin>
    </Drawer>
  )
}

export default DrawerAppointment
