import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon, label, path, active, hovered, setHovered, subItems, isOpen, onToggle }) => {
    return (
        <div style={{ marginBottom: '0.25rem' }}>
            <div
                onClick={subItems ? onToggle : undefined}
                onMouseEnter={() => setHovered(path)}
                onMouseLeave={() => setHovered(null)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    color: active ? 'var(--primary)' : 'var(--text-color)',
                    background: active ? 'rgba(34, 193, 230, 0.1)' : (hovered === path ? 'var(--surface-2)' : 'transparent'),
                    transition: 'all 0.2s ease',
                    borderLeft: active ? '3px solid var(--primary)' : '3px solid transparent',
                    cursor: subItems ? 'pointer' : 'default'
                }}
            >
                {subItems ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                        <span style={{ fontSize: '1.25rem' }}>{icon}</span>
                        <span style={{ fontWeight: active ? '600' : '400' }}>{label}</span>
                    </div>
                ) : (
                    <Link to={path} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, textDecoration: 'none', color: 'inherit' }}>
                        <span style={{ fontSize: '1.25rem' }}>{icon}</span>
                        <span style={{ fontWeight: active ? '600' : '400' }}>{label}</span>
                    </Link>
                )}

                {subItems && (
                    <span style={{ fontSize: '0.7rem', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                )}
            </div>

            {/* Sub-items Dropdown */}
            {subItems && isOpen && (
                <div style={{ paddingLeft: '3.25rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {subItems.map(sub => (
                        <Link
                            key={sub.path}
                            to={sub.path}
                            style={{
                                textDecoration: 'none',
                                color: 'var(--text-muted)',
                                fontSize: '0.9rem',
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                display: 'block',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                        >
                            {sub.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

const Sidebar = () => {
    const location = useLocation();
    const [hovered, setHovered] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (path) => {
        setOpenMenu(openMenu === path ? null : path);
    };

    const menuItems = [
        { icon: '📊', label: 'Dashboard', path: '/portal/dashboard' },
        {
            icon: '🏘️',
            label: 'Cell Management',
            path: '/portal/cell-management', // Parent path identifier
            subItems: [
                { label: 'Cells', path: '/portal/cells' },
                { label: 'Assign Members', path: '/portal/cells/assign' },
                { label: 'My Cells', path: '/portal/my-cell' } // Linking back to dashboard tab for visual consistancy? Or new page? Using Dashboard tab seems mostly likely given context. But user asked for modules. Let's stick to explicit routes for now, or link to dashboard with hash/query if it was just a view.
                // Re-reading: "create the follwing semi modules". 
                // Let's assume new routes for "Cells" and "Assign". "My Cells" might be the dashboard tab.
                // Let's just use generic routes:
                // { label: 'My Cells', path: '/portal/my-cells' }
            ]
        },
        {
            icon: '📅',
            label: 'Meetings',
            path: '/portal/meetings-module',
            subItems: [
                { label: 'View Meetings', path: '/portal/meetings' },
                { label: 'Events', path: '/portal/meetings/events' },
                { label: 'Meetings Attendance', path: '/portal/meetings/attendance' }
            ]
        },
        { icon: '👥', label: 'Members', path: '/portal/members' },
        {
            icon: '🙏',
            label: 'Prayers',
            path: '/portal/prayers-module',
            subItems: [
                { label: 'Fasting & Commitment', path: '/portal/prayers/fasting' },
                { label: 'Prophetic Instructions', path: '/portal/prayers/prophetic' },
                { label: 'Communications', path: '/portal/prayers/communications' }
            ]
        },
        { icon: '📹', label: 'Media & Sermons', path: '/portal/media' },
        { icon: '❤', label: 'Contributions', path: '/portal/giving' },
        {
            icon: '👤',
            label: 'Users',
            path: '/portal/users-module',
            subItems: [
                { label: 'Users', path: '/portal/users' },
                { label: 'My Account', path: '/portal/users/account' }
            ]
        },
        { icon: '🛡️', label: 'Roles & Permissions', path: '/portal/roles' },
    ];

    // Mobile styles logic
    const sidebarStyle = {
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '260px',
        background: 'var(--nav-bg)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1050
    };

    return (
        <aside className="portal-sidebar" style={sidebarStyle}>
            {/* Brand Header */}
            <div style={{
                padding: '2rem 1.5rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
            }}>
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
                    <div style={{ color: 'var(--text-color)', fontWeight: '700', fontSize: '1rem', lineHeight: 1 }}>Jesus Enthroned</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.05em', marginTop: '4px' }}>NETWORK PORTAL</div>
                </div>
            </div>

            {/* Navigation Menu */}
            <div style={{ flex: 1, padding: '0 1rem', overflowY: 'auto' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', paddingLeft: '1rem', fontWeight: '600' }}>
                    Main Menu
                </div>
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.path}
                        {...item}
                        active={location.pathname.startsWith(item.path)}
                        hovered={hovered}
                        setHovered={setHovered}
                        isOpen={openMenu === item.path}
                        onToggle={() => toggleMenu(item.path)}
                    />
                ))}
            </div>

            {/* Footer Section */}
            <div style={{
                padding: '1.5rem',
                borderTop: '1px solid var(--border-color)',
                background: 'var(--surface-2)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '36px', height: '36px',
                        background: 'var(--surface-2)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text-color)'
                    }}>
                        JD
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ color: 'var(--text-color)', fontSize: '0.9rem', fontWeight: '600', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>John Doe</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Administrator</div>
                    </div>
                    <button style={{
                        background: 'transparent',
                        color: '#ef4444',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        border: 'none'
                    }} title="Logout">
                        ⏻
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
