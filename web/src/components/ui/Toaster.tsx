import { useCallback, useState } from 'react'
import { Toast, type ToastData } from './Toast'

export function Toaster() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const remove = useCallback((id: string) => {
    setToasts((items) => items.filter((item) => item.id !== id))
  }, [])

  return (
    <div id="toaster" className="pointer-events-none fixed right-5 top-5 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => <Toast key={toast.id} {...toast} onClose={remove} />)}
    </div>
  )
}

export function createToast(message: string): ToastData {
  return { id: crypto.randomUUID(), message }
}
