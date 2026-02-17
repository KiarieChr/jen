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
                            {['📺', 'fb', 'ig', 'tw'].map((icon, i) => (
                                <a key={i} href="#" style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'var(--surface)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    transition: 'background 0.2s'
                                }}>
                                    {icon}
                                </a>
                            ))}
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

                <div style={{
                    borderTop: '1px solid var(--surface)',
                    paddingTop: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    color: '#64748b',
                    fontSize: '0.875rem'
                }}>
                    <div>
                        © 2026 Jesus Enthroned Network. All rights reserved.
                        <div style={{ marginTop: '0.25rem' }}>
                            Designed by Visuals Creatives • Powered by RoyalSoftwares
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
