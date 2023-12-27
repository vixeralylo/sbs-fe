import React, { useEffect } from 'react'
import useStore from '../../zustand/store'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CDatePicker } from '@coreui/react-pro'

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
  } = useStore((state) => state)

  useEffect(() => {
    fetchOrder(marketplace)
  }, [fetchOrder, marketplace])

  const formatter = new Intl.NumberFormat('pt-BR')

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Sales Order</strong>
          </CCardHeader>
          <CCardBody>
            <div className="row">
              <div className="col-6">
                <CDatePicker label="Tanggal Awal" locale="id-ID" size="sm" />
              </div>
              <div className="col-6">
                <CDatePicker label="Tanggal Akhir" locale="id-ID" size="sm" />
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
