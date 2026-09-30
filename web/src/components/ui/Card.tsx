import type { HTMLAttributes } from 'react'

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-zinc-800 bg-zinc-950/80 shadow-2xl shadow-black/20 ${className}`}
      {...props}
    />
  )
}
