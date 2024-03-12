import type { CalendarProps } from 'antd'
import { Badge, Calendar, message } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAppointmentList } from '../../redux/actions/appointment.actions'
import { RootState, useAppDispatch } from '../../redux/containers/store'
import { handleErrorMessage } from '../../utils/HandleError'
import { getBadgeStatus } from '../../utils/getBadgeCalendar'

const CalendarAppointment = () => {
  const { appointmentList, error } = useSelector((state: RootState) => state.appointment)
  const [messageApi, contextHolder] = message.useMessage()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const promise = dispatch(getAppointmentList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  useEffect(() => {
    handleErrorMessage({ error, messageApi, title: 'Appointment' })
  }, [error])

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value)
    return num ? (
      <div className='notes-month'>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null
  }

  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394
    }
  }

  const dateCellRender = (value: Dayjs) => {
    const appointmentsForDate = appointmentList.filter((appointment) => {
      const appointmentDate = dayjs(appointment.dateTime)
      return appointmentDate.isSame(value, 'day')
    })

    return (
      <ul className='events'>
        {/* Render appointments */}
        {appointmentsForDate.map((appointment) => (
          <Badge
            key={appointment.id}
            status={getBadgeStatus(appointment.statusAppointment)}
            text={
              <span
                style={{ fontSize: '10px' }}
              >{`${appointment.users.fullName} - ${appointment.apartment.name}`}</span>
            }
          />
        ))}
      </ul>
    )
  }

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current)
    if (info.type === 'month') return monthCellRender(current)
    return info.originNode
  }

  return (
    <>
      {contextHolder}
      <Calendar mode='month' cellRender={cellRender} />
    </>
  )
}

export default CalendarAppointment
