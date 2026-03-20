import { motion } from "framer-motion"
import { useAnimationSystem } from "../animations"
import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"

const MotionLi = motion.li

const FloatingHearts = () => {
  const heartVariants = {
    animate: (i) => ({
      y: [0, -20, 0],
      opacity: [0.4, 0.8, 0.4],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  }

  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`heart-${i}`}
          custom={i}
          variants={heartVariants}
          animate="animate"
          className="pointer-events-none absolute"
          style={{
            left: `${20 + i * 30}%`,
            top: `${-40 + i * 20}px`,
          }}
          aria-hidden="true"
        >
          <span className="inline-block text-2xl text-gold-500/60 dark:text-gold-300/50">
            ♥
          </span>
        </motion.div>
      ))}
    </>
  )
}

function DressCodeSection({ details }) {
  const animations = useAnimationSystem()

  return (
    <section
      id="details"
      className="relative px-4 py-20"
      style={{
        background:
          typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'radial-gradient(ellipse at 50% 0%, #18120a 0%, #22190c 60%, #18120a 100%)'
            : 'radial-gradient(ellipse at 50% 0%, #f6e7c1 0%, #f7ecd7 40%, #fffbe9 80%, #fff 100%)',
      }}
    >
      <div className="mx-auto max-w-4xl rounded-3xl border border-gold-500 bg-gradient-to-br from-gold-50 via-ivory-100 to-gold-100 shadow-xl shadow-gold-200/30 p-8
        dark:border-gold-500 dark:bg-gradient-to-br dark:from-[#18120a] dark:via-[#22190c] dark:to-[#18120a] dark:shadow-[0_0_32px_0_rgba(212,180,102,0.15)]">
        <div className="relative mb-8">
          <FloatingHearts />
          <SectionTitle
            eyebrow={<span className="text-gold-700 dark:text-gold-300 font-semibold tracking-widest uppercase">Dress Code &amp; Notes</span>}
            title={<span className="bg-gradient-to-r from-gold-600 via-gold-400 to-gold-700 bg-clip-text text-transparent drop-shadow-gold-200 text-3xl md:text-4xl font-extrabold dark:from-gold-200 dark:via-gold-400 dark:to-gold-300">Celebrate in Soft Elegance</span>}
            subtitle={<span className="text-gold-700/80 dark:text-gold-200/80 font-medium">A few details for a seamless celebration.</span>}
          />
        </div>

        <Reveal>
          <ul className="space-y-5 text-left text-gold-900 dark:text-gold-200">
            {details.map((item, idx) => (
              <MotionLi
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-gold-500 bg-gradient-to-br from-gold-50 via-ivory-100 to-gold-100 px-6 py-4 shadow-md shadow-gold-200/20 hover:shadow-gold-300/30
                  dark:border-gold-500 dark:bg-gradient-to-br dark:from-[#22190c] dark:via-[#18120a] dark:to-[#18120a] dark:hover:shadow-gold-900/30 dark:ring-1 dark:ring-gold-900/20 dark:ring-inset transition-shadow"
                variants={animations.cardHover}
                initial="rest"
                whileHover="hover"
              >
                <span className="text-xl md:text-2xl text-gold-500 dark:text-gold-300 drop-shadow-gold-200">♥</span>
                <span className="flex-1 font-medium text-lg md:text-xl dark:text-gold-100">{item}</span>
              </MotionLi>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export default DressCodeSection
