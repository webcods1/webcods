import React, { useState } from 'react';

interface HeroCubeProps {
    variant?: 'blue' | 'sky';
    className?: string;
}

const HeroCube: React.FC<HeroCubeProps> = ({ variant = 'blue', className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Color mappings
    const colors = {
        blue: {
            border: 'border-blue-200/50',
            dot: 'bg-blue-500/20',
            innerBorder: 'border-blue-100',
            shadow: 'shadow-[0_0_40px_rgba(59,130,246,0.3)]',
            badgeText: 'text-blue-500',
            badgeBg: 'bg-blue-50',
            glow: 'bg-blue-400/20',
            faceBg: 'bg-white/80'
        },
        sky: {
            border: 'border-sky-300/60',
            dot: 'bg-sky-500/30',
            innerBorder: 'border-sky-200',
            shadow: 'shadow-[0_0_50px_rgba(14,165,233,0.4)]',
            badgeText: 'text-sky-600',
            badgeBg: 'bg-sky-100',
            glow: 'bg-sky-400/30',
            faceBg: 'bg-sky-100/90' // More visible sky blue 
        }
    };

    const t = colors[variant];

    // Helper for staggered delays
    // Order: Top(0), Right(1), Left(2), Bottom(3). (Front=0, Back=3 for balance)
    // Open: 0s -> 0.2s -> 0.4s -> 0.6s
    // Close: 0.6s -> 0.4s -> 0.2s -> 0s
    const getDelay = (order: number) => {
        return isOpen ? `${order * 0.2}s` : `${(4 - order) * 0.15}s`;
    };

    // Constant face classes
    const faceBaseClass = `absolute inset-0 ${t.faceBg} ${t.border} backdrop-blur-md flex items-center justify-center transition-all duration-700 ease-in-out backface-hidden`;
    const faceTrans = (isOpen: boolean) => isOpen ? 'opacity-0' : 'opacity-90 hover:opacity-100';

    return (
        <div className={`relative w-24 h-24 perspective-1000 z-40 ${className}`}>
            <div
                className={`w-full h-full relative transform-style-3d transition-transform duration-700 ease-in-out cursor-pointer ${isOpen ? '' : 'animate-cube-spin hover:pause'}`}
                style={{ transform: isOpen ? 'rotateX(0deg) rotateY(0deg)' : undefined }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Faces */}

                {/* Front (Z+48) - Opens with Top (Order 0) */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{
                        transform: isOpen ? 'translateZ(180px)' : 'translateZ(48px)',
                        transitionDelay: getDelay(0)
                    }}
                >
                    <div className={`w-8 h-8 rounded-full ${t.dot} blur-md`}></div>
                </div>

                {/* Back (rotateY 180) - Opens with Bottom (Order 3) */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{
                        transform: isOpen ? 'rotateY(180deg) translateZ(180px)' : 'rotateY(180deg) translateZ(48px)',
                        transitionDelay: getDelay(3)
                    }}
                ></div>

                {/* Right (rotateY 90) - Order 1 */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{
                        transform: isOpen ? 'rotateY(90deg) translateZ(180px)' : 'rotateY(90deg) translateZ(48px)',
                        transitionDelay: getDelay(1)
                    }}
                ></div>

                {/* Left (rotateY -90) - Order 2 */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{
                        transform: isOpen ? 'rotateY(-90deg) translateZ(180px)' : 'rotateY(-90deg) translateZ(48px)',
                        transitionDelay: getDelay(2)
                    }}
                ></div>

                {/* Top (rotateX 90) - Order 0 (First) */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{
                        transform: isOpen ? 'rotateX(90deg) translateZ(180px)' : 'rotateX(90deg) translateZ(48px)',
                        transitionDelay: getDelay(0)
                    }}
                ></div>

                {/* Bottom (rotateX -90) - Order 3 (Last of box) */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{
                        transform: isOpen ? 'rotateX(-90deg) translateZ(180px)' : 'rotateX(-90deg) translateZ(48px)',
                        transitionDelay: getDelay(3)
                    }}
                ></div>

                {/* Inner Content - Revealed when OPEN (Order 4) */}
                <div
                    className={`
                        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-64 p-5 bg-white/95 backdrop-blur-2xl rounded-2xl 
                        border ${t.innerBorder} ${t.shadow} 
                        transition-all duration-700 text-center flex flex-col items-center
                        ${isOpen ? 'opacity-100 scale-100 z-50 pointer-events-auto' : 'opacity-0 scale-50 -z-10 pointer-events-none'}
                    `}
                    style={{ transitionDelay: isOpen ? '0.8s' : '0s' }}
                >
                    <div className={`w-16 h-16 rounded-full overflow-hidden mb-3 border-2 ${t.innerBorder} shadow-sm`}>
                        <img
                            src="/mill.jpeg"
                            alt="WIP"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                // Fallback if image missing
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).parentElement!.style.backgroundColor = '#e2e8f0';
                            }}
                        />
                    </div>

                    <div className={`text-[10px] font-bold ${t.badgeText} uppercase tracking-widest mb-1 ${t.badgeBg} px-2 py-0.5 rounded-full`}>
                        Work in Progress
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">
                        Next Innovation
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
                        We are building something extraordinary. Stay tuned for the reveal.
                    </p>
                </div>

            </div>

            {/* Pulsing glow under cube when closed */}
            <div className={`
                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                w-20 h-20 ${t.glow} blur-xl rounded-full -z-10
                transition-opacity duration-500
                ${isOpen ? 'opacity-0' : 'animate-pulse opacity-100'}
            `}></div>
        </div>
    );
};

export default HeroCube;
