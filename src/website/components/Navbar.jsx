import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/index.css';

const Navbar = () => {
    const location = useLocation();
    const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
    const [mobileConnectOpen, setMobileConnectOpen] = useState(false);

    const mobileLinks = [
        { path: '/', label: 'Home', icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>) },
        { 
            label: 'About', 
            icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>),
            isAboutDropdown: true
        },
        { 
            label: 'Connect', 
            icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
            isConnectDropdown: true
        },
        { 
            label: 'Resources', 
            icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V3.5A2.5 2.5 0 0 1 6.5 1h13.5v16H6.5a2.5 2.5 0 0 0-2.5 2.5z" /></svg>),
            isResourcesDropdown: true
        },
        { path: '/events', label: 'Events', icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>) },
        { path: '/partners', label: 'Partners', icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>) }
    ];

    const navLinks = [
        { path: '/', label: 'Home', icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>) },
        { 
            label: 'About Us', 
            icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>),
            dropdown: [
                { path: '/about', label: 'Our Story', desc: 'Who we are, our vision, and history', icon: 'ℹ️' },
                { path: '/contact', label: 'Talk to Us', desc: 'Get in touch, ask questions, or send a message', icon: '📞' },
                { path: '/partner-give', label: 'Giving', desc: 'Partner with us through financial support', icon: '❤' }
            ]
        },
        {
            label: 'Connect',
            icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
            dropdown: [
                { path: '/membership', label: 'Membership', desc: 'Join the covenant community and pathway', icon: '🤝' },
                { path: '/cells', label: 'Chapters & Cells', desc: 'Find local cell groups and chapter fellowships', icon: '🏠' },
                { path: '/dockets', label: 'Dockets & Ministries', desc: 'Explore leadership departments and service arms', icon: '📋' }
            ]
        },
        { 
            label: 'Resources', 
            icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V3.5A2.5 2.5 0 0 1 6.5 1h13.5v16H6.5a2.5 2.5 0 0 0-2.5 2.5z" /></svg>),
            dropdown: [
                { path: '/sermons', label: 'Sermons & Teachings', desc: 'Watch and listen to transformational messages', icon: '🎧' },
                { path: '/devotionals', label: 'Daily Devotionals', desc: 'Scripture reflections & daily guidance', icon: '📖' },
                { path: '/talks', label: 'Kingdom Talks', desc: 'Discussions on transforming the 7 spheres', icon: '💬' },
                { path: '/blogs', label: 'Insights & Blogs', desc: 'Articles on leadership, ethics, and values', icon: '✍️' }
            ]
        },
        { path: '/events', label: 'Events', icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>) },
        { path: '/partners', label: 'Partners', icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>) }
    ];

    return (
        <>
            {/* Top Navigation Bar */}
            <nav className="main-navbar" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 5%',
                background: 'var(--nav-bg, #120D20)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                position: 'sticky',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                borderBottom: '1px solid var(--border-color, rgba(255,255,255,0.08))',
                transition: 'all 0.3s ease'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit', zIndex: 1001 }}>
                    <img
                        src="/favicon.ico"
                        alt="Logo"
                        style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid var(--primary, #22c1e6)',
                            padding: '1px'
                        }}
                    />
                    <div style={{ lineHeight: '1.2' }}>
                        <div style={{ fontWeight: '800', fontSize: '15px', color: 'var(--text-color)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Jesus Enthroned</div>
                        <div style={{ fontSize: '9px', color: 'var(--primary)', letterSpacing: '0.25em', fontWeight: '600' }}>NETWORK</div>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="nav-links-desktop" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    {navLinks.map((link) => {
                        if (link.dropdown) {
                            const isDropdownActive = link.dropdown.some(d => location.pathname === d.path);
                            return (
                                <div key={link.label} className="nav-dropdown-wrapper">
                                    <button 
                                        className={`nav-link-item nav-dropdown-trigger ${isDropdownActive ? 'active-link' : ''}`}
                                        style={{
                                            color: isDropdownActive ? 'var(--primary)' : 'var(--text-color)',
                                            fontWeight: isDropdownActive ? '700' : '500',
                                            fontSize: '14.5px',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            padding: 0
                                        }}
                                    >
                                        {link.label}
                                        <svg className="dropdown-chevron-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu Container */}
                                    <div className="nav-dropdown-menu">
                                        <div className="nav-dropdown-menu-inner">
                                            {link.dropdown.map((subLink) => (
                                                <Link 
                                                    key={subLink.path} 
                                                    to={subLink.path} 
                                                    className="dropdown-menu-item"
                                                >
                                                    <span className="dropdown-item-icon">{subLink.icon}</span>
                                                    <div className="dropdown-item-info">
                                                        <span className="dropdown-item-title">{subLink.label}</span>
                                                        <span className="dropdown-item-desc">{subLink.desc}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    color: isActive ? 'var(--primary)' : 'var(--text-color)',
                                    fontWeight: isActive ? '700' : '500',
                                    fontSize: '14.5px',
                                    position: 'relative',
                                    textDecoration: 'none',
                                    transition: 'all 0.25s ease',
                                    opacity: isActive ? 1 : 0.85
                                }}
                                className={`nav-link-item ${isActive ? 'active-link' : ''}`}
                            >
                                {link.label}
                                {isActive && (
                                    <span style={{
                                        position: 'absolute',
                                        bottom: '-6px',
                                        left: 0,
                                        width: '100%',
                                        height: '2.5px',
                                        background: 'var(--primary)',
                                        borderRadius: '2px',
                                        boxShadow: '0 0 12px var(--primary)'
                                    }} />
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="nav-actions-desktop" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <Link to="/give" className="btn btn-outline btn-hover-effect" style={{ 
                        padding: '0.55rem 1.35rem', 
                        fontSize: '0.85rem', 
                        fontWeight: '600',
                        color: 'var(--text-color)', 
                        borderColor: 'rgba(255,255,255,0.15)', 
                        textDecoration: 'none',
                        borderRadius: '6px',
                        borderWidth: '1.5px',
                        borderStyle: 'solid',
                        transition: 'all 0.25s'
                    }}>
                        ❤ Give
                    </Link>
                    <Link to="/portal" className="btn btn-primary btn-hover-scale" style={{ 
                        padding: '0.6rem 1.4rem', 
                        fontSize: '0.85rem', 
                        fontWeight: '600',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        background: 'linear-gradient(135deg, var(--primary) 0%, #1aa3c4 100%)',
                        border: 'none',
                        color: 'white',
                        boxShadow: '0 4px 15px rgba(34, 193, 230, 0.25)',
                        transition: 'all 0.25s'
                    }}>
                        Member Portal
                    </Link>
                </div>

                {/* Mobile Top Actions */}
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
                {mobileLinks.map((link) => {
                    if (link.isAboutDropdown) {
                        const isDropdownActive = location.pathname === '/about' || location.pathname === '/contact' || location.pathname === '/partner-give' || location.hash === '#team';
                        return (
                            <button
                                key={link.label}
                                onClick={() => {
                                    setMobileAboutOpen(!mobileAboutOpen);
                                    setMobileResourcesOpen(false);
                                    setMobileConnectOpen(false);
                                }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '4px',
                                    background: 'none',
                                    border: 'none',
                                    color: mobileAboutOpen || isDropdownActive ? 'var(--primary)' : 'var(--text-muted)',
                                    padding: '0.25rem 0.5rem',
                                    cursor: 'pointer',
                                    minWidth: '60px',
                                    transition: 'all 0.2s',
                                    position: 'relative'
                                }}
                            >
                                <div style={{
                                    transform: mobileAboutOpen || isDropdownActive ? 'translateY(-2px)' : 'translateY(0)',
                                    transition: 'transform 0.2s'
                                }}>
                                    {link.icon}
                                </div>
                                <span style={{
                                    fontSize: '0.65rem',
                                    fontWeight: mobileAboutOpen || isDropdownActive ? '700' : '500',
                                }}>
                                    {link.label}
                                </span>
                            </button>
                        );
                    }

                    if (link.isConnectDropdown) {
                        const isDropdownActive = ['/membership', '/cells', '/dockets'].includes(location.pathname);
                        return (
                            <button
                                key={link.label}
                                onClick={() => {
                                    setMobileConnectOpen(!mobileConnectOpen);
                                    setMobileAboutOpen(false);
                                    setMobileResourcesOpen(false);
                                }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '4px',
                                    background: 'none',
                                    border: 'none',
                                    color: mobileConnectOpen || isDropdownActive ? 'var(--primary)' : 'var(--text-muted)',
                                    padding: '0.25rem 0.5rem',
                                    cursor: 'pointer',
                                    minWidth: '60px',
                                    transition: 'all 0.2s',
                                    position: 'relative'
                                }}
                            >
                                <div style={{
                                    transform: mobileConnectOpen || isDropdownActive ? 'translateY(-2px)' : 'translateY(0)',
                                    transition: 'transform 0.2s'
                                }}>
                                    {link.icon}
                                </div>
                                <span style={{
                                    fontSize: '0.65rem',
                                    fontWeight: mobileConnectOpen || isDropdownActive ? '700' : '500',
                                }}>
                                    {link.label}
                                </span>
                            </button>
                        );
                    }

                    if (link.isResourcesDropdown) {
                        const isDropdownActive = ['/sermons', '/devotionals', '/talks', '/blogs'].includes(location.pathname);
                        return (
                            <button
                                key={link.label}
                                onClick={() => {
                                    setMobileResourcesOpen(!mobileResourcesOpen);
                                    setMobileAboutOpen(false);
                                    setMobileConnectOpen(false);
                                }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '4px',
                                    background: 'none',
                                    border: 'none',
                                    color: mobileResourcesOpen || isDropdownActive ? 'var(--primary)' : 'var(--text-muted)',
                                    padding: '0.25rem 0.5rem',
                                    cursor: 'pointer',
                                    minWidth: '60px',
                                    transition: 'all 0.2s',
                                    position: 'relative'
                                }}
                            >
                                <div style={{
                                    transform: mobileResourcesOpen || isDropdownActive ? 'translateY(-2px)' : 'translateY(0)',
                                    transition: 'transform 0.2s'
                                }}>
                                    {link.icon}
                                </div>
                                <span style={{
                                    fontSize: '0.65rem',
                                    fontWeight: mobileResourcesOpen || isDropdownActive ? '700' : '500',
                                }}>
                                    {link.label}
                                </span>
                            </button>
                        );
                    }

                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => {
                                setMobileAboutOpen(false);
                                setMobileResourcesOpen(false);
                                setMobileConnectOpen(false);
                            }}
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
                                {link.icon}
                            </div>
                            <span style={{
                                fontSize: '0.65rem',
                                fontWeight: isActive ? '700' : '500',
                            }}>
                                {link.label}
                            </span>
                        </Link>
                    );
                })}
            </div>

            {/* Mobile Resources Bottom Sheet */}
            {mobileResourcesOpen && (
                <>
                    <div 
                        className="mobile-sheet-backdrop" 
                        onClick={() => setMobileResourcesOpen(false)}
                    />
                    <div className="mobile-resources-sheet">
                        <div className="mobile-resources-sheet-header">
                            <span>Network Resources</span>
                            <button className="close-sheet-btn" onClick={() => setMobileResourcesOpen(false)}>×</button>
                        </div>
                        <div className="mobile-resources-sheet-grid">
                            {navLinks.find(l => l.label === 'Resources').dropdown.map((item) => (
                                <Link 
                                    key={item.path} 
                                    to={item.path} 
                                    className="mobile-sheet-item" 
                                    onClick={() => setMobileResourcesOpen(false)}
                                >
                                    <span className="sheet-item-icon">{item.icon}</span>
                                    <span className="sheet-item-title">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Mobile About Bottom Sheet */}
            {mobileAboutOpen && (
                <>
                    <div 
                        className="mobile-sheet-backdrop" 
                        onClick={() => setMobileAboutOpen(false)}
                    />
                    <div className="mobile-resources-sheet">
                        <div className="mobile-resources-sheet-header">
                            <span>About Us</span>
                            <button className="close-sheet-btn" onClick={() => setMobileAboutOpen(false)}>×</button>
                        </div>
                        <div className="mobile-resources-sheet-grid">
                            <Link 
                                to="/about" 
                                className="mobile-sheet-item" 
                                onClick={() => setMobileAboutOpen(false)}
                            >
                                <span className="sheet-item-icon">ℹ️</span>
                                <span className="sheet-item-title">About Us</span>
                            </Link>
                            <Link 
                                to="/contact" 
                                className="mobile-sheet-item" 
                                onClick={() => setMobileAboutOpen(false)}
                            >
                                <span className="sheet-item-icon">📞</span>
                                <span className="sheet-item-title">Talk to Us</span>
                            </Link>
                            <Link 
                                to="/partner-give" 
                                className="mobile-sheet-item" 
                                onClick={() => setMobileAboutOpen(false)}
                            >
                                <span className="sheet-item-icon">❤</span>
                                <span className="sheet-item-title">Giving</span>
                            </Link>
                        </div>
                    </div>
                </>
            )}

            {/* Mobile Connect Bottom Sheet */}
            {mobileConnectOpen && (
                <>
                    <div 
                        className="mobile-sheet-backdrop" 
                        onClick={() => setMobileConnectOpen(false)}
                    />
                    <div className="mobile-resources-sheet">
                        <div className="mobile-resources-sheet-header">
                            <span>Connect & Engage</span>
                            <button className="close-sheet-btn" onClick={() => setMobileConnectOpen(false)}>×</button>
                        </div>
                        <div className="mobile-resources-sheet-grid">
                            <Link 
                                to="/membership" 
                                className="mobile-sheet-item" 
                                onClick={() => setMobileConnectOpen(false)}
                            >
                                <span className="sheet-item-icon">🤝</span>
                                <span className="sheet-item-title">Membership</span>
                            </Link>
                            <Link 
                                to="/cells" 
                                className="mobile-sheet-item" 
                                onClick={() => setMobileConnectOpen(false)}
                            >
                                <span className="sheet-item-icon">🏠</span>
                                <span className="sheet-item-title">Chapters & Cells</span>
                            </Link>
                            <Link 
                                to="/dockets" 
                                className="mobile-sheet-item" 
                                onClick={() => setMobileConnectOpen(false)}
                            >
                                <span className="sheet-item-icon">📋</span>
                                <span className="sheet-item-title">Dockets & Ministries</span>
                            </Link>
                        </div>
                    </div>
                </>
            )}

            <style>{`
                .nav-link-item {
                    transition: all 0.3s ease !important;
                }
                .nav-link-item:hover {
                    color: var(--primary) !important;
                    opacity: 1 !important;
                    transform: translateY(-1px);
                }
                .nav-link-item:not(.active-link)::after {
                    content: '';
                    position: absolute;
                    bottom: -6px;
                    left: 0;
                    width: 100%;
                    height: 2.5px;
                    background: var(--primary);
                    border-radius: 2px;
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.3s ease;
                    box-shadow: 0 0 8px var(--primary);
                }
                .nav-link-item:not(.active-link):hover::after {
                    transform: scaleX(1);
                    transform-origin: left;
                }

                /* Desktop Dropdown Menu */
                .nav-dropdown-wrapper {
                    position: relative;
                    padding-bottom: 12px;
                    margin-bottom: -12px;
                }

                .dropdown-chevron-icon {
                    transition: transform 0.3s ease;
                }

                .nav-dropdown-wrapper:hover .dropdown-chevron-icon {
                    transform: rotate(180deg);
                }

                .nav-dropdown-menu {
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%) translateY(10px);
                    width: 320px;
                    background: rgba(26, 22, 37, 0.95);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    padding: 8px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    z-index: 1010;
                }

                .nav-dropdown-wrapper:hover .nav-dropdown-menu {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(-50%) translateY(0);
                }

                .dropdown-menu-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    padding: 12px 16px;
                    border-radius: 10px;
                    text-decoration: none;
                    color: #ffffff;
                    transition: all 0.25s ease;
                }

                .dropdown-menu-item:hover {
                    background: rgba(255, 255, 255, 0.04);
                    transform: translateX(4px);
                }

                .dropdown-item-icon {
                    font-size: 1.25rem;
                    background: rgba(255, 255, 255, 0.03);
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .dropdown-item-info {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .dropdown-item-title {
                    font-size: 13.5px;
                    font-weight: 700;
                    color: #ffffff;
                    transition: color 0.2s ease;
                }

                .dropdown-menu-item:hover .dropdown-item-title {
                    color: var(--primary);
                }

                .dropdown-item-desc {
                    font-size: 11px;
                    color: var(--text-muted);
                    line-height: 1.4;
                }

                /* Mobile Resources Sheet */
                .mobile-sheet-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    z-index: 999;
                }

                .mobile-resources-sheet {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: #161226;
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 20px 20px 0 0;
                    padding: 24px;
                    padding-bottom: calc(24px + env(safe-area-inset-bottom));
                    z-index: 1001;
                    box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5);
                    animation: slideUpSheet 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .mobile-resources-sheet-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .mobile-resources-sheet-header span {
                    font-size: 16px;
                    font-weight: 700;
                    color: #ffffff;
                }

                .close-sheet-btn {
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    font-size: 24px;
                    line-height: 1;
                    cursor: pointer;
                }

                .mobile-resources-sheet-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .mobile-sheet-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    padding: 16px;
                    border-radius: 12px;
                    text-decoration: none;
                    color: #ffffff;
                    transition: background 0.2s ease;
                }

                .mobile-sheet-item:active {
                    background: rgba(255, 255, 255, 0.06);
                }

                .sheet-item-icon {
                    font-size: 1.25rem;
                }

                .sheet-item-title {
                    font-size: 13px;
                    font-weight: 600;
                }

                @keyframes slideUpSheet {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }

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
