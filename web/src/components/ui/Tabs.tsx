import { useState, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Tab = { id: string; label: ReactNode; content: ReactNode }

export function Tabs({ items, defaultValue }: { items: Tab[]; defaultValue?: string }) {
  const [active, setActive] = useState(defaultValue ?? items[0]?.id)
  const current = items.find((item) => item.id === active) ?? items[0]
  return (
    <div>
      <div className="flex gap-1 border-b border-zinc-800">
        {items.map((item) => (
          <button key={item.id} onClick={() => setActive(item.id)} className={cn('border-b-2 border-transparent px-4 py-2 text-sm text-zinc-500 hover:text-zinc-200', active === item.id && 'border-white text-white')}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="pt-4">{current?.content}</div>
    </div>
  )
}
