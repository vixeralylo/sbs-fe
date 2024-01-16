import React, { useState } from 'react'
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
} from '@coreui/react'

const SalesOrderUpload = () => {
  const { uploadSalesOrder, message } = useStore((state) => state)

  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    uploadSalesOrder(file)
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
              <CButton color="primary" onClick={() => handleUpload()}>
                Submit
              </CButton>
            </div>
            <div className="mb-3">
              <span id="Message">{message}</span>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SalesOrderUpload
