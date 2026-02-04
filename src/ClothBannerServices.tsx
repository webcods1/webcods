import React from 'react';
import './ClothBannerServices.css';

interface Service {
    title: string;
    description: string;
    icon?: string;
}

const services: Service[] = [
    {
        title: 'Web Design',
        description: 'Beautiful, responsive websites that captivate your audience',
        icon: '🎨'
    },
    {
        title: 'Digital Marketing',
        description: 'Strategic campaigns that drive growth and engagement',
        icon: '📱'
    },
    {
        title: 'Content Creation',
        description: 'Compelling content that tells your brand story',
        icon: '✍️'
    },
    {
        title: 'SEO Strategy',
        description: 'Optimize your presence and rank higher in search results',
        icon: '🚀'
    },
    {
        title: 'Brand Identity',
        description: 'Unique visual identities that make you stand out',
        icon: '💎'
    }
];

const ClothBannerServices: React.FC = () => {
    return (
        <section className="cloth-banner-section">
            <div className="cloth-banner-container">
                <h2 className="section-title">Our Services</h2>
                <p className="section-subtitle">Premium solutions tailored for your success</p>

                {/* Clothesline rope */}
                <div className="clothesline-rope"></div>

                {/* Cloth banners */}
                <div className="cloth-banners">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="cloth-banner"
                            style={{
                                animationDelay: `${index * 0.15}s`,
                                '--banner-index': index
                            } as React.CSSProperties}
                        >
                            {/* Clothespin */}
                            <div className="clothespin clothespin-left"></div>
                            <div className="clothespin clothespin-right"></div>

                            {/* Cloth fabric */}
                            <div className="cloth-fabric">
                                <div className="cloth-content">
                                    {service.icon && <div className="service-icon">{service.icon}</div>}
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-description">{service.description}</p>
                                </div>

                                {/* Fabric folds and wrinkles */}
                                <div className="fabric-fold fold-1"></div>
                                <div className="fabric-fold fold-2"></div>
                                <div className="fabric-fold fold-3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ambient light effect */}
            <div className="ambient-light"></div>
        </section>
    );
};

export default ClothBannerServices;
