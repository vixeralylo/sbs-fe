import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Product',
    to: '/product',
  },
  {
    component: CNavTitle,
    name: 'Sales Order',
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
    name: 'Upload Sales Order',
    to: '/sales_order/upload',
  },
  {
    component: CNavItem,
    name: 'Update Order',
    to: '/sales_order/update',
  },
  {
    component: CNavTitle,
    name: 'Purchase Order',
  },
  {
    component: CNavItem,
    name: 'List Purchase Order',
    to: '/purchase_order/list',
  },
  {
    component: CNavItem,
    name: 'Upload Purchase Order',
    to: '/purchase_order/upload',
  },
  {
    component: CNavItem,
    name: 'Update Purchase Order',
    to: '/purchase_order/update',
  },
  {
    component: CNavTitle,
    name: 'COST',
  },
  {
    component: CNavItem,
    name: 'Cost',
    to: '/cost/list',
  },
  {
    component: CNavItem,
    name: 'Input Cost',
    to: '/cost/input',
  },
  {
    component: CNavTitle,
    name: 'SUMAMRY',
  },
  {
    component: CNavItem,
    name: 'Summary',
    to: '/summary',
  },
]

export default _nav
