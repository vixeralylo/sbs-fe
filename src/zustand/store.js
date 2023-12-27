import { create } from 'zustand'
import ApiRequest from '../zustand/ApiRequest'

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
  fetchProduct: async () => {
    const url = process.env.REACT_APP_API_BASE_URL + 'product'

    const response = await ApiRequest({
      url: url,
      method: 'GET',
    })
    let json = await response

    set({
      sisaPersediaan: json.data.sisa_persediaan,
      productList: json.data.SbsProductList,
    })
  },
  fetchOrder: async (marketplace, start_date, end_date) => {
    const url = process.env.REACT_APP_API_BASE_URL + 'so'

    const response = await ApiRequest({
      url: url,
      method: 'GET',
      marketplace_id: marketplace === 'tokopedia' ? 'Tokopedia' : 'Shopee',
      start_date: start_date === undefined ? '2023-01-01' : start_date,
      end_date: end_date === undefined ? '2023-12-31' : end_date,
    })
    let json = await response

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
}))

export default useStore
