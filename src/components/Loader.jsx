import { motion } from "framer-motion"
import { useAnimationSystem } from "../animations"

const MotionDiv = motion.div
const MotionSpan = motion.span

const PARTICLES = [
  { left: "10%", top: "20%", size: "1rem", delay: 0 },
  { left: "22%", top: "72%", size: "0.8rem", delay: 0.6 },
  { left: "35%", top: "16%", size: "1.1rem", delay: 1.1 },
  { left: "48%", top: "78%", size: "0.75rem", delay: 0.2 },
  { left: "62%", top: "22%", size: "0.95rem", delay: 1.4 },
  { left: "74%", top: "68%", size: "1.1rem", delay: 0.8 },
  { left: "88%", top: "30%", size: "0.85rem", delay: 1.7 },
]

const SPARKLES = [
  { x: -26, y: -10, delay: 0.95 },
  { x: 24, y: -12, delay: 1.05 },
  { x: -10, y: -30, delay: 1.12 },
  { x: 12, y: -34, delay: 1.18 },
]

const LOVE_BURST = [
  { drift: -42, rise: 82, size: "0.8rem", delay: 0.06, rotate: -16 },
  { drift: -24, rise: 95, size: "0.95rem", delay: 0.11, rotate: -10 },
  { drift: 0, rise: 106, size: "1.1rem", delay: 0.08, rotate: 0 },
  { drift: 24, rise: 94, size: "0.95rem", delay: 0.14, rotate: 10 },
  { drift: 42, rise: 82, size: "0.8rem", delay: 0.18, rotate: 16 },
]

