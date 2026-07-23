import React, { useState } from 'react'
import useStore from '../../zustand/store'
import useToast from '../../components/useToast'
import {
  CButton,
  CFormLabel,
  CFormInput,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'

const SalesOrderUpload = () => {
  const { uploadSalesOrder } = useStore((state) => state)
  const { notify, toasterElement } = useToast()

  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

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
      {toasterElement}
    </CRow>
  )
}

export default SalesOrderUpload
