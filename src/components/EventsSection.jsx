import { motion } from "framer-motion"
import { useAnimationSystem } from "../animations"
import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"

const MotionDiv = motion.div
const EVENT_ICONS = ["♡", "🥂", "⛪", "🍽", "🎶", "✨"]

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

function EventsSection({ events }) {
  const animations = useAnimationSystem()

  return (
    <section id="events" className="relative overflow-hidden px-4 py-28 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-36 top-16 h-80 w-80 rounded-full bg-blush-100/50 blur-[90px]" />
        <div className="absolute -right-36 bottom-8 h-96 w-96 rounded-full bg-gold-100/50 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ivory-100/55 blur-[90px] dark:bg-stone-800/30" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="relative">
          <FloatingHearts />
          <SectionTitle
            eyebrow="Wedding Events"
            title="Program Of The Day"
            subtitle="A refined timeline for every celebration moment."
          />
        </div>

        <Reveal variant="scaleIn">
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold-300" />
            <span className="text-lg text-gold-500" aria-hidden="true">✦</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold-300" />
          </div>
        </Reveal>

        <div className="mt-14 pb-5">
          <div className="relative mx-auto max-w-6xl px-2 md:px-6">
            <div
              className="pointer-events-none absolute left-10 right-10 top-[2.75rem] -z-10 hidden h-px md:block"
              style={{
                background:
                  "linear-gradient(90deg, rgba(212,175,106,0.1), rgba(212,175,106,0.7), rgba(212,175,106,0.1))",
              }}
              aria-hidden="true"
            />

            <div className="flex flex-wrap items-start justify-center gap-5 md:gap-6 lg:gap-8">
              {events.map((event, index) => (
                <Reveal key={event.name}>
                  <MotionDiv
                    className="group relative flex h-[15.5rem] w-[170px] flex-shrink-0 flex-col rounded-[1.4rem] px-3 pb-5 pt-5 text-center sm:h-[16.5rem] sm:w-[186px]"
                    variants={animations.cardHover}
                    initial="rest"
                    whileHover="hover"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 -z-10 rounded-[1.4rem] border border-white/60 bg-white/50 backdrop-blur-sm dark:border-stone-700/60 dark:bg-stone-900/45"
                      aria-hidden="true"
                    />

                    <div className="flex items-center justify-center pb-3">
                      <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-300/70 bg-ivory-50 text-base text-gold-700 dark:border-stone-600/60 dark:bg-stone-900/85 dark:text-gold-300">
                        <span aria-hidden="true">{EVENT_ICONS[index % EVENT_ICONS.length]}</span>
                        <span className="pointer-events-none absolute -inset-2 rounded-full border border-gold-300/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                      </div>
                    </div>

                    <h3 className="mt-4 font-['Cormorant_Garamond'] text-[1.55rem] leading-none text-stone-700 dark:text-stone-100">
                      {event.name}
                    </h3>

                    <p className="mx-auto mt-1.5 max-w-[15ch] text-xs leading-relaxed text-stone-400 dark:text-stone-400">
                      {event.venue}
                    </p>

                    <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-gold-700 dark:text-gold-300">
                      {event.date}
                    </p>

                    <p className="mt-auto inline-flex self-center rounded-full bg-gradient-to-r from-gold-600 to-gold-400 px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-white dark:from-gold-700 dark:to-gold-500">
                      {event.time}
                    </p>


                  </MotionDiv>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventsSection
