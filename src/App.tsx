import { useState, useEffect, useRef } from 'react'
import CoFounders from './CoFounders'
import HeroCube from './HeroCube'
import { RESPONSIVE_CLASSES } from './responsive'

interface NavLink {
    href: string
    label: string
}

function App() {
    const [currentView, setCurrentView] = useState('home')
    const [count, setCount] = useState<number>(0)
    const [animationKey, setAnimationKey] = useState<number>(0)
    const [aboutAnimationKey, setAboutAnimationKey] = useState<number>(0)
    const [servicesAnimationKey, setServicesAnimationKey] = useState<number>(0)
    const [portfolioAnimationKey, setPortfolioAnimationKey] = useState<number>(0)
    const [contactAnimationKey, setContactAnimationKey] = useState<number>(0)
    const [foundersAnimationKey, setFoundersAnimationKey] = useState<number>(0)
    const [counts, setCounts] = useState({ projects: 0, clients: 0 })
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
    const [activeServiceCard, setActiveServiceCard] = useState<HTMLDivElement | null>(null)
    const heroRef = useRef<HTMLDivElement>(null)
    const aboutRef = useRef<HTMLDivElement>(null)
    const servicesRef = useRef<HTMLDivElement>(null)
    const portfolioRef = useRef<HTMLDivElement>(null)
    const contactRef = useRef<HTMLDivElement>(null)
    const foundersRef = useRef<HTMLDivElement>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    // Interactive letter distortion state
    const [isHovering, setIsHovering] = useState<boolean>(false)
    const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const [letterOffsets, setLetterOffsets] = useState<Array<{ x: number; y: number; blur: number }>>([])
    const letterRefs = useRef<Array<HTMLSpanElement | null>>([])
    const animationFrameRef = useRef<number | null>(null)
    const lastCursorPos = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 })
    const velocity = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
    const [showTapHint, setShowTapHint] = useState(true) // State to toggle "Tap here" hint

    const navLinks: NavLink[] = [
        { href: '#hero', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#services', label: 'Services' },
        { href: '#portfolio', label: 'Portfolio' },
        { href: '#contact', label: 'Contact' },
    ]

    const services = [
        {
            title: 'Custom Web Development',
            description: 'Tailored modern websites.',
            gradient: 'from-purple-500 to-pink-500',
            textColor: 'text-white',
            descColor: 'text-purple-100'
        },
        {
            title: 'App Development',
            description: 'Native & cross-platform apps.',
            gradient: 'from-blue-500 to-cyan-500',
            textColor: 'text-white',
            descColor: 'text-blue-100'
        },
        {
            title: 'E-commerce Solutions',
            description: 'Secure online stores.',
            gradient: 'from-green-500 to-emerald-500',
            textColor: 'text-white',
            descColor: 'text-green-100'
        },
        {
            title: 'Responsive Design',
            description: 'Perfect on every device.',
            gradient: 'from-orange-500 to-red-500',
            textColor: 'text-white',
            descColor: 'text-orange-100'
        },
        {
            title: 'SEO Optimization',
            description: 'Boost your rankings.',
            gradient: 'from-indigo-500 to-purple-600',
            textColor: 'text-white',
            descColor: 'text-indigo-100'
        },
        {
            title: 'Maintenance',
            description: 'Secure & updated.',
            gradient: 'from-teal-500 to-blue-600',
            textColor: 'text-white',
            descColor: 'text-teal-100'
        },
    ]

    // Carousel for hero section descriptions
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0)

    const heroDescriptions = [
        {
            tagline: "(WE ARE)",
            title: "The digital agency for modern businesses.",
        },
        {
            tagline: "(WE CREATE)",
            title: "Stunning web solutions that drive real results and growth.",
        },
        {
            tagline: "(WE DELIVER)",
            title: "Premium digital experiences with cutting-edge technology.",
        },
        {
            tagline: "(WE BUILD)",
            title: "Innovative platforms that transform your online presence.",
        }
    ]

    const handleNextText = () => {
        setCurrentTextIndex((prev) => (prev + 1) % heroDescriptions.length)
    }

    // Auto-play carousel every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            handleNextText()
        }, 5000) // 5000ms = 5 seconds

        return () => clearInterval(interval)
    }, [])

    // Handle service card click - Fade to background interaction
    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;

        // If there's a previously active card, reset it to original color
        if (activeServiceCard && activeServiceCard !== card) {
            activeServiceCard.animate([
                { background: 'linear-gradient(to bottom, rgb(23, 37, 84), rgb(231, 229, 228))' }, // current background
                { background: 'linear-gradient(to bottom right, rgb(59, 130, 246), rgb(6, 182, 212))' } // back to blue-500 to cyan-500
            ], {
                duration: 1000,
                easing: 'ease-in-out',
                fill: 'forwards'
            });
        }

        // Disable pointer events to prevent multiple clicks
        card.style.pointerEvents = 'none';

        // Animate background to match section gradient (blue-950 to stone-50)
        card.animate([
            { background: 'linear-gradient(to bottom right, rgb(59, 130, 246), rgb(6, 182, 212))' }, // from-blue-500 to-cyan-500
            { background: 'linear-gradient(to bottom, rgb(23, 37, 84), rgb(231, 229, 228))' } // from-blue-950 to-stone-50
        ], {
            duration: 1000,
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        // Set this card as the active one
        setActiveServiceCard(card);

        // Re-enable after animation
        setTimeout(() => {
            card.style.pointerEvents = 'auto';
        }, 1000);
    }

    // Intersection Observer for hero section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Reset and trigger animation by changing key
                        setAnimationKey(prev => prev + 1)
                    }
                })
            },
            {
                threshold: 0.3, // Trigger when 30% of hero section is visible
            }
        )

        if (heroRef.current) {
            observer.observe(heroRef.current)
        }

        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current)
            }
        }
    }, [])

    // Intersection Observer for About section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Reset and trigger About animation
                        setAboutAnimationKey(prev => prev + 1)
                    }
                })
            },
            {
                threshold: 0.3,
            }
        )

        if (aboutRef.current) {
            observer.observe(aboutRef.current)
        }

        return () => {
            if (aboutRef.current) {
                observer.unobserve(aboutRef.current)
            }
        }
    }, [])

    // Counting animation for About section stats
    useEffect(() => {
        if (aboutAnimationKey > 0) {
            setCounts({ projects: 0, clients: 0 })
            let start = 0
            const end = 2
            const timer = setInterval(() => {
                start += 1
                setCounts({
                    projects: start,
                    clients: start
                })
                if (start >= end) clearInterval(timer)
            }, 300)
            return () => clearInterval(timer)
        }
    }, [aboutAnimationKey])

    // Intersection Observer for Services section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setServicesAnimationKey(prev => prev + 1)
                    }
                })
            },
            {
                threshold: 0.3,
            }
        )

        if (servicesRef.current) {
            observer.observe(servicesRef.current)
        }

        return () => {
            if (servicesRef.current) {
                observer.unobserve(servicesRef.current)
            }
        }
    }, [])

    // Intersection Observer for Portfolio section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setPortfolioAnimationKey(prev => prev + 1)
                    }
                })
            },
            {
                threshold: 0.3,
            }
        )

        if (portfolioRef.current) {
            observer.observe(portfolioRef.current)
        }

        return () => {
            if (portfolioRef.current) {
                observer.unobserve(portfolioRef.current)
            }
        }
    }, [])

    // Intersection Observer for Contact section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setContactAnimationKey(prev => prev + 1)
                    }
                })
            },
            {
                threshold: 0.3,
            }
        )

        if (contactRef.current) {
            observer.observe(contactRef.current)
        }

        return () => {
            if (contactRef.current) {
                observer.unobserve(contactRef.current)
            }
        }
    }, [])

    // Intersection Observer for Founders section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setFoundersAnimationKey(prev => prev + 1)
                    }
                })
            },
            {
                threshold: 0.3,
            }
        )

        if (foundersRef.current) {
            observer.observe(foundersRef.current)
        }

        return () => {
            if (foundersRef.current) {
                observer.unobserve(foundersRef.current)
            }
        }
    }, [])

    // Interactive letter distortion animation logic
    useEffect(() => {
        const letters = 'WEBCODS'.split('')
        setLetterOffsets(letters.map(() => ({ x: 0, y: 0, blur: 0 })))
    }, [])

    const updateLetterPositions = () => {
        if (!isHovering || letterRefs.current.length === 0) {
            // Reset all letters to original position
            setLetterOffsets(prev =>
                prev.map(offset => ({
                    x: offset.x * 0.85, // Smooth spring back
                    y: offset.y * 0.85,
                    blur: offset.blur * 0.9
                }))
            )

            const hasMovement = letterOffsets.some(o => Math.abs(o.x) > 0.1 || Math.abs(o.y) > 0.1)
            if (hasMovement) {
                animationFrameRef.current = requestAnimationFrame(updateLetterPositions)
            }
            return
        }

        const newOffsets = letterRefs.current.map((letterEl, index) => {
            if (!letterEl) return { x: 0, y: 0, blur: 0 }

            const rect = letterEl.getBoundingClientRect()
            const letterCenterX = rect.left + rect.width / 2
            const letterCenterY = rect.top + rect.height / 2

            // Distance from cursor to letter center
            const dx = cursorPos.x - letterCenterX
            const dy = cursorPos.y - letterCenterY
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Influence radius (closer = more movement)
            const maxDistance = 150
            const influence = Math.max(0, 1 - distance / maxDistance)

            // Direction away from cursor
            const angle = Math.atan2(dy, dx)

            // Displacement amount (letters move away from cursor)
            const pushStrength = 80 * influence * influence // Quadratic falloff
            const velocityBoost = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2) * 0.5

            const offsetX = -Math.cos(angle) * (pushStrength + velocityBoost * influence)
            const offsetY = -Math.sin(angle) * (pushStrength + velocityBoost * influence)

            // Motion blur based on movement speed
            const blurAmount = Math.min(influence * velocityBoost * 0.5, 3)

            return {
                x: offsetX,
                y: offsetY,
                blur: blurAmount
            }
        })

        setLetterOffsets(newOffsets)
        animationFrameRef.current = requestAnimationFrame(updateLetterPositions)
    }

    const handleMouseEnter = () => {
        setIsHovering(true)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
        velocity.current = { x: 0, y: 0 }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const now = Date.now()
        const timeDelta = now - lastCursorPos.current.time

        if (timeDelta > 0) {
            const dx = e.clientX - lastCursorPos.current.x
            const dy = e.clientY - lastCursorPos.current.y

            // Calculate velocity
            velocity.current = {
                x: dx / timeDelta * 10,
                y: dy / timeDelta * 10
            }
        }

        setCursorPos({ x: e.clientX, y: e.clientY })
        lastCursorPos.current = { x: e.clientX, y: e.clientY, time: now }
    }

    // Start/stop animation loop
    useEffect(() => {
        if (isHovering || letterOffsets.some(o => Math.abs(o.x) > 0.1 || Math.abs(o.y) > 0.1)) {
            animationFrameRef.current = requestAnimationFrame(updateLetterPositions)
        }

        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [isHovering, cursorPos, letterOffsets])

    if (currentView === 'cofounders') {
        return <CoFounders onBack={() => setCurrentView('home')} />
    }

    return (
        <div className="min-h-screen bg-black text-gray-300 scroll-snap-container">
            {/* Header / Navbar */}
            {/* Desktop Header / Navbar (Hidden on Mobile) */}
            <header className="hidden md:flex fixed top-0 left-0 w-full z-[999] justify-center mt-7 md:mt-3">
                <nav className="
          w-auto md:w-auto md:max-w-5xl h-[50px] md:h-[60px]
          px-6 md:px-12 py-2 md:py-2.5
          flex justify-center items-center
          bg-white/40 backdrop-blur-xl
          rounded-[30px] md:rounded-[50px]
          border border-white/60
          shadow-[0_8px_32px_rgba(31,38,135,0.15)]
          transition-all duration-300
          hover:bg-white/50 hover:shadow-[0_8px_32px_rgba(31,38,135,0.25)]
        ">
                    <ul className="flex items-center gap-3 md:gap-20 list-none">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="
                    text-gray-800 text-xs md:text-[0.98rem] font-semibold
                    no-underline transition-all duration-300
                    hover:text-primary hover:-translate-y-0.5
                  "
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            {/* Mobile Navigation System */}
            {/* Toggle Button (Visible only on Mobile) */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden fixed top-6 right-6 z-[1002] w-12 h-12 flex flex-col justify-center items-center gap-[6px] bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
                aria-label="Toggle Menu"
            >
                <span
                    className={`block w-6 h-[2px] bg-white transition-all duration-300 ease-in-out transform origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}
                ></span>
                <span
                    className={`block w-6 h-[2px] bg-white transition-all duration-300 ease-in-out transform origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} // Fixed magic number for perfect X
                    style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-1px)' : 'none' }} // Fine tuning with style since class overlap might happen
                ></span>
                {/* Re-doing the span logic to be cleaner without inline style overrides confusion */}
            </button>
            {/* Let's use a cleaner button implementation in the replacement content below for robustness */}

            {/* Mobile Menu Overlay */}
            <div
                className={`
                    md:hidden fixed inset-0 z-[1001] bg-black/95 backdrop-blur-xl
                    transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="flex flex-col h-full justify-center px-8 sm:px-12">
                    <div className="mb-12">
                        <img src="/mylogo.png" alt="WebCods" className="h-12 w-auto opacity-80" />
                    </div>

                    <nav className="flex flex-col gap-6">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-3xl font-bold text-white/80 hover:text-white hover:pl-4 transition-all duration-300"
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="mt-12 pt-8 border-t border-white/10">
                        <p className="text-white/40 text-sm">© 2025 WebCods</p>
                    </div>
                </div>
            </div>


            {/* Hero Section - Editorial Style Layout */}
            <section
                ref={heroRef}
                id="hero"
                className="scroll-snap-section relative w-full h-[100vh] flex justify-center items-center overflow-hidden bg-gradient-to-b from-sky-400 to-white"
            >
                {/* Main Content Container */}
                <div className="w-full h-full px-4 sm:px-6 md:px-16 lg:px-24 flex items-start pt-16 sm:pt-24 md:pt-0 md:items-center">
                    <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-16 items-center">

                        {/* Left Side - Large WEBCODS Text */}
                        <div className="relative">
                            {/* Interactive Hint - Text */}
                            {showTapHint && (
                                <div className="absolute -top-6 left-[20%] sm:left-[30%] md:left-[15%] z-20 animate-pulse pointer-events-none">
                                    <p className="text-black/40 text-xs sm:text-sm font-light tracking-widest uppercase">Tap here</p>
                                </div>
                            )}

                            <div
                                key={animationKey}
                                className="hero-brand-text"
                                onMouseEnter={() => {
                                    handleMouseEnter();
                                    setShowTapHint(false);
                                }}
                                onMouseLeave={handleMouseLeave}
                                onMouseMove={handleMouseMove}
                                onTouchStart={() => setShowTapHint(false)} // Hide on touch mainly for mobile
                                onClick={() => setShowTapHint(false)}
                            >
                                <h1 className="mt-0 md:mt-0 text-[22vw] sm:text-[20vw] md:text-[90px] lg:text-[110px] xl:text-[140px] font-black leading-[0.85] tracking-tighter select-none webcods-interactive-text">
                                    {'WEB'.split('').map((letter, index) => (
                                        <span
                                            key={`web-${index}`}
                                            ref={el => { letterRefs.current[index] = el }}
                                            className="inline-block text-sky-400 letter-hover"
                                            style={{
                                                transform: `translate(${letterOffsets[index]?.x || 0}px, ${letterOffsets[index]?.y || 0}px)`,
                                                filter: `blur(${letterOffsets[index]?.blur || 0}px)`,
                                                transition: isHovering ? 'none' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease-out',
                                                willChange: 'transform, filter'
                                            }}
                                        >
                                            {letter}
                                        </span>
                                    ))}
                                    <br />
                                    {'CODS'.split('').map((letter, index) => (
                                        <span
                                            key={`cods-${index}`}
                                            ref={el => { letterRefs.current[index + 3] = el }}
                                            className="inline-block text-blue-900 letter-hover"
                                            style={{
                                                transform: `translate(${letterOffsets[index + 3]?.x || 0}px, ${letterOffsets[index + 3]?.y || 0}px)`,
                                                filter: `blur(${letterOffsets[index + 3]?.blur || 0}px)`,
                                                transition: isHovering ? 'none' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease-out',
                                                willChange: 'transform, filter'
                                            }}
                                        >
                                            {letter}
                                        </span>
                                    ))}
                                </h1>
                            </div>
                        </div>

                        {/* Right Side - Tagline & Description Carousel */}
                        <div className="relative flex flex-col justify-center space-y-4 sm:space-y-6 mt-6 sm:mt-8 lg:mt-16 md:mt-0">

                            <HeroCube variant="sky" className="hidden lg:block mb-12 mx-auto" />

                            {/* Small Tagline */}
                            <div key={`tagline-${currentTextIndex}`} className="hero-tagline-fade">
                                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 uppercase tracking-widest font-medium mb-2">
                                    {heroDescriptions[currentTextIndex].tagline}
                                </p>
                            </div>

                            {/* Main Description */}
                            <div key={`description-${currentTextIndex}`} className="hero-description-fade">
                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-gray-800 leading-tight tracking-tight pr-0 md:pr-16">
                                    {heroDescriptions[currentTextIndex].title}
                                </h2>
                            </div>

                            {/* Next Arrow Button */}

                        </div>

                    </div>
                </div>

                {/* Co-Founders Button - Bottom Centered */}
                <div className="absolute bottom-48 sm:bottom-40 md:bottom-10 left-1/2 transform -translate-x-1/2 z-30 w-[85%] sm:w-[75%] md:w-auto flex flex-col items-center">
                    {/* Mobile 3D Cube */}
                    <HeroCube variant="sky" className="block md:hidden mb-8" />

                    <button
                        onClick={() => setCurrentView('cofounders')}
                        className="
                            w-full md:w-auto flex justify-center items-center
                            group relative px-6 sm:px-8 py-2.5 sm:py-3 overflow-hidden rounded-full 
                            bg-black backdrop-blur-md border border-white/20
                            text-white text-sm sm:text-base font-bold transition-all duration-300
                            hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]
                            hover:border-white
                        "
                    >
                        <span className="absolute inset-0 w-full h-full bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                        <span className="relative z-10 flex items-center gap-2 sm:gap-3 transition-colors duration-300 group-hover:text-black">
                            Meet Co-Founders
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" style={{ animation: 'moveRight 1s ease-in-out infinite' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </button>
                </div>

            </section>


            {/* About Section - Three Stage Animation */}
            <section ref={aboutRef} id="about" className="scroll-snap-section pt-20 sm:pt-24 md:pt-24 pb-12 sm:pb-14 md:py-20 flex items-start md:items-center justify-center bg-gradient-to-b from-white to-blue-950 relative overflow-hidden min-h-[100dvh] md:min-h-screen">
                <div className="container px-3 sm:px-4 md:px-0 relative flex flex-col items-center justify-start md:justify-center">
                    {/* About Heading - Fades in first */}
                    <div key={`about-heading-${aboutAnimationKey}`} className="about-heading-fade mt-8 sm:mt-12 md:mt-0 mb-6 sm:mb-8">
                        <h2 className="text-3xl sm:text-4xl md:text-[2.4rem] font-bold text-blue-950 text-center">ABOUT</h2>
                    </div>

                    {/* Stage 1 & 2: Falling and Organizing Letters */}
                    <div key={aboutAnimationKey} className="relative h-24 sm:h-28 md:h-32 mt-16 sm:mt-20 md:mt-4 mb-8 sm:mb-10 md:mb-2 text-center flex items-center justify-center w-full">
                        {'WEBCODS'.split('').map((letter, index) => {
                            // Stage 1: Random scattered positions
                            const randomDelay = index * 0.1 + Math.random() * 0.3;
                            const randomRotation = (Math.random() - 0.5) * 50;
                            const randomHorizontal = (Math.random() - 0.5) * 80; // -40% to 40%

                            // Color: WEB (0-2) = light blue, CODS (3-7) = dark blue
                            const colorClass = index < 3 ? 'letter-light-blue' : 'letter-dark-blue';

                            return (
                                <span
                                    key={index}
                                    className={`about-letter ${colorClass}`}
                                    style={{
                                        animationDelay: `${randomDelay}s`,
                                        '--random-rotation': `${randomRotation}deg`,
                                        '--random-horizontal': `${randomHorizontal}%`,
                                        '--final-position': `${index * 12.5}%`, // 8 letters = 100% / 8
                                    } as React.CSSProperties}
                                >
                                    {letter}
                                </span>
                            );
                        })}
                    </div>

                    {/* Stage 3: About Content - Fades in after letters organize */}
                    <div key={`about-content-${aboutAnimationKey}`} className="about-content-reveal mt-6 sm:mt-8 md:mt-0">
                        <p className="text-center text-blue-950 mb-6 sm:mb-8 text-[11px] sm:text-xs md:text-base lg:text-lg px-2 sm:px-4 md:px-2 leading-relaxed">
                            Founded in 2025, WebCods has been at the forefront of web development and app development innovation. We are passionate about creating exceptional digital experiences that empower businesses to thrive in the modern landscape. Our team combines cutting-edge technology with creative excellence to deliver solutions that exceed expectations.
                        </p>

                        <div className="flex flex-row justify-between gap-6 sm:gap-8 md:gap-0 mt-6 sm:mt-8 text-left px-0 md:px-32">
                            <div>
                                <h3 className="text-3xl sm:text-4xl md:text-[2.2rem] text-white font-bold">{counts.projects}+</h3>
                                <p className="text-white text-xs sm:text-sm md:text-base">Projects Completed</p>
                            </div>
                            <div>
                                <h3 className="text-3xl sm:text-4xl md:text-[2.2rem] text-white font-bold">{counts.clients}+</h3>
                                <p className="text-white text-xs sm:text-sm md:text-base">Happy Clients</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section ref={servicesRef} id="services" className={`scroll-snap-section min-h-[100dvh] md:min-h-0 ${RESPONSIVE_CLASSES.sectionPadding} pt-20 sm:pt-24 md:pt-12 flex items-start md:items-center justify-center bg-gradient-to-b from-blue-950 to-stone-50 relative`}>
                <div className="container">
                    <div key={`services-heading-${servicesAnimationKey}`} className="section-heading-fade mt-0 sm:mt-4 md:mt-0">
                        <h2 className="text-3xl sm:text-4xl md:text-[2.4rem] font-bold text-center mb-6 sm:mb-8">
                            SERVICES
                        </h2>
                    </div>

                    <div key={`services-content-${servicesAnimationKey}`} className="section-content-stagger" style={{ perspective: '1000px' }}>
                        <div className="md:max-w-4xl md:mx-auto">
                            <div className="
                grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-8 lg:gap-10
                px-4 md:px-0
              ">
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        onClick={(e) => handleCardClick(e)}
                                        className={`
                      bg-gradient-to-br from-blue-500 to-cyan-500
                      p-3 md:p-3 lg:p-4 rounded-xl md:rounded-2xl
                      h-[220px] md:h-[140px] lg:h-[160px] flex flex-col justify-center
                      shadow-[0_8px_24px_rgba(0,0,0,0.15)]
                      transition-all duration-500
                      hover:scale-105 hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] hover:rotate-1
                      border border-white/20
                      group
                      service-card-fade
                      service-card
                      service-card-${index}
                      relative overflow-hidden
                      cursor-pointer
                    `}
                                        style={{
                                            animationDelay: `${index * 0.1}s`
                                        } as React.CSSProperties}
                                    >
                                        {/* Service Icons - Show on hover */}
                                        {index === 0 && (
                                            // Custom Web Development - Code icon
                                            <svg className="block service-card-icon w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 absolute top-2 right-2 sm:top-3 sm:right-3 text-white/40 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                        )}
                                        {index === 1 && (
                                            // App Development - Mobile icon
                                            <svg className="block service-card-icon w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 absolute top-2 right-2 sm:top-3 sm:right-3 text-white/40 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                        {index === 2 && (
                                            // E-commerce - Shopping Cart icon
                                            <svg className="block service-card-icon w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 absolute top-2 right-2 sm:top-3 sm:right-3 text-white/40 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        )}
                                        {index === 3 && (
                                            // Responsive Design - Device icon
                                            <svg className="block service-card-icon w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 absolute top-2 right-2 sm:top-3 sm:right-3 text-white/40 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                        {index === 4 && (
                                            // SEO - Search icon
                                            <svg className="block service-card-icon w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 absolute top-2 right-2 sm:top-3 sm:right-3 text-white/40 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        )}
                                        {index === 5 && (
                                            // Maintenance - Settings icon
                                            <svg className="block service-card-icon w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 absolute top-2 right-2 sm:top-3 sm:right-3 text-white/40 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}

                                        <h3 className={`text-xs sm:text-sm md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 md:mb-4 text-white transition-colors duration-500 relative z-20`}>
                                            {service.title}
                                        </h3>
                                        <p className={`text-[10px] sm:text-xs md:text-base lg:text-lg xl:text-xl text-blue-100 leading-tight md:leading-normal transition-colors duration-500`}>
                                            {service.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section ref={portfolioRef} id="portfolio" className="scroll-snap-section min-h-[100dvh] md:min-h-0 pt-16 sm:pt-20 md:pt-16 pb-12 sm:pb-14 md:py-20 flex items-start md:items-center justify-center bg-gradient-to-b from-stone-50 to-black relative">
                <div className="container relative px-4 md:px-0">
                    <div key={`portfolio-heading-${portfolioAnimationKey}`} className="section-heading-fade mt-0 sm:mt-4 md:mt-0">
                        <h2 className="text-3xl sm:text-4xl md:text-[2.4rem] font-bold text-center mb-6 sm:mb-8 text-gray-800">
                            OUR PORTFOLIO
                        </h2>
                        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
                            Showcasing our latest digital innovations and successful projects
                        </p>
                    </div>

                    <div key={`portfolio-content-${portfolioAnimationKey}`} className="section-content-stagger">
                        {/* All Cards - Vertical on Mobile, Horizontal Centered on Desktop */}
                        <div className="md:flex md:justify-center pb-4 px-4 md:px-0">
                            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                                {/* ZCafe - Completed */}
                                <div className="
                                    group relative bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden
                                    border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.15)]
                                    transition-all duration-500
                                    hover:transform hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]
                                    hover:border-purple-400/50
                                    portfolio-card-fade
                                    w-[240px] md:w-[280px]
                                ">
                                    <div className="relative overflow-hidden h-20 md:h-24 bg-white">
                                        <img
                                            src="/zcafe.png"
                                            alt="ZCafe Logo"
                                            className="w-full h-full object-contain p-3"
                                        />
                                    </div>
                                    <div className="p-2 md:p-3 bg-gradient-to-b from-gray-900 to-black h-[90px] md:h-[100px] flex flex-col">
                                        <h3 className="text-sm md:text-base font-bold text-white mb-1">ZCafe</h3>
                                        <p className="text-gray-300 text-[10px] md:text-xs mb-2 line-clamp-2 flex-grow">
                                            Product booking webapp
                                        </p>
                                        <a
                                            href="https://www.zcafe.in"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                inline-flex items-center justify-center gap-1 w-full px-2 py-1 
                                                bg-gradient-to-r from-purple-600 to-blue-600 
                                                text-white font-semibold rounded text-[10px]
                                                transition-all duration-300
                                                hover:from-purple-700 hover:to-blue-700
                                            "
                                        >
                                            Visit Site
                                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Project 2 - In Progress */}
                                <div className="
                                    group relative bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden
                                    border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.15)]
                                    transition-all duration-500
                                    hover:transform hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]
                                    hover:border-cyan-400/50
                                    portfolio-card-fade
                                    w-[240px] md:w-[280px]
                                ">
                                    <div className="relative overflow-hidden h-20 md:h-24 bg-gradient-to-br from-cyan-600 to-teal-600">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="text-center z-20 relative">
                                                <div className="text-2xl mb-0.5">🚀</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2 md:p-3 bg-gradient-to-b from-gray-900 to-black h-[90px] md:h-[100px] flex flex-col">
                                        <h3 className="text-sm md:text-base font-bold text-white mb-1">Next Innovation</h3>
                                        <p className="text-gray-300 text-[10px] md:text-xs mb-2 line-clamp-2 flex-grow">
                                            Coming soon...
                                        </p>
                                        <div className="px-2 py-1 bg-gray-700/50 text-gray-400 font-semibold rounded text-center border border-gray-600/50 text-[10px]">
                                            In Development
                                        </div>
                                    </div>
                                </div>

                                {/* Project 3 - In Progress */}
                                <div className="
                                    group relative bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden
                                    border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.15)]
                                    transition-all duration-500
                                    hover:transform hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]
                                    hover:border-orange-400/50
                                    portfolio-card-fade
                                    w-[240px] md:w-[280px]
                                ">
                                    <div className="relative overflow-hidden h-20 md:h-24 bg-gradient-to-br from-orange-600 to-pink-600">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="text-center z-20 relative">
                                                <div className="text-2xl mb-0.5">✨</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2 md:p-3 bg-gradient-to-b from-gray-900 to-black h-[90px] md:h-[100px] flex flex-col">
                                        <h3 className="text-sm md:text-base font-bold text-white mb-1">Future Project</h3>
                                        <p className="text-gray-300 text-[10px] md:text-xs mb-2 line-clamp-2 flex-grow">
                                            Watch this space!
                                        </p>
                                        <div className="px-2 py-1 bg-gray-700/50 text-gray-400 font-semibold rounded text-center border border-gray-600/50 text-[10px]">
                                            In Development
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>

            {/* Contact Section */}
            <section ref={contactRef} id="contact" className="scroll-snap-section min-h-[100dvh] md:min-h-0 pt-20 sm:pt-24 md:pt-24 pb-12 sm:pb-14 md:py-20 flex items-start md:items-center justify-center relative bg-gradient-to-b from-black to-slate-900">
                <div className="container px-2.5 sm:px-3 md:px-0">
                    <div key={`contact-heading-${contactAnimationKey}`} className="section-heading-fade mt-0 sm:mt-4 md:mt-0">
                        <h2 className="text-3xl sm:text-4xl md:text-[2.4rem] font-bold text-center mb-6 sm:mb-8 text-white">
                            LET'S WORK TOGETHER
                        </h2>
                    </div>

                    <div key={`contact-form-${contactAnimationKey}`} className="section-content-fade">
                        <div className="max-w-6xl mx-auto">
                            {/* Desktop: Two Column Layout | Mobile: Single Column */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-12 items-start">

                                {/* Left Side - Contact Form */}
                                <div className="order-1 md:mt-16">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const formData = new FormData(e.currentTarget);
                                            const name = formData.get('name');
                                            const phone = formData.get('phone');
                                            const email = formData.get('email');
                                            const service = formData.get('service');
                                            const message = formData.get('message');

                                            const subject = `New Inquiry from ${name} - ${service}`;
                                            const body = `Name: ${name}%0D%0APhone: ${phone}%0D%0AEmail: ${email}%0D%0AService: ${service}%0D%0A%0D%0AMessage:%0D%0A${message}`;

                                            window.location.href = `mailto:webcods1@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
                                        }}
                                        className="space-y-2 sm:space-y-2.5 md:space-y-4"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5 md:gap-4">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                className="
                                                w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3
                                                bg-white/10 border border-white/20 rounded-lg md:rounded-xl
                                                text-base text-white placeholder-gray-400
                                                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                                backdrop-blur-sm transition-all duration-300
                                                "
                                                required
                                            />
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone Number"
                                                className="
                                                w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3
                                                bg-white/10 border border-white/20 rounded-lg md:rounded-xl
                                                text-base text-white placeholder-gray-400
                                                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                                backdrop-blur-sm transition-all duration-300
                                                "
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                className="
                                                w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3
                                                bg-white/10 border border-white/20 rounded-lg md:rounded-xl
                                                text-base text-white placeholder-gray-400
                                                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                                backdrop-blur-sm transition-all duration-300
                                                "
                                                required
                                            />
                                            <div className="relative">
                                                <select
                                                    name="service"
                                                    className="
                                                    w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3
                                                    bg-white/10 border border-white/20 rounded-lg md:rounded-xl
                                                    text-xs sm:text-sm md:text-base text-white placeholder-gray-400
                                                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                                    backdrop-blur-sm transition-all duration-300
                                                    appearance-none cursor-pointer
                                                    "
                                                    required
                                                >
                                                    <option value="" disabled selected className="text-gray-800">Select Service</option>
                                                    <option value="web-design" className="text-gray-800">Web Design</option>
                                                    <option value="app-design" className="text-gray-800">App Design</option>
                                                    <option value="ecommerce" className="text-gray-800">E-Commerce</option>
                                                    <option value="seo" className="text-gray-800">SEO Optimization</option>
                                                    <option value="maintenance" className="text-gray-800">Maintenance</option>
                                                </select>
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <textarea
                                            name="message"
                                            placeholder="Tell us about your project..."
                                            rows={4}
                                            className="
                                            w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2 md:py-3
                                            bg-white/10 border border-white/20 rounded-lg md:rounded-xl
                                            text-xs sm:text-sm md:text-base text-white placeholder-gray-400
                                            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                            backdrop-blur-sm transition-all duration-300
                                            resize-none
                                            "
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="
                                            w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white
                                            px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-4 rounded-lg md:rounded-xl
                                            font-bold text-sm sm:text-base md:text-lg
                                            transition-all duration-300
                                            hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:scale-[1.02]
                                            cursor-pointer active:scale-95
                                            "
                                        >
                                            Send Message
                                        </button>
                                    </form>
                                </div>

                                {/* Right Side - Handshake SVG and Text (order-2 on mobile, shown after form) */}
                                <div className="order-2 flex flex-col items-center justify-start p-2 sm:p-4 md:p-0 md:pt-0 md:-mt-8 relative">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl animate-pulse"></div>

                                    <svg viewBox="0 0 500 400" className="w-full h-auto max-w-[160px] sm:max-w-[200px] md:max-w-lg drop-shadow-[0_10px_40px_rgba(124,58,237,0.4)] relative z-10">
                                        <defs>
                                            <linearGradient id="cyberGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#A78BFA" />
                                                <stop offset="100%" stopColor="#7C3AED" />
                                            </linearGradient>
                                            <linearGradient id="cyberGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#60A5FA" />
                                                <stop offset="100%" stopColor="#2563EB" />
                                            </linearGradient>
                                            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                                                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                                                <feMerge>
                                                    <feMergeNode in="coloredBlur" />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>

                                        {/* Abstract Geometric Composition */}
                                        <g className="handshake-hand">

                                            {/* Left Element (WebCods - Tech/Structure) */}
                                            <g transform="translate(140, 200)">
                                                {/* Stylized Hand/Arm Shape - Geometric */}
                                                <path d="M-100,50 L0,50 L40,10 L60,30 L20,70 L-100,70 Z" fill="url(#cyberGradient1)" opacity="0.8" />
                                                <circle cx="50" cy="20" r="8" fill="#DDD6FE" filter="url(#neonGlow)" />
                                                <path d="M-80,60 L20,60" stroke="#C4B5FD" strokeWidth="2" strokeDasharray="4 4" />
                                            </g>

                                            {/* Right Element (Client - Vision/Flow) */}
                                            <g transform="translate(360, 200)">
                                                {/* Stylized Hand/Arm Shape - Fluid */}
                                                <path d="M100,50 L0,50 L-40,10 L-60,30 L-20,70 L100,70 Z" fill="url(#cyberGradient2)" opacity="0.8" />
                                                <circle cx="-50" cy="20" r="8" fill="#DBEAFE" filter="url(#neonGlow)" />
                                                <path d="M80,60 L-20,60" stroke="#BFDBFE" strokeWidth="2" />
                                            </g>

                                            {/* The Connection Point (Center) */}
                                            <g transform="translate(250, 180)">
                                                <circle cx="0" cy="40" r="25" fill="white" opacity="0.1" className="animate-pulse" />
                                                <circle cx="0" cy="40" r="15" fill="white" opacity="0.3" />

                                                {/* Glowing Core */}
                                                <path d="M-10,40 L0,30 L10,40 L0,50 Z" fill="#F3E8FF" filter="url(#neonGlow)">
                                                    <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
                                                    <animateTransform attributeName="transform" type="rotate" from="0 0 40" to="360 0 40" dur="4s" repeatCount="indefinite" />
                                                </path>
                                            </g>

                                            {/* Floating UI Elements */}
                                            <rect x="180" y="100" width="140" height="80" rx="10" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" />
                                            <circle cx="200" cy="120" r="3" fill="#A78BFA" />
                                            <circle cx="215" cy="120" r="3" fill="#60A5FA" />
                                            <rect x="200" y="140" width="80" height="4" rx="2" fill="white" fillOpacity="0.1" />
                                            <rect x="200" y="155" width="60" height="4" rx="2" fill="white" fillOpacity="0.1" />

                                        </g>
                                    </svg>

                                    <div className="text-center -mt-4 md:-mt-8">
                                        <h3 className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                                            Partner with WebCods
                                        </h3>
                                        <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">
                                            Let's build something amazing together.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section >



            {/* Footer */}
            < footer className="text-center py-6 bg-gray-100 mt-8" >
                <p className="text-gray-800 text-xs sm:text-sm md:text-base px-4">© 2025 WebCods. All Rights Reserved.</p>
            </footer >

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/919400525063"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 flex items-center group cursor-pointer"
            >
                <div className="
                    bg-white text-gray-800 
                    px-3 sm:px-4 py-1.5 sm:py-2 rounded-full 
                    shadow-lg mr-2 sm:mr-3 md:mr-4 
                    text-xs sm:text-sm font-bold 
                    transform transition-all duration-300
                    opacity-80 md:opacity-0 md:group-hover:opacity-80
                    md:translate-x-4 md:group-hover:translate-x-0
                    whitespace-nowrap
                ">
                    Connect with us
                </div>
                <div className="
                    bg-[#25D366] 
                    w-12 h-12 sm:w-14 sm:h-14 rounded-full 
                    flex items-center justify-center 
                    shadow-[0_4px_14px_rgba(0,0,0,0.25)]
                    transition-all duration-300 
                    transform hover:scale-110 hover:rotate-6
                    opacity-80
                ">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" viewBox="0 0 448 512" fill="currentColor">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                </div>
            </a>
        </div >
    )
}

export default App
