import React, { useEffect, useRef } from 'react';
import './CircularServices.css';

interface Service {
    title: string;
    icon: React.ReactElement;
}

const services: Service[] = [
    {
        title: 'Web Design',
        icon: (
            <svg className="service-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: 'Development',
        icon: (
            <svg className="service-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        )
    },
    {
        title: 'SEO Solutions',
        icon: (
            <svg className="service-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        )
    },
    {
        title: 'Strategy',
        icon: (
            <svg className="service-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )
    },
    {
        title: 'Support',
        icon: (
            <svg className="service-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        )
    },
    {
        title: 'Marketing',
        icon: (
            <svg className="service-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3" />
            </svg>
        )
    }
];

const CircularServices: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        serviceRefs.current.forEach((service, index) => {
                            if (service) {
                                setTimeout(() => {
                                    service.classList.add('animate-in');
                                }, index * 100);
                            }
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section id="services" className="circular-services-section" ref={sectionRef}>
            <div className="services-container">
                <h2 className="services-title">Our Services</h2>
                <p className="services-subtitle">Comprehensive digital solutions for modern businesses</p>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-item"
                            ref={(el) => {
                                serviceRefs.current[index] = el;
                            }}
                        >
                            <div className="service-circle">
                                {/* The "Copy Paste" Look Rings */}

                                {/* 4. Ambient Glow */}
                                <div className="tech-ring ring-glow"></div>

                                {/* 1. The Dial Ticks (Outer) */}
                                <div className="tech-ring ring-ticks"></div>

                                {/* 2. Moving Arcs (Segments) */}
                                <div className="tech-ring ring-arcs"></div>

                                {/* 3. Inner Dashed Circle */}
                                <div className="tech-ring ring-inner"></div>

                                {/* Icon container center */}
                                <div className="icon-container">
                                    {service.icon}
                                </div>
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CircularServices;
