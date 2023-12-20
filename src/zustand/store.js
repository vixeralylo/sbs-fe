import { create } from 'zustand'
import ApiRequest from '../zustand/ApiRequest'

const useStore = create((set) => ({
  productList: [],
  fetchProduct: async () => {
    const url = process.env.REACT_APP_API_BASE_URL + 'product'

    const response = await ApiRequest({
      url: url,
      method: 'GET',
    })
    let json = await response

    set({
      productList: json.data,
    })
  },
}))

export default useStore
