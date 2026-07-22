export function ApiRequest({ url, method, formData }) {
  return fetch(url, {
    method: method,
    body: formData,
  })
    .then((res) =>
      res
        .json()
        .catch(() => ({}))
        .then((body) => {
          // Preserve the HTTP status so callers can tell success from failure
          // even when the backend returns a JSON body on error (e.g. 500).
          if (body && typeof body === 'object') {
            body.httpOk = res.ok
            body.httpStatus = res.status
          }
          return body
        }),
    )
    .catch((error) => {
      console.log(error)
      return ''
    })
}

export default ApiRequest
