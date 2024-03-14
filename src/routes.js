import React from 'react'

const Product = React.lazy(() => import('./views/product'))
const SalesOrder = React.lazy(() => import('./views/sales_order'))
const SalesOrderUpload = React.lazy(() => import('./views/sales_order/upload'))
const SalesOrderUpdate = React.lazy(() => import('./views/sales_order/update'))
const PurchaseOrder = React.lazy(() => import('./views/purchase_order'))
const UploadPurchaseOrder = React.lazy(() => import('./views/purchase_order/upload'))
const PurchaseOrderUpdate = React.lazy(() => import('./views/purchase_order/update'))
const CostList = React.lazy(() => import('./views/cost'))
const CostInput = React.lazy(() => import('./views/cost/input'))
const Summary = React.lazy(() => import('./views/summary'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/product', name: 'Product', element: Product },
  { path: '/sales_order/:marketplace', name: 'Sales Order', element: SalesOrder },
  { path: '/sales_order/upload', name: 'Sales Order', element: SalesOrderUpload },
  { path: '/sales_order/update', name: 'Sales Order', element: SalesOrderUpdate },
  { path: '/purchase_order/list', name: 'Purchase Order', element: PurchaseOrder },
  { path: '/purchase_order/upload', name: 'Purchase Order', element: UploadPurchaseOrder },
  { path: '/purchase_order/update', name: 'Purchase Order', element: PurchaseOrderUpdate },
  { path: '/cost/list', name: 'Cost', element: CostList },
  { path: '/cost/input', name: 'Cost', element: CostInput },
  { path: '/summary', name: 'Summary', element: Summary },
]

export default routes
