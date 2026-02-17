import React from 'react';
import { useLocation } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';

const TopBar = () => {
    const location = useLocation();

    // Mapping paths to titles
    const getPageTitle = (pathname) => {
        const path = pathname.split('/').pop();
        if (pathname === '/portal/dashboard') return 'Dashboard';
        if (!path) return 'Dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <header style={{
            height: '70px',
            background: 'var(--nav-bg)', // Adapts to theme
            borderBottom: '1px solid var(--border-color)',
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <ThemeToggle />
                <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Portal / {getPageTitle(location.pathname)}</div>
                    <h2 style={{ color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '700', lineHeight: 1.2 }}>{getPageTitle(location.pathname)}</h2>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button style={{ position: 'relative', background: 'transparent', color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                    🔔
                    <span style={{
                        position: 'absolute', top: -2, right: -2,
                        width: '8px', height: '8px',
                        background: 'var(--primary)', borderRadius: '50%'
                    }} />
                </button>
            </div>
        </header>
    );
};

export default TopBar;
