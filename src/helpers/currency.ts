export const vietnameseCurrency = (value: number) => new Intl.NumberFormat('en-US', {
     style: 'currency',
     currency: 'VND',
}).format(value)