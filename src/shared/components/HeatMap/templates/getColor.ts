export const getColor = (value: number) => {
  if (value >= -5 && value <= -4) return `hsl(0, 97%, ${value * 10 * -1 - 10}%)`

  if (value > -4 && value < -3) return `hsl(0, 97%, ${value * 10 * -1}%)`

  if (value >= -3 && value < -2) return `hsl(0, 97%, ${value * 10 * -1 + 5}%)`

  if (value >= -2 && value < -1) return `hsl(0, 95%, ${value * 10 * -1 + 10}%)`

  if (value >= -1 && value < 0) return `hsl(0, 95%, ${value * 10 * -1 + 15}%)`

  if (value >= 0 && value <= 1) return `hsl(134, 99%, ${value * 10 + 10}%)`

  if (value > 1 && value <= 2) return `hsl(134, 99%, ${value * 10 + 5}%)`

  if (value > 2 && value <= 3) return `hsl(134, 99%, ${value * 10}%)`

  if (value > 3 && value <= 4) return `hsl(120, 99%, ${value * 10 - 5}%)`

  if (value > 4 && value <= 5) return `hsl(134, 99%, ${value * 10 - 10}%)`

  return undefined
}
