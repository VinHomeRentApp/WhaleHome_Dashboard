export interface Time {
  hour: number
  minute: number
  second: number
  nano: number
}

export interface createAppointmentFormDataTypes {
  dateTime: string
  usersId: number
  apartmentId: number | null
  time: string
  note: string | null | undefined // Bạn có thể điều chỉnh kiểu dữ liệu của note tùy theo nhu cầu
}
