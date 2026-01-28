import React, { useEffect, useState } from 'react';

interface CoFoundersProps {
    onBack: () => void;
}

const CoFounders: React.FC<CoFoundersProps> = ({ onBack }) => {
    const [activeCard, setActiveCard] = useState<number | null>(null);

    const toggleCard = (index: number) => {
        setActiveCard(activeCard === index ? null : index);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">

            {/* Navigation / Back Button */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center bg-transparent pointer-events-none">
                <button
                    onClick={onBack}
                    className="
                        pointer-events-auto group relative px-6 py-2 overflow-hidden rounded-full 
                        bg-white/10 backdrop-blur-md border border-white/20
                        text-white font-bold transition-all duration-300
                        hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
                        hover:border-white
                    "
                >
                    <span className="absolute inset-0 w-full h-full bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                    <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ animation: 'moveLeft 1s ease-in-out infinite' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="text-sm">Back to Home</span>
                    </span>
                </button>
            </nav>

            <div className="container mx-auto px-4 pt-32 pb-20">

                {/* Header */}
                <div className="text-center mb-20 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        Meet The Visionaries
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        The minds behind WebCods, dedicated to transforming the digital landscape through innovation and passion.
                    </p>
                </div>

                {/* Co-Founders Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                    {/* Founder 1: Alex */}
                    {/* Founder 1: Alex */}
                    <div
                        onClick={() => toggleCard(0)}
                        className={`group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 cursor-pointer
                        ${activeCard === 0 ? 'border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.2)]' : 'hover:border-purple-500/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.2)]'}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10"></div>
                        <div className={`absolute top-0 right-0 p-8 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] transition-all duration-500
                            ${activeCard === 0 ? 'bg-purple-500/30' : 'group-hover:bg-purple-500/30'}`}></div>

                        <div className="h-[500px] overflow-hidden">
                            {/* Optimized Image Container */}
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center relative">
                                <img
                                    src="/founder.png?t=1"
                                    alt="Anishif"
                                    className={`w-full h-full object-cover transition-transform duration-700
                                        ${activeCard === 0 ? 'scale-110' : 'group-hover:scale-110'}`}
                                />
                                {/* Overlay if image fails or placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                            </div>
                        </div>

                        <div className={`absolute bottom-0 left-0 w-full p-8 z-20 transform transition-transform duration-500
                            ${activeCard === 0 ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>
                            <div className="mb-2 inline-block px-4 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold tracking-wider backdrop-blur-sm">
                                CEO & CO-FOUNDER
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-3">Anishif</h2>
                            <p className={`text-gray-300 mb-6 transition-all duration-300
                                ${activeCard === 0 ? 'line-clamp-none' : 'line-clamp-2 group-hover:line-clamp-none'}`}>
                                With over a decade of experience in tech innovation, Anishif leads WebCods with a vision to bridge the gap between complex technology and intuitive user experiences.
                            </p>

                            <div className={`flex gap-4 transition-opacity duration-500 delay-100
                                ${activeCard === 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                {/* Social Icons Placeholder */}
                                <a
                                    href="https://instagram.com/muhammed.anshif.167"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Founder 2: Sarah */}
                    <div
                        onClick={() => toggleCard(1)}
                        className={`group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 cursor-pointer
                        ${activeCard === 1 ? 'border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.2)]' : 'hover:border-blue-500/50 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]'}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10"></div>
                        <div className={`absolute top-0 left-0 p-8 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] transition-all duration-500
                            ${activeCard === 1 ? 'bg-blue-500/30' : 'group-hover:bg-blue-500/30'}`}></div>

                        <div className="h-[500px] overflow-hidden">
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center relative">
                                <img
                                    src="/founder2.png?v=2"
                                    alt="Muzammil"
                                    className={`w-full h-full object-cover transition-transform duration-700
                                        ${activeCard === 1 ? 'scale-110' : 'group-hover:scale-110'}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                            </div>
                        </div>

                        <div className={`absolute bottom-0 left-0 w-full p-8 z-20 transform transition-transform duration-500
                            ${activeCard === 1 ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>
                            <div className="mb-2 inline-block px-4 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold tracking-wider backdrop-blur-sm">
                                CTO & CO-FOUNDER
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-3">Muzammil</h2>
                            <p className={`text-gray-300 mb-6 transition-all duration-300
                                ${activeCard === 1 ? 'line-clamp-none' : 'line-clamp-2 group-hover:line-clamp-none'}`}>
                                A passionate technologist who loves solving complex problems. Muzammil ensures WebCods stays at the forefront of modern web development standards and performance.
                            </p>

                            <div className={`flex gap-4 transition-opacity duration-500 delay-100
                                ${activeCard === 1 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                <a
                                    href="https://instagram.com/muzammii1_"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/muzammil-p94?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Additional Info / Philosophy */}
                <div className="mt-24 max-w-4xl mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-8">Our Philosophy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h4 className="text-xl font-bold text-blue-400 mb-3">Innovation</h4>
                            <p className="text-gray-400 text-sm">Pushing boundaries with learning new technologies.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h4 className="text-xl font-bold text-purple-400 mb-3">Detail</h4>
                            <p className="text-gray-400 text-sm">Pixel-perfect designs that look great on any device.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h4 className="text-xl font-bold text-pink-400 mb-3">Impact</h4>
                            <p className="text-gray-400 text-sm">Building software that makes a real difference.</p>
                        </div>
                    </div>
                </div>

            </div>

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
        </div>
    );
};

export default CoFounders;
