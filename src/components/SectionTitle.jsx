import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useAnimationSystem } from "../animations"

const MotionDiv = motion.div
const MotionP = motion.p
const MotionH2 = motion.h2

function SectionTitle({ eyebrow, title, subtitle }) {
  const animations = useAnimationSystem()
  const titleRef = useRef(null)
  const inView = useInView(titleRef, {
    once: true,
    amount: animations.reduced ? 0.1 : 0.35,
  })

  return (
    <MotionDiv
      ref={titleRef}
      className="mx-auto mb-10 max-w-2xl text-center"
      variants={animations.staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <MotionP variants={animations.fadeIn} className="font-sans text-xs uppercase tracking-[0.35em] text-gold-700">
        {eyebrow}
      </MotionP>
      <MotionH2 variants={animations.fadeUp} className="mt-3 font-display text-4xl text-stone-800 sm:text-5xl dark:text-stone-100">
        {title}
      </MotionH2>
      {subtitle ? (
        <MotionP variants={animations.fadeIn} className="mt-3 text-sm text-stone-600 sm:text-base dark:text-stone-300">
          {subtitle}
        </MotionP>
      ) : null}
    </MotionDiv>
  )
}

export default SectionTitle
