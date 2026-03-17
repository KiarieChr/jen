import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DevotionalSection from '../components/DevotionalSection';
import AnnouncementsSection from '../components/AnnouncementsSection';
import SermonsSection from '../components/SermonsSection';
import EventsSection from '../components/EventsSection';
import PartnerSection from '../components/PartnerSection';
import Footer from '../components/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'http://jesusenthroned_net.local/api/';

const Home = () => {
    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const response = await fetch(`${API_URL}get_homepage_data.php`);
                const data = await response.json();
                if (data.success) {
                    setHomeData(data.data);
                }
            } catch (err) {
                console.error('Failed to load homepage data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchHomeData();
    }, []);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Hero data={homeData?.hero} />
            <DevotionalSection />
            <AnnouncementsSection
                announcements={homeData?.announcements}
                calendarSchedule={homeData?.calendar_schedule}
                loading={loading}
            />
            <SermonsSection sermons={homeData?.sermons} loading={loading} />
            <EventsSection event={homeData?.featured_event} loading={loading} />
            <PartnerSection />
            <Footer />
        </div>
    );
};

export default Home;
