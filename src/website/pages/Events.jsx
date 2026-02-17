import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventsHero from '../components/events/EventsHero';
import FeaturedEvent from '../components/events/FeaturedEvent';
import PastEvents from '../components/events/PastEvents';

const Events = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <EventsHero />

            {/* Content wrapper with light background */}
            <div style={{ background: '#eff3c1', flex: 1 }}>
                <FeaturedEvent />
                <PastEvents />
            </div>

            <Footer />
        </div>
    );
};

export default Events;
