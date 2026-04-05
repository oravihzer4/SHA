import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'article' | 'header'
}

export function Reveal({ children, className, delay = 0, as = 'div' }: Props) {
  const reduce = useReducedMotion()

  const M = {
    div: motion.div,
    section: motion.section,
    article: motion.article,
    header: motion.header,
  }[as]

  if (reduce) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  )
}
