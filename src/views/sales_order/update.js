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
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const SalesOrderUpdate = () => {
  const { updateOrder } = useStore((state) => state)
  const { notify, toasterElement } = useToast()

  const [soNumber, setSoNumber] = useState('')
  const [status, setStatus] = useState('')

  const handleSOChange = (e) => {
    setSoNumber(e.target.value)
  }
  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  const handleUpdate = async () => {
    const result = await updateOrder(soNumber, status)
    const ok = result ? result.ok : false
    notify(ok, result && result.message)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Update Sales Order</strong>
          </CCardHeader>
          <CCardBody>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleInputEmail1">SO Number</CFormLabel>
              <CFormInput
                type="email"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={soNumber}
                onChange={handleSOChange}
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
                  <MenuItem value="Cancel">Cancel</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="mb-3">
              <CButton color="primary" onClick={() => handleUpdate()}>
                Submit
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      {toasterElement}
    </CRow>
  )
}

export default SalesOrderUpdate
