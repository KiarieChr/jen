import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="hero-section">
            {/* Animated Background Particles */}
            <div className="hero-bg-particles">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className={`particle particle-${i + 1}`}></div>
                ))}
            </div>

            {/* Gradient Overlay */}
            <div className="hero-gradient-overlay"></div>

            {/* Animated Background Image */}
            <div className="hero-bg-image"></div>

            {/* Floating Glow Effects */}
            <div className="glow-effect glow-1"></div>
            <div className="glow-effect glow-2"></div>
            <div className="glow-effect glow-3"></div>

            <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center' }}>
                <div className="hero-content" style={{ maxWidth: '800px', textAlign: 'center' }}>
                    {/* Animated Badge */}
                    <div className={`hero-badge ${isVisible ? 'animate-in' : ''}`}>
                        <span className="badge-dot"></span>
                        <span>Live Every Tuesday @ 8:30 PM</span>
                    </div>

                    <h1 className={`hero-title ${isVisible ? 'animate-in' : ''}`}>
                        <span className="title-line">Empowering</span>
                        <span className="text-gradient title-highlight">Purpose</span>
                        <br />
                        <span className="title-line">Matching Up</span>
                        <span className="text-gradient title-highlight">God's Call</span>
                    </h1>

                    <p className={`hero-subtitle ${isVisible ? 'animate-in' : ''}`}>
                        We envision the reign of Christ on earth before the second Advent.
                        Join us in this journey of faith and transformation.
                    </p>

                    <div className={`hero-actions ${isVisible ? 'animate-in' : ''}`}>
                        <Link to="/give" className="btn btn-primary hero-btn">
                            <span className="btn-icon">❤</span>
                            <span>Give Now</span>
                            <span className="btn-shine"></span>
                        </Link>
                        <Link to="/sermons" className="btn btn-glass hero-btn">
                            <span className="btn-icon">▶</span>
                            <span>Watch Live</span>
                        </Link>
                        <Link to="/contact" className="btn btn-outline hero-btn">
                            <span className="btn-icon">💬</span>
                            <span>Contact Us</span>
                        </Link>
                    </div>

                    {/* Scroll Indicator */}
                    <div className={`scroll-indicator ${isVisible ? 'animate-in' : ''}`}>
                        <div className="mouse">
                            <div className="wheel"></div>
                        </div>
                        <span>Scroll to explore</span>
                    </div>
                </div>
            </div>

            <style>{`
                .hero-section {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    position: relative;
                    padding-top: 80px;
                    background: linear-gradient(135deg, #1A1625 0%, #0d0a14 50%, #120D20 100%);
                    overflow: hidden;
                }

                /* Animated Background Particles */
                .hero-bg-particles {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }
                .particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(34, 193, 230, 0.5);
                    border-radius: 50%;
                    animation: float-particle 15s infinite ease-in-out;
                }
                ${[...Array(20)].map((_, i) => `
                    .particle-${i + 1} {
                        left: ${Math.random() * 100}%;
                        top: ${Math.random() * 100}%;
                        animation-delay: ${Math.random() * 5}s;
                        animation-duration: ${10 + Math.random() * 10}s;
                        opacity: ${0.3 + Math.random() * 0.5};
                        transform: scale(${0.5 + Math.random() * 1.5});
                    }
                `).join('')}

                @keyframes float-particle {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    25% { transform: translateY(-30px) translateX(10px); }
                    50% { transform: translateY(-50px) translateX(-10px); }
                    75% { transform: translateY(-20px) translateX(20px); }
                }

                /* Background Image with Ken Burns Effect */
                .hero-bg-image {
                    position: absolute;
                    inset: -20px;
                    background: url("https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop");
                    background-size: cover;
                    background-position: center;
                    opacity: 0.15;
                    animation: ken-burns 30s ease-in-out infinite alternate;
                }

                @keyframes ken-burns {
                    0% { transform: scale(1) translateX(0); }
                    100% { transform: scale(1.1) translateX(-2%); }
                }

                /* Gradient Overlay */
                .hero-gradient-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        180deg,
                        rgba(18, 13, 32, 0.3) 0%,
                        rgba(18, 13, 32, 0.6) 50%,
                        rgba(18, 13, 32, 0.9) 100%
                    );
                    z-index: 2;
                }

                /* Floating Glow Effects */
                .glow-effect {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    z-index: 1;
                    animation: glow-pulse 8s ease-in-out infinite;
                }
                .glow-1 {
                    width: 400px;
                    height: 400px;
                    background: rgba(34, 193, 230, 0.15);
                    top: 10%;
                    left: -10%;
                    animation-delay: 0s;
                }
                .glow-2 {
                    width: 300px;
                    height: 300px;
                    background: rgba(168, 85, 247, 0.12);
                    top: 50%;
                    right: -5%;
                    animation-delay: 2s;
                }
                .glow-3 {
                    width: 350px;
                    height: 350px;
                    background: rgba(34, 193, 230, 0.1);
                    bottom: 10%;
                    left: 30%;
                    animation-delay: 4s;
                }

                @keyframes glow-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.2); opacity: 0.8; }
                }

                /* Hero Badge */
                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 0.5rem 1.25rem;
                    border-radius: 2rem;
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.9);
                    margin-bottom: 2rem;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .hero-badge.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
                .badge-dot {
                    width: 8px;
                    height: 8px;
                    background: #10b981;
                    border-radius: 50%;
                    animation: pulse-dot 2s infinite;
                }

                @keyframes pulse-dot {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
                    50% { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
                }

                /* Hero Title */
                .hero-title {
                    font-size: 4.5rem;
                    font-weight: 800;
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.02em;
                    color: white;
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
                }
                .hero-title.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
                .title-line {
                    display: inline-block;
                    margin-right: 0.5rem;
                }
                .title-highlight {
                    display: inline-block;
                    position: relative;
                    animation: text-shimmer 3s ease-in-out infinite;
                }

                @keyframes text-shimmer {
                    0%, 100% { filter: brightness(1); }
                    50% { filter: brightness(1.3); }
                }

                /* Hero Subtitle */
                .hero-subtitle {
                    font-size: 1.25rem;
                    color: rgba(255,255,255,0.75);
                    margin-bottom: 3rem;
                    max-width: 600px;
                    margin-inline: auto;
                    line-height: 1.7;
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
                }
                .hero-subtitle.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* Hero Actions */
                .hero-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-bottom: 3rem;
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s;
                }
                .hero-actions.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                .hero-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 1rem;
                    padding: 1rem 1.75rem;
                    text-decoration: none;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                .hero-btn .btn-icon {
                    font-size: 1.1rem;
                }

                .hero-btn.btn-primary {
                    background: linear-gradient(135deg, #22c1e6 0%, #1aa3c4 100%);
                    color: white;
                    border: none;
                    box-shadow: 0 4px 20px rgba(34, 193, 230, 0.4);
                }
                .hero-btn.btn-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 30px rgba(34, 193, 230, 0.5);
                }
                .hero-btn.btn-primary .btn-shine {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    animation: btn-shine 3s infinite;
                }

                @keyframes btn-shine {
                    0% { left: -100%; }
                    50%, 100% { left: 100%; }
                }

                .hero-btn.btn-glass {
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px);
                    color: white;
                    border: 1px solid rgba(255,255,255,0.2);
                }
                .hero-btn.btn-glass:hover {
                    background: rgba(255,255,255,0.2);
                    transform: translateY(-3px);
                }

                .hero-btn.btn-outline {
                    background: transparent;
                    color: white;
                    border: 1px solid rgba(255,255,255,0.3);
                }
                .hero-btn.btn-outline:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: rgba(255,255,255,0.5);
                    transform: translateY(-3px);
                }

                /* Scroll Indicator */
                .scroll-indicator {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    color: rgba(255,255,255,0.5);
                    font-size: 0.8rem;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 1s;
                }
                .scroll-indicator.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
                .mouse {
                    width: 24px;
                    height: 38px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-radius: 12px;
                    position: relative;
                }
                .wheel {
                    width: 4px;
                    height: 8px;
                    background: rgba(255,255,255,0.5);
                    border-radius: 2px;
                    position: absolute;
                    top: 6px;
                    left: 50%;
                    transform: translateX(-50%);
                    animation: scroll-wheel 2s infinite;
                }

                @keyframes scroll-wheel {
                    0% { opacity: 1; top: 6px; }
                    100% { opacity: 0; top: 20px; }
                }

                /* Responsive */
                @media (max-width: 968px) {
                    .hero-title {
                        font-size: 2.5rem !important;
                    }
                    .hero-subtitle {
                        font-size: 1rem !important;
                        margin-bottom: 2rem !important;
                    }
                    .hero-content {
                        padding: 0 1rem;
                    }
                    .hero-actions {
                        flex-direction: column;
                        align-items: center;
                    }
                    .hero-btn {
                        width: 100%;
                        max-width: 280px;
                        justify-content: center;
                    }
                    .glow-effect {
                        display: none;
                    }
                }

                @media (max-width: 480px) {
                    .hero-title {
                        font-size: 2rem !important;
                    }
                    .hero-badge {
                        font-size: 0.8rem;
                        padding: 0.4rem 1rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;
