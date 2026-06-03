import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutHero from '../components/about/AboutHero';
import VisionMission from '../components/VisionMission';
import ValuesSection from '../components/ValuesSection';
import TeamSection from '../components/TeamSection';
import ImpactSection from '../components/about/ImpactSection';

const About = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <AboutHero />
            <VisionMission />
            <ValuesSection />
            <ImpactSection />
            <TeamSection />
            <Footer />
        </div>
    );
};

export default About;
