import React, { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { ThemeContext } from '../../context/ThemeContext';

const PortalLayout = () => {
    const { theme } = useContext(ThemeContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    const isLight = theme === 'light';

    return (
        <div className={`portal-wrapper ${isLight ? 'light-mode' : 'dark-mode'}`}>
            {/* Backdrop for mobile */}
            {sidebarOpen && (
                <div
                    className="sidebar-backdrop"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

            {/* Main Content Area */}
            <div className="portal-main">
                <TopBar onToggleSidebar={toggleSidebar} />

                <main className="portal-content">
                    <Outlet />
                </main>
            </div>

            <style>{`
                .portal-wrapper {
                    display: flex;
                    min-height: 100vh;
                    transition: background 0.3s ease;
                }

                /* Light Mode - Content Area */
                .portal-wrapper.light-mode {
                    background: #f5f7fb;
                }
                .portal-wrapper.light-mode .portal-main {
                    background: #f5f7fb;
                }
                .portal-wrapper.light-mode .portal-content {
                    background: #f5f7fb;
                }

                /* Dark Mode - Content Area */
                .portal-wrapper.dark-mode {
                    background: #0f0d1a;
                }
                .portal-wrapper.dark-mode .portal-main {
                    background: #0f0d1a;
                }
                .portal-wrapper.dark-mode .portal-content {
                    background: #0f0d1a;
                }

                .sidebar-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 1040;
                    backdrop-filter: blur(4px);
                }

                .portal-main {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    margin-left: 270px;
                    min-height: 100vh;
                    transition: background 0.3s ease;
                }

                .portal-content {
                    flex: 1;
                    padding: 1.5rem 2rem;
                    overflow-y: auto;
                    transition: background 0.3s ease;
                }

                /* Portal Responsive Styles */
                @media (max-width: 968px) {
                    .portal-main {
                        margin-left: 0 !important;
                        overflow-x: hidden !important;
                    }
                    .portal-content {
                        padding: 1rem !important;
                    }
                }
            `}</style>

            {/* Sidebar always dark - independent of theme */}
            <style>{`
                .portal-sidebar {
                    --bg-color: #1e1b2e !important;
                    --surface-1: #1A1625 !important;
                    --surface-2: #2a2438 !important;
                    --text-color: #ffffff !important;
                    --text-muted: rgba(255,255,255,0.5) !important;
                    --nav-bg: #1e1b2e !important;
                    --border-color: rgba(255, 255, 255, 0.06) !important;
                }
            `}</style>
        </div>
    );
};

export default PortalLayout;
