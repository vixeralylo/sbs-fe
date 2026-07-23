import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useStore from '../../zustand/store'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormInput,
} from '@coreui/react'

const UploadModal = ({ onUploaded, onNotify }) => {
  const { uploadPurchaseOrder } = useStore((state) => state)

  const [visible, setVisible] = useState(false)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const openModal = () => {
    setFile(null)
    setVisible(true)
  }

  const handleUpload = async () => {
    if (!file) {
      if (onNotify) {
        onNotify(false, 'Pilih file terlebih dahulu')
      }
      return
    }
    setUploading(true)
    try {
      const result = await uploadPurchaseOrder(file)
      const ok = result ? result.ok : false
      if (onNotify) {
        onNotify(ok, ok ? 'Purchase order berhasil diupload' : result && result.message)
      }
      if (ok) {
        if (onUploaded) {
          onUploaded()
        }
        setVisible(false)
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <CButton size="sm" color="primary" onClick={openModal}>
        + Upload PO
      </CButton>

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        alignment="center"
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle>Upload Purchase Order</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormLabel htmlFor="poFile">File</CFormLabel>
          <CFormInput type="file" id="poFile" onChange={(e) => setFile(e.target.files[0])} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" variant="ghost" onClick={() => setVisible(false)}>
            Batal
          </CButton>
          <CButton color="primary" onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Mengupload...' : 'Upload'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

UploadModal.propTypes = {
  onUploaded: PropTypes.func,
  onNotify: PropTypes.func,
}

export default UploadModal
