import { useState, useEffect, useRef } from 'react'

const TOTAL_FRAMES = 171
// Height multiplier: how many viewport heights the animation takes
const HERO_SCROLL_MULTIPLIER = 5

function getFrameSrc(frame: number): string {
    const n = Math.min(Math.max(frame, 1), TOTAL_FRAMES)
    return `/hero/ezgif-frame-${String(n).padStart(3, '0')}.png`
}

function App() {
    const [frame, setFrame] = useState(1)

    // To prevent mobile address bar from causing jumpy frames, calculate vh once
    const vhRef = useRef(window.innerHeight)

    useEffect(() => {
        const handleResize = () => {
            vhRef.current = window.innerHeight
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const onScroll = () => {
            // Using standard window scrolling
            const top = window.scrollY
            const vh = vhRef.current
            const heroLen = vh * HERO_SCROLL_MULTIPLIER

            // Scrub the hero frames based on scroll progress
            const progress = Math.min(top / heroLen, 1)
            const f = Math.floor(progress * (TOTAL_FRAMES - 1)) + 1
            setFrame(Math.min(f, TOTAL_FRAMES))
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        // Initial setup
        onScroll()
        
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Preload adjacent frames
    useEffect(() => {
        for (let i = Math.max(1, frame - 3); i <= Math.min(TOTAL_FRAMES, frame + 6); i++) {
            const img = new Image()
            img.src = getFrameSrc(i)
        }
    }, [frame])

    // Convert total multiplier to actual css units for body height
    // We add 1 so that the max scrollY (which is height - 100vh) exactly equals HERO_SCROLL_MULTIPLIER * 100vh
    const totalH = (HERO_SCROLL_MULTIPLIER + 1) * 100

    return (
        <div style={{ backgroundColor: '#000', overflowX: 'hidden' }}>
            {/* The transparent element that forces the page to have standard scrollable height */}
            <div style={{ height: `${totalH}vh`, pointerEvents: 'none' }} />

            {/* FIXED container holding the actual visual elements */}
            {/* 1. Hero Fullscreen Banner */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 5,
                    backgroundColor: '#000',
                }}
            >
                <img
                    src={getFrameSrc(frame)}
                    alt="Animation Frame"
                    className="w-full h-full object-cover bg-black"
                />
            </div>


        </div>
    )
}

export default App
