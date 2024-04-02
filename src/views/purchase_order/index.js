import React, { useEffect, useState } from 'react'
import useStore from '../../zustand/store'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CFormLabel } from '@coreui/react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const PurchaseOrder = () => {
  const { purchaseOrderList, fetchPurchaseOrder } = useStore((state) => state)

  const formatter = new Intl.NumberFormat('pt-BR')

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
  const [firstDate, setValueFirstDate] = useState(dayjs(firstDay))
  const [endDate, setValueEndDate] = useState(dayjs(formattedDate))
  const [isNotPayment, setValueIsNotPayment] = useState('')

  const handleisNotPaymentChange = (event) => {
    setValueIsNotPayment(event.target.checked)
  }

  useEffect(() => {
    fetchPurchaseOrder(firstDate, endDate, isNotPayment)
  }, [fetchPurchaseOrder, firstDate, endDate, isNotPayment])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Purchase Order</strong>
          </CCardHeader>
          <CCardBody>
            <div className="row align-items-end">
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
              <div className="col-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="1"
                    id="flexCheckDefault"
                    onChange={(newValue) => handleisNotPaymentChange(newValue)}
                  ></input>
                  <label className="form-check-label">Is Not Payment</label>
                </div>
              </div>
            </div>
            <table className="table mtop30">
              <thead>
                <tr>
                  <th scope="col">PO Date</th>
                  <th scope="col">PO Number</th>
                  <th scope="col">Nama Barang</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Normal Price</th>
                  <th scope="col">Discount</th>
                  <th scope="col">PPN</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrderList.map((items, i) => (
                  <tr key={i}>
                    <td>{items.po_date.substring(0, 10)}</td>
                    <td>{items.po_number}</td>
                    <td>
                      <b>{items.product_name}</b>
                    </td>
                    <td>
                      <b>{items.qty}</b>
                    </td>
                    <td>{formatter.format(items.price)}</td>
                    <td>{formatter.format(items.discount)}</td>
                    <td>{formatter.format(items.ppn)}</td>
                    <td>{formatter.format(items.total_price)}</td>
                    <td>{items.is_payment ? 'paid' : 'unpaid'}</td>
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

export default PurchaseOrder
