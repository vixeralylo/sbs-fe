import React, { useEffect } from 'react'
import useStore from '../../zustand/store'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const ProductPages = () => {
  const { fetchProduct, productList } = useStore((state) => state)
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
                {productList.map((items, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{items.sku}</td>
                    <td>
                      <b>{items.product_name}</b>
                    </td>
                    <td>
                      <b>{items.stock}</b>
                    </td>
                    <td>{formatter.format(items.hpp)}</td>
                    <td>{formatter.format(items.stock * items.hpp)}</td>
                    <td>{formatter.format(items.price)}</td>
                    <td>{formatter.format(items.gross)}</td>
                    <td>{formatter.format(items.admin)}</td>
                    <td>{formatter.format(items.ongkir)}</td>
                    <td>{formatter.format(Math.round(items.clean_margin))}</td>
                    <td>{items.pct} %</td>
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

export default ProductPages
