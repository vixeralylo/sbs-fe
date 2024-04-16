import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CButton } from '@coreui/react'
import useStore from '../../zustand/store'

const TableRow = ({ item, index, formatter }) => {
  const { updateProductQty } = useStore((state) => state)

  const [updatedStock, setUpdatedStock] = useState(item.stock)

  const handleUpdate = (sku) => {
    updateProductQty(sku, updatedStock)
  }

  const handleUpdateQty = (e) => {
    const newStock = e.target.value
    setUpdatedStock(newStock)
  }

  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.sku}</td>
      <td>
        <b>{item.product_name}</b>
      </td>
      <td>
        <input
          className="qty_field"
          type="number"
          defaultValue={item.stock}
          onChange={(e) => handleUpdateQty(e, item.sku)}
        />
      </td>
      <td>{formatter.format(item.hpp)}</td>
      <td>{formatter.format(item.stock * item.hpp)}</td>
      <td>{formatter.format(item.price)}</td>
      <td>{formatter.format(item.gross)}</td>
      <td>{formatter.format(item.admin)}</td>
      <td>{formatter.format(item.ongkir)}</td>
      <td>{formatter.format(Math.round(item.clean_margin))}</td>
      <td>{item.pct} %</td>
      <td>
        <CButton size="sm" color="primary" onClick={() => handleUpdate(item.sku, item.stock)}>
          Submit
        </CButton>
      </td>
    </tr>
  )
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  formatter: PropTypes.object.isRequired,
}

export default TableRow
