import React from 'react';

const Footer = () => {
    return (
        <footer style={{ background: '#0D0916', padding: '5rem 0 2rem', borderTop: '1px solid var(--surface)' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '4rem',
                    marginBottom: '4rem'
                }}>
                    {/* Brand */}
                    <div style={{ maxWidth: '300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                color: 'white'
                            }}>
                                JE
                            </div>
                            <div>
                                <div style={{ fontWeight: '700', lineHeight: 1, color: 'white' }}>Jesus Enthroned</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>NETWORK</div>
                            </div>
                        </div>
                        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                            A global Christian ministry focused on Kingdom, Unity, and Purpose.
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em' }}>
                            <span style={{ color: '#0ea5e9' }}>KINGDOM</span>
                            <span style={{ color: '#475569' }}>•</span>
                            <span style={{ color: '#0ea5e9' }}>UNITY</span>
                            <span style={{ color: '#475569' }}>•</span>
                            <span style={{ color: '#0ea5e9' }}>PURPOSE</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: 'white', fontWeight: '700', marginBottom: '1.5rem' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#94a3b8' }}>
                            <li><a href="#" style={{ transition: 'color 0.2s' }}>About Us</a></li>
                            <li><a href="#">Sermons</a></li>
                            <li><a href="#">Events</a></li>
                            <li><a href="#">Give</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ color: 'white', fontWeight: '700', marginBottom: '1.5rem' }}>Contact Us</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8' }}>
                            <li style={{ display: 'flex', gap: '0.75rem' }}>
                                <span>📍</span>
                                <span>123 Faith Avenue<br />Nairobi, Kenya</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.75rem' }}>
                                <span>📞</span>
                                <span>+254 700 123 456</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.75rem' }}>
                                <span>✉️</span>
                                <span>info@jesusenthroned.org</span>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 style={{ color: 'white', fontWeight: '700', marginBottom: '1.5rem' }}>Connect</h4>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                            <a href="https://www.youtube.com/@JesusEnthronedNetwork" target="_blank" rel="noopener noreferrer" style={{
                                width: '40px',
                                height: '40px',
                                background: 'var(--surface)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.2rem',
                                transition: 'all 0.2s'
                            }} className="social-icon youtube">
                                <i className="bi bi-youtube"></i>
                            </a>
                            <a href="https://www.facebook.com/JesusEnthronedNetwork" target="_blank" rel="noopener noreferrer" style={{
                                width: '40px',
                                height: '40px',
                                background: 'var(--surface)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.2rem',
                                transition: 'all 0.2s'
                            }} className="social-icon facebook">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://www.instagram.com/JesusEnthronedNetwork" target="_blank" rel="noopener noreferrer" style={{
                                width: '40px',
                                height: '40px',
                                background: 'var(--surface)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.2rem',
                                transition: 'all 0.2s'
                            }} className="social-icon instagram">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="https://twitter.com/JesusEnthroned" target="_blank" rel="noopener noreferrer" style={{
                                width: '40px',
                                height: '40px',
                                background: 'var(--surface)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.2rem',
                                transition: 'all 0.2s'
                            }} className="social-icon twitter">
                                <i className="bi bi-twitter-x"></i>
                            </a>
                            <a href="https://wa.me/254700123456" target="_blank" rel="noopener noreferrer" style={{
                                width: '40px',
                                height: '40px',
                                background: 'var(--surface)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.2rem',
                                transition: 'all 0.2s'
                            }} className="social-icon whatsapp">
                                <i className="bi bi-whatsapp"></i>
                            </a>
                        </div>
                        <div>
                            <p style={{ color: 'white', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Office Hours</p>
                            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                                Monday - Friday<br />
                                9:00 AM - 5:00 PM EAT
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom" style={{
                    borderTop: '1px solid var(--surface)',
                    paddingTop: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    color: '#64748b',
                    fontSize: '0.875rem'
                }}>
                    <div className="footer-copyright">
                        © 2026 Jesus Enthroned Network. All rights reserved.
                        <div style={{ marginTop: '0.25rem' }}>
                            Designed by Visuals Creatives • Powered by RoyalSoftwares
                        </div>
                    </div>
                    <div className="footer-links" style={{ display: 'flex', gap: '2rem' }}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>

            <style>{`
                .social-icon:hover {
                    transform: translateY(-3px);
                }
                .social-icon.youtube:hover {
                    background: #FF0000 !important;
                }
                .social-icon.facebook:hover {
                    background: #1877F2 !important;
                }
                .social-icon.instagram:hover {
                    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888) !important;
                }
                .social-icon.twitter:hover {
                    background: #000000 !important;
                }
                .social-icon.whatsapp:hover {
                    background: #25D366 !important;
                }
                @media (max-width: 768px) {
                    footer {
                        padding: 3rem 0 2rem !important;
                    }
                    .footer-bottom {
                        flex-direction: column !important;
                        text-align: center !important;
                    }
                    .footer-links {
                        justify-content: center !important;
                    }
                    .container {
                        padding: 0 1.5rem !important;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
