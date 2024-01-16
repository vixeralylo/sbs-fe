import React from 'react'

const Product = React.lazy(() => import('./views/product'))
const SalesOrder = React.lazy(() => import('./views/sales_order'))
const SalesOrderUpload = React.lazy(() => import('./views/sales_order/upload'))
const SalesOrderUpdate = React.lazy(() => import('./views/sales_order/update'))
const PurchaseOrder = React.lazy(() => import('./views/purchase_order/upload'))
const Cost = React.lazy(() => import('./views/cost'))
const Summary = React.lazy(() => import('./views/summary'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/product', name: 'Product', element: Product },
  { path: '/sales_order/:marketplace', name: 'Sales Order', element: SalesOrder },
  { path: '/sales_order/upload', name: 'Sales Order', element: SalesOrderUpload },
  { path: '/sales_order/update', name: 'Sales Order', element: SalesOrderUpdate },
  { path: '/purchase_order', name: 'Purchase Order', element: PurchaseOrder },
  { path: '/cost', name: 'Cost', element: Cost },
  { path: '/summary', name: 'Summary', element: Summary },
]

export default routes
