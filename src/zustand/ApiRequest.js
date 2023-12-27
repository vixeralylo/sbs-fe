export function ApiRequest({ url, method, marketplace_id, start_date, end_date }) {
  return fetch(url, {
    method: method,
    headers: {
      marketplace_id: marketplace_id,
      start_date: start_date,
      end_date: end_date,
    },
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
