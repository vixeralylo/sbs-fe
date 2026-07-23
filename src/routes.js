import React from 'react'

const Product = React.lazy(() => import('./views/product'))
const SalesOrder = React.lazy(() => import('./views/sales_order'))
const SalesOrderOffline = React.lazy(() => import('./views/sales_order/offline'))
const SalesOrderUpload = React.lazy(() => import('./views/sales_order/upload'))
const SalesOrderUpdate = React.lazy(() => import('./views/sales_order/update'))
const PurchaseOrder = React.lazy(() => import('./views/purchase_order'))
const PurchaseOrderUpdate = React.lazy(() => import('./views/purchase_order/update'))
const CostList = React.lazy(() => import('./views/cost'))
const Summary = React.lazy(() => import('./views/summary'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/product', name: 'Product', element: Product },
  { path: '/sales_order/:marketplace', name: 'Sales Order', element: SalesOrder },
  { path: '/sales_order/upload', name: 'Sales Order', element: SalesOrderUpload },
  { path: '/sales_order/update', name: 'Sales Order', element: SalesOrderUpdate },
  { path: '/sales_order_offline', name: 'Sales Order Offline', element: SalesOrderOffline },
  { path: '/purchase_order/list', name: 'Purchase Order', element: PurchaseOrder },
  { path: '/purchase_order/update', name: 'Purchase Order', element: PurchaseOrderUpdate },
  { path: '/cost/list', name: 'Cost', element: CostList },
  { path: '/summary', name: 'Summary', element: Summary },
]

export default routes
