import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const PurchaseOrder = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Purchase order</strong>
          </CCardHeader>
          <CCardBody></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PurchaseOrder
