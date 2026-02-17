import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SermonsSection from '../components/SermonsSection';
import EventsSection from '../components/EventsSection';
import PartnerSection from '../components/PartnerSection';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Hero />
            <SermonsSection />
            <EventsSection />
            <PartnerSection />
            <Footer />
        </div>
    );
};

export default Home;
