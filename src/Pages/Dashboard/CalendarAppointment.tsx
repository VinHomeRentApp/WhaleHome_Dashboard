import type { CalendarProps } from 'antd'
import { Badge, Calendar, message } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAppointmentList } from '../../redux/actions/appointment.actions'
import { RootState, useAppDispatch } from '../../redux/containers/store'
import { handleErrorMessage } from '../../utils/HandleError'
import { convertToAMPM } from '../../utils/formatDate'
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

  const dateCellRender = (value: Dayjs) => {
    const appointmentsForDate = appointmentList.filter((appointment) => {
      const appointmentDate = dayjs(appointment.dateTime)
      return appointmentDate.isSame(value, 'day')
    })

    return (
      <ul className='events'>
        {appointmentsForDate.map((appointment) => (
          <Badge
            key={appointment.id}
            status={getBadgeStatus(appointment.statusAppointment)}
            text={
              <span
                style={{ fontSize: '10px' }}
              >{`${convertToAMPM(appointment.time)} - ${appointment.apartment.name}`}</span>
            }
          />
        ))}
      </ul>
    )
  }

  const monthCellRender = (value: Dayjs) => {
    const monthAppointments = appointmentList.filter((appointment) => {
      const appointmentMonth = dayjs(appointment.dateTime).month()
      const appointmentYear = dayjs(appointment.dateTime).year()
      return appointmentMonth === value.month() && appointmentYear === value.year()
    })

    return monthAppointments.length > 0 ? (
      <div className='notes-month'>
        <section>
          <span style={{ fontWeight: 'bold' }}>{monthAppointments.length}</span> Appointments this month
        </section>
      </div>
    ) : null
  }

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current)
    if (info.type === 'month') return monthCellRender(current)
    return info.originNode
  }

  return (
    <>
      {contextHolder}
      <Calendar cellRender={cellRender} />
    </>
  )
}

export default CalendarAppointment
