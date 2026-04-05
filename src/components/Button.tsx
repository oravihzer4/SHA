import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Variant = 'primary' | 'ghost' | 'outline'

type Props = {
  children: ReactNode
  variant?: Variant
  className?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.28em] transition-colors duration-500'

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--color-espresso)] text-[var(--color-cream)] hover:bg-[var(--color-espresso-soft)]',
  ghost: 'text-[var(--color-cream)] border border-white/35 hover:bg-white/10',
  outline:
    'border border-[var(--color-espresso)]/25 text-[var(--color-espresso)] hover:border-[var(--color-espresso)] hover:bg-[var(--color-espresso)] hover:text-[var(--color-cream)]',
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick,
  disabled,
}: Props) {
  const reduce = useReducedMotion()

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={reduce || disabled ? undefined : { scale: 1.02 }}
      whileTap={reduce || disabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
    >
      {children}
    </motion.button>
  )
}
