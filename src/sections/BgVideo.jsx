import { useEffect, useRef } from 'react'

export default function BgVideo({ src }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (video.ended) video.currentTime = 0
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.2 }
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return <video ref={ref} className="bg" src={src} muted playsInline preload="metadata" />
}
