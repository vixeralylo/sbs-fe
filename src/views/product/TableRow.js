import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CButton } from '@coreui/react'
import useStore from '../../zustand/store'
import { NumericFormat } from 'react-number-format'

const TableRow = ({ item, index, formatter }) => {
  const { updateProduct } = useStore((state) => state)

  const [updatedStock, setUpdatedStock] = useState(item.stock)
  const [updatedHpp, setUpdatedHpp] = useState(item.hpp)
  const [updatedPrice, setUpdatedPrice] = useState(item.price)

  const handleUpdate = (sku) => {
    updateProduct(sku, updatedStock, updatedHpp, updatedPrice)
  }

  const handleUpdateQty = (e) => {
    const newStock = e.target.value
    setUpdatedStock(newStock)
  }

  const handleUpdateHpp = (e) => {
    const newHpp = e.target.value.replace(/,/g, '')
    setUpdatedHpp(newHpp)
  }

  const handleUpdatePrice = (e) => {
    const newPrice = e.target.value.replace(/,/g, '')
    setUpdatedPrice(newPrice)
  }

  return (
    <tr key={index} className={item.product_name === '' ? 'emptyTr' : 'normal'}>
      <td>{item.product_name === '' ? '' : index + 1}</td>
      <td>{item.product_name === '' ? '' : item.sku}</td>
      <td>
        <b>{item.product_name}</b>
      </td>
      <td>
        {item.product_name !== '' ? (
          <input
            className="qty_field"
            type="number"
            defaultValue={item.stock}
            onChange={(e) => handleUpdateQty(e, item.sku)}
          />
        ) : (
          ''
        )}
      </td>
      <td>
        {item.product_name !== '' ? (
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
      <td>{item.product_name !== '' ? formatter.format(item.stock * item.hpp) : ''}</td>
      <td>
        <NumericFormat
          className="price_field"
          value={item.price}
          thousandSeparator={true}
          onChange={(e) => handleUpdatePrice(e, item.sku)}
        />
      </td>
      <td>{item.product_name !== '' ? formatter.format(item.gross) : ''}</td>
      <td>{item.product_name !== '' ? formatter.format(item.admin) : ''}</td>
      <td>{item.product_name !== '' ? formatter.format(item.ongkir) : ''}</td>
      <td>{item.product_name !== '' ? formatter.format(Math.round(item.clean_margin)) : ''}</td>
      <td>{item.product_name !== '' ? item.pct + ' %' : ''}</td>
      <td>
        {item.product_name !== '' ? (
          <CButton size="sm" color="primary" onClick={() => handleUpdate(item.sku, item.stock)}>
            Submit
          </CButton>
        ) : (
          ''
        )}
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
