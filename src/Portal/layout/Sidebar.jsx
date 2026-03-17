import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// SVG Icon Components for cleaner sidebar
const Icons = {
    Dashboard: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"></rect>
            <rect x="14" y="3" width="7" height="7" rx="1"></rect>
            <rect x="14" y="14" width="7" height="7" rx="1"></rect>
            <rect x="3" y="14" width="7" height="7" rx="1"></rect>
        </svg>
    ),
    Calendar: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
    ),
    Cells: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    ),
    Meetings: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    ),
    Members: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    ),
    Prayers: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
        </svg>
    ),
    Media: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
    ),
    Devotionals: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            <line x1="12" y1="6" x2="12" y2="10"></line>
            <line x1="10" y1="8" x2="14" y2="8"></line>
        </svg>
    ),
    Contributions: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
    ),
    Users: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
    ),
    Roles: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
    ),
    Settings: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
    ),
    Database: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
    ),
    ChevronDown: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    ),
    Logout: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
    ),
    Close: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    ),
    Dot: () => (
        <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
            <circle cx="3" cy="3" r="3"></circle>
        </svg>
    )
};

const SidebarItem = ({ icon: Icon, label, path, active, hovered, setHovered, subItems, isOpen, onToggle, onClose }) => {
    const location = useLocation();

    return (
        <div className="sidebar-item">
            <div
                onClick={subItems ? onToggle : undefined}
                onMouseEnter={() => setHovered(path)}
                onMouseLeave={() => setHovered(null)}
                className={`sidebar-item-content ${active ? 'active' : ''} ${hovered === path ? 'hovered' : ''}`}
            >
                {subItems ? (
                    <div className="sidebar-item-link">
                        <span className="sidebar-icon"><Icon /></span>
                        <span className="sidebar-label">{label}</span>
                        <span className={`sidebar-chevron ${isOpen ? 'open' : ''}`}>
                            <Icons.ChevronDown />
                        </span>
                    </div>
                ) : (
                    <Link to={path} onClick={onClose} className="sidebar-item-link">
                        <span className="sidebar-icon"><Icon /></span>
                        <span className="sidebar-label">{label}</span>
                    </Link>
                )}
            </div>

            {/* Sub-items Dropdown */}
            {subItems && (
                <div className={`sidebar-submenu ${isOpen ? 'open' : ''}`}>
                    {subItems.map(sub => (
                        sub.external ? (
                            <a
                                key={sub.path}
                                href="http://jesusenthroned_net.local/db/sync.php"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClose}
                                className="sidebar-submenu-item"
                            >
                                <Icons.Dot />
                                <span>{sub.label}</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 'auto', opacity: 0.5 }}>
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </a>
                        ) : (
                            <Link
                                key={sub.path}
                                to={sub.path}
                                onClick={onClose}
                                className={`sidebar-submenu-item ${location.pathname === sub.path ? 'active' : ''}`}
                            >
                                <Icons.Dot />
                                <span>{sub.label}</span>
                            </Link>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const [hovered, setHovered] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const { user, logout } = useAuth();

    const displayName = user?.profile?.full_name || user?.firstname || user?.first_name || user?.username || 'User';
    const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const avatarUrl = user?.profile?.avatar
        ? (user.profile.avatar.startsWith('http') ? user.profile.avatar : `${user.profile.avatar}`)
        : null;
    const userRole = user?.is_staff ? 'Administrator' : (user?.profile?.role || user?.employment_status || 'Member');

    const toggleMenu = (path) => {
        setOpenMenu(openMenu === path ? null : path);
    };

    const menuItems = [
        { icon: Icons.Dashboard, label: 'Dashboard', path: '/portal/dashboard' },
        { icon: Icons.Calendar, label: 'Calendar', path: '/portal/calendar' },
        {
            icon: Icons.Cells,
            label: 'Cell Management',
            path: '/portal/cell-management',
            subItems: [
                { label: 'Cells', path: '/portal/cells' },
                { label: 'Assign Members', path: '/portal/cells/assign' },
                { label: 'My Cells', path: '/portal/my-cell' }
            ]
        },
        {
            icon: Icons.Meetings,
            label: 'Meetings',
            path: '/portal/meetings-module',
            subItems: [
                { label: 'View Meetings', path: '/portal/meetings' },
                { label: 'Events', path: '/portal/meetings/events' },
                { label: 'Attendance', path: '/portal/meetings/attendance' }
            ]
        },
        { icon: Icons.Members, label: 'Members', path: '/portal/members' },
        {
            icon: Icons.Prayers,
            label: 'Prayers',
            path: '/portal/prayers-module',
            subItems: [
                { label: 'Fasting & Commitment', path: '/portal/prayers/fasting' },
                { label: 'Prophetic Instructions', path: '/portal/prayers/prophetic' },
                { label: 'Communications', path: '/portal/prayers/communications' }
            ]
        },
        { icon: Icons.Media, label: 'Media & Sermons', path: '/portal/media' },
        { icon: Icons.Devotionals, label: 'Devotionals', path: '/portal/devotionals' },
        { icon: Icons.Contributions, label: 'Contributions', path: '/portal/giving' },
        {
            icon: Icons.Users,
            label: 'Users',
            path: '/portal/users-module',
            subItems: [
                { label: 'Users', path: '/portal/users' },
                { label: 'My Account', path: '/portal/users/account' }
            ]
        },
        { icon: Icons.Roles, label: 'Roles & Permissions', path: '/portal/roles' },
    ];

    const adminItems = [
        {
            icon: Icons.Settings,
            label: 'Settings',
            path: '/portal/settings-module',
            subItems: [
                { label: 'Sync Database', path: '/portal/sync-database', external: true }
            ]
        },
    ];

    return (
        <aside className={`portal-sidebar ${isOpen ? 'mobile-visible' : ''}`}>
            {/* Brand Header */}
            <div className="sidebar-brand">
                <div className="sidebar-brand-content">
                    <div className="sidebar-logo">
                        <img src="/favicon.ico" alt="Logo" />
                    </div>
                    <div className="sidebar-brand-text">
                        <span className="brand-name">Jesus Enthroned</span>
                        <span className="brand-tagline">NETWORK PORTAL</span>
                    </div>
                </div>
                <button className="sidebar-close-btn" onClick={onClose}>
                    <Icons.Close />
                </button>
            </div>

            {/* Navigation Menu */}
            <nav className="sidebar-nav">
                <div className="sidebar-section-title">Main Menu</div>
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.path}
                        {...item}
                        active={location.pathname === item.path || location.pathname.startsWith(item.path + '/')}
                        hovered={hovered}
                        setHovered={setHovered}
                        isOpen={openMenu === item.path}
                        onToggle={() => toggleMenu(item.path)}
                        onClose={onClose}
                    />
                ))}

                {/* Admin Section */}
                <div className="sidebar-section-title" style={{ marginTop: '1.5rem' }}>Administration</div>
                {adminItems.map((item) => (
                    <SidebarItem
                        key={item.path}
                        {...item}
                        active={location.pathname === item.path || location.pathname.startsWith(item.path + '/')}
                        hovered={hovered}
                        setHovered={setHovered}
                        isOpen={openMenu === item.path}
                        onToggle={() => toggleMenu(item.path)}
                        onClose={onClose}
                    />
                ))}
            </nav>

            {/* User Footer */}
            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <div
                        className="sidebar-user-avatar"
                        style={{
                            backgroundImage: avatarUrl ? `url(${avatarUrl})` : 'none',
                        }}
                    >
                        {!avatarUrl && initials}
                    </div>
                    <div className="sidebar-user-info">
                        <span className="sidebar-user-name">{displayName}</span>
                        <span className="sidebar-user-role">{userRole}</span>
                    </div>
                    <button className="sidebar-logout-btn" onClick={logout} title="Logout">
                        <Icons.Logout />
                    </button>
                </div>
            </div>

            <style>{`
                .portal-sidebar {
                    position: fixed;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 270px;
                    background: linear-gradient(180deg, #1e1b2e 0%, #171424 100%);
                    display: flex;
                    flex-direction: column;
                    z-index: 1050;
                    transform: translateX(0);
                    transition: transform 0.3s ease-in-out;
                    box-shadow: 4px 0 20px rgba(0,0,0,0.15);
                }

                /* Brand Section */
                .sidebar-brand {
                    padding: 1.25rem 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                }
                .sidebar-brand-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .sidebar-logo {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #5d87ff 0%, #6c63ff 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }
                .sidebar-logo img {
                    width: 28px;
                    height: 28px;
                    border-radius: 6px;
                    object-fit: cover;
                }
                .sidebar-brand-text {
                    display: flex;
                    flex-direction: column;
                }
                .brand-name {
                    color: #ffffff;
                    font-weight: 700;
                    font-size: 1rem;
                    line-height: 1.2;
                }
                .brand-tagline {
                    color: rgba(255,255,255,0.5);
                    font-size: 0.65rem;
                    letter-spacing: 0.1em;
                    margin-top: 2px;
                }
                .sidebar-close-btn {
                    display: none;
                    background: rgba(255,255,255,0.05);
                    border: none;
                    color: rgba(255,255,255,0.6);
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .sidebar-close-btn:hover {
                    background: rgba(255,255,255,0.1);
                    color: #ffffff;
                }

                /* Navigation */
                .sidebar-nav {
                    flex: 1;
                    padding: 1rem 0.75rem;
                    overflow-y: auto;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255,255,255,0.1) transparent;
                }
                .sidebar-nav::-webkit-scrollbar {
                    width: 4px;
                }
                .sidebar-nav::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                    border-radius: 4px;
                }
                .sidebar-section-title {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.4);
                    letter-spacing: 0.1em;
                    padding: 0.5rem 1rem;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }

                /* Sidebar Items */
                .sidebar-item {
                    margin-bottom: 2px;
                }
                .sidebar-item-content {
                    border-radius: 0.625rem;
                    transition: all 0.2s ease;
                    cursor: pointer;
                }
                .sidebar-item-content:hover,
                .sidebar-item-content.hovered {
                    background: rgba(255,255,255,0.05);
                }
                .sidebar-item-content.active {
                    background: rgba(93, 135, 255, 0.15);
                }
                .sidebar-item-link {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1rem;
                    color: rgba(255,255,255,0.7);
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 500;
                    transition: color 0.2s;
                }
                .sidebar-item-content:hover .sidebar-item-link,
                .sidebar-item-content.hovered .sidebar-item-link {
                    color: rgba(255,255,255,0.9);
                }
                .sidebar-item-content.active .sidebar-item-link {
                    color: #5d87ff;
                }
                .sidebar-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 22px;
                    height: 22px;
                    opacity: 0.8;
                }
                .sidebar-item-content.active .sidebar-icon {
                    opacity: 1;
                }
                .sidebar-label {
                    flex: 1;
                }
                .sidebar-chevron {
                    display: flex;
                    transition: transform 0.25s ease;
                    opacity: 0.5;
                }
                .sidebar-chevron.open {
                    transform: rotate(180deg);
                }

                /* Submenu */
                .sidebar-submenu {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease;
                    padding-left: 2.25rem;
                }
                .sidebar-submenu.open {
                    max-height: 300px;
                }
                .sidebar-submenu-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.6rem 1rem;
                    color: rgba(255,255,255,0.5);
                    text-decoration: none;
                    font-size: 0.85rem;
                    border-radius: 0.5rem;
                    transition: all 0.2s;
                }
                .sidebar-submenu-item:hover {
                    color: rgba(255,255,255,0.8);
                    background: rgba(255,255,255,0.03);
                }
                .sidebar-submenu-item.active {
                    color: #5d87ff;
                }
                .sidebar-submenu-item svg {
                    opacity: 0.4;
                }
                .sidebar-submenu-item.active svg {
                    opacity: 1;
                    fill: #5d87ff;
                }

                /* Footer / User Section */
                .sidebar-footer {
                    padding: 1rem;
                    border-top: 1px solid rgba(255,255,255,0.06);
                    background: rgba(0,0,0,0.2);
                }
                .sidebar-user {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.5rem;
                    border-radius: 0.75rem;
                    background: rgba(255,255,255,0.03);
                }
                .sidebar-user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #5d87ff 0%, #6c63ff 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                    font-weight: 600;
                    font-size: 0.85rem;
                    background-size: cover;
                    background-position: center;
                    border: 2px solid rgba(255,255,255,0.1);
                    flex-shrink: 0;
                }
                .sidebar-user-info {
                    flex: 1;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                }
                .sidebar-user-name {
                    color: #ffffff;
                    font-size: 0.875rem;
                    font-weight: 600;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .sidebar-user-role {
                    color: rgba(255,255,255,0.5);
                    font-size: 0.75rem;
                }
                .sidebar-logout-btn {
                    background: transparent;
                    border: none;
                    color: rgba(255,255,255,0.4);
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .sidebar-logout-btn:hover {
                    background: rgba(239, 68, 68, 0.15);
                    color: #ef4444;
                }

                /* Mobile Responsive */
                @media (max-width: 968px) {
                    .portal-sidebar {
                        transform: translateX(-100%);
                    }
                    .portal-sidebar.mobile-visible {
                        transform: translateX(0);
                    }
                    .sidebar-close-btn {
                        display: flex;
                    }
                }
            `}</style>
        </aside>
    );
};

export default Sidebar;
