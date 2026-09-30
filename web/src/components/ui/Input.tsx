import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn('h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-white outline-none transition focus:border-zinc-600 focus:ring-2 focus:ring-white/10 placeholder:text-zinc-600', className)} {...props} />
  ),
)
Input.displayName = 'Input'
