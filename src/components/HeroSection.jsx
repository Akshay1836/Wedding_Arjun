import { motion, useReducedMotion } from "framer-motion"

const MotionSection = motion.section
const MotionDiv = motion.div
const MotionP = motion.p
const MotionH1 = motion.h1

const ORNAMENTS = [
  { top: "9%", left: "6%", size: 64, rotate: -16 },
  { top: "16%", right: "7%", size: 52, rotate: 22 },
  { bottom: "20%", left: "10%", size: 46, rotate: 10 },
  { bottom: "12%", right: "9%", size: 58, rotate: -14 },
]

const FLOATING_ICONS = [
  { icon: "♥", top: "24%", left: "11%", size: "0.85rem" },
  { icon: "♥", top: "32%", right: "12%", size: "1.25rem" },
  { icon: "♥", top: "61%", left: "9%", size: "1.05rem" },
  { icon: "♥", top: "74%", right: "15%", size: "1.4rem" },
]

function RoyalOrnament({ style }) {
  return (
    <div
      className="pointer-events-none absolute rounded-full bg-gradient-to-b from-gold-100/35 to-transparent dark:from-gold-500/10"
      style={{ width: style.size, height: style.size, ...style }}
      aria-hidden="true"
    >
      <span className="absolute inset-0 grid place-items-center text-gold-500/70 dark:text-gold-300/60">✦</span>
    </div>
  )
}

