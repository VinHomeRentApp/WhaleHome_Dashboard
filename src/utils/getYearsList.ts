export const getYearList = () => {
  const years = []
  const currentYear = new Date().getFullYear()
  for (let year = currentYear; year >= currentYear - 19; year--) {
    years.push(year)
  }
  return years
}
