import React from 'react';
import Navbar from '../../website/components/Navbar';
import Footer from '../../website/components/Footer';
import PortalHero from '../components/PortalHero';
import AuthSection from '../components/AuthSection';

const Portal = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <PortalHero />
            <AuthSection />
            <Footer />
        </div>
    );
};

export default Portal;
