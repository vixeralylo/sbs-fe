import React, { useRef, useState } from 'react'
import useStore from '../../zustand/store'
import {
  CButton,
  CFormLabel,
  CFormInput,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
} from '@coreui/react'

const SalesOrderUpload = () => {
  const { uploadSalesOrder } = useStore((state) => state)

  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const toaster = useRef()
  const [toast, setToast] = useState(0)

  const notify = (ok, message) => {
    setToast(
      <CToast
        autohide
        visible
        delay={2000}
        className={`text-white ${ok ? 'bg-success' : 'bg-danger'}`}
      >
        <div className="d-flex">
          <CToastBody>{message || (ok ? 'Berhasil' : 'Gagal')}</CToastBody>
          <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>,
    )
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) {
      notify(false, 'Pilih file terlebih dahulu')
      return
    }
    setUploading(true)
    try {
      const result = await uploadSalesOrder(file)
      const ok = result ? result.ok : false
      notify(ok, ok ? 'Sales order berhasil diupload' : result && result.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Upload Sales Order</strong>
          </CCardHeader>
          <CCardBody>
            <div className="mb-3">
              <CFormLabel htmlFor="formFile">Default file input example</CFormLabel>
              <CFormInput type="file" id="formFile" onChange={handleFileChange} />
            </div>
            <div className="mb-3">
              <CButton color="primary" onClick={() => handleUpload()} disabled={uploading}>
                {uploading ? 'Mengupload...' : 'Submit'}
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </CRow>
  )
}

export default SalesOrderUpload
