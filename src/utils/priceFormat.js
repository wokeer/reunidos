export default function priceFormat(price) {
  // const priceFloat = (price / 100).toFixed(2)
  // return Intl.NumberFormat("es-ES", {
  //   style: "currency",
  //   currency: "COP",
  // }).format(priceFloat)
  // return  parseInt(price, undefined).toLocaleString(  'es-ES',  {style:'currency', currency:'COP' } );
  return  parseInt(price, undefined).toLocaleString('es-ES');
}
