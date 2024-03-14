import React, { useState } from 'react'
import useStore from '../../zustand/store'
import {
  CButton,
  CFormSelect,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormLabel,
  CFormInput,
} from '@coreui/react'
import InputLabel from '@mui/material/InputLabel'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const CostInput = () => {
  const { submitCost, message } = useStore((state) => state)

  const [costName, setCostName] = useState('')
  const [qty, setQty] = useState('')
  const [price, setPrice] = useState('')
  const [otherPrice, setOtherPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState('')
  const [invoiceNo, setInvoiceNo] = useState('')
  const [marketplaceId, setMarketplaceId] = useState('')

  // Get the current date
  const currentDate = new Date()

  // Format the date in yyyy/mm/dd format
  const formattedDate = currentDate
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '/')
  const [costDate, setValueCostDate] = useState(dayjs(formattedDate))

  const handleNameChange = (e) => {
    setCostName(e.target.value)
  }
  const handleQtyChange = (e) => {
    setQty(e.target.value)
    setTotalPrice(parseInt(e.target.value * price, 10) + parseInt(otherPrice, 10))
  }
  const handlePriceChange = (e) => {
    setPrice(e.target.value)
    setTotalPrice(parseInt(e.target.value * qty, 10) + parseInt(otherPrice, 10))
  }
  const handleOtherPriceChange = (e) => {
    setOtherPrice(e.target.value)
    setTotalPrice(parseInt(price * qty, 10) + parseInt(e.target.value, 10))
  }
  const handleInvoiceChange = (e) => {
    setInvoiceNo(e.target.value)
  }
  const handleMarketplaceChange = (e) => {
    setMarketplaceId(e.target.value)
  }
  const handleUpdate = async () => {
    submitCost({
      costDate: costDate,
      costName: costName,
      qty: qty,
      price: price,
      otherPrice: otherPrice,
      totalPrice: totalPrice,
      marketplaceId: marketplaceId,
      invoiceNo: invoiceNo,
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Input Cost</strong>
          </CCardHeader>
          <CCardBody>
            <div className="mb-3">
              <InputLabel id="demo-simple-select-label">Date</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    value={costDate}
                    onChange={(newValue) => setValueCostDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="mb-3">
              <CFormLabel>Cost Name</CFormLabel>
              <CFormInput type="text" id="inputName" value={costName} onChange={handleNameChange} />
            </div>
            <div className="row">
              <div className="col-1">
                <div className="mb-3">
                  <CFormLabel>Qty</CFormLabel>
                  <CFormInput type="number" id="inputQty" value={qty} onChange={handleQtyChange} />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <CFormLabel>Price</CFormLabel>
                  <CFormInput
                    type="number"
                    id="inputPrice"
                    value={price}
                    onChange={handlePriceChange}
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="mb-3">
                  <CFormLabel>Ongkir + Admin</CFormLabel>
                  <CFormInput
                    type="number"
                    id="inputOther"
                    value={otherPrice}
                    onChange={handleOtherPriceChange}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <CFormLabel>Total Price</CFormLabel>
                  <CFormInput disabled type="number" id="inputPrice" value={totalPrice} />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <CFormSelect
                aria-label="Default select example"
                onChange={handleMarketplaceChange}
                value={marketplaceId}
                label="Marketplace"
              >
                <option>Select</option>
                <option value="TOKOPEDIA">Tokopedia</option>
                <option value="SHOPEE">Shopee</option>
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormLabel>Invoice No</CFormLabel>
              <CFormInput
                type="text"
                id="inputInv"
                value={invoiceNo}
                onChange={handleInvoiceChange}
              />
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

export default CostInput
