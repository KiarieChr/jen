import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/index.css';

const Navbar = () => {
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home', icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>) },
        { path: '/about', label: 'About', icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>) },
        { path: '/sermons', label: 'Sermons', icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>) },
        { path: '/events', label: 'Events', icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>) },
        { path: '/contact', label: 'Contact', icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>) }
    ];

    return (
        <>
            {/* Top Navigation Bar */}
            <nav className="main-navbar" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 2rem',
                background: 'var(--nav-bg, #120D20)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                position: 'fixed',
                left: 0,
                right: 0,
                top: 0,
                zIndex: 1000,
                borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit', zIndex: 1001 }}>
                    <img
                        src="/favicon.ico"
                        alt="Logo"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }}
                    />
                    <div>
                        <div style={{ fontWeight: '700', lineHeight: 1 }}>Jesus Enthroned</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NETWORK</div>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="nav-links-desktop" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {navLinks.map(({ path, label }) => {
                        const isActive = location.pathname === path;
                        return (
                            <Link
                                key={path}
                                to={path}
                                style={{
                                    color: isActive ? 'var(--primary)' : 'var(--text-color)',
                                    fontWeight: isActive ? '700' : '400',
                                    position: 'relative',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s'
                                }}
                            >
                                {label}
                                {isActive && (
                                    <span style={{
                                        position: 'absolute',
                                        bottom: '-4px',
                                        left: 0,
                                        width: '100%',
                                        height: '2px',
                                        background: 'var(--primary)',
                                        boxShadow: '0 0 10px var(--primary)'
                                    }} />
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="nav-actions-desktop" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Link to="/give" className="btn btn-outline btn-hover-effect" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', color: 'var(--text-color)', borderColor: 'var(--primary)', textDecoration: 'none' }}>
                        ❤ Give
                    </Link>
                    <Link to="/portal" className="btn btn-primary btn-hover-scale" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', textDecoration: 'none' }}>Member Portal</Link>
                </div>

                {/* Mobile Top Actions (Visible only on mobile) */}
                <div className="nav-actions-mobile" style={{ display: 'none', gap: '0.75rem', alignItems: 'center' }}>
                    <Link to="/give" style={{
                        color: 'white',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '36px',
                        height: '36px',
                        background: 'var(--primary)',
                        borderRadius: '50%'
                    }}>
                        ❤
                    </Link>
                    <Link to="/portal" style={{
                        color: 'var(--text-color)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '36px',
                        height: '36px',
                        background: 'var(--surface-2)',
                        borderRadius: '50%'
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </Link>
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <div className="mobile-bottom-nav" style={{
                display: 'none',
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: '#120D20',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.5rem 0.5rem',
                paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))',
                zIndex: 1000,
                justifyContent: 'space-around',
                alignItems: 'center',
                boxShadow: '0 -4px 20px rgba(0,0,0,0.3)'
            }}>
                {navLinks.map(({ path, label, icon }) => {
                    const isActive = location.pathname === path;
                    return (
                        <Link
                            key={path}
                            to={path}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px',
                                textDecoration: 'none',
                                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '8px',
                                minWidth: '60px',
                                transition: 'all 0.2s',
                                position: 'relative'
                            }}
                        >
                            <div style={{
                                transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                                transition: 'transform 0.2s'
                            }}>
                                {icon}
                            </div>
                            <span style={{
                                fontSize: '0.65rem',
                                fontWeight: isActive ? '700' : '500',
                            }}>
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </div>

            <style>{`
                @media (max-width: 968px) {
                    .main-navbar {
                        background: #000000 !important;
                        background-color: #000000 !important;
                        backdrop-filter: none !important;
                        -webkit-backdrop-filter: none !important;
                        padding: 0.75rem 1.25rem !important;
                    }
                    .nav-links-desktop, .nav-actions-desktop {
                        display: none !important;
                    }
                    .nav-actions-mobile {
                        display: flex !important;
                    }
                    .mobile-bottom-nav {
                        display: flex !important;
                    }
                    body {
                        padding-bottom: 70px !important;
                    }
                }
            `}</style>
        </>
    );
};

export default Navbar;
