import React, { useState } from 'react'
import { Modal } from 'antd'

// eslint-disable-next-line no-unused-vars
type ModalBuilder = (open: () => void, close: () => void, visible: boolean) => JSX.Element

export const useModal = (modal: JSX.Element | ModalBuilder) => {
  const [_visible, setVisible] = useState(false)

  const _open = () => setVisible(true)

  const _close = () => setVisible(false)

  const modalElement = typeof modal !== 'function' ? (
    <Modal
      visible={_visible}
      onCancel={close}
    >
      {modal}
    </Modal>
  ) : (modal(_open, _close, _visible))

  return {
    modal: modalElement, open: _open, close: _close
  }
}
