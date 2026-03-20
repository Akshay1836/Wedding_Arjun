import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Loader: Cinematic, luxury brand film intro
function Loader({ bride, groom, isDark, tagline = "A celebration of love", onFinish }) {
  // Theme colors
  const bgGradient = isDark
    ? "bg-[linear-gradient(180deg,rgba(22,19,15,0.98)_0%,rgba(28,24,18,1)_40%,rgba(24,21,16,0.98)_100%)]"
    : "bg-[linear-gradient(180deg,rgba(249,241,224,0.98)_0%,rgba(255,252,246,1)_38%,rgba(247,235,213,0.96)_100%)]";
  const vignette = isDark
    ? "after:content-[''] after:fixed after:inset-0 after:pointer-events-none after:bg-gradient-to-b after:from-black/60 after:to-black/40"
    : "after:content-[''] after:fixed after:inset-0 after:pointer-events-none after:bg-gradient-to-b after:from-black/10 after:to-black/5";
  const nameColor = isDark ? "text-gold-200" : "text-gold-700";
  const shimmerColor = isDark ? "from-gold-400/0 via-gold-200/60 to-gold-400/0" : "from-gold-200/0 via-gold-500/60 to-gold-200/0";
  const progressColor = isDark ? "bg-gold-700/80" : "bg-gold-400/80";

  // Animation durations
  const DURATION = 3.2;

  // Letter-by-letter name reveal
  const renderName = (name, delay = 0) => (
    <span className="inline-block">
      {[...name].map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: delay + 1.1 + i * 0.07, duration: 0.44, ease: "easeOut" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 4000); // 4 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className={`fixed inset-0 z-[100] flex items-center justify-center ${bgGradient} ${vignette} overflow-hidden`}
      initial={{ opacity: 0, filter: "blur(18px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      aria-label="Loading invitation"
      role="status"
    >
      {/* Animated background gradient movement */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.04, opacity: 0.7 }}
        animate={{ scale: [1.04, 1, 1.02, 1], opacity: [0.7, 1, 0.95, 1] }}
        transition={{ duration: DURATION, repeat: Infinity, ease: "easeInOut" }}
        style={{ zIndex: 1 }}
      />

      {/* Subtle particles/dust */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {[...Array(7)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gold-200/20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${18 + (i % 4) * 16}%`,
              width: `${0.5 + 0.2 * (i % 3)}rem`,
              height: `${0.5 + 0.2 * (i % 2)}rem`,
              filter: "blur(2.5px)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.5, 0.2, 0], scale: [0.8, 1.1, 1, 0.8] }}
            transition={{ duration: 3.8 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
          />
        ))}
      </div>

      {/* Cinematic center content */}
      <motion.div
        className="relative flex flex-col items-center justify-center w-full max-w-xl px-4"
        initial={{ scale: 1.04, opacity: 0 }}
        animate={{ scale: [1.04, 1, 1.01, 1], opacity: [0, 1, 1, 1] }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ zIndex: 20 }}
      >
        {/* Elegant animated light trail */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-64 h-1.5 rounded-full bg-gradient-to-r from-transparent via-gold-300/80 to-transparent shadow-lg"
          initial={{ opacity: 0, scaleX: 0.2 }}
          animate={{ opacity: [0, 1, 0.7, 0], scaleX: [0.2, 1, 1, 1.2] }}
          transition={{ duration: 1.1, delay: 0.7, ease: "easeInOut" }}
        />

        {/* Names luxury reveal */}
        <motion.h1
          className={`relative text-center font-['Great_Vibes'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide ${nameColor}`}
          initial={{ opacity: 0, y: 32, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 1.1, ease: "easeOut" }}
        >
          {renderName(groom)}
          <span className="mx-3 font-['Cormorant_Garamond'] text-2xl align-middle">&amp;</span>
          {renderName(bride, 0.2)}
          {/* Shimmer sweep */}
          <motion.span
            className={`absolute left-0 top-1/2 w-full h-8 -translate-y-1/2 pointer-events-none bg-gradient-to-r ${shimmerColor} blur-[2px]`}
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: [0, 0.22, 0], x: [0, 40, 80] }}
            transition={{ duration: 1.3, delay: 1.7, repeat: Infinity, repeatDelay: 2.2 }}
            aria-hidden="true"
          />
        </motion.h1>

        {/* Tagline luxury fade-in */}
        <motion.p
          className="mt-4 text-center font-['Cormorant_Garamond'] text-lg sm:text-xl font-medium text-gold-500 dark:text-gold-200/90 tracking-wide"
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 2.1, ease: "easeOut" }}
        >
          {tagline}
        </motion.p>

        {/* Minimal loader indicator (progress line) */}
        <motion.div
          className={`mt-10 h-0.5 w-32 rounded-full ${progressColor} shadow-inner`}
          initial={{ scaleX: 0, opacity: 0.7 }}
          animate={{ scaleX: [0, 1, 1, 0], opacity: [0.7, 1, 1, 0] }}
          transition={{ duration: DURATION, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
        />

        {/* Micro breathing animation (scale loop) */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.012, 0.995, 1] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ zIndex: -1 }}
        />

        {/* Optional skip button */}
        {/* <motion.button
          className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gold-100/80 text-gold-700 font-semibold text-xs shadow-md hover:bg-gold-200/90 transition-all"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.7, ease: "easeOut" }}
        >
          Skip
        </motion.button> */}
      </motion.div>

      {/* Film grain overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 mix-blend-soft-light opacity-30" style={{ background: `url('data:image/svg+xml;utf8,<svg width=\'100%\' height=\'100%\' xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grain\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23grain)\' opacity=\'0.18\'/></svg>')`, backgroundSize: 'cover' }} />
    </motion.div>
  );
}

export default Loader;
