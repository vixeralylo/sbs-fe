import React, { useEffect, useState } from 'react'
import useStore from '../../zustand/store'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const SalesOrderPages = () => {
  const { marketplace } = useParams()

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
    removeOrder,
  } = useStore((state) => state)

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
  const [soNumber, setValueSo] = useState('')

  const handleSoChange = (event) => {
    setValueSo(event.target.value)
  }

  const handleRemoveOrder = (soNumber) => {
    // Display a confirmation dialog before deleting
    const isConfirmed = window.confirm('Yakin ingin menghapus pesanan ini?')

    if (isConfirmed) {
      removeOrder(soNumber)
      setValueSo('')
    }
  }

  useEffect(() => {
    fetchOrder(marketplace, firstDate, endDate, soNumber)
  }, [fetchOrder, marketplace, firstDate, endDate, soNumber])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Sales Order</strong>
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
              <div className="col-6 align-item-end">
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">So Number</CFormLabel>
                  <CFormInput type="text" id="exampleFormControlInput1" onChange={handleSoChange} />
                </div>
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
                    <td>
                      <p
                        onClick={() => handleRemoveOrder(items.invoice_no)}
                        className="remove_order"
                      >
                        Cancel
                      </p>
                    </td>
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
