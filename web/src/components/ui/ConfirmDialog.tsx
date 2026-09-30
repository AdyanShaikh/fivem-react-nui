import type { ReactNode } from 'react'
import { Modal } from './Modal'
import { Button } from './Button'

type ConfirmDialogProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  children?: ReactNode
  loading?: boolean
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  children,
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={loading ? () => undefined : onClose} title={title}>
      {description && <p className="text-sm text-zinc-400">{description}</p>}
      {children}
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? 'Working…' : confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