export default function HeroSection({ bride, groom, dateLabel, locationLabel }) {
  const reduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0.3 : 0.8,
        when: "beforeChildren",
        staggerChildren: reduceMotion ? 0 : 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.25 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <MotionSection
      id="home"
      className="relative isolate flex min-h-screen items-start md:items-center overflow-hidden scroll-mt-28 px-4 pb-10 pt-24 md:min-h-screen md:pb-12 md:pt-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blush-100/45 blur-[95px] dark:bg-blush-200/10" />
        <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-gold-100/42 blur-[105px] dark:bg-gold-300/10" />
        <div className="absolute left-1/2 top-[72%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ivory-100/55 blur-[100px] dark:bg-stone-800/28" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 md:opacity-90" aria-hidden="true">
        {ORNAMENTS.map((ornament, index) => (
          <MotionDiv
            key={index}
            className="hidden sm:block"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, index % 2 === 0 ? -7 : 7, 0],
                    rotate: [ornament.rotate, ornament.rotate + (index % 2 === 0 ? 4 : -4), ornament.rotate],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 6 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >
            <RoyalOrnament style={ornament} />
          </MotionDiv>
        ))}

        {FLOATING_ICONS.map((item, index) => (
          <MotionDiv
            key={`${item.icon}-${index}`}
            className="absolute text-gold-500/45 dark:text-gold-300/38"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              fontSize: item.size,
            }}
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, index % 2 === 0 ? -8 : 8, 0],
                    x: [0, index % 2 === 0 ? 4 : -4, 0],
                    opacity: [0.45, 0.8, 0.45],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 4.8 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            aria-hidden="true"
          >
            {item.icon}
          </MotionDiv>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <MotionDiv
          className="relative overflow-hidden rounded-[1.6rem] bg-white/72 px-4 py-8 backdrop-blur-sm dark:bg-stone-900/42 md:px-7 md:py-10 flex flex-col space-y-4 md:space-y-3"
          variants={itemVariants}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-gold-200/16 to-transparent dark:from-gold-500/6" aria-hidden="true" />

          <MotionP
            className="relative text-center text-[10px] font-semibold uppercase tracking-[0.42em] text-gold-600 dark:text-gold-300"
            variants={itemVariants}
          >
            Shubh Vivah Samaroh
          </MotionP>

          <MotionP
            className="relative mt-2 text-center font-['Cormorant_Garamond'] text-base italic text-stone-600 dark:text-stone-200 md:text-[1.15rem]"
            variants={itemVariants}
          >
            With the blessings of elders and loved ones
          </MotionP>

          <MotionH1
            className="relative mt-2 text-center font-['Cormorant_Garamond'] font-semibold leading-[1.02] text-stone-700 dark:text-ivory-100"
            style={{ fontSize: "clamp(1.85rem, 5.4vw, 3rem)" }}
            variants={itemVariants}
          >
            <span className="inline-block tracking-[0.02em]">{groom}</span>
            <span className="mx-3 inline-block align-middle font-['Great_Vibes'] text-gold-500 dark:text-gold-400" style={{ fontSize: "0.95em" }}>&amp;</span>
            <span className="inline-block tracking-[0.02em]">{bride}</span>
          </MotionH1>

          <MotionDiv className="mt-2 flex items-center justify-center gap-2" variants={itemVariants}>
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-300 dark:to-gold-500/70" />
            <span className="text-gold-500 dark:text-gold-400" aria-hidden="true">✦</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-300 dark:to-gold-500/70" />
          </MotionDiv>

          <MotionP
            className="relative mx-auto mt-2 max-w-2xl text-center font-['Cormorant_Garamond'] text-[0.95rem] italic leading-relaxed text-stone-600 dark:text-stone-200 md:text-[1rem]"
            variants={itemVariants}
          >
            We request the honor of your gracious presence to celebrate their sacred union,
            followed by an evening of joy, music, and blessings.
          </MotionP>

          <MotionDiv className="relative mx-auto mt-4 grid max-w-3xl gap-3 sm:grid-cols-2" variants={itemVariants}>
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-ivory-100/88 to-ivory-50/80 px-4 py-3.5 text-center transition-all duration-300 hover:from-ivory-100 hover:to-gold-50/70 dark:from-stone-800/68 dark:to-stone-900/58 dark:hover:from-stone-800/75 dark:hover:to-stone-800/65">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-200/40 to-transparent dark:via-gold-500/20" aria-hidden="true" />
              <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-stone-500 dark:text-stone-400">Auspicious Date</p>
              <p className="mt-1.5 font-['Cormorant_Garamond'] text-lg font-semibold leading-none text-gold-600 dark:text-gold-300">{dateLabel}</p>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/88 to-ivory-50/85 px-4 py-3.5 text-center transition-all duration-300 hover:from-white/92 hover:to-ivory-50 dark:from-stone-800/68 dark:to-stone-900/58 dark:hover:from-stone-800/75 dark:hover:to-stone-800/65">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-200/40 to-transparent dark:via-gold-500/20" aria-hidden="true" />
              <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-stone-500 dark:text-stone-400">Celebration Venue</p>
              <p className="mt-1.5 font-['Cormorant_Garamond'] text-lg font-semibold leading-none text-stone-700 dark:text-stone-100">{locationLabel}</p>
            </div>
          </MotionDiv>

          <MotionDiv className="relative mt-4 flex flex-wrap items-center justify-center gap-2.5" variants={itemVariants}>
            <a
              href="#events"
              className="inline-flex min-w-[152px] items-center justify-center rounded-full border border-gold-200/70 bg-gradient-to-r from-gold-300 via-gold-200 to-ivory-100 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-700 transition-all duration-300 hover:border-gold-300/80 hover:from-gold-400 hover:via-gold-300 hover:to-ivory-100 hover:text-stone-800 dark:border-gold-500/35 dark:bg-gradient-to-r dark:from-gold-500 dark:via-gold-400 dark:to-gold-300 dark:text-stone-900"
            >
              View Ceremonies
            </a>
            <a
              href="#rsvp"
              className="inline-flex min-w-[152px] items-center justify-center rounded-full border border-gold-200/60 bg-white/92 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-700 transition-all duration-300 hover:border-gold-300/75 hover:bg-ivory-50 dark:border-stone-700/55 dark:bg-stone-800/76 dark:text-gold-300 dark:hover:border-gold-500/45 dark:hover:bg-stone-700"
            >
              Send Blessings
            </a>
          </MotionDiv>
        </MotionDiv>
      </div>
    </MotionSection>
  )
}
