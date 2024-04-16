import React, { useEffect } from 'react'
import TableRow from './TableRow' // Import the new component
import useStore from '../../zustand/store'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const ProductPages = () => {
  const { fetchProduct, productList, sisaPersediaan } = useStore((state) => state)
  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  const formatter = new Intl.NumberFormat('pt-BR')

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Product List</strong>
          </CCardHeader>
          <CCardBody>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">{formatter.format(sisaPersediaan)}</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">SKU</th>
                  <th scope="col">Nama Barang</th>
                  <th scope="col">Qty</th>
                  <th scope="col">HPP</th>
                  <th scope="col">Sisa Persediaan</th>
                  <th scope="col">Harga Jual</th>
                  <th scope="col">Gross</th>
                  <th scope="col">Admin</th>
                  <th scope="col">Ongkir</th>
                  <th scope="col">Clean Margin</th>
                  <th scope="col">%</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((item, index) => (
                  <TableRow key={index} item={item} index={index} formatter={formatter} />
                ))}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProductPages
