import { motion } from "framer-motion"

export default function BackgroundHearts() {
  const hearts = Array.from({ length: 14 })
  const columns = 5
  const rows = Math.ceil(hearts.length / columns)

  const heartVariants = {
    animate: (i) => ({
      y: [0, -22 - (i % 6) * 5, -10, -30 - (i % 5) * 6, 0],
      x: [0, 18 + (i % 4) * 6, -12 - (i % 3) * 4, 10 + (i % 5) * 5, 0],
      opacity: [0.3, 0.62, 0.4, 0.7, 0.3],
      rotate: [0, 12 + i * 2, -8 - i, 15 + i * 1.5, 0],
      scale: [1, 1.14, 0.92, 1.08, 1],
      transition: {
        duration: 6.5 + (i % 7) * 1.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.18,
      },
    }),
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {hearts.map((_, i) => {
        const row = Math.floor(i / columns)
        const col = i % columns
        const leftStep = columns > 1 ? 84 / (columns - 1) : 0
        const topStep = rows > 1 ? 84 / (rows - 1) : 0
        const left = 8 + col * leftStep + (row % 2 === 0 ? 0 : 3)
        const top = 8 + row * topStep + (col % 2 === 0 ? 1.5 : -1.5)
        const size = 13 + row * 6 + (col % 4) * 5

        return (
          <motion.div
            key={`bg-heart-${i}`}
            custom={i}
            variants={heartVariants}
            animate="animate"
            className="absolute text-gold-500/55 dark:text-gold-300/45"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              fontSize: `${size}px`,
            }}
          >
            ♥
          </motion.div>
        )
      })}
    </div>
  )
}
