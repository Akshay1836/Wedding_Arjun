import { motion, AnimatePresence } from "framer-motion"
import { useAnimationSystem } from "../animations"
import { useState } from "react"
import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"

const MotionDiv = motion.div
const MotionButton = motion.button

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

const initialState = {
  name: "",
  email: "",
  guests: "2",
  message: "",
}

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
}

function RSVPSection() {
  const animations = useAnimationSystem()
  const [formData, setFormData] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)

  const onChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    setFormData(initialState)
  }

  const inputClass = (name) =>
    `mt-1 w-full rounded-xl border px-4 py-3 outline-none transition-all duration-300 bg-ivory-50 dark:bg-stone-800 dark:border-stone-700 ${
      focused === name
        ? "border-gold-500"
        : "border-blush-200"
    }`

  return (
    <section id="rsvp" className="px-4 py-20">
      <Reveal variant="fadeUp">
        <MotionDiv
          className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-gold-300/50 bg-white/85 p-8 backdrop-blur dark:border-stone-700 dark:bg-stone-900/80"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <FloatingHearts />
            <SectionTitle
              eyebrow="RSVP"
              title="Will You Join Us?"
              subtitle="Please respond before November 20, 2026."
            />
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <MotionDiv
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-4 py-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold-300 bg-ivory-50 text-2xl dark:bg-stone-800"
                >
                  ♡
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="font-['Cormorant_Garamond'] text-2xl text-stone-700 dark:text-stone-100"
                >
                  Thank you!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="text-sm text-stone-400"
                >
                  Your RSVP has been received. We can't wait to celebrate with you.
                </motion.p>
              </MotionDiv>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                className="space-y-4 text-left"
                initial="hidden"
                animate="visible"
              >
                {[
                  { label: "Name", name: "name", type: "text", required: true },
                  { label: "Email", name: "email", type: "email", required: true },
                  { label: "Number of Guests", name: "guests", type: "number", required: true, min: "1", max: "8" },
                ].map((field, i) => (
                  <motion.label
                    key={field.name}
                    className={`block text-sm transition-colors duration-300 dark:text-stone-200 ${
                      focused === field.name ? "text-gold-700" : "text-stone-700"
                    }`}
                    custom={i}
                    variants={fieldVariants}
                  >
                    {field.label}
                    <input
                      required={field.required}
                      type={field.type}
                      name={field.name}
                      min={field.min}
                      max={field.max}
                      value={formData[field.name]}
                      onChange={onChange}
                      onFocus={() => setFocused(field.name)}
                      onBlur={() => setFocused(null)}
                      className={inputClass(field.name)}
                    />
                  </motion.label>
                ))}

                <motion.label
                  className={`block text-sm transition-colors duration-300 dark:text-stone-200 ${
                    focused === "message" ? "text-gold-700" : "text-stone-700"
                  }`}
                  custom={3}
                  variants={fieldVariants}
                >
                  Message
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={onChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    rows={4}
                    className={inputClass("message")}
                    placeholder="Share your wishes for the couple"
                  />
                </motion.label>

                <motion.div custom={4} variants={fieldVariants}>
                  <MotionButton
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 px-6 py-3 text-sm font-semibold tracking-wide text-white transition dark:from-gold-700 dark:to-gold-500"
                    variants={animations.buttonHover}
                    initial="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.97 }}
                  >
                    Confirm Attendance
                  </MotionButton>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </MotionDiv>
      </Reveal>
    </section>
  )
}

export default RSVPSection
