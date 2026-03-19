import { motion } from "framer-motion"
import { useAnimationSystem } from "../animations"
import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"

const MotionDiv = motion.div
const MotionA = motion.a

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

function VenueSection({ address, mapEmbed, directionsUrl }) {
  const animations = useAnimationSystem()

  return (
    <section id="venue" className="px-4 pt-12 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <FloatingHearts />
          <SectionTitle
            eyebrow="Venue"
            title="The Imperial Gardens"
            subtitle="A grand setting in the heart of Ernakulam."
          />
        </div>

        <Reveal className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <iframe
            title="Wedding venue map"
            src={mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[22rem] w-full rounded-3xl border border-gold-200 dark:border-stone-700"
          />

          <MotionDiv
            className="relative rounded-3xl border border-gold-300/60 bg-white/85 p-7 dark:border-stone-700 dark:bg-stone-900/80"
            variants={animations.cardHover}
            initial="rest"
            whileHover="hover"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold-700 dark:text-gold-300">
              Venue Details
            </p>
            <h3 className="mt-2 font-display text-3xl text-stone-800 dark:text-stone-100">
              Address
            </h3>

            <div className="mt-4 flex items-center gap-3" aria-hidden="true">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-300" />
              <span className="text-gold-500">✦</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-300" />
            </div>

            <p className="mt-4 leading-relaxed text-stone-600 dark:text-stone-300">{address}</p>
            <MotionA
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-300/70 bg-ivory-50 px-5 py-2.5 text-sm font-semibold tracking-[0.08em] text-gold-700 transition-colors hover:text-blush-700 dark:border-stone-700 dark:bg-stone-800 dark:text-gold-300"
              variants={animations.buttonHover}
              initial="rest"
              whileHover="hover"
              aria-label="Open directions"
            >
              Get Directions
              <span aria-hidden="true">→</span>
            </MotionA>
          </MotionDiv>
        </Reveal>
      </div>
    </section>
  )
}

export default VenueSection
