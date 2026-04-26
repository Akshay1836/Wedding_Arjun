import { motion } from "framer-motion"
import { useAnimationSystem } from "../animations"
import Reveal from "./Reveal"
import { FiInstagram, FiMail, FiPhone } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa";

const MotionA = motion.a

function FooterSection({ contact, bride, groom }) {
  const animations = useAnimationSystem()

  return (
    <footer className="px-4 pb-16 pt-22">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-gold-200/45 bg-ivory-50/82 p-8 text-center backdrop-blur-sm shadow-lg shadow-gold-100/15 dark:border-stone-700/60 dark:bg-stone-900/82 md:p-10" variant="fadeIn">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute -left-20 top-0 h-48 w-48 rounded-full bg-gold-100/20 blur-3xl dark:bg-gold-400/5" />
          <div className="absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-ivory-100/30 blur-3xl dark:bg-gold-300/5" />
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-gold-700 dark:text-gold-300">
          With Love
        </p>

        <p className="mt-2 font-['Cormorant_Garamond'] text-[clamp(2rem,6.2vw,3.4rem)] font-semibold leading-[1.04] text-stone-700 dark:text-ivory-100">
          <span>{groom}</span>
          <span className="mx-3 inline-block align-middle font-['Great_Vibes'] text-gold-500 dark:text-gold-400" style={{ fontSize: "0.9em" }}>&amp;</span>
          <span>{bride}</span>
        </p>

        <p className="mt-3 text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
          Stay Connected
        </p>

        <div className="mt-6 flex items-center justify-center gap-3" aria-hidden="true">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-300" />
          <span className="text-gold-500">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-300" />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-stone-700 dark:text-stone-200 md:gap-4">
          <MotionA
            href={`tel:${contact.phone}`}
            className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-full border border-gold-200/65 bg-white/88 px-4 py-2.5 transition-all duration-200 hover:border-gold-300 hover:bg-ivory-50 hover:text-gold-700 dark:border-stone-700 dark:bg-stone-800/90 dark:hover:border-gold-500/40 dark:hover:text-gold-300"
            variants={animations.buttonHover}
            initial="rest"
            whileHover="hover"
            aria-label="Call us"
          >
            <FiPhone />
            {contact.phone}
          </MotionA>
          <MotionA
            href={`mailto:${contact.email}`}
            className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-full border border-gold-200/65 bg-white/88 px-4 py-2.5 transition-all duration-200 hover:border-gold-300 hover:bg-ivory-50 hover:text-gold-700 dark:border-stone-700 dark:bg-stone-800/90 dark:hover:border-gold-500/40 dark:hover:text-gold-300"
            variants={animations.buttonHover}
            initial="rest"
            whileHover="hover"
            aria-label="Email us"
          >
            <FiMail />
            {contact.email}
          </MotionA>
          <MotionA
            href="https://www.instagram.com/arju_n.ravee_ndran/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-full border border-gold-200/65 bg-white/88 px-4 py-2.5 transition-all duration-200 hover:border-gold-300 hover:bg-ivory-50 hover:text-gold-700 dark:border-stone-700 dark:bg-stone-800/90 dark:hover:border-gold-500/40 dark:hover:text-gold-300"
            variants={animations.buttonHover}
            initial="rest"
            whileHover="hover"
            aria-label="Instagram"
          >
            <FiInstagram />
            Instagram
          </MotionA>
          <MotionA
            href="https://wa.me/919446722008"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-full border border-gold-200/65 bg-white/88 px-4 py-2.5 transition-all duration-200 hover:border-gold-300 hover:bg-ivory-50 hover:text-gold-700 dark:border-stone-700 dark:bg-stone-800/90 dark:hover:border-gold-500/40 dark:hover:text-gold-300"
            variants={animations.buttonHover}
            initial="rest"
            whileHover="hover"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
            WhatsApp
          </MotionA>
        </div>

        <p className="mt-7 text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
          Thank you for being part of our story
        </p>
      </Reveal>
    </footer>
  )
}

export default FooterSection
