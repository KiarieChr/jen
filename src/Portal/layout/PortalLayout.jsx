import React, { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { ThemeContext } from '../../context/ThemeContext';

const PortalLayout = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-color)' }}>
            {/* Sidebar */}
            <div className="sidebar-wrapper">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '260px', minHeight: '100vh' }} className="portal-main">
                <TopBar />

                <main style={{
                    flex: 1,
                    padding: '2rem',
                    overflowY: 'auto'
                }}>
                    <Outlet />
                </main>
            </div>

            <style>{`
                /* Portal Specific Responsive Styles */
                @media (max-width: 968px) {
                    .portal-main {
                        margin-left: 0 !important;
                    }
                    .sidebar-wrapper {
                        position: fixed;
                        z-index: 1050;
                        transform: translateX(-100%);
                        transition: transform 0.3s ease-in-out;
                    }
                    .sidebar-wrapper.mobile-visible {
                        transform: translateX(0);
                    }
                    .mobile-toggle-portal {
                        display: block !important;
                    }
                }
            `}</style>

            {theme === 'light' && (
                <style>{`
                    :root, body, html {
                        --bg-color: #f1f5f9 !important;
                        --surface-1: #ffffff !important;
                        --surface-2: #e2e8f0 !important;
                        --text-color: #0f172a !important;
                        --text-muted: #64748b !important;
                        --primary: #0ea5e9 !important;
                        --secondary: #9333ea !important;
                        --nav-bg: #ffffff !important;
                        --border-color: rgba(0, 0, 0, 0.1) !important;
                        --card-bg: #ffffff !important;
                        --btn-text: #0f172a !important;
                        --btn-bg: #e2e8f0 !important;
                        background-color: var(--bg-color) !important;
                        color: var(--text-color) !important;
                    }
                    /* Force the Sidebar and TopBar to retain dark mode colors */
                    .sidebar-wrapper, header {
                        --bg-color: #120D20 !important;
                        --surface-1: #1A1625 !important;
                        --surface-2: #2a2438 !important;
                        --text-color: #f8fafc !important;
                        --text-muted: #94a3b8 !important;
                        --nav-bg: #120D20 !important;
                        --border-color: rgba(255, 255, 255, 0.05) !important;
                        --card-bg: #1A1625 !important;
                        color: var(--text-color) !important;
                    }
                    .sidebar-wrapper {
                        background-color: var(--nav-bg) !important;
                    }
                `}</style>
            )}
        </div>
    );
};

export default PortalLayout;
