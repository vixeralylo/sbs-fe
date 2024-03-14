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
          <CCardBody>
            <table className="table mtop30">
              <thead>
                <tr>
                  <th scope="col">MARGIN SO</th>
                  <th scope="col">GAJI KARYAWAN</th>
                  <th scope="col">PLN</th>
                  <th scope="col">COST</th>
                  <th scope="col">ADS</th>
                  <th scope="col">LOST</th>
                  <th scope="col">TAKE PROFIT</th>
                  <th scope="col">SUM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>Rp. 5,000,000</td>
                  <td>Rp. 1,000,000</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Summary
