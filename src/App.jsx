import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { useAnimationSystem } from "./animations"
import BackgroundHearts from "./components/BackgroundHearts"
import CountdownSection from "./components/CountdownSection"
import DressCodeSection from "./components/DressCodeSection"
import EventsSection from "./components/EventsSection"
import FloatingNav from "./components/FloatingNav"
import FooterSection from "./components/FooterSection"
import CelebrationsVibeSection from "./components/CelebrationsVibeSection"
import GallerySection from "./components/GallerySection"
import HeroSection from "./components/HeroSection"
import Loader from "./components/Loader"
import WelcomeSection from "./components/WelcomeSection"
import RSVPSection from "./components/RSVPSection"
import StorySection from "./components/StorySection"
import VenueSection from "./components/VenueSection"
import {
  dressDetails,
  events,
  galleryImages,
  storyMoments,
  weddingInfo,
} from "./data/weddingContent"

const trackUrls = [
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_b78f8de196.mp3?filename=romantic-piano-11384.mp3",
  "https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443f.mp3?filename=romantic-10295.mp3",
]
const MotionMain = motion.main

function App() {
  const animations = useAnimationSystem()
  const [isLoading, setIsLoading] = useState(true)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false
    const savedTheme = window.localStorage.getItem("theme")
    if (savedTheme) return savedTheme === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const createAudio = (url) => {
    const audio = new Audio(url)
    audio.loop = true
    audio.preload = "auto"
    audio.volume = 0.35
    return audio
  }

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1700)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    window.localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  useEffect(
    () => () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    },
    [],
  )

  const onThemeToggle = () => setIsDark((value) => !value)

  const onMusicToggle = async () => {
    if (!audioRef.current) {
      audioRef.current = createAudio(trackUrls[0])
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }

    for (const url of trackUrls) {
      try {
        if (audioRef.current.src !== url) {
          audioRef.current.pause()
          audioRef.current = createAudio(url)
        }
        await audioRef.current.play()
        setIsPlaying(true)
        return
      } catch {
        // Try the next fallback URL.
      }
    }

    setIsPlaying(false)
  }

  const bride = useMemo(() => weddingInfo.couple.bride, [])
  const groom = useMemo(() => weddingInfo.couple.groom, [])

  return (
    <div className="relative isolate overflow-x-hidden bg-[linear-gradient(180deg,rgba(249,241,224,0.98)_0%,rgba(255,252,246,1)_38%,rgba(247,235,213,0.96)_100%)] dark:bg-[linear-gradient(180deg,rgba(22,19,15,0.98)_0%,rgba(28,24,18,1)_40%,rgba(24,21,16,0.98)_100%)]">
      <BackgroundHearts />
      <span className="ornament left-[-5rem] top-[8rem] h-60 w-60 bg-blush-300" aria-hidden="true" />
      <span className="ornament bottom-[15rem] right-[-6rem] h-72 w-72 bg-gold-200" aria-hidden="true" />

      <FloatingNav
        isDark={isDark}
        onThemeToggle={onThemeToggle}
        isPlaying={isPlaying}
        onMusicToggle={onMusicToggle}
      />

      <MotionMain className="relative z-10 pt-12 md:pt-12" variants={animations.pageTransition} initial="hidden" animate="visible" exit="exit">
        <HeroSection
          bride={bride}
          groom={groom}
          dateLabel={weddingInfo.dateLabel}
          locationLabel={weddingInfo.locationLabel}
        />
        <WelcomeSection
          bride={bride}
          groom={groom}
          locationLabel={weddingInfo.locationLabel}
        />
        <CountdownSection targetDate={weddingInfo.targetDate} />
        <StorySection moments={storyMoments} />
        <EventsSection events={events} />
        <GallerySection images={galleryImages} bride={bride} groom={groom} />
        <CelebrationsVibeSection images={galleryImages} bride={bride} groom={groom} />
        <RSVPSection />
        <VenueSection
          address={weddingInfo.address}
          mapEmbed={weddingInfo.mapEmbed}
          directionsUrl={weddingInfo.directionsUrl}
        />
        <DressCodeSection details={dressDetails} />
      </MotionMain>

      <FooterSection contact={weddingInfo.contact} bride={bride} groom={groom} />

      <AnimatePresence>{isLoading ? <Loader bride={bride} groom={groom} isDark={isDark} /> : null}</AnimatePresence>
    </div>
  )
}

export default App
