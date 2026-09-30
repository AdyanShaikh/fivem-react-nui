import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'ghost' | 'danger'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white text-zinc-950 hover:bg-zinc-200',
      secondary: 'bg-zinc-800 text-white hover:bg-zinc-700',
      ghost: 'bg-transparent text-zinc-300 hover:bg-zinc-800',
      danger: 'bg-red-500 text-white hover:bg-red-400',
    }

    return (
      <button
        ref={ref}
        className={`inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

export { Button }
