import React, { useState, useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import ThemeToggle from '../../components/ThemeToggle';

const TopBar = ({ onToggleSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { theme } = useContext(ThemeContext);
    const [searchOpen, setSearchOpen] = useState(false);
    const [appsDropdown, setAppsDropdown] = useState(false);

    const isLight = theme === 'light';

    // Get user avatar/initials
    const displayName = user?.profile?.full_name || user?.firstname || user?.username || 'User';
    const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const avatarUrl = user?.profile?.avatar || null;

    // Mapping paths to titles
    const getPageTitle = (pathname) => {
        const path = pathname.split('/').pop();
        if (pathname === '/portal/dashboard') return 'Dashboard';
        if (!path) return 'Dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    const quickLinks = [
        { label: 'Calendar', path: '/portal/calendar', icon: '📅' },
        { label: 'Members', path: '/portal/members', icon: '👥' },
        { label: 'Meetings', path: '/portal/meetings', icon: '📋' },
    ];

    return (
        <header className={`topbar-modern ${isLight ? 'light' : 'dark'}`}>
            {/* Left Section */}
            <div className="topbar-left">
                <button className="topbar-menu-btn" onClick={onToggleSidebar}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
                
                <button 
                    className="topbar-search-btn"
                    onClick={() => setSearchOpen(!searchOpen)}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                    </svg>
                </button>

                {/* Apps Dropdown */}
                <div className="topbar-apps-wrapper">
                    <button 
                        className="topbar-apps-btn"
                        onClick={() => setAppsDropdown(!appsDropdown)}
                    >
                        Apps
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    {appsDropdown && (
                        <div className="topbar-dropdown">
                            <Link to="/portal/cells" onClick={() => setAppsDropdown(false)}>
                                <span>🏘️</span> Cells
                            </Link>
                            <Link to="/portal/media" onClick={() => setAppsDropdown(false)}>
                                <span>📹</span> Media
                            </Link>
                            <Link to="/portal/giving" onClick={() => setAppsDropdown(false)}>
                                <span>❤️</span> Giving
                            </Link>
                            <Link to="/portal/users" onClick={() => setAppsDropdown(false)}>
                                <span>👤</span> Users
                            </Link>
                        </div>
                    )}
                </div>

                {/* Quick Links */}
                <nav className="topbar-nav">
                    {quickLinks.map(link => (
                        <Link 
                            key={link.path} 
                            to={link.path}
                            className={location.pathname === link.path ? 'active' : ''}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Right Section */}
            <div className="topbar-right">
                <div className="topbar-theme-toggle">
                    <ThemeToggle />
                </div>

                <button className="topbar-icon-btn topbar-notification">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <span className="notification-badge">3</span>
                </button>

                <button 
                    className="topbar-avatar"
                    onClick={() => navigate('/portal/users/account')}
                    title={displayName}
                >
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={displayName} />
                    ) : (
                        <span>{initials}</span>
                    )}
                </button>
            </div>

            {/* Search Modal */}
            {searchOpen && (
                <div className="topbar-search-modal" onClick={() => setSearchOpen(false)}>
                    <div className="search-box" onClick={e => e.stopPropagation()}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="M21 21l-4.35-4.35"></path>
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search members, events, cells..." 
                            autoFocus
                        />
                        <kbd>ESC</kbd>
                    </div>
                </div>
            )}

            <style>{`
                .topbar-modern {
                    height: 64px;
                    padding: 0 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    transition: all 0.3s ease;
                }

                /* Light Mode TopBar */
                .topbar-modern.light {
                    background: #ffffff;
                    border-bottom: 1px solid #e5e7eb;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                }
                .topbar-modern.light .topbar-menu-btn,
                .topbar-modern.light .topbar-icon-btn {
                    color: #64748b;
                }
                .topbar-modern.light .topbar-menu-btn:hover,
                .topbar-modern.light .topbar-icon-btn:hover {
                    background: #f1f5f9;
                    color: #5d87ff;
                }
                .topbar-modern.light .topbar-search-btn {
                    background: #f8fafc;
                    border-color: #e2e8f0;
                    color: #64748b;
                }
                .topbar-modern.light .topbar-search-btn:hover {
                    background: #f1f5f9;
                    border-color: #5d87ff;
                    color: #5d87ff;
                }
                .topbar-modern.light .topbar-apps-btn {
                    color: #334155;
                }
                .topbar-modern.light .topbar-apps-btn:hover {
                    background: #f1f5f9;
                    color: #5d87ff;
                }
                .topbar-modern.light .topbar-dropdown {
                    background: #ffffff;
                    border-color: #e5e7eb;
                }
                .topbar-modern.light .topbar-dropdown a {
                    color: #334155;
                }
                .topbar-modern.light .topbar-dropdown a:hover {
                    background: #f1f5f9;
                    color: #5d87ff;
                }
                .topbar-modern.light .topbar-nav a {
                    color: #64748b;
                }
                .topbar-modern.light .topbar-nav a:hover,
                .topbar-modern.light .topbar-nav a.active {
                    background: #f1f5f9;
                    color: #5d87ff;
                }
                .topbar-modern.light .topbar-avatar {
                    border-color: #e5e7eb;
                }
                .topbar-modern.light .search-box {
                    background: white;
                }
                .topbar-modern.light .search-box input {
                    color: #334155;
                }
                .topbar-modern.light .search-box kbd {
                    background: #f1f5f9;
                    border-color: #e2e8f0;
                    color: #64748b;
                }

                /* Dark Mode TopBar */
                .topbar-modern.dark {
                    background: #1a1625;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                }
                .topbar-modern.dark .topbar-menu-btn,
                .topbar-modern.dark .topbar-icon-btn {
                    color: rgba(255,255,255,0.6);
                }
                .topbar-modern.dark .topbar-menu-btn:hover,
                .topbar-modern.dark .topbar-icon-btn:hover {
                    background: rgba(255,255,255,0.05);
                    color: #5d87ff;
                }
                .topbar-modern.dark .topbar-search-btn {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.6);
                }
                .topbar-modern.dark .topbar-search-btn:hover {
                    background: rgba(255,255,255,0.08);
                    border-color: #5d87ff;
                    color: #5d87ff;
                }
                .topbar-modern.dark .topbar-apps-btn {
                    color: rgba(255,255,255,0.8);
                }
                .topbar-modern.dark .topbar-apps-btn:hover {
                    background: rgba(255,255,255,0.05);
                    color: #5d87ff;
                }
                .topbar-modern.dark .topbar-dropdown {
                    background: #1e1b2e;
                    border-color: rgba(255,255,255,0.1);
                }
                .topbar-modern.dark .topbar-dropdown a {
                    color: rgba(255,255,255,0.8);
                }
                .topbar-modern.dark .topbar-dropdown a:hover {
                    background: rgba(255,255,255,0.05);
                    color: #5d87ff;
                }
                .topbar-modern.dark .topbar-nav a {
                    color: rgba(255,255,255,0.6);
                }
                .topbar-modern.dark .topbar-nav a:hover,
                .topbar-modern.dark .topbar-nav a.active {
                    background: rgba(255,255,255,0.05);
                    color: #5d87ff;
                }
                .topbar-modern.dark .topbar-avatar {
                    border-color: rgba(255,255,255,0.1);
                }
                .topbar-modern.dark .search-box {
                    background: #1e1b2e;
                }
                .topbar-modern.dark .search-box input {
                    color: #ffffff;
                }
                .topbar-modern.dark .search-box input::placeholder {
                    color: rgba(255,255,255,0.4);
                }
                .topbar-modern.dark .search-box kbd {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.5);
                }

                .topbar-left {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .topbar-menu-btn {
                    display: none;
                    background: transparent;
                    border: none;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .topbar-search-btn {
                    border: 1px solid;
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .topbar-apps-wrapper {
                    position: relative;
                }
                .topbar-apps-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.35rem;
                    background: transparent;
                    border: none;
                    font-weight: 500;
                    font-size: 0.9rem;
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .topbar-dropdown {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    border: 1px solid;
                    border-radius: 0.75rem;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.12);
                    min-width: 180px;
                    padding: 0.5rem;
                    z-index: 200;
                    animation: dropIn 0.2s ease;
                }
                .topbar-dropdown a {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.65rem 0.75rem;
                    text-decoration: none;
                    border-radius: 0.5rem;
                    font-size: 0.9rem;
                    transition: all 0.15s;
                }

                .topbar-nav {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    margin-left: 0.5rem;
                }
                .topbar-nav a {
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 500;
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.5rem;
                    transition: all 0.2s;
                }

                .topbar-right {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .topbar-theme-toggle {
                    transform: scale(0.85);
                }

                .topbar-icon-btn {
                    position: relative;
                    background: transparent;
                    border: none;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .notification-badge {
                    position: absolute;
                    top: 2px;
                    right: 2px;
                    background: #ef4444;
                    color: white;
                    font-size: 0.65rem;
                    font-weight: 600;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .topbar-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #5d87ff, #6c63ff);
                    border: 2px solid;
                    cursor: pointer;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-size: 0.85rem;
                    transition: all 0.2s;
                }
                .topbar-avatar:hover {
                    border-color: #5d87ff;
                    transform: scale(1.05);
                }
                .topbar-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .topbar-search-modal {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.4);
                    backdrop-filter: blur(4px);
                    z-index: 1000;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    padding-top: 10vh;
                    animation: fadeIn 0.2s ease;
                }
                .search-box {
                    border-radius: 1rem;
                    padding: 1rem 1.25rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    width: 100%;
                    max-width: 500px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.2);
                }
                .search-box input {
                    flex: 1;
                    border: none;
                    outline: none;
                    font-size: 1rem;
                    background: transparent;
                }
                .search-box input::placeholder {
                    color: #94a3b8;
                }
                .search-box kbd {
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.75rem;
                    border: 1px solid;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes dropIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 968px) {
                    .topbar-menu-btn {
                        display: flex !important;
                    }
                    .topbar-nav {
                        display: none;
                    }
                    .topbar-apps-wrapper {
                        display: none;
                    }
                }

                @media (max-width: 480px) {
                    .topbar-modern {
                        padding: 0 1rem;
                    }
                    .topbar-search-btn {
                        display: none;
                    }
                }
            `}</style>
        </header>
    );
};

export default TopBar;
