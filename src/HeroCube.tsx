import React, { useState } from 'react';

interface HeroCubeProps {
    className?: string;
}

const HeroCube: React.FC<HeroCubeProps> = ({ className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Cube size: 96px (w-24). Half = 48px.
    // Enhanced animations for "Real Unfolding"

    // Base class for all faces
    const faceBaseClass = "absolute inset-0 bg-sky-400/80 border border-sky-200/50 backdrop-blur-sm flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] backface-hidden shadow-lg";

    // When open, faces become slightly more transparent to focus on content
    const faceTrans = (isOpen: boolean) => isOpen ? 'opacity-40' : 'opacity-90 hover:opacity-100';

    // Staggered delays for "Page by Page" opening effect
    // Closed: No delay (close together or staggered reverse). Open: Staggered (0, 100, 200...)
    const getDelay = (index: number) => isOpen ? `${index * 100}ms` : `${(5 - index) * 50}ms`;

    return (
        <>
            {/* Click Outside Overlay (Only active when open) */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-transparent cursor-default"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                    }}
                />
            )}

            <div className={`relative w-24 h-24 perspective-1000 z-40 ${className}`}>
                <div
                    className={`w-full h-full relative transform-style-3d transition-transform duration-1000 ease-in-out cursor-pointer ${isOpen ? 'z-50' : 'animate-cube-spin hover:pause'}`}
                    style={{ transform: isOpen ? 'rotateX(0deg) rotateY(0deg)' : undefined }}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent bubbling to overlay immediately
                        setIsOpen(!isOpen);
                    }}
                >
                    {/* Faces with "Unfolding" Transforms */}

                    {/* Front (Z+48) - Moves straight out */}
                    <div
                        className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                        style={{
                            transform: isOpen ? 'translateZ(200px) rotateY(0deg)' : 'translateZ(48px)',
                            transitionDelay: getDelay(0)
                        }}
                    >
                        <div className="w-8 h-8 rounded-full bg-sky-100/30 blur-md"></div>
                    </div>

                    {/* Back (rotateY 180) - Moves back */}
                    <div
                        className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                        style={{
                            transform: isOpen ? 'rotateY(180deg) translateZ(200px)' : 'rotateY(180deg) translateZ(48px)',
                            transitionDelay: getDelay(1)
                        }}
                    ></div>

                    {/* Right (rotateY 90) - Unfolds outward (+45deg = 135deg global) */}
                    <div
                        className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                        style={{
                            transform: isOpen ? 'rotateY(135deg) translateZ(180px)' : 'rotateY(90deg) translateZ(48px)',
                            transitionDelay: getDelay(2)
                        }}
                    ></div>

                    {/* Left (rotateY -90) - Unfolds outward (-45deg = -135deg global) */}
                    <div
                        className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                        style={{
                            transform: isOpen ? 'rotateY(-135deg) translateZ(180px)' : 'rotateY(-90deg) translateZ(48px)',
                            transitionDelay: getDelay(3)
                        }}
                    ></div>

                    {/* Top (rotateX 90) - Unfolds Up/Back (+45deg = 135deg global) */}
                    <div
                        className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                        style={{
                            transform: isOpen ? 'rotateX(135deg) translateZ(180px)' : 'rotateX(90deg) translateZ(48px)',
                            transitionDelay: getDelay(4)
                        }}
                    ></div>

                    {/* Bottom (rotateX -90) - Unfolds Down/Back (-45deg = -135deg global) */}
                    <div
                        className={`${faceBaseClass} ${faceTrans(isOpen)}`}
                        style={{
                            transform: isOpen ? 'rotateX(-135deg) translateZ(180px)' : 'rotateX(-90deg) translateZ(48px)',
                            transitionDelay: getDelay(5)
                        }}
                    ></div>

                    {/* Inner Content - Revealed when OPEN */}
                    <div className={`
                        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-[280px] p-6 bg-white/95 backdrop-blur-3xl rounded-3xl 
                        border border-sky-100 shadow-[0_0_60px_rgba(56,189,248,0.4)] 
                        transition-all duration-1000 delay-300 text-center flex flex-col items-center
                        overflow-hidden
                        ${isOpen ? 'opacity-100 scale-100 z-50 pointer-events-auto' : 'opacity-0 scale-0 -z-10 pointer-events-none'}
                    `}>
                        {/* Decorative glow inside card */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-200/50 blur-3xl rounded-full pointer-events-none"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200/50 blur-3xl rounded-full pointer-events-none"></div>

                        <div className="relative z-10 w-20 h-20 rounded-2xl overflow-hidden mb-4 border-[3px] border-white shadow-lg rotate-3 transition-transform hover:rotate-0 duration-500">
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

                        <div className="relative z-10">
                            <div className="inline-block text-[10px] font-extrabold text-sky-600 uppercase tracking-widest mb-2 bg-sky-100/80 px-3 py-1 rounded-full">
                                Coming Soon
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-2 leading-tight">
                                Next Big Thing
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                We are crafting a digital masterpiece. Be the first to know when we launch.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Pulsing glow under cube when closed */}
                <div className={`
                    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    w-24 h-24 bg-sky-400/30 blur-2xl rounded-full -z-10
                    transition-all duration-700
                    ${isOpen ? 'opacity-0 scale-150' : 'animate-pulse opacity-100 scale-100'}
                `}></div>
            </div>
        </>
    );
};

export default HeroCube;

