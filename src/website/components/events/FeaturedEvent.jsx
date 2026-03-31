import React, { useState, useEffect } from 'react';
import { API_BASE_URL as API_URL } from '../../../services/api';

const FeaturedEvent = () => {
    const [event, setEvent] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Fetch featured event
                const featuredRes = await fetch(`${API_URL}get_upcoming_events.php?featured=1`);
                const featuredData = await featuredRes.json();
                if (featuredData.success && featuredData.event) {
                    setEvent(featuredData.event);
                }

                // Fetch more upcoming events (skip featured)
                const upcomingRes = await fetch(`${API_URL}get_upcoming_events.php?limit=4`);
                const upcomingData = await upcomingRes.json();
                if (upcomingData.success && upcomingData.events) {
                    // Skip first one if it's the featured event
                    setUpcomingEvents(upcomingData.events.slice(1, 4));
                }
            } catch (error) {
                console.error('Failed to fetch events:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const defaultImage = "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000&auto=format&fit=crop";

    if (loading) {
        return (
            <section style={{ padding: '4rem 0 2rem' }}>
                <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
                    <p style={{ color: '#64748b' }}>Loading events...</p>
                </div>
            </section>
        );
    }

    if (!event) {
        return (
            <section style={{ padding: '4rem 0 2rem' }}>
                <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#120D20' }}>
                        Upcoming Events
                    </h2>
                    <p style={{ color: '#64748b', marginTop: '1rem' }}>
                        No upcoming events at the moment. Check back soon!
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section style={{ padding: '4rem 0 2rem' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#120D20' }}>
                        Upcoming Events
                    </h2>
                    <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
                        Don't miss these upcoming gatherings and programs.
                    </p>
                </div>

                {/* Featured Event */}
                <div style={{
                    background: 'white',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
                    flexWrap: 'wrap',
                    marginBottom: '2rem'
                }}>
                    {/* Image Side */}
                    <div style={{ flex: '1 1 300px', minHeight: '300px' }}>
                        <img
                            src={event.image || defaultImage}
                            alt={event.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    {/* Content Side */}
                    <div style={{ flex: '1 1 300px', padding: '3rem' }}>
                        {event.days_until <= 7 && event.days_until > 0 && (
                            <span style={{
                                display: 'inline-block',
                                background: '#22c1e6',
                                color: 'white',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                marginBottom: '1rem'
                            }}>
                                {event.days_until === 1 ? 'Tomorrow!' : `${event.days_until} days away`}
                            </span>
                        )}
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#120D20', marginBottom: '1rem', lineHeight: 1.3 }}>
                            {event.name}
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                            {event.description || 'Join us for this exciting event!'}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22c1e6', fontSize: '0.9rem', fontWeight: '500' }}>
                                <span>📅</span> {event.date_formatted}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                                <span>🕒</span> {event.time_formatted}
                            </div>
                            {event.venue && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                                    <span>📍</span> {event.venue}
                                </div>
                            )}
                            {!event.is_free && event.facilitation_fee && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22c1e6', fontSize: '0.9rem', fontWeight: '600' }}>
                                    <span>💰</span> KES {event.facilitation_fee.toLocaleString()}
                                </div>
                            )}
                        </div>

                        <a
                            href={`/events/register/${event.id}`}
                            style={{
                                display: 'inline-block',
                                background: 'transparent',
                                border: '1px solid #120D20',
                                padding: '0.6rem 2rem',
                                borderRadius: '9999px',
                                fontWeight: '600',
                                color: '#120D20',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textDecoration: 'none'
                            }}
                            onMouseOver={(e) => { e.target.style.background = '#120D20'; e.target.style.color = 'white'; }}
                            onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#120D20'; }}
                        >
                            Register Now
                        </a>
                    </div>
                </div>

                {/* More Upcoming Events */}
                {upcomingEvents.length > 0 && (
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#120D20', marginBottom: '1.5rem' }}>
                            More Events
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {upcomingEvents.map((evt) => (
                                <div key={evt.id} style={{
                                    background: 'white',
                                    borderRadius: '1rem',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                                }}>
                                    <div style={{ height: '150px', overflow: 'hidden' }}>
                                        <img
                                            src={evt.image || defaultImage}
                                            alt={evt.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={{ padding: '1.25rem' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#120D20', marginBottom: '0.5rem' }}>
                                            {evt.name}
                                        </h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22c1e6', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                                            <span>📅</span> {evt.date_formatted}
                                        </div>
                                        <a
                                            href={`/events/register/${evt.id}`}
                                            style={{
                                                color: '#22c1e6',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            Register →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedEvent;
