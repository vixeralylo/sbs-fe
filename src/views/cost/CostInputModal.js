import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useStore from '../../zustand/store'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
  CFormLabel,
  CFormInput,
  CRow,
  CCol,
} from '@coreui/react'
import InputLabel from '@mui/material/InputLabel'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const todayDayjs = () => {
  const formatted = new Date()
    .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/\//g, '/')
  return dayjs(formatted)
}

const CostInputModal = ({ onSaved, onNotify }) => {
  const { submitCost } = useStore((state) => state)

  const [visible, setVisible] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [costType, setCostType] = useState('')
  const [costName, setCostName] = useState('')
  const [qty, setQty] = useState('')
  const [price, setPrice] = useState('')
  const [otherPrice, setOtherPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState('')
  const [invoiceNo, setInvoiceNo] = useState('')
  const [marketplaceId, setMarketplaceId] = useState('')
  const [costDate, setValueCostDate] = useState(todayDayjs())

  const openModal = () => {
    setCostType('')
    setCostName('')
    setQty('')
    setPrice('')
    setOtherPrice(0)
    setTotalPrice('')
    setInvoiceNo('')
    setMarketplaceId('')
    setValueCostDate(todayDayjs())
    setVisible(true)
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

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const result = await submitCost({
        costType,
        costDate,
        costName,
        qty,
        price,
        otherPrice,
        totalPrice,
        marketplaceId,
        invoiceNo,
      })
      const ok = result ? result.ok : false
      if (onNotify) {
        onNotify(ok, ok ? 'Cost berhasil disimpan' : result && result.message)
      }
      if (ok) {
        if (onSaved) {
          onSaved()
        }
        setVisible(false)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <CButton size="sm" color="primary" onClick={openModal}>
        + Input Cost
      </CButton>

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        alignment="center"
        size="lg"
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle>Input Cost</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="mb-3">
            <CFormLabel>Cost Type</CFormLabel>
            <CFormSelect value={costType} onChange={(e) => setCostType(e.target.value)}>
              <option>Select</option>
              <option value="Gaji">Gaji</option>
              <option value="Pln">Pln</option>
              <option value="Ads">Ads</option>
              <option value="Affiliate">Affiliate</option>
              <option value="Material">Material</option>
              <option value="Profit">Take Profit</option>
              <option value="Loss">Loss</option>
            </CFormSelect>
          </div>
          <div className="mb-3">
            <InputLabel id="cost-date-label">Date</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker value={costDate} onChange={(newValue) => setValueCostDate(newValue)} />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="mb-3">
            <CFormLabel>Cost Name</CFormLabel>
            <CFormInput
              type="text"
              value={costName}
              onChange={(e) => setCostName(e.target.value)}
            />
          </div>
          <CRow>
            <CCol xs={2} className="mb-3">
              <CFormLabel>Qty</CFormLabel>
              <CFormInput type="number" value={qty} onChange={handleQtyChange} />
            </CCol>
            <CCol xs={4} className="mb-3">
              <CFormLabel>Price</CFormLabel>
              <CFormInput type="number" value={price} onChange={handlePriceChange} />
            </CCol>
            <CCol xs={3} className="mb-3">
              <CFormLabel>Ongkir + Admin</CFormLabel>
              <CFormInput type="number" value={otherPrice} onChange={handleOtherPriceChange} />
            </CCol>
            <CCol xs={3} className="mb-3">
              <CFormLabel>Total Price</CFormLabel>
              <CFormInput disabled type="number" value={totalPrice} />
            </CCol>
          </CRow>
          <div className="mb-3">
            <CFormLabel>Marketplace</CFormLabel>
            <CFormSelect value={marketplaceId} onChange={(e) => setMarketplaceId(e.target.value)}>
              <option>Select</option>
              <option value="TOKOPEDIA">Tokopedia</option>
              <option value="SHOPEE">Shopee</option>
            </CFormSelect>
          </div>
          <div className="mb-1">
            <CFormLabel>Invoice No</CFormLabel>
            <CFormInput
              type="text"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
            />
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" variant="ghost" onClick={() => setVisible(false)}>
            Batal
          </CButton>
          <CButton color="primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Menyimpan...' : 'Simpan'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

CostInputModal.propTypes = {
  onSaved: PropTypes.func,
  onNotify: PropTypes.func,
}

export default CostInputModal
