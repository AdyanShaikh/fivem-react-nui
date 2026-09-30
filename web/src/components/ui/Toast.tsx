import { useEffect } from 'react'
import { CheckCircle2, X } from 'lucide-react'

export type ToastData = {
  id: string
  message: string
  duration?: number
}

type ToastProps = ToastData & { onClose: (id: string) => void }

export function Toast({ id, message, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(() => onClose(id), duration)
    return () => window.clearTimeout(timer)
  }, [id, duration, onClose])

  return (
    <div className="pointer-events-auto flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white shadow-2xl">
      <CheckCircle2 className="size-4 text-emerald-400" />
      <span>{message}</span>
      <button onClick={() => onClose(id)} className="ml-2 text-zinc-500 hover:text-white"><X className="size-4" /></button>
    </div>
  )
}
