import React, { useState, useEffect } from 'react';

interface HeroCubeProps {
    className?: string;
}

const HeroCube: React.FC<HeroCubeProps> = ({ className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Close when clicking outside - handled by a fixed backdrop
    const handleBackdropClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(false);
    };

    // Updated to Sky Blue colors
    const faceBaseClass = "absolute inset-0 bg-sky-400/90 border border-sky-200/50 backdrop-blur-md flex items-center justify-center transition-all duration-1000 ease-in-out origin-center backface-hidden";

    // When open, faces become practically invisible or frames? 
    // User wants "open like real page by page section by section".
    // We will rotate them OUTWARDS to reveal the center.

    // Helper for sequential delay calculation
    const delay = (ms: number) => isOpen ? `${ms}ms` : '0ms';

    return (
        <>
            {/* Backdrop for handling click outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-[1px] cursor-zoom-out"
                    onClick={handleBackdropClick}
                ></div>
            )}

            <div className={`relative w-24 h-24 perspective-1000 ${isOpen ? 'z-[10000]' : 'z-40'} ${className}`}>
                <div
                    className={`
                        w-full h-full relative transform-style-3d transition-transform duration-1000 ease-in-out cursor-pointer 
                        ${isOpen ? '' : 'animate-cube-spin hover:pause'}
                    `}
                    style={{
                        transform: isOpen ? 'rotateX(0deg) rotateY(0deg) scale(1.5)' : undefined
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!isOpen) setIsOpen(true);
                    }}
                >
                    {/* Inner Content - Revealed when OPEN */}
                    {/* We put this "inside" the cube. It scales up. */}
                    <div className={`
                        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-[280px] sm:w-[320px] p-6 bg-white/95 backdrop-blur-2xl rounded-2xl 
                        border border-sky-100 shadow-[0_0_50px_rgba(56,189,248,0.4)] 
                        transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]
                        flex flex-col items-center text-center
                        ${isOpen ? 'opacity-100 scale-100 z-50 pointer-events-auto delay-500' : 'opacity-0 scale-0 -z-10 pointer-events-none delay-0'}
                    `}>
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-sky-50 shadow-inner">
                            <img
                                src="/mill.jpeg"
                                alt="WIP"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).parentElement!.style.backgroundColor = '#e2e8f0';
                                }}
                            />
                        </div>

                        <div className="text-[10px] font-bold text-sky-500 uppercase tracking-widest mb-2 bg-sky-50 px-3 py-0.5 rounded-full">
                            Work in Progress
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                            Next Innovation
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[240px]">
                            We are building something extraordinary. Stay tuned for the reveal.
                        </p>
                    </div>

                    {/* Faces */}
                    {/* Front (Z+48) - SWINGS OPEN DOWN like a hatch */}
                    {/* RotateX -110deg moves it down and away */}
                    <div
                        className={`${faceBaseClass}`}
                        style={{
                            transform: isOpen ? 'translateZ(48px) rotateX(-120deg) translateY(60px) opacity(0.2)' : 'translateZ(48px)',
                            transitionDelay: delay(100)
                        }}
                    >
                        <div className="w-8 h-8 rounded-full bg-sky-100/30 blur-md transition-opacity duration-300" style={{ opacity: isOpen ? 0 : 1 }}></div>
                    </div>

                    {/* Back (rotateY 180, Z+48 local) - MOVES BACK */}
                    <div
                        className={`${faceBaseClass}`}
                        style={{
                            transform: isOpen ? 'rotateY(180deg) translateZ(100px) opacity(0)' : 'rotateY(180deg) translateZ(48px)',
                            transitionDelay: delay(0)
                        }}
                    ></div>

                    {/* Right (rotateY 90, Z+48) - SWINGS RIGHT */}
                    <div
                        className={`${faceBaseClass}`}
                        style={{
                            transform: isOpen ? 'rotateY(90deg) translateZ(48px) rotateY(110deg) translateX(40px) opacity(0.2)' : 'rotateY(90deg) translateZ(48px)',
                            transitionDelay: delay(300)
                        }}
                    ></div>

                    {/* Left (rotateY -90, Z+48) - SWINGS LEFT */}
                    <div
                        className={`${faceBaseClass}`}
                        style={{
                            transform: isOpen ? 'rotateY(-90deg) translateZ(48px) rotateY(-110deg) translateX(-40px) opacity(0.2)' : 'rotateY(-90deg) translateZ(48px)',
                            transitionDelay: delay(300)
                        }}
                    ></div>

                    {/* Top (rotateX 90, Z+48) - LIFTS UP */}
                    <div
                        className={`${faceBaseClass}`}
                        style={{
                            transform: isOpen ? 'rotateX(90deg) translateZ(48px) rotateX(110deg) translateY(-40px) opacity(0.2)' : 'rotateX(90deg) translateZ(48px)',
                            transitionDelay: delay(200)
                        }}
                    ></div>

                    {/* Bottom (rotateX -90, Z+48) - DROPS DOWN */}
                    <div
                        className={`${faceBaseClass}`}
                        style={{
                            transform: isOpen ? 'rotateX(-90deg) translateZ(48px) rotateX(-110deg) translateY(40px) opacity(0.2)' : 'rotateX(-90deg) translateZ(48px)',
                            transitionDelay: delay(200)
                        }}
                    ></div>

                </div>

                {/* Pulsing glow under cube when closed */}
                <div className={`
                    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    w-20 h-20 bg-sky-400/20 blur-xl rounded-full -z-10
                    transition-opacity duration-500
                    ${isOpen ? 'opacity-0' : 'animate-pulse opacity-100'}
                `}></div>
            </div>
        </>
    );
};

export default HeroCube;


