export const getBadgeStatus = (status: string) => {
  // Define the corresponding badge status based on the appointment status
  switch (status) {
    case 'Canceled':
      return 'error'
    case 'Pending':
      return 'processing'
    case 'Completed':
      return 'success'
    default:
      return 'default'
  }
}
