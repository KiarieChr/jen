import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from '../../context/EventContext';

const EventRegistration = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { events, registerForEvent } = useContext(EventContext);
    const [event, setEvent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (events.length > 0) {
            const foundEvent = events.find(e => e.id === parseInt(eventId));
            if (foundEvent) {
                setEvent(foundEvent);
            } else {
                // Handle event not found
                console.log('Event not found');
            }
        }
    }, [events, eventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (event) {
            registerForEvent(event.id, formData);
            setSubmitted(true);
        }
    };

    if (!event) {
        return <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>Loading Event...</div>;
    }

    if (submitted) {
        return (
            <div style={{
                maxWidth: '600px',
                margin: '4rem auto',
                padding: '2rem',
                background: '#1A1625',
                borderRadius: '1rem',
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center',
                color: '#eff3c1'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎉 Registration Successful!</h2>
                <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>You have successfully registered for <strong>{event.name}</strong>.</p>
                <button onClick={() => navigate('/events')} style={{
                    padding: '0.75rem 1.5rem',
                    background: '#22c1e6',
                    color: '#120D20',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}>Back to Events</button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem' }}>
            <div style={{
                background: '#1A1625',
                padding: '2rem',
                borderRadius: '1rem',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                    <h1 style={{ color: '#eff3c1', margin: 0, fontSize: '2rem' }}>{event.name}</h1>
                    <div style={{ color: '#94a3b8', marginTop: '0.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <span>📅 {event.date} at {event.time}</span>
                        <span>📍 {event.location}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#120D20',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '0.5rem',
                                color: '#eff3c1',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: '#120D20',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    color: '#eff3c1',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: '#120D20',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    color: '#eff3c1',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Notes / Special Requirements (Optional)</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#120D20',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '0.5rem',
                                color: '#eff3c1',
                                fontSize: '1rem',
                                minHeight: '100px',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    <button type="submit" style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: '#22c1e6',
                        color: '#120D20',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Register Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EventRegistration;
