import { useEffect, useMemo, useState } from "react"
import { useReducedMotion } from "framer-motion"

const EASE = [0.22, 1, 0.36, 1]

export function createAnimationSystem(reduced = false) {
  const baseDuration = reduced ? 0.6 : 0.9

  return {
    reduced,
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: Math.max(0.6, baseDuration - 0.1), ease: EASE },
      },
    },
    fadeUp: {
      hidden: { opacity: 0, y: reduced ? 8 : 28 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: baseDuration, ease: EASE },
      },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: reduced ? 0.99 : 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: Math.max(0.6, baseDuration - 0.05), ease: EASE },
      },
    },
    staggerContainer: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduced ? 0.08 : 0.16,
          delayChildren: reduced ? 0.04 : 0.1,
        },
      },
    },
    pageTransition: {
      hidden: { opacity: 0, y: reduced ? 6 : 14 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: reduced ? 0.7 : 1.05, ease: EASE },
      },
      exit: {
        opacity: 0,
        y: reduced ? -4 : -10,
        transition: { duration: 0.6, ease: EASE },
      },
    },
    cardHover: {
      rest: {
        scale: 1,
        y: 0,
        boxShadow: "0 14px 34px -26px rgba(35, 23, 18, 0.35)",
      },
      hover: {
        scale: reduced ? 1.01 : 1.02,
        y: reduced ? -2 : -6,
        boxShadow: "0 28px 52px -24px rgba(35, 23, 18, 0.35)",
        transition: { duration: 0.7, ease: EASE },
      },
    },
    imageHover: {
      rest: { scale: 1 },
      hover: {
        scale: reduced ? 1.02 : 1.07,
        transition: { duration: 0.9, ease: EASE },
      },
    },
    overlayHover: {
      rest: { opacity: 0 },
      hover: {
        opacity: reduced ? 0.1 : 0.18,
        transition: { duration: 0.8, ease: EASE },
      },
    },
    buttonHover: {
      rest: { scale: 1, y: 0 },
      hover: {
        scale: reduced ? 1.01 : 1.03,
        y: reduced ? -1 : -2,
        transition: { duration: 0.6, ease: EASE },
      },
    },
    ambientFloat: {
      hidden: { opacity: 0.16, scale: 0.95 },
      visible: {
        opacity: [0.2, 0.4, 0.24],
        scale: [1, 1.08, 1],
        transition: {
          duration: reduced ? 6 : 9,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
    modalBackdrop: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
      exit: { opacity: 0, transition: { duration: 0.55, ease: EASE } },
    },
    modalContent: {
      hidden: { opacity: 0, scale: reduced ? 0.98 : 0.93, y: reduced ? 4 : 16 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.9, ease: EASE },
      },
      exit: {
        opacity: 0,
        scale: reduced ? 0.99 : 0.96,
        y: reduced ? 2 : 10,
        transition: { duration: 0.6, ease: EASE },
      },
    },
    loaderSpin: {
      hidden: { rotate: 0, opacity: 0.8 },
      visible: {
        rotate: 360,
        opacity: 1,
        transition: {
          rotate: {
            duration: reduced ? 1.4 : 1.1,
            ease: "linear",
            repeat: Infinity,
          },
          opacity: { duration: 0.6, ease: EASE },
        },
      },
    },
  }
}

export function useAnimationSystem() {
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return undefined

    const mediaQuery = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mediaQuery.matches)

    update()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", update)
      return () => mediaQuery.removeEventListener("change", update)
    }

    mediaQuery.addListener(update)
    return () => mediaQuery.removeListener(update)
  }, [])

  const reduced = Boolean(prefersReducedMotion) || isMobile

  return useMemo(() => createAnimationSystem(reduced), [reduced])
}
