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
        title: 'App Development',
        icon: (
            <svg className="service-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
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
    const [activeIndex, setActiveIndex] = React.useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<SVGPathElement>(null);

    // Calculate position on the S-curve based on index offset
    const getPosition = (index: number, total: number) => {
        const center = 0.5;
        const spacing = 0.18;

        // Calculate circular distance (shortest path)
        let offset = index - activeIndex;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        // Apply position
        let position = center + (offset * spacing);

        return position;
    };

    const nextService = () => {
        setActiveIndex((prev) => (prev + 1) % services.length);
    };

    const prevService = () => {
        setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
    };

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(nextService, 4000); // 4 seconds
        return () => clearInterval(timer);
    }, []);

    // Helper to get coordinates from the SVG path
    const getCoordinates = (progress: number) => {
        if (!trackRef.current) return { x: 0, y: 0 };
        const path = trackRef.current;
        const length = path.getTotalLength();

        // Clamp progress
        const p = Math.max(0, Math.min(1, progress));
        const point = path.getPointAtLength(p * length);

        // Convert to percentage relative to viewBox?
        // Our viewBox is 0 0 1000 400
        // We need to return px relative to the container usually, 
        // but since we scale the SVG, let's use percentages if possible.
        // Actually, easiest is to just return pixel values if the SVG fills the container.

        return point;
        // We'll handle scaling in inline styles via container query/bounding rect if needed,
        // but CSS offset-path is newer.
        // Let's stick to a simpler math curve approximation if SVG point extraction is complex with responsiveness.
        // Wait, easier: Use standard Bezier math here.
    };

    // Cubic Bezier Ease-In-Out Sine Wave-ish
    // Start (0,0) -> Control(0.5, 0) -> Control(0.5, 1) -> End(1, 1)?
    // No, we want a "Snake". Top Left -> Center -> Top Right? 
    // Or "S" shape: Top Left -> Middle -> Bottom Right?
    // User image: Top Left -> Curve Down -> Middle Flat -> Curve Down -> Bottom Right (Arrow).
    // Let's approximate the path mathematically to place items.

    // Path: Starts Top-Left (10%, 10%), Curves to Center (50%, 50%), Curves to Top-Right (90%, 10%)?
    // User said "left on top left and right top right" and "service is in centre".
    // This implies a "U" or "Valley" shape? Or an Arch ("Hill")?
    // "Left on top left" -> "Right on top right". 
    // This sounds like a "U" shape or a simple Dip.
    // Let's do a smooth Sine wave that matches that: High -> Low -> High.

    const getStyleForPosition = (index: number) => {
        const pos = getPosition(index, services.length);

        // Visibility check
        if (pos < 0.1 || pos > 0.9) {
            return { opacity: 0, pointerEvents: 'none' as const, zIndex: 0 };
        }

        // Coordinates based on a "Valley/U" curve spanning the container
        // X: 0% to 100%
        // Y: High (Top) -> Low (Center) -> High (Top)
        // Let's Map pos (0 to 1) to X (0% to 100%)
        const xPercent = pos * 100;

        // Y Sine Wave: 
        // We want Top at 0 (start) and 1 (end).
        // Bottom (Center) at 0.5.
        // cos function: cos(0) = 1, cos(PI) = -1, cos(2PI) = 1.
        // Let's use cosine from 0 to 2PI? No, we want -PI/2 to 3PI/2?
        // Simple Parabola: y = (x - 0.5)^2 * 4?  (At 0=>1, 0.5=>0, 1=>1).
        // Let's use a Sine for smoother movement.
        // cos(2 * PI * (pos - 0.5)) -> At 0.5, cos(0)=1 (Top) NO.
        // We want 0.5 to be Bottom (say 80% top) and 0/1 to be Top (20% top).

        // Let's use Cosine:
        // cos(2 * PI * (pos)) -> 1 at 0, -1 at 0.5, 1 at 1.
        // Value range: 1 to -1.
        // Map to Y% : 
        // 1 (Ends) -> 20%
        // -1 (Center) -> 80%
        // Formula: 50% - (cos(2 * PI * pos) * 30%)
        // At 0: 50 - 30 = 20% (Top)
        // At 0.5: 50 - (-30) = 80% (Bottom)
        // At 1: 50 - 30 = 20% (Top)

        // Wait, User said "Left Top", "Right Top".
        // Center service in center of track.
        // If center is active, it should be in the MIDDLE of the screen physically?
        // If "Middle" means Center X, Center Y.
        // Then styling: Top-Left -> Center -> Top-Right effectively means V shape?
        // Or maybe just "track goes left to right", and active item is in center.
        // Let's try the "S" curve from the image which is Top-Left -> Center -> Bottom-Right.
        // But user text says "right top right".
        // Let's stick to user text: Top Left -> Center -> Top Right (Valley/U shape).

        // BUT, visually, usually "Hero" tracks are centered.
        // Let's assume the user wants the ACTIVE item in the CENTER of the Viewport.
        // So Center X=50%, Y=50%.
        // Ends are Top-Left and Top-Right.
        // So it is a Valley/U shape.

        const yPercent = 50 - (Math.cos(2 * Math.PI * pos) * 30); // 20% to 80% range? Wait.
        // If cos=1 (ends), 50-30=20% (Top).
        // If cos=-1 (center), 50+30=80% (Bottom). 
        // This puts the active item at the BOTTOM.
        // We want active item in CENTER.
        // So at pos=0.5, Y should be 50%.
        // At pos=0 or 1, Y should be 10% (Top).
        // So we need a "Hill" / Arch shape?
        // No, user said "Left on Top Left" (Start) ... "Right Top Right" (End).
        // So Start=Top, End=Top. Center=Center?
        // If Ends are Top, and Center is Center, then it's a V shape where Center is lower than Top.
        // (Top=0%, Center=50%).

        // Let's try:
        // Y = 10% + 40% * |pos - 0.5| * 2 ? Linear V.
        // Smooth: Y = 10% + 80% * (pos - 0.5)^2 ? Parabola.
        // At 0.5: 10 + 0 = 10%. (High up).
        // We want Center to be in the MIDDLE (50%).
        // Ends at Top (10%).
        // So Active Item (0.5) is at 50%.
        // Ends (0,1) are at 10%.
        // This is an INVERTED Parabola (Arch)?
        // No, 10% is TOP. 50% is MIDDLE.
        // So y increases as we go to center? Yes.
        // 0 -> 10%
        // 0.5 -> 50%
        // 1 -> 10%
        // This is a "Hill" in coordinates (higher value = lower on screen), but visual "Valley" (down then up)? 
        // No, Top is 0%. So 10% is Top. 50% is Middle.
        // So it goes Down then Up. (Valley).

        // WAIT. If active item is "Center of track", does that mean Center of Screen?
        // Usually yes.
        // So the track dips down from Top Left to Center Screen, then goes back up to Top Right.
        // That seems to match "Left Top Left ... Right Top Right".

        const yVal = 10 + (80 * (1 - Math.pow(2 * (pos - 0.5), 2)));
        // Parabola: y = 1 - x^2 (Arch).
        // Here we want visual dip?
        // At 0 (Left): 10 + 80 * (1 - 1) = 10% (Top).
        // At 0.5 (Center): 10 + 80 * (1 - 0) = 90% (Bottom).
        // Takes up too much height?
        // Let's target 50% at center.
        // 10% at edges.
        // Range 40%.
        // Formula: 10 + 40 * (1 - (2*(pos-0.5))^2).
        // At 0: 10 + 40 * (1 - 1) = 10.
        // At 0.5: 10 + 40 * 1 = 50.
        // At 1: 10.
        // Correct.

        // However, the Image provided shows an S curve (Snake).
        // Top Left -> Curve -> Bottom Right.
        // User text says "Left on Top Left... Right Top Right".
        // This contradicts the image.
        // I will follow the TEXT primarily but use the "Track" visual style from the image.
        // Text: V-shape / U-shape.

        // BUT... "Service is in centre of the track".
        // Let's assume U-Shape.

        const isCenter = Math.abs(pos - 0.5) < 0.05;
        const scale = isCenter ? 1.2 : 0.8;
        const opacity = Math.max(0, 1 - Math.abs(pos - 0.5) * 2);
        // Opacity falloff: 1 at center, 0 at ends.
        // We need sides visible partially (0.6).
        // 0.5 -> 1.
        // 0.35 -> 1 - 0.15*2 = 0.7.
        // 0.2 -> 1 - 0.3*2 = 0.4.

        return {
            left: `${xPercent}%`,
            top: `${10 + 40 * (1 - Math.pow(2 * (pos - 0.5), 2))}%`, // Parabolic dip
            transform: `translate(-50%, -50%) scale(${scale})`,
            opacity: Math.max(0.3, 1 - Math.abs(pos - 0.5) * 1.5), // Custom opacity curve
            zIndex: Math.round(100 - Math.abs(pos - 0.5) * 100),
        };
    };

    return (
        <section id="services" className="circular-services-section" ref={sectionRef}>
            <div className="services-container">
                <h2 className="services-title">Our Services</h2>
                <p className="services-subtitle">Comprehensive digital solutions for modern businesses</p>

                <div className="track-wrapper">
                    {/* SVG Track Background - U Shape */}
                    {/* SVG Track Background - Removed as per user request */}
                    {/* <svg className="track-svg" viewBox="0 0 1000 500" preserveAspectRatio="none">
                         ...
                    </svg> */}

                    {services.map((service, index) => {
                        const style = getStyleForPosition(index);
                        const isMain = index === activeIndex;

                        return (
                            <div
                                key={index}
                                className={`service-item ${isMain ? 'active' : ''}`}
                                style={style as React.CSSProperties}
                                onClick={() => setActiveIndex(index)}
                            >
                                <div className="service-circle">
                                    <div className="tech-ring ring-glow"></div>
                                    <div className="tech-ring ring-ticks"></div>
                                    <div className="tech-ring ring-arcs"></div>
                                    <div className="tech-ring ring-inner"></div>
                                    <div className="icon-container">
                                        {service.icon}
                                    </div>
                                </div>
                                <h3 className="service-title">{service.title}</h3>
                            </div>
                        );
                    })}

                    {/* Navigation Buttons Removed as per user request */}
                </div>
            </div>
        </section>
    );
};

export default CircularServices;
