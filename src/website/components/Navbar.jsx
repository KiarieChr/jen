import { Link, useLocation } from 'react-router-dom';
import '../styles/index.css';

const Navbar = () => {
    const location = useLocation();
    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 2rem',
            background: 'var(--nav-bg)',
            backdropFilter: 'blur(10px)',
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            zIndex: 1000,
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit' }}>
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

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="nav-links">
                {['/', '/about', '/sermons', '/events', '/contact'].map((path) => {
                    const isActive = location.pathname === path;
                    const labels = {
                        '/': 'Home',
                        '/about': 'About Us',
                        '/sermons': 'Sermons',
                        '/events': 'Events',
                        '/contact': 'Contact'
                    };
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
                            {labels[path]}
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

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link to="/give" className="btn btn-outline btn-hover-effect" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', color: 'var(--text-color)', borderColor: 'var(--primary)', textDecoration: 'none' }}>
                    ❤ Give
                </Link>
                <Link to="/portal" className="btn btn-primary btn-hover-scale" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', textDecoration: 'none' }}>Member Portal</Link>
                <Link to="/sermons" className="btn btn-outline btn-hover-effect" style={{ padding: '0.5rem 1.25rem', display: 'flex', alignItems: 'center', color: 'var(--text-color)', textDecoration: 'none' }}>
                    <span style={{ marginRight: '0.5rem' }}>▶</span> Watch Live
                </Link>

            </div>
        </nav>
    );
};

export default Navbar;
