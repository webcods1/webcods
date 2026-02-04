import React, { useState, useEffect, useRef } from 'react';

interface HeroCubeProps {
    variant?: 'blue' | 'sky';
    className?: string;
}

const HeroCube: React.FC<HeroCubeProps> = ({ variant = 'blue', className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Color mappings
    const colors = {
        blue: {
            border: 'border-blue-300/50',
            dot: 'bg-blue-400',
            innerBorder: 'border-blue-200',
            shadow: 'shadow-[0_0_40px_rgba(59,130,246,0.4)]',
            badgeText: 'text-blue-600',
            badgeBg: 'bg-blue-100',
            glow: 'bg-blue-500/30',
            faceBg: 'bg-blue-50/80',
            faceActive: 'group-hover:bg-blue-100/90'
        },
        sky: {
            border: 'border-sky-400/60', // More visible border
            dot: 'bg-sky-400',
            innerBorder: 'border-sky-300',
            shadow: 'shadow-[0_0_50px_rgba(56,189,248,0.5)]', // Sky-400 shadow
            badgeText: 'text-sky-700',
            badgeBg: 'bg-sky-100',
            glow: 'bg-sky-500/40',
            faceBg: 'bg-sky-100/80', // Glassy sky
            faceActive: 'group-hover:bg-sky-200/90'
        }
    };

    const t = colors[variant];

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && contentRef.current && !contentRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Helper for staggered delays
    // Order: Top(0), Right(1), Left(2), Bottom(3).
    // Distinct steps for "part wise" feel.
    const getDelay = (order: number) => {
        return isOpen ? `${order * 0.15}s` : `${(4 - order) * 0.1}s`;
    };

    // Constant face classes
    const faceBaseClass = `absolute inset-0 ${t.faceBg} ${t.border} backdrop-blur-sm flex items-center justify-center transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) backface-visible border-2`;
    const faceTrans = (isOpen: boolean) => isOpen ? 'opacity-90' : 'opacity-90 hover:opacity-100';

    return (
        <div className={`relative w-24 h-24 perspective-1000 z-40 ${className}`}>
            <div
                className={`w-full h-full relative transform-style-3d transition-transform duration-700 ease-in-out cursor-pointer ${isOpen ? '' : 'animate-cube-spin hover:pause'}`}
                style={{ transform: isOpen ? 'rotateX(0deg) rotateY(0deg)' : undefined }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Faces */}

                {/* Front (Z+48) - Moves Forward and Fades */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{
                        transform: isOpen ? 'translateZ(200px) scale(0.5) opacity(0)' : 'translateZ(48px)',
                        transitionDelay: isOpen ? '0.1s' : '0.6s',
                        opacity: isOpen ? 0 : 1
                    }}
                >
                    <div className={`w-8 h-8 rounded-full ${t.dot} blur-md opacity-60`}></div>
                </div>

                {/* Back (rotateY 180) - Moves Back */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{
                        transform: isOpen ? 'rotateY(180deg) translateZ(100px)' : 'rotateY(180deg) translateZ(48px)',
                        transitionDelay: getDelay(3)
                    }}
                ></div>

                {/* Right (rotateY 90) - Swings Open Right */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{
                        transform: isOpen ? 'rotateY(90deg) translateZ(140px) rotateY(30deg)' : 'rotateY(90deg) translateZ(48px)',
                        transitionDelay: getDelay(1)
                    }}
                ></div>

                {/* Left (rotateY -90) - Swings Open Left */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{
                        transform: isOpen ? 'rotateY(-90deg) translateZ(140px) rotateY(-30deg)' : 'rotateY(-90deg) translateZ(48px)',
                        transitionDelay: getDelay(2)
                    }}
                ></div>

                {/* Top (rotateX 90) - Swings Open Up */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{
                        transform: isOpen ? 'rotateX(90deg) translateZ(140px) rotateX(30deg)' : 'rotateX(90deg) translateZ(48px)',
                        transitionDelay: getDelay(0)
                    }}
                ></div>

                {/* Bottom (rotateX -90) - Swings Open Down */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{
                        transform: isOpen ? 'rotateX(-90deg) translateZ(140px) rotateX(-30deg)' : 'rotateX(-90deg) translateZ(48px)',
                        transitionDelay: getDelay(3)
                    }}
                ></div>

                {/* Inner Content - Revealed when OPEN */}
                <div
                    ref={contentRef}
                    onClick={(e) => e.stopPropagation()}
                    className={`
                        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-64 p-4 bg-white/95 backdrop-blur-3xl rounded-xl 
                        border-2 ${t.innerBorder} ${t.shadow} 
                        transition-all duration-700 delay-100 text-center flex flex-col items-center
                        ${isOpen ? 'opacity-100 scale-100 z-50 pointer-events-auto' : 'opacity-0 scale-50 -z-10 pointer-events-none'}
                    `}
                    style={{
                        transitionDelay: isOpen ? '0.6s' : '0s',
                        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                >
                    {/* Video Container */}
                    <div className={`w-full aspect-video rounded-lg overflow-hidden mb-3 border-2 ${t.innerBorder} shadow-md bg-black`}>
                        <video
                            src="/orex.mp4"
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            onError={(e) => {
                                console.error('Video failed to load');
                                (e.target as HTMLVideoElement).style.display = 'none';
                            }}
                        />
                    </div>

                    <div className={`text-[9px] font-bold ${t.badgeText} uppercase tracking-widest mb-1.5 ${t.badgeBg} px-2.5 py-0.5 rounded-full`}>
                        Featured Project
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-1.5 leading-tight">
                        Innovation Showcase
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed max-w-[200px]">
                        Experience our latest creation in action. Click outside to close.
                    </p>
                </div>

            </div>

            {/* Pulsing glow under cube when closed */}
            <div className={`
                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                w-24 h-24 ${t.glow} blur-2xl rounded-full -z-10
                transition-opacity duration-500
                ${isOpen ? 'opacity-0' : 'animate-pulse opacity-100'}
            `}></div>
        </div>
    );
};

export default HeroCube;
