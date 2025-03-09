import axios from 'axios'

export async function ApiRequest({
  url,
  method = 'GET',
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
  hpp,
  price,
  addedPrice,
  totalPrice,
  isNotPayment,
  soDate,
  sku,
}) {
  try {
    const headers = {
      marketplace_id,
      start_date,
      end_date,
      invoice_no: soNumber,
      status,
      po_no: poNo,
      costType,
      costDate,
      soDate,
      costName,
      qty,
      hpp,
      price,
      addedPrice,
      totalPrice,
      is_not_payment: isNotPayment,
      sku,
    }

    const response = await axios({
      url,
      method,
      headers,
      data: formData,
    })

    return response.data
  } catch (error) {
    console.error(error)
    return ''
  }
}

export default ApiRequest
