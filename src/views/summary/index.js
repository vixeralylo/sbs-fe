import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const Summary = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Summary</strong>
          </CCardHeader>
          <CCardBody></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Summary
