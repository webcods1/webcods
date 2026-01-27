import React, { useEffect } from 'react';

interface CoFoundersProps {
    onBack: () => void;
}

const CoFounders: React.FC<CoFoundersProps> = ({ onBack }) => {

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
                    <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(168,85,247,0.2)]">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10"></div>
                        <div className="absolute top-0 right-0 p-8 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] group-hover:bg-purple-500/30 transition-all duration-500"></div>

                        <div className="h-[500px] overflow-hidden">
                            {/* Optimized Image Container */}
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center relative">
                                <img
                                    src="/founder.png?t=1"
                                    alt="Anishif"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlay if image fails or placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                            <div className="mb-2 inline-block px-4 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold tracking-wider backdrop-blur-sm">
                                CEO & CO-FOUNDER
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-3">Anishif</h2>
                            <p className="text-gray-300 mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                                With over a decade of experience in tech innovation, Anishif leads WebCods with a vision to bridge the gap between complex technology and intuitive user experiences.
                            </p>

                            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                {/* Social Icons Placeholder */}
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Founder 2: Sarah */}
                    <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10"></div>
                        <div className="absolute top-0 left-0 p-8 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-blue-500/30 transition-all duration-500"></div>

                        <div className="h-[500px] overflow-hidden">
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center relative">
                                <img
                                    src="/founder2.png?v=2"
                                    alt="Muzammil"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                            <div className="mb-2 inline-block px-4 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold tracking-wider backdrop-blur-sm">
                                CTO & CO-FOUNDER
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-3">Muzammil</h2>
                            <p className="text-gray-300 mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                                A passionate technologist who loves solving complex problems. Muzammil ensures WebCods stays at the forefront of modern web development standards and performance.
                            </p>

                            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </div>
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
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 z-50 flex items-center group cursor-pointer"
            >
                <div className="
                    bg-white text-gray-800 
                    px-4 py-2 rounded-full 
                    shadow-lg mr-4 
                    text-sm font-bold 
                    transform transition-all duration-300
                    opacity-100 md:opacity-0 md:group-hover:opacity-100 
                    md:translate-x-4 md:group-hover:translate-x-0
                    whitespace-nowrap
                ">
                    Connect with us
                </div>
                <div className="
                    bg-[#25D366] 
                    w-14 h-14 rounded-full 
                    flex items-center justify-center 
                    shadow-[0_4px_14px_rgba(0,0,0,0.25)]
                    transition-all duration-300 
                    transform hover:scale-110 hover:rotate-6
                ">
                    <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.355-5.044a9.89 9.89 0 019.86-9.86c2.639 0 5.122 1 6.992 2.871a9.88 9.88 0 012.87 6.988c0 2.636-1.027 5.123-2.903 6.994l-.001.001a9.87 9.87 0 01-6.993 2.884m5.275-18.724a12.23 12.23 0 00-8.663 3.578C5.253 4.4 3.02 9.079 4.318 13.064L3 18.298l5.35-.851a12.26 12.26 0 005.86 1.492c6.76 0 12.262-5.502 12.262-12.262a12.23 12.23 0 00-3.57-8.663" />
                    </svg>
                </div>
            </a>
        </div>
    );
};

export default CoFounders;
