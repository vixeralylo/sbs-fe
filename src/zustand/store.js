import { create } from 'zustand'
import ApiRequest from '../zustand/ApiRequest'
import dayjs from 'dayjs'

const useStore = create((set) => ({
  sisaPersediaan: 0,
  sumPrice: 0,
  sumTotalPrice: 0,
  sumHpp: 0,
  sumMargin: 0,
  sumAdmin: 0,
  sumOngkir: 0,
  sumTax: 0,
  sumCleanMargin: 0,
  productList: [],
  orderList: [],
  purchaseOrderList: [],
  costList: [],
  summaryList: [],
  startDate: '',
  endDate: '',
  soNumber: '',
  message: '',
  setStartDate: async (start_date) => {
    set({
      startDate: start_date,
    })
  },
  setEndDate: async (end_date) => {
    set({
      endDate: end_date,
    })
  },
  fetchProduct: async (showDeactivated) => {
    const url = process.env.REACT_APP_API_BASE_URL + 'product/get'

    // Only send is_deleted when the "show deactivated" filter is on;
    // otherwise omit it so the backend returns active products.
    const formData = showDeactivated ? JSON.stringify({ is_deleted: true }) : undefined

    const response = await ApiRequest({
      url: url,
      method: 'POST',
      formData: formData,
    })
    const json = await response

    set({
      sisaPersediaan: json.data.sisa_persediaan,
      productList: json.data.SbsProductList || [],
    })
  },
  fetchOrder: async (marketplace, start_date, end_date, soNumber, isNotPayment) => {
    const start_date_object = new Date(start_date.$d)
    const start_date_parsed = dayjs(start_date_object).format('YYYY-MM-DD')
    const end_date_object = new Date(end_date.$d)
    const end_date_parsed = dayjs(end_date_object).format('YYYY-MM-DD')
    const url = process.env.REACT_APP_API_BASE_URL + 'so/get'
    const formData = JSON.stringify({
      marketplace_id: marketplace,
      start_date: start_date_parsed,
      end_date: end_date_parsed,
      invoice_no: soNumber,
      is_not_payment: isNotPayment.toString() === 'true' ? 'false' : 'true',
    })

    const response = await ApiRequest({
      url: url,
      method: 'POST',
      formData: formData,
    })
    const json = await response

    set({
      sumPrice: json.data.sum_price,
      sumTotalPrice: json.data.sum_total_price,
      sumHpp: json.data.sum_hpp,
      sumMargin: json.data.sum_margin,
      sumAdmin: json.data.sum_admin,
      sumOngkir: json.data.sum_ongkir,
      sumTax: json.data.sum_tax,
      sumCleanMargin: json.data.sum_clean_margin,
      orderList: json.data.SbsOrderList,
    })
  },
  uploadSalesOrder: async (file) => {
    const url = process.env.REACT_APP_API_BASE_URL + 'so/post'
    const formData = new FormData()
    formData.append('file', file)

    const response = await ApiRequest({
      url: url,
      method: 'POST',
      formData: formData,
    })
    const json = await response
    const ok = Boolean(json) && json.httpOk === true

    set({
      message: json.responseMessage,
    })
    return {
      ok,
      message: (json && json.responseMessage) || (ok ? 'Berhasil' : 'Gagal upload sales order'),
    }
  },
  uploadPurchaseOrder: async (file) => {
    const url = process.env.REACT_APP_API_BASE_URL + 'po/post'
    const formData = new FormData()
    formData.append('file', file)
    const response = await ApiRequest({
      url: url,
      method: 'POST',
      formData: formData,
    })
    const json = await response
    const ok = Boolean(json) && json.httpOk === true

    set({
      message: json.responseMessage,
    })
    return {
      ok,
      message: (json && json.responseMessage) || (ok ? 'Berhasil' : 'Gagal upload purchase order'),
    }
  },
  updateOrder: async (soNumber, status) => {
    const url = process.env.REACT_APP_API_BASE_URL + 'so/put'
    const formData = JSON.stringify({
      invoice_no: soNumber,
      status: status,
    })

    const response = await ApiRequest({
      url: url,
      method: 'POST',
      soNumber: soNumber,
      status: status,
      formData: formData,
    })
    const json = await response
    const ok = Boolean(json) && json.httpOk === true

    set({
      message: json.responseMessage,
    })
    return {
      ok,
      message: (json && json.responseMessage) || (ok ? 'Berhasil' : 'Gagal update sales order'),
    }
  },
  removeOrder: async (soNumber) => {
    const url = process.env.REACT_APP_API_BASE_URL + 'so/delete'
    const formData = JSON.stringify({
      invoice_no: soNumber,
    })

    const response = await ApiRequest({
      url: url,
      method: 'POST',
      soNumber: soNumber,
      formData: formData,
    })
    const json = await response
    const ok = Boolean(json) && json.httpOk === true

    set({
      message: json.responseMessage,
    })
    return {
      ok,
      message: (json && json.responseMessage) || (ok ? 'Berhasil' : 'Gagal membatalkan pesanan'),
    }
  },
  removePO: async (poNumber, sku) => {
    const url = process.env.REACT_APP_API_BASE_URL + 'po/delete'
    const formData = JSON.stringify({
      po_no: poNumber,
      sku: sku,
    })

    const response = await ApiRequest({
      url: url,
      method: 'POST',
      poNo: poNumber,
      sku: sku,
      formData: formData,
    })
    const json = await response
    const ok = Boolean(json) && json.httpOk === true

    set({
      message: json.responseMessage,
    })
    return {
      ok,
      message:
        (json && json.responseMessage) || (ok ? 'Berhasil' : 'Gagal menghapus purchase order'),
    }
  },
  fetchPurchaseOrder: async (start_date, end_date, isNotPayment) => {
    const start_date_object = new Date(start_date.$d)
    const start_date_parsed = dayjs(start_date_object).format('YYYY-MM-DD')
    const end_date_object = new Date(end_date.$d)
    const end_date_parsed = dayjs(end_date_object).format('YYYY-MM-DD')
    const url = process.env.REACT_APP_API_BASE_URL + 'po/get'
    // Only send is_not_payment when the "belum dibayar" filter is checked;
    // otherwise omit it so the backend returns all purchase orders.
    const payload = {
      start_date: start_date_parsed,
      end_date: end_date_parsed,
    }
    if (isNotPayment) {
      payload.is_not_payment = 'true'
    }
    const formData = JSON.stringify(payload)
    const response = await ApiRequest({
      url: url,
      method: 'POST',
      start_date: start_date_parsed,
      end_date: end_date_parsed,
      isNotPayment: !!isNotPayment,
      formData: formData,
    })
    const json = await response
    set({
      purchaseOrderList: json.data,
    })
  },
  updatePurchaseOrder: async (poNumber, status) => {
    const url = process.env.REACT_APP_API_BASE_URL + 'po/put'
    const formData = JSON.stringify({
      po_no: poNumber,
      status: status,
    })

    const response = await ApiRequest({
      url: url,
      method: 'POST',
      poNo: poNumber,
      status: status,
      formData: formData,
    })
    const json = await response
    const ok = Boolean(json) && json.httpOk === true

    set({
      message: json.responseMessage,
    })
    return {
      ok,
      message: (json && json.responseMessage) || (ok ? 'Berhasil' : 'Gagal update purchase order'),
    }
  },
  fetchCost: async (start_date, end_date) => {
    const start_date_object = new Date(start_date.$d)
    const start_date_parsed = dayjs(start_date_object).format('YYYY-MM-DD')
    const end_date_object = new Date(end_date.$d)
    const end_date_parsed = dayjs(end_date_object).format('YYYY-MM-DD')
    const url = process.env.REACT_APP_API_BASE_URL + 'cost/get'
    const formData = JSON.stringify({
      start_date: start_date_parsed,
      end_date: end_date_parsed,
    })

    const response = await ApiRequest({
      url: url,
      method: 'POST',
      start_date: start_date_parsed,
      end_date: end_date_parsed,
      formData: formData,
    })
    const json = await response

    set({
      costList: json.data,
    })
  },
  submitCost: async ({
    costType,
    costDate,
    costName,
    qty,
    price,
    otherPrice,
    totalPrice,
    marketplaceId,
    invoiceNo,
  }) => {
    const cost_date_object = new Date(costDate.$d)
    const cost_date_parsed = dayjs(cost_date_object).format('YYYY-MM-DD')
    const url = process.env.REACT_APP_API_BASE_URL + 'cost/post'
    const formData = JSON.stringify({
      cost_type: costType,
      cost_date: cost_date_parsed,
      cost_name: costName,
      qty: String(qty),
      price: String(price),
      added_price: String(otherPrice),
      total_price: String(totalPrice),
      marketplace_id: marketplaceId,
      invoice_no: invoiceNo,
    })

    const response = await ApiRequest({
      url: url,
      method: 'POST',
      costType: costType,
      costDate: cost_date_parsed,
      costName: costName,
      qty: qty,
      price: price,
      addedPrice: otherPrice,
      totalPrice: totalPrice,
      marketplace_id: marketplaceId,
      soNumber: invoiceNo,
      formData: formData,
    })
    const json = await response
    const ok = Boolean(json) && json.httpOk === true

    set({
      message: json.responseMessage,
    })
    return {
      ok,
      message: (json && json.responseMessage) || (ok ? 'Berhasil' : 'Gagal menyimpan cost'),
    }
  },
  submitSoOffline: async ({ soDate, sku, qty, price, totalPrice, marketplaceId, invoiceNo }) => {
    const so_date_object = new Date(soDate.$d)
    const so_date_parsed = dayjs(so_date_object).format('YYYY-MM-DD')
    const url = process.env.REACT_APP_API_BASE_URL + 'so_manual/post'
    const formData = JSON.stringify({
      so_date: so_date_parsed,
      sku: sku,
      qty: String(qty),
      price: String(price),
      total_price: String(totalPrice),
      marketplace_id: marketplaceId,
      invoice_no: invoiceNo,
    })

    const response = await ApiRequest({
      url: url,
      method: 'POST',
      soDate: so_date_parsed,
      sku: sku,
      qty: qty,
      price: price,
      totalPrice: totalPrice,
      marketplace_id: marketplaceId,
      soNumber: invoiceNo,
      formData: formData,
    })
    const json = await response
    const ok = Boolean(json) && json.httpOk === true

    set({
      message: json.responseMessage,
    })
    return {
      ok,
      message: (json && json.responseMessage) || (ok ? 'Berhasil' : 'Gagal menyimpan data offline'),
    }
  },
  fetchSummary: async () => {
    const url = process.env.REACT_APP_API_BASE_URL + 'summary/get'

    const response = await ApiRequest({
      url: url,
      method: 'POST',
    })
    const json = await response

    set({
      summaryList: json.data,
    })
  },
  addProduct: async ({ sku, productName, qty, hpp, price, adminFee, ongkirFee, tax, seq }) => {
    const url = process.env.REACT_APP_API_BASE_URL + 'product/post'
    const formData = JSON.stringify({
      sku: String(sku),
      product_name: String(productName),
      qty: String(qty),
      hpp: String(hpp),
      price: String(price),
      admin_fee: String(adminFee),
      ongkir_fee: String(ongkirFee),
      tax: String(tax),
      seq: String(seq),
    })

    const response = await ApiRequest({
      url: url,
      method: 'POST',
      sku: sku,
      productName: productName,
      qty: qty,
      hpp: hpp,
      price: price,
      adminFee: adminFee,
      ongkirFee: ongkirFee,
      tax: tax,
      seq: seq,
      formData: formData,
    })
    const json = await response
    const ok = Boolean(json) && json.httpOk === true
    set({
      message: json.responseMessage,
    })
    return {
      ok,
      message: (json && json.responseMessage) || (ok ? 'Berhasil' : 'Gagal menyimpan produk'),
    }
  },
  updateProduct: async (sku, qty, hpp, price, adminFee, ongkirFee, tax, seq, isDeleted = false) => {
    const url = process.env.REACT_APP_API_BASE_URL + 'product/put'
    const formData = JSON.stringify({
      sku: String(sku),
      qty: String(qty),
      hpp: String(hpp),
      price: String(price),
      admin_fee: String(adminFee),
      ongkir_fee: String(ongkirFee),
      tax: String(tax),
      seq: String(seq),
      is_deleted: Boolean(isDeleted),
    })

    const response = await ApiRequest({
      url: url,
      method: 'POST',
      sku: sku,
      qty: qty,
      hpp: hpp,
      price: price,
      adminFee: adminFee,
      ongkirFee: ongkirFee,
      tax: tax,
      seq: seq,
      isDeleted: isDeleted,
      formData: formData,
    })
    const json = await response
    const ok = Boolean(json) && json.httpOk === true
    set({
      message: json.responseMessage,
    })
    return {
      ok,
      message: (json && json.responseMessage) || (ok ? 'Berhasil' : 'Gagal menyimpan perubahan'),
    }
  },
}))

export default useStore
