import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'
import useStore from '../../zustand/store'
import { NumericFormat } from 'react-number-format'

const TableRow = ({ item, index, formatter, onNotify, onRefresh, deactivated }) => {
  const { updateProduct } = useStore((state) => state)

  const [updatedSeq, setUpdatedSeq] = useState(item.seq)
  const [updatedStock, setUpdatedStock] = useState(item.stock)
  const [updatedHpp, setUpdatedHpp] = useState(item.hpp)
  const [updatedPrice, setUpdatedPrice] = useState(item.price)
  const [updatedAdminFee, setUpdatedAdminFee] = useState(item.admin_fee)
  const [updatedOngkirFee, setUpdatedOngkirFee] = useState(item.ongkir_fee)
  const [updatedTax, setUpdatedTax] = useState(item.tax)

  const [confirmVisible, setConfirmVisible] = useState(false)
  const [processing, setProcessing] = useState(false)

  const isRow = item.product_name !== ''
  const nextDeleted = !deactivated // true => deactivate, false => reactivate

  const handleUpdate = async (sku) => {
    const result = await updateProduct(
      sku,
      updatedStock,
      updatedHpp,
      updatedPrice,
      updatedAdminFee,
      updatedOngkirFee,
      updatedTax,
      updatedSeq,
    )
    const ok = result ? result.ok : false
    if (onNotify) {
      onNotify(ok, ok ? 'Perubahan tersimpan' : result && result.message)
    }
  }

  const handleConfirmToggle = async () => {
    setProcessing(true)
    try {
      const result = await updateProduct(
        item.sku,
        updatedStock,
        updatedHpp,
        updatedPrice,
        updatedAdminFee,
        updatedOngkirFee,
        updatedTax,
        updatedSeq,
        nextDeleted, // is_deleted
      )
      const ok = result ? result.ok : false
      const successMsg = nextDeleted ? 'Produk dinonaktifkan' : 'Produk diaktifkan'
      if (onNotify) {
        onNotify(ok, ok ? successMsg : result && result.message)
      }
      if (ok && onRefresh) {
        onRefresh()
      }
    } finally {
      setProcessing(false)
      setConfirmVisible(false)
    }
  }

  const handleUpdateQty = (e) => {
    setUpdatedStock(e.target.value)
  }

  const handleUpdateHpp = (e) => {
    setUpdatedHpp(e.target.value.replace(/,/g, ''))
  }

  const handleUpdatePrice = (e) => {
    setUpdatedPrice(e.target.value.replace(/,/g, ''))
  }

  return (
    <tr key={index} className={isRow ? 'normal' : 'emptyTr'}>
      <td>
        {isRow ? (
          <input
            className="qty_field"
            type="number"
            defaultValue={item.seq}
            size={1}
            onChange={(e) => setUpdatedSeq(e.target.value)}
          />
        ) : (
          ''
        )}
      </td>
      <td>{isRow ? item.sku : ''}</td>
      <td>
        <b>{item.product_name}</b>
      </td>
      <td>
        {isRow ? (
          <input
            className="qty_field"
            type="number"
            defaultValue={item.stock}
            size={1}
            onChange={(e) => handleUpdateQty(e, item.sku)}
          />
        ) : (
          ''
        )}
      </td>
      <td>
        {isRow ? (
          <NumericFormat
            className="hpp_field"
            value={item.hpp}
            thousandSeparator={true}
            onChange={(e) => handleUpdateHpp(e, item.sku)}
          />
        ) : (
          ''
        )}
      </td>
      <td>{isRow ? formatter.format(item.stock * item.hpp) : ''}</td>
      <td>
        {isRow ? (
          <NumericFormat
            className="price_field"
            value={item.price}
            thousandSeparator={true}
            size={5}
            onChange={(e) => handleUpdatePrice(e, item.sku)}
          />
        ) : (
          ''
        )}
      </td>
      <td>{isRow ? formatter.format(item.gross) : ''}</td>
      <td>
        {isRow ? (
          <div className="fee-cell">
            <span className="pct-input">
              <input
                className="pct_field"
                type="number"
                step="0.01"
                defaultValue={item.admin_fee}
                onChange={(e) => setUpdatedAdminFee(e.target.value)}
              />
              <span className="pct-suffix">%</span>
            </span>
            <span className="fee-amount">{formatter.format(item.admin_fee_amount)}</span>
          </div>
        ) : (
          ''
        )}
      </td>
      <td>
        {isRow ? (
          <div className="fee-cell">
            <span className="pct-input">
              <input
                className="pct_field"
                type="number"
                step="0.01"
                defaultValue={item.ongkir_fee}
                onChange={(e) => setUpdatedOngkirFee(e.target.value)}
              />
              <span className="pct-suffix">%</span>
            </span>
            <span className="fee-amount">{formatter.format(item.ongkir_fee_amount)}</span>
          </div>
        ) : (
          ''
        )}
      </td>
      <td>
        {isRow ? (
          <div className="fee-cell">
            <span className="pct-input">
              <input
                className="pct_field"
                type="number"
                step="0.01"
                defaultValue={item.tax}
                onChange={(e) => setUpdatedTax(e.target.value)}
              />
              <span className="pct-suffix">%</span>
            </span>
            <span className="fee-amount">{formatter.format(item.tax_amount)}</span>
          </div>
        ) : (
          ''
        )}
      </td>
      <td>
        {isRow && item.sku !== 'BUBBLE' ? (
          <div className="margin-cell">
            <span className="margin-val">{formatter.format(item.clean_margin)}</span>
            <span className="margin-pct">+{item.pct}%</span>
          </div>
        ) : (
          ''
        )}
      </td>
      <td className="col-action">
        {isRow ? (
          <div className="d-flex gap-1">
            <CButton
              size="sm"
              color="primary"
              className="btn-compact"
              onClick={() => handleUpdate(item.sku, item.stock)}
            >
              Submit
            </CButton>
            <CButton
              size="sm"
              color={deactivated ? 'success' : 'danger'}
              className="text-white btn-compact"
              onClick={() => setConfirmVisible(true)}
            >
              {deactivated ? 'Activate' : 'Deactivate'}
            </CButton>
          </div>
        ) : (
          ''
        )}

        <CModal
          visible={confirmVisible}
          onClose={() => setConfirmVisible(false)}
          alignment="center"
        >
          <CModalHeader>
            <CModalTitle>{nextDeleted ? 'Nonaktifkan Produk' : 'Aktifkan Produk'}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {nextDeleted ? 'Nonaktifkan produk ' : 'Aktifkan kembali produk '}
            <strong>{item.product_name}</strong>?
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" variant="ghost" onClick={() => setConfirmVisible(false)}>
              Tidak
            </CButton>
            <CButton
              color={nextDeleted ? 'danger' : 'success'}
              className="text-white"
              onClick={handleConfirmToggle}
              disabled={processing}
            >
              {processing ? 'Memproses...' : nextDeleted ? 'Ya, Nonaktifkan' : 'Ya, Aktifkan'}
            </CButton>
          </CModalFooter>
        </CModal>
      </td>
    </tr>
  )
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  formatter: PropTypes.object.isRequired,
  onNotify: PropTypes.func,
  onRefresh: PropTypes.func,
  deactivated: PropTypes.bool,
}

export default TableRow