function Loader({ bride, groom, isDark }) {
  const animations = useAnimationSystem()

  return (
    <MotionDiv
      className={`fixed inset-0 z-[100] grid place-items-center ${
        isDark
          ? "bg-[linear-gradient(180deg,rgba(22,19,15,0.98)_0%,rgba(28,24,18,1)_40%,rgba(24,21,16,0.98)_100%)]"
          : "bg-[linear-gradient(180deg,rgba(249,241,224,0.98)_0%,rgba(255,252,246,1)_38%,rgba(247,235,213,0.96)_100%)]"
      }`}
      variants={animations.modalBackdrop}
      initial="visible"
      animate="visible"
      exit="exit"
      aria-label="Loading invitation"
      role="status"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className={`absolute -left-16 top-14 h-64 w-64 rounded-full blur-[95px] ${isDark ? "bg-gold-400/10" : "bg-gold-100/45"}`} />
        <div className={`absolute -right-12 bottom-10 h-72 w-72 rounded-full blur-[110px] ${isDark ? "bg-blush-300/10" : "bg-ivory-100/65"}`} />

        {PARTICLES.map((item, index) => (
          <MotionDiv
            key={index}
            className={`${isDark ? "text-gold-300/40" : "text-gold-500/45"} absolute`}
            style={{ left: item.left, top: item.top, fontSize: item.size }}
            animate={
              animations.reduced
                ? undefined
                : {
                    y: [0, -8, 0],
                    opacity: [0.35, 0.8, 0.35],
                  }
            }
            transition={
              animations.reduced
                ? undefined
                : {
                    duration: 3.8,
                    delay: item.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >
            ♥
          </MotionDiv>
        ))}
      </div>

      <MotionDiv className="relative text-center" variants={animations.modalContent} initial="hidden" animate="visible">
        <MotionDiv
          className="relative mx-auto mb-6 h-[44vw] min-h-[170px] max-h-[260px] w-11/12 max-w-[340px] sm:h-[210px] sm:w-[320px]"
          animate={
            animations.reduced
              ? undefined
              : {
                  y: [0, -3, 0],
                }
          }
          transition={
            animations.reduced
              ? undefined
              : {
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          <div className="absolute inset-x-0 top-[16%] z-[60] mx-auto w-10/12 max-w-[260px] sm:top-[34px] sm:w-[240px]">
            <MotionDiv
              className={`h-[24vw] min-h-[90px] max-h-[140px] rounded-xl border px-4 pt-4 text-center sm:h-[128px] ${
                isDark
                  ? "border-gold-500/25 bg-stone-800/95 text-gold-300"
                  : "border-gold-200/70 bg-white text-gold-700"
              }`}
              animate={
                animations.reduced
                  ? undefined
                  : {
                      y: [30, -132, -112, 62, 12, 34, 30],
                      rotate: [0, -1.5, -1, 1.6, -0.5, 0.25, 0],
                    }
              }
              transition={
                animations.reduced
                  ? undefined
                  : {
                      duration: 4.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.2, 0.42, 0.66, 0.8, 0.92, 1],
                    }
              }
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em]">Invitation</p>
              <p className="mt-2 whitespace-nowrap font-['Cormorant_Garamond'] text-[1rem] font-semibold leading-none">
                {groom}
                <span className="mx-1.5 inline-block align-middle font-['Great_Vibes'] text-[0.82em]">&amp;</span>
                {bride}
              </p>
            </MotionDiv>

            {!animations.reduced
              ? LOVE_BURST.map((heart, index) => (
                  <MotionDiv
                    key={`love-burst-${index}`}
                    className={`pointer-events-none absolute inset-x-0 top-14 mx-auto w-fit ${isDark ? "text-gold-300/85" : "text-gold-500/85"}`}
                    style={{ fontSize: heart.size }}
                    animate={{
                        x: [0, heart.drift * 0.55, heart.drift],
                      y: [0, 0, -heart.rise * 0.55, -heart.rise, -(heart.rise + 8)],
                      rotate: [0, heart.rotate * 0.5, heart.rotate],
                      opacity: [0, 0, 0.96, 0.78, 0],
                      scale: [0.3, 0.3, 1, 0.92, 0.45],
                    }}
                    transition={{
                      duration: 4.2,
                      delay: heart.delay,
                      repeat: Infinity,
                      ease: "easeOut",
                      times: [0, 0.2, 0.36, 0.62, 1],
                    }}
                    aria-hidden="true"
                  >
                    ♥
                  </MotionDiv>
                ))
              : null}
          </div>

          <MotionDiv
            className={`absolute inset-x-0 bottom-0 z-20 mx-auto h-[22vw] min-h-[70px] max-h-[120px] w-10/12 max-w-[220px] overflow-hidden rounded-b-[18px] border-x border-b sm:h-[120px] sm:w-[270px] ${
              isDark
                ? "border-gold-500/25 bg-gradient-to-b from-stone-800/95 to-stone-900/90"
                : "border-gold-300/60 bg-gradient-to-b from-white to-ivory-100"
            }`}
            animate={
              animations.reduced
                ? undefined
                : {
                    scaleY: [1, 1, 1, 0.95, 1.02, 0.99, 1],
                  }
            }
            transition={
              animations.reduced
                ? undefined
                : {
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.42, 0.66, 0.8, 0.92, 1],
                  }
            }
          >
            <div className={`pointer-events-none absolute inset-x-0 top-0 h-px ${isDark ? "bg-gold-500/25" : "bg-gold-300/55"}`} />
            <div className={`pointer-events-none absolute inset-x-3 top-2 h-5 rounded-full blur-md ${isDark ? "bg-gold-300/6" : "bg-white/60"}`} />
          </MotionDiv>

          <MotionDiv
            className={`absolute inset-x-0 -bottom-3 z-10 mx-auto h-3 w-8/12 max-w-[172px] rounded-full blur-sm ${
              isDark ? "bg-black/45" : "bg-stone-500/20"
            }`}
            animate={
              animations.reduced
                ? undefined
                : {
                    scaleX: [0.78, 0.52, 0.56, 1.08, 0.9, 1, 0.95],
                    opacity: [0.35, 0.22, 0.24, 0.5, 0.38, 0.42, 0.36],
                  }
            }
            transition={
              animations.reduced
                ? undefined
                : {
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.42, 0.66, 0.8, 0.92, 1],
                  }
            }
            aria-hidden="true"
          />

          <div className="absolute inset-x-0 bottom-[27vw] sm:bottom-[72px] z-40 mx-auto w-10/12 max-w-[220px] sm:w-[270px]" style={{ perspective: 900 }}>
            <MotionDiv
              className={`h-[9vw] min-h-[48px] max-h-[108px] origin-bottom [clip-path:polygon(0_100%,50%_0,100%_100%)] border sm:h-[108px] ${
                isDark
                  ? "border-gold-500/25 bg-gradient-to-b from-stone-800/98 to-stone-900/95"
                  : "border-gold-300/60 bg-gradient-to-b from-ivory-100 to-gold-50/80"
              }`}
              animate={
                animations.reduced
                  ? undefined
                  : {
                      rotateX: [0, 166, 166, 0],
                    }
              }
              transition={
                animations.reduced
                  ? undefined
                  : {
                      duration: 4.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.2, 0.76, 1],
                    }
              }
            />
          </div>

          <div className="absolute inset-x-0 bottom-[54px] z-50 mx-auto w-fit">
            <MotionDiv
              className={`grid h-8 w-8 place-items-center rounded-full border-2 text-[0.7rem] shadow-[0_8px_16px_-10px_rgba(0,0,0,0.35)] ${
                isDark
                  ? "border-gold-500/50 bg-gradient-to-b from-stone-800 to-stone-900 text-gold-300"
                  : "border-gold-300/80 bg-gradient-to-b from-white to-ivory-100 text-gold-600"
              }`}
              animate={
                animations.reduced
                  ? undefined
                  : {
                      scale: [1, 1.08, 1],
                      opacity: [0.9, 1, 0.9],
                    }
              }
              transition={
                animations.reduced
                  ? undefined
                  : {
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              ♥
            </MotionDiv>
          </div>

          {!animations.reduced
            ? SPARKLES.map((sparkle, index) => (
                <MotionDiv
                  key={`sparkle-${index}`}
                  className={`pointer-events-none absolute inset-x-0 bottom-[62px] z-50 mx-auto w-fit ${
                    isDark ? "text-gold-300/80" : "text-gold-500/80"
                  }`}
                  style={{ x: sparkle.x, y: sparkle.y }}
                  animate={{
                    opacity: [0, 0, 1, 0.6, 0],
                    scale: [0.4, 0.4, 1, 0.9, 0.2],
                  }}
                  transition={{
                    duration: 3.6,
                    delay: sparkle.delay,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  aria-hidden="true"
                >
                  ✦
                </MotionDiv>
              ))
            : null}
        </MotionDiv>
        <p
          className={`font-['Cormorant_Garamond'] text-[clamp(2rem,5vw,2.7rem)] font-semibold leading-none ${
            isDark ? "text-gold-300" : "text-gold-700"
          }`}
        >
          <span>{groom}</span>
          <span className="mx-2 inline-block align-middle font-['Great_Vibes'] text-[0.82em]">&amp;</span>
          <span>{bride}</span>
        </p>

        <p className={`mt-2 text-xs uppercase tracking-[0.35em] ${isDark ? "text-stone-300" : "text-stone-500"}`}>
          Loading invitation
          <MotionSpan
            className="inline-block"
            animate={animations.reduced ? undefined : { opacity: [0, 1, 0] }}
            transition={animations.reduced ? undefined : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            ...
          </MotionSpan>
        </p>
      </MotionDiv>
    </MotionDiv>
  )
}

export default Loader
