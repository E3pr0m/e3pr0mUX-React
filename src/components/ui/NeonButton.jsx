import { motion } from 'framer-motion'

export default function NeonButton({ children, variant = 'primary', onClick, href, className = '' }) {
  const cls = variant === 'primary' ? 'btn-cyber' : 'btn-cyber-outline'

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${cls} ${className}`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${cls} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
