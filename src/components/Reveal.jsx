import { motion, useInView } from "framer-motion"
import { useMemo, useRef } from "react"
import { useAnimationSystem } from "../animations"

const MotionDiv = motion.div

function Reveal({ children, className = "", variant = "fadeUp", amount = 0.25 }) {
  const animations = useAnimationSystem()
  const elementRef = useRef(null)
  const inView = useInView(elementRef, {
    once: true,
    amount: animations.reduced ? 0.1 : amount,
    margin: "0px 0px -8% 0px",
  })

  const selectedVariant = useMemo(
    () => animations[variant] ?? animations.fadeUp,
    [animations, variant],
  )

  return (
    <MotionDiv
      ref={elementRef}
      className={className}
      variants={selectedVariant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </MotionDiv>
  )
}

export default Reveal
