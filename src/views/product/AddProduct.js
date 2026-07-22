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
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
  CForm,
  CFormFeedback,
} from '@coreui/react'

const emptyForm = {
  seq: '',
  sku: '',
  productName: '',
  qty: '',
  hpp: '',
  price: '',
  adminFee: '',
  ongkirFee: '',
  tax: '',
}

const AddProduct = ({ onAdded, onNotify }) => {
  const { addProduct, message } = useStore((state) => state)

  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [validated, setValidated] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const openModal = () => {
    setForm(emptyForm)
    setValidated(false)
    setVisible(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formEl = e.currentTarget
    if (formEl.checkValidity() === false) {
      setValidated(true)
      return
    }

    setSubmitting(true)
    try {
      const result = await addProduct({
        sku: form.sku.trim(),
        productName: form.productName.trim(),
        qty: form.qty,
        hpp: form.hpp,
        price: form.price,
        adminFee: form.adminFee,
        ongkirFee: form.ongkirFee,
        tax: form.tax,
        seq: form.seq,
      })
      const ok = result ? result.ok : false
      if (onNotify) {
        onNotify(ok, ok ? 'Produk berhasil ditambahkan' : result && result.message)
      }
      if (ok) {
        if (onAdded) {
          onAdded()
        }
        setVisible(false)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <CButton color="primary" size="sm" onClick={openModal}>
        + Add Product
      </CButton>

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        alignment="center"
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle>Tambah Produk</CModalTitle>
        </CModalHeader>
        <CForm noValidate validated={validated} onSubmit={handleSubmit}>
          <CModalBody>
            <CRow>
              <CCol xs={4} className="mb-3">
                <CFormLabel>Seq</CFormLabel>
                <CFormInput
                  type="number"
                  min="0"
                  value={form.seq}
                  onChange={handleChange('seq')}
                  required
                />
                <CFormFeedback invalid>Wajib diisi.</CFormFeedback>
              </CCol>
              <CCol xs={8} className="mb-3">
                <CFormLabel>SKU</CFormLabel>
                <CFormInput type="text" value={form.sku} onChange={handleChange('sku')} required />
                <CFormFeedback invalid>SKU wajib diisi.</CFormFeedback>
              </CCol>
              <CCol xs={12} className="mb-3">
                <CFormLabel>Nama Barang</CFormLabel>
                <CFormInput
                  type="text"
                  value={form.productName}
                  onChange={handleChange('productName')}
                  required
                />
                <CFormFeedback invalid>Nama barang wajib diisi.</CFormFeedback>
              </CCol>
              <CCol xs={4} className="mb-3">
                <CFormLabel>Qty</CFormLabel>
                <CFormInput
                  type="number"
                  min="0"
                  value={form.qty}
                  onChange={handleChange('qty')}
                  required
                />
                <CFormFeedback invalid>Wajib diisi.</CFormFeedback>
              </CCol>
              <CCol xs={4} className="mb-3">
                <CFormLabel>HPP</CFormLabel>
                <CFormInput
                  type="number"
                  min="0"
                  value={form.hpp}
                  onChange={handleChange('hpp')}
                  required
                />
                <CFormFeedback invalid>Wajib diisi.</CFormFeedback>
              </CCol>
              <CCol xs={4} className="mb-3">
                <CFormLabel>Harga Jual</CFormLabel>
                <CFormInput
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={handleChange('price')}
                  required
                />
                <CFormFeedback invalid>Wajib diisi.</CFormFeedback>
              </CCol>
              <CCol xs={4} className="mb-3">
                <CFormLabel>Admin Fee (%)</CFormLabel>
                <CFormInput
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.adminFee}
                  onChange={handleChange('adminFee')}
                  required
                />
                <CFormFeedback invalid>Wajib diisi.</CFormFeedback>
              </CCol>
              <CCol xs={4} className="mb-3">
                <CFormLabel>Ongkir Fee (%)</CFormLabel>
                <CFormInput
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.ongkirFee}
                  onChange={handleChange('ongkirFee')}
                  required
                />
                <CFormFeedback invalid>Wajib diisi.</CFormFeedback>
              </CCol>
              <CCol xs={4} className="mb-3">
                <CFormLabel>Tax (%)</CFormLabel>
                <CFormInput
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.tax}
                  onChange={handleChange('tax')}
                  required
                />
                <CFormFeedback invalid>Wajib diisi.</CFormFeedback>
              </CCol>
            </CRow>
            {message ? (
              <div className="mt-1">
                <small id="Message">{message}</small>
              </div>
            ) : null}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" variant="ghost" onClick={() => setVisible(false)}>
              Batal
            </CButton>
            <CButton color="primary" type="submit" disabled={submitting}>
              {submitting ? 'Menyimpan...' : 'Simpan'}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

AddProduct.propTypes = {
  onAdded: PropTypes.func,
  onNotify: PropTypes.func,
}

export default AddProduct
