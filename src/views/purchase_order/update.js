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
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const PurchaseOrderUpdate = () => {
  const { updatePurchaseOrder, message } = useStore((state) => state)

  const [poNumber, setPoNumber] = useState('')
  const [status, setStatus] = useState('')

  const handlePOChange = (e) => {
    setPoNumber(e.target.value)
  }
  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  const handleUpdate = async () => {
    updatePurchaseOrder(poNumber, status)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Update Purchase Order</strong>
          </CCardHeader>
          <CCardBody>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleInputEmail1">PO Number</CFormLabel>
              <CFormInput
                type="email"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={poNumber}
                onChange={handlePOChange}
              />
            </div>
            <div className="mb-3">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  <MenuItem value="Pay">Payment</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="mb-3">
              <CButton color="primary" onClick={() => handleUpdate()}>
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

export default PurchaseOrderUpdate
