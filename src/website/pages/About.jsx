import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutHero from '../components/about/AboutHero';
import MissionVisionSection from '../components/about/MissionVisionSection';
import ValuesSection from '../components/about/ValuesSection';
import ImpactSection from '../components/about/ImpactSection';
import TeamSection from '../components/about/TeamSection';

const About = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <AboutHero />
            <MissionVisionSection />
            <ValuesSection />
            <ImpactSection />
            <TeamSection />
            <Footer />
        </div>
    );
};

export default About;
