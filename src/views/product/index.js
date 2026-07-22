import React, { useEffect, useRef, useState } from 'react'
import TableRow from './TableRow' // Import the new component
import AddProduct from './AddProduct'
import useStore from '../../zustand/store'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
} from '@coreui/react'

const ProductPages = () => {
  const { fetchProduct, productList, sisaPersediaan } = useStore((state) => state)
  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  const formatter = new Intl.NumberFormat('pt-BR')

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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <strong>Product List</strong>
            <div className="d-flex align-items-center gap-2">
              <span className="total-stok">
                Total Sisa Persediaan
                <b>{formatter.format(sisaPersediaan)}</b>
              </span>
              <AddProduct onAdded={fetchProduct} onNotify={notify} />
            </div>
          </CCardHeader>
          <CCardBody>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th scope="col">Seq</th>
                    <th scope="col">SKU</th>
                    <th scope="col">Nama Barang</th>
                    <th scope="col">Qty</th>
                    <th scope="col">HPP</th>
                    <th scope="col">Sisa Persediaan</th>
                    <th scope="col">Harga Jual</th>
                    <th scope="col">Gross</th>
                    <th scope="col">Admin Fee</th>
                    <th scope="col">Ongkir Fee</th>
                    <th scope="col">Tax</th>
                    <th scope="col">Margin</th>
                    <th scope="col" className="col-action"></th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((item, index) => {
                    const rowKey =
                      item.product_name === ''
                        ? `sep-${index}`
                        : `${item.sku}-${item.seq}-${item.stock}-${item.hpp}-${item.price}`
                    return (
                      <TableRow
                        key={rowKey}
                        item={item}
                        index={index}
                        formatter={formatter}
                        onNotify={notify}
                      />
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </CRow>
  )
}

export default ProductPages
