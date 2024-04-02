import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import useStore from '../../zustand/store'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormLabel,
  CFormInput,
  CButton,
} from '@coreui/react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const SalesOrderPages = () => {
  const [sku, setSku] = useState('')
  const [qty, setQty] = useState('')
  const [price, setPrice] = useState('')
  const [totalPrice, setTotalPrice] = useState('')

  // Get the current date
  const currentDate = new Date()
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)

  // Format the date in yyyy/mm/dd format
  const formattedDate = currentDate
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '/')
  const [soDate, setValueSoDate] = useState(dayjs(formattedDate))

  const {
    fetchOrder,
    orderList,
    sumPrice,
    sumTotalPrice,
    sumHpp,
    sumMargin,
    sumAdmin,
    sumOngkir,
    sumCleanMargin,
    submitSoOffline,
    message,
  } = useStore((state) => state)

  const formatter = new Intl.NumberFormat('pt-BR')

  const [firstDate, setValueFirstDate] = useState(dayjs(firstDay))
  const [endDate, setValueEndDate] = useState(dayjs(formattedDate))

  useEffect(() => {
    fetchOrder('offline', firstDate, endDate, '')
  }, [fetchOrder, firstDate, endDate])

  const handleSkuChange = (e) => {
    setSku(e.target.value)
  }
  const handleQtyChange = (e) => {
    setQty(e.target.value)
    setTotalPrice(parseInt(e.target.value * price, 10))
  }
  const handlePriceChange = (e) => {
    setPrice(e.target.value)
    setTotalPrice(parseInt(e.target.value * qty, 10))
  }
  const handleUpdate = async () => {
    submitSoOffline({
      soDate: soDate,
      sku: sku,
      qty: qty,
      price: price,
      totalPrice: totalPrice,
      marketplaceId: 'Offline',
      invoice_no: '',
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Input Offline</strong>
          </CCardHeader>
          <CCardBody>
            <div className="mb-3">
              <InputLabel id="demo-simple-select-label">Date</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker value={soDate} onChange={(newValue) => setValueSoDate(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="mb-3">
              <CFormLabel>SKU</CFormLabel>
              <CFormInput type="text" id="inputName" value={sku} onChange={handleSkuChange} />
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
              <div className="col-4">
                <div className="mb-3">
                  <CFormLabel>Total Price</CFormLabel>
                  <CFormInput disabled type="number" id="inputPrice" value={totalPrice} />
                </div>
              </div>
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
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Sales Order</strong>
          </CCardHeader>
          <CCardBody>
            <div className="row align-items-end row-order">
              <div className="col-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Tanggal Awal</CFormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      value={firstDate}
                      onChange={(newValue) => setValueFirstDate(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="col-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Tanggal Akhir</CFormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      value={endDate}
                      onChange={(newValue) => setValueEndDate(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <table className="table mtop30">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">{formatter.format(sumPrice)}</th>
                  <th scope="col">{formatter.format(sumTotalPrice)}</th>
                  <th scope="col">{formatter.format(sumHpp)}</th>
                  <th scope="col">{formatter.format(sumMargin)}</th>
                  <th scope="col">{formatter.format(sumAdmin)}</th>
                  <th scope="col">{formatter.format(sumOngkir)}</th>
                  <th scope="col">{formatter.format(sumCleanMargin)}</th>
                </tr>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">InvoiceNo</th>
                  <th scope="col">Nama Barang</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Sales Price</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Hpp</th>
                  <th scope="col">Gross</th>
                  <th scope="col">Admin</th>
                  <th scope="col">Ongkir</th>
                  <th scope="col">Clean Margin</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((items, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{items.invoice_no}</td>
                    <td>
                      <b>{items.product_name}</b>
                    </td>
                    <td>
                      <b>{items.qty}</b>
                    </td>
                    <td>{formatter.format(items.sales_price)}</td>
                    <td>{formatter.format(items.total_price)}</td>
                    <td>{formatter.format(items.hpp)}</td>
                    <td>{formatter.format(items.gross_margin)}</td>
                    <td>{formatter.format(items.power_merchant_fee)}</td>
                    <td>{formatter.format(items.ongkir_fee)}</td>
                    <td>{formatter.format(Math.round(items.clean_margin))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SalesOrderPages
