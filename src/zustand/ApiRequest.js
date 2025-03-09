export function ApiRequest({ url, method, formData }) {
  return fetch(url, {
    method: method,
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
