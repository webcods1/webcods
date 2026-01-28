import React, { useState } from 'react';

interface HeroCubeProps {
    className?: string;
}

const HeroCube: React.FC<HeroCubeProps> = ({ className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Cube size: 96px (w-24). Half = 48px.
    // When open, faces move out to 150px.

    // Updated to Sky Blue colors
    const faceBaseClass = "absolute inset-0 bg-sky-400/80 border border-sky-200/50 backdrop-blur-sm flex items-center justify-center transition-all duration-700 ease-in-out backface-hidden";
    const faceTrans = (isOpen: boolean) => isOpen ? 'opacity-0' : 'opacity-90 hover:opacity-100';

    return (
        <div className={`relative w-24 h-24 perspective-1000 z-40 ${className}`}>
            <div
                className={`w-full h-full relative transform-style-3d transition-transform duration-700 ease-in-out cursor-pointer ${isOpen ? '' : 'animate-cube-spin hover:pause'}`}
                style={{ transform: isOpen ? 'rotateX(0deg) rotateY(0deg)' : undefined }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Faces */}
                {/* Front (Z+48) */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{ transform: isOpen ? 'translateZ(150px)' : 'translateZ(48px)' }}
                >
                    <div className="w-8 h-8 rounded-full bg-sky-100/30 blur-md"></div>
                </div>

                {/* Back (rotateY 180, Z+48 local) => Z-48 global */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{ transform: isOpen ? 'rotateY(180deg) translateZ(150px)' : 'rotateY(180deg) translateZ(48px)' }}
                ></div>

                {/* Right (rotateY 90, Z+48) */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{ transform: isOpen ? 'rotateY(90deg) translateZ(150px)' : 'rotateY(90deg) translateZ(48px)' }}
                ></div>

                {/* Left (rotateY -90, Z+48) */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{ transform: isOpen ? 'rotateY(-90deg) translateZ(150px)' : 'rotateY(-90deg) translateZ(48px)' }}
                ></div>

                {/* Top (rotateX 90, Z+48) */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{ transform: isOpen ? 'rotateX(90deg) translateZ(150px)' : 'rotateX(90deg) translateZ(48px)' }}
                ></div>

                {/* Bottom (rotateX -90, Z+48) */}
                <div
                    className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                    style={{ transform: isOpen ? 'rotateX(-90deg) translateZ(150px)' : 'rotateX(-90deg) translateZ(48px)' }}
                ></div>

                {/* Inner Content - Revealed when OPEN */}
                <div className={`
                    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    w-64 p-5 bg-white/95 backdrop-blur-2xl rounded-2xl 
                    border border-sky-100 shadow-[0_0_40px_rgba(56,189,248,0.3)] 
                    transition-all duration-700 delay-100 text-center flex flex-col items-center
                    ${isOpen ? 'opacity-100 scale-100 z-50 pointer-events-auto' : 'opacity-0 scale-50 -z-10 pointer-events-none'}
                `}>
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-sky-100 shadow-sm">
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

                    <div className="text-[10px] font-bold text-sky-500 uppercase tracking-widest mb-1 bg-sky-50 px-2 py-0.5 rounded-full">
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
                w-20 h-20 bg-sky-400/20 blur-xl rounded-full -z-10
                transition-opacity duration-500
                ${isOpen ? 'opacity-0' : 'animate-pulse opacity-100'}
            `}></div>
        </div>
    );
};

export default HeroCube;

