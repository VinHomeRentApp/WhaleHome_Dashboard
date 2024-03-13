export function formatDate(inputDate: string): string {
  // Chuyển đổi chuỗi thời gian sang đối tượng Date
  const dateObj = new Date(inputDate)
  // Lấy ra các thành phần của thời gian
  const year = dateObj.getUTCFullYear()
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0') // Thêm '0' phía trước nếu cần
  const day = String(dateObj.getUTCDate()).padStart(2, '0') // Thêm '0' phía trước nếu cần
  // Tạo chuỗi định dạng mới
  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}

export const formatTime = (timeStr: string) => {
  const dateObj = new Date(timeStr)
  const hours = String(dateObj.getHours()).padStart(2, '0')
  const minutes = String(dateObj.getMinutes()).padStart(2, '0')
  const seconds = String(dateObj.getSeconds()).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

export const convertToAMPM = (timeStr: string | null | undefined) => {
  if (!timeStr) return '' // Kiểm tra xem timeStr có giá trị không

  const dateObj = new Date(`2000-01-01T${timeStr}`)
  // Kiểm tra xem dateObj đã được tạo thành công không
  if (isNaN(dateObj.getTime())) return ''

  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()
  const period = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  const formattedHours = String(hours12).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`
  return formattedTime
}
