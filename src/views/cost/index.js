import React, { useEffect, useState } from 'react'
import useStore from '../../zustand/store'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CFormLabel } from '@coreui/react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const Cost = () => {
  const { costList, fetchCost } = useStore((state) => state)

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

  useEffect(() => {
    fetchCost(firstDate, endDate)
  }, [fetchCost, firstDate, endDate])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cost List</strong>
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
            </div>
            <table className="table mtop30">
              <thead>
                <tr>
                  <th scope="col">Cost Date</th>
                  <th scope="col">Cost Type</th>
                  <th scope="col">Cost Name</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
                  <th scope="col">Other Price</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Marketplace</th>
                  <th scope="col">Invoice No</th>
                </tr>
              </thead>
              <tbody>
                {costList.map((items, i) => (
                  <tr key={i}>
                    <td>{items.date.substring(0, 10)}</td>
                    <td>{items.cost_type}</td>
                    <td>{items.cost_name}</td>
                    <td>
                      <b>{items.qty}</b>
                    </td>
                    <td>{formatter.format(items.price)}</td>
                    <td>{formatter.format(items.added_price)}</td>
                    <td>{formatter.format(items.total_price)}</td>
                    <td>{items.marketplace_id}</td>
                    <td>{items.invoice_no}</td>
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

export default Cost
