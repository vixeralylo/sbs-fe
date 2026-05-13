import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CAlert,
} from '@coreui/react'

// =============================================================
// Ganti daftar kredensial di sini
// =============================================================
const VALID_USERS = [{ username: 'admin', password: 'sbs2026' }]

const SESSION_KEY = 'sbs_auth_session'
const SESSION_DURATION_MS = 60 * 60 * 1000 // 1 jam

const readSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data?.expiresAt) return null
    if (Date.parse(data.expiresAt) <= Date.now()) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return data
  } catch {
    return null
  }
}

const AuthGate = ({ children }) => {
  const [authed, setAuthed] = useState(() => !!readSession())
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Auto-logout ketika sesi habis
  useEffect(() => {
    if (!authed) return undefined
    const session = readSession()
    if (!session) {
      setAuthed(false)
      return undefined
    }
    const msLeft = Date.parse(session.expiresAt) - Date.now()
    const timer = setTimeout(() => {
      localStorage.removeItem(SESSION_KEY)
      setAuthed(false)
    }, msLeft)
    return () => clearTimeout(timer)
  }, [authed])

  const handleSubmit = (e) => {
    e.preventDefault()
    const match = VALID_USERS.find((u) => u.username === username.trim() && u.password === password)
    if (!match) {
      setError('Username atau password salah.')
      return
    }
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString()
    localStorage.setItem(SESSION_KEY, JSON.stringify({ user: match.username, expiresAt }))
    setError('')
    setUsername('')
    setPassword('')
    setAuthed(true)
  }

  if (authed) return children

  return (
    <CModal backdrop="static" visible alignment="center" keyboard={false}>
      <CModalHeader closeButton={false}>
        <CModalTitle>Silakan Login</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          {error && <CAlert color="danger">{error}</CAlert>}
          <div className="mb-3">
            <CFormLabel>Username</CFormLabel>
            <CFormInput
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Password</CFormLabel>
            <CFormInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <CButton type="submit" color="primary" className="w-100">
            Masuk
          </CButton>
          <p className="text-muted text-center small mt-3 mb-0">Sesi akan aktif selama 1 jam.</p>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

AuthGate.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthGate
