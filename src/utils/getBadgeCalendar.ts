export const getBadgeStatus = (status: string) => {
  // Define the corresponding badge status based on the appointment status
  switch (status) {
    case 'Access':
      return 'processing'
    case 'Finished':
      return 'success'
    case 'Cancel':
      return 'error'
    case 'Pending':
      return 'warning'
    case 'Complete':
      return 'success'
    default:
      return 'default'
  }
}
