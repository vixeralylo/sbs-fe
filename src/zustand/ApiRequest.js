export function ApiRequest({
  url,
  method,
  marketplace_id,
  start_date,
  end_date,
  formData,
  soNumber,
  status,
  poNo,
  costType,
  costDate,
  costName,
  qty,
  price,
  addedPrice,
  totalPrice,
  isNotPayment,
  soDate,
  sku,
}) {
  return fetch(url, {
    method: method,
    headers: {
      marketplace_id: marketplace_id,
      start_date: start_date,
      end_date: end_date,
      invoice_no: soNumber,
      status: status,
      po_no: poNo,
      costType: costType,
      costDate: costDate,
      soDate: soDate,
      costName: costName,
      qty: qty,
      price: price,
      addedPrice: addedPrice,
      totalPrice: totalPrice,
      is_not_payment: isNotPayment,
      sku: sku,
    },
    body: formData,
  })
    .then((res) => res)
    .then(
      (result) => {
        return result.json()
      },
      (error) => {
        console.log(error)
        return ''
      },
    )
}

export default ApiRequest
