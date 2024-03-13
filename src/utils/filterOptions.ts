export const filterOption = (input: string, option?: { label: string; value: number }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
