import React, { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { ThemeContext } from '../../context/ThemeContext';

const PortalLayout = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-color)' }} data-theme={theme}>
            {/* Sidebar */}
            <div className="sidebar-wrapper">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '260px' }} className="portal-main">
                <TopBar />

                <main style={{
                    flex: 1,
                    padding: '2rem',
                    background: 'var(--bg-color)',
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
        </div>
    );
};

export default PortalLayout;
