import React, { useEffect, useRef, useState } from 'react'
import useStore from '../../zustand/store'
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormLabel,
  CFormInput,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
} from '@coreui/react'
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
    sumTax,
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
  const [isNotPayment, setValueIsNotPayment] = useState('')
  const [soNumber, setValueSo] = useState('')

  const [confirmVisible, setConfirmVisible] = useState(false)
  const [targetInvoice, setTargetInvoice] = useState('')
  const [deleting, setDeleting] = useState(false)

  const toaster = useRef()
  const [toast, setToast] = useState(0)

  const notify = (ok, message) => {
    setToast(
      <CToast autohide={false} visible className={`text-white ${ok ? 'bg-success' : 'bg-danger'}`}>
        <div className="d-flex">
          <CToastBody>{message || (ok ? 'Berhasil' : 'Gagal')}</CToastBody>
          <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>,
    )
  }

  const handleSoChange = (event) => {
    setValueSo(event.target.value)
  }

  const handleisNotPaymentChange = (event) => {
    setValueIsNotPayment(event.target.checked)
  }

  const openConfirm = (invoiceNo) => {
    setTargetInvoice(invoiceNo)
    setConfirmVisible(true)
  }

  const handleConfirmRemove = async () => {
    setDeleting(true)
    try {
      const result = await removeOrder(targetInvoice)
      const ok = result ? result.ok : false
      notify(ok, ok ? 'Pesanan berhasil dibatalkan' : result && result.message)
      if (ok) {
        fetchOrder(marketplace, firstDate, endDate, soNumber, isNotPayment)
      }
    } finally {
      setDeleting(false)
      setConfirmVisible(false)
    }
  }

  useEffect(() => {
    fetchOrder(marketplace, firstDate, endDate, soNumber, isNotPayment)
  }, [fetchOrder, marketplace, firstDate, endDate, soNumber, isNotPayment])

  return (
    <CRow>
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
              <div className="col-3 align-item-end">
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
                  <th scope="col">{formatter.format(sumTax)}</th>
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
                  <th scope="col">Tax</th>
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
                    <td>{formatter.format(items.tax)}</td>
                    <td>{formatter.format(Math.round(items.clean_margin))}</td>
                    <td>
                      <p onClick={() => openConfirm(items.invoice_no)} className="remove_order">
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

      <CModal visible={confirmVisible} onClose={() => setConfirmVisible(false)} alignment="center">
        <CModalHeader>
          <CModalTitle>Batalkan Pesanan</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Yakin ingin membatalkan pesanan <strong>{targetInvoice}</strong>?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" variant="ghost" onClick={() => setConfirmVisible(false)}>
            Tidak
          </CButton>
          <CButton
            color="danger"
            className="text-white"
            onClick={handleConfirmRemove}
            disabled={deleting}
          >
            {deleting ? 'Membatalkan...' : 'Ya, Batalkan'}
          </CButton>
        </CModalFooter>
      </CModal>

      <CToaster ref={toaster} push={toast} placement="top-end" />
    </CRow>
  )
}

export default SalesOrderPages
