import formatprice from "./priceFormat"

export const createValue = (item) => {
  const porcj = (item.pt_discount / 100) * item.pt_price
  const rt = Math.round(item.pt_price - porcj)
  const index1 = Math.round(item.pt_price - porcj).toString().split('').length - 1
  const index2 = Math.round(item.pt_price - porcj).toString().split('').length - 2
  const sum = parseInt(`${Math.round(item.pt_price - porcj).toString().split('')[index2]}${Math.round(item.pt_price - porcj).toString().split('')[index1]}`)
  if (sum > 50) {
    const r = (rt - sum) + 100
    return formatprice(r)
  } else if (sum < 50) {
    const r = rt - sum
    return formatprice(r)
  }
  return formatprice(item.pt_price - porcj)
}

export const createTotal = (item) => {
  const porcj = (item.pt_discount / 100) * item.pt_price
  const rt = Math.round(item.pt_price - porcj)
  const index1 = Math.round(item.pt_price - porcj).toString().split('').length - 1
  const index2 = Math.round(item.pt_price - porcj).toString().split('').length - 2
  const sum = parseInt(`${Math.round(item.pt_price - porcj).toString().split('')[index2]}${Math.round(item.pt_price - porcj).toString().split('')[index1]}`)
  if (sum > 50) {
    const r = (rt - sum) + 100
    return r
  } else if (sum < 50) {
    const r = rt - sum
    return r
  }
  return item.pt_price - porcj
}