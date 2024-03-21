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
  fetchProduct: async () => {
    const url = process.env.REACT_APP_API_BASE_URL + 'product'

    const response = await ApiRequest({
      url: url,
      method: 'GET',
    })
    const json = await response

    set({
      sisaPersediaan: json.data.sisa_persediaan,
      productList: json.data.SbsProductList,
    })
  },
  fetchOrder: async (marketplace, start_date, end_date, soNumber) => {
    const start_date_object = new Date(start_date.$d)
    const start_date_parsed = dayjs(start_date_object).format('YYYY-MM-DD')
    const end_date_object = new Date(end_date.$d)
    const end_date_parsed = dayjs(end_date_object).format('YYYY-MM-DD')
    const url = process.env.REACT_APP_API_BASE_URL + 'so'

    const response = await ApiRequest({
      url: url,
      method: 'GET',
      marketplace_id: marketplace === 'tokopedia' ? 'Tokopedia' : 'Shopee',
      start_date: start_date_parsed,
      end_date: end_date_parsed,
      soNumber: soNumber,
    })
    const json = await response

    set({
      sumPrice: json.data.sum_price,
      sumTotalPrice: json.data.sum_total_price,
      sumHpp: json.data.sum_hpp,
      sumMargin: json.data.sum_margin,
      sumAdmin: json.data.sum_admin,
      sumOngkir: json.data.sum_ongkir,
      sumCleanMargin: json.data.sum_clean_margin,
      orderList: json.data.SbsOrderList,
    })
  },
  uploadSalesOrder: async (file) => {
    const url = process.env.REACT_APP_API_BASE_URL + 'so'
    const formData = new FormData()
    formData.append('file', file)

    const response = await ApiRequest({
      url: url,
      method: 'POST',
      formData: formData,
    })
    const json = await response

    set({
      message: json.responseMessage,
    })
  },
  uploadPurchaseOrder: async (file) => {
    const url = process.env.REACT_APP_API_BASE_URL + 'po'
    const formData = new FormData()
    formData.append('file', file)

    const response = await ApiRequest({
      url: url,
      method: 'POST',
      formData: formData,
    })
    const json = await response

    set({
      message: json.responseMessage,
    })
  },
  updateOrder: async (soNumber, status) => {
    const url = process.env.REACT_APP_API_BASE_URL + 'so'

    const response = await ApiRequest({
      url: url,
      method: 'PUT',
      soNumber: soNumber,
      status: status,
    })
    const json = await response

    set({
      message: json.responseMessage,
    })
  },
  removeOrder: async (soNumber) => {
    const url = process.env.REACT_APP_API_BASE_URL + 'so'

    const response = await ApiRequest({
      url: url,
      method: 'DELETE',
      soNumber: soNumber,
    })
    const json = await response

    set({
      message: json.responseMessage,
    })
  },
  fetchPurchaseOrder: async (start_date, end_date) => {
    const start_date_object = new Date(start_date.$d)
    const start_date_parsed = dayjs(start_date_object).format('YYYY-MM-DD')
    const end_date_object = new Date(end_date.$d)
    const end_date_parsed = dayjs(end_date_object).format('YYYY-MM-DD')
    const url = process.env.REACT_APP_API_BASE_URL + 'po'

    const response = await ApiRequest({
      url: url,
      method: 'GET',
      start_date: start_date_parsed,
      end_date: end_date_parsed,
    })
    const json = await response

    set({
      purchaseOrderList: json.data,
    })
  },
  updatePurchaseOrder: async (poNumber, status) => {
    const url = process.env.REACT_APP_API_BASE_URL + 'po'

    const response = await ApiRequest({
      url: url,
      method: 'PUT',
      poNo: poNumber,
      status: status,
    })
    const json = await response

    set({
      message: json.responseMessage,
    })
  },
  fetchCost: async (start_date, end_date) => {
    const start_date_object = new Date(start_date.$d)
    const start_date_parsed = dayjs(start_date_object).format('YYYY-MM-DD')
    const end_date_object = new Date(end_date.$d)
    const end_date_parsed = dayjs(end_date_object).format('YYYY-MM-DD')
    const url = process.env.REACT_APP_API_BASE_URL + 'cost'

    const response = await ApiRequest({
      url: url,
      method: 'GET',
      start_date: start_date_parsed,
      end_date: end_date_parsed,
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
    const url = process.env.REACT_APP_API_BASE_URL + 'cost'

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
    })
    const json = await response

    set({
      message: json.responseMessage,
    })
  },
  fetchSummary: async () => {
    const url = process.env.REACT_APP_API_BASE_URL + 'summary'

    const response = await ApiRequest({
      url: url,
      method: 'GET',
    })
    const json = await response

    set({
      summaryList: json.data,
    })
  },
}))

export default useStore
