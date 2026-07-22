import React, { useRef, useState } from 'react'
import { CToast, CToastBody, CToastClose, CToaster } from '@coreui/react'

// Shared floating notification (toast) helper.
// Toasts stay visible until the user closes them or navigates to another menu.
const useToast = () => {
  const toaster = useRef()
  const [toast, setToast] = useState(0)

  const notify = (ok, message) => {
    setToast(
      <CToast autohide={false} visible className={`text-white ${ok ? 'bg-success' : 'bg-danger'}`}>
        <div className="d-flex">
          <CToastBody>{message || (ok ? 'Berhasil' : 'Gagal')}</CToastBody>
          <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>,
    )
  }

  const toasterElement = <CToaster ref={toaster} push={toast} placement="top-end" />

  return { notify, toasterElement }
}

export default useToast
