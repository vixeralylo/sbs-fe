import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { CAvatar, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import Logo from 'src/assets/images/logo.png'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const location = useLocation()

  const hideSidebar = () => dispatch({ type: 'set', sidebarShow: false })

  // Auto-close the sidebar whenever the route changes (a menu item was clicked)
  useEffect(() => {
    dispatch({ type: 'set', sidebarShow: false })
  }, [location.pathname, dispatch])

  return (
    <>
      <CSidebar
        position="fixed"
        unfoldable={unfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: 'set', sidebarShow: visible })
        }}
      >
        <CSidebarBrand className="d-none d-md-flex" to="/">
          <div className="col-3 text-end">
            <CAvatar size="md" src={Logo} />
          </div>
          <div className="col-1"></div>
          <div className="col-8">
            <h6>Super Baby Store</h6>
          </div>
        </CSidebarBrand>
        <CSidebarNav>
          <SimpleBar>
            <AppSidebarNav items={navigation} />
          </SimpleBar>
        </CSidebarNav>
        <CSidebarToggler
          className="d-none d-lg-flex"
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebar>
      {sidebarShow && <div className="sidebar-backdrop-overlay" onClick={hideSidebar} />}
    </>
  )
}

export default React.memo(AppSidebar)
