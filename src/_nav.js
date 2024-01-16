import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Product',
    to: '/product',
  },
  {
    component: CNavItem,
    name: 'Tokopedia',
    to: '/sales_order/tokopedia',
  },
  {
    component: CNavItem,
    name: 'Shopee',
    to: '/sales_order/shopee',
  },
  {
    component: CNavItem,
    name: 'Sales Order',
    to: '/sales_order/upload',
  },
  {
    component: CNavItem,
    name: 'Update Order',
    to: '/sales_order/update',
  },
  {
    component: CNavItem,
    name: 'Purchase Order',
    to: '/purchase_order',
  },
  {
    component: CNavItem,
    name: 'Cost',
    to: '/cost',
  },
  {
    component: CNavItem,
    name: 'Summary',
    to: '/summary',
  },
]

export default _nav
