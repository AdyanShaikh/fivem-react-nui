import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

type ModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        aria-label={title}
        aria-modal="true"
        className={cn(
          'w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl',
          className,
        )}
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          {title ? (
            <h2 className="font-semibold text-white">{title}</h2>
          ) : (
            <span aria-hidden="true" />
          )}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-md p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </header>
        <div className="p-5">{children}</div>
      </section>
    </div>
  )
}
