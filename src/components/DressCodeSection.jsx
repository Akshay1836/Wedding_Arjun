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
    <section id="details" className="px-4 py-20">
      <div className="mx-auto max-w-4xl rounded-3xl border border-blush-200 bg-white/85 p-8 dark:border-stone-700 dark:bg-stone-900/80">
        <div className="relative">
          <FloatingHearts />
          <SectionTitle
            eyebrow="Dress Code & Notes"
            title="Celebrate in Soft Elegance"
            subtitle="A few details for a seamless celebration."
          />
        </div>

        <Reveal>
          <ul className="space-y-3 text-left text-stone-700 dark:text-stone-200">
            {details.map((item) => (
              <MotionLi
                key={item}
                className="rounded-2xl border border-gold-300 bg-ivory-50 px-4 py-3 dark:border-stone-700 dark:bg-stone-800"
                variants={animations.cardHover}
                initial="rest"
                whileHover="hover"
              >
                {item}
              </MotionLi>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export default DressCodeSection
