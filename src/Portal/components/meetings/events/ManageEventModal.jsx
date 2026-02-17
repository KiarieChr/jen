import React, { useState } from 'react';

const ManageEventModal = ({ event, onClose, onUpdate }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [formData, setFormData] = useState({ ...event });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSave = () => {
        onUpdate(formData);
        onClose();
    };

    const copyLink = () => {
        const url = `${window.location.origin}/events/${event.id}/register`;
        navigator.clipboard.writeText(url);
        alert('Registration link copied to clipboard!');
    };

    const tabStyle = (isActive) => ({
        padding: '0.75rem 1.5rem',
        cursor: 'pointer',
        borderBottom: isActive ? '2px solid #22c1e6' : '2px solid transparent',
        color: isActive ? '#eff3c1' : '#94a3b8',
        background: 'transparent',
        border: 'none',
        fontSize: '1rem',
        fontWeight: '600'
    });

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        background: '#120D20',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0.5rem',
        color: '#eff3c1',
        fontSize: '0.9rem',
        marginTop: '0.4rem'
    };

    const labelStyle = {
        color: '#94a3b8',
        fontSize: '0.85rem',
        fontWeight: '500'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100
        }}>
            <div style={{
                background: '#1A1625',
                padding: '2rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '700px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#eff3c1', margin: 0 }}>Manage Event: {event.name}</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
                    <button style={tabStyle(activeTab === 'overview')} onClick={() => setActiveTab('overview')}>Overview</button>
                    <button style={tabStyle(activeTab === 'registration')} onClick={() => setActiveTab('registration')}>Registration</button>
                    <button style={tabStyle(activeTab === 'registrants')} onClick={() => setActiveTab('registrants')}>Registrants ({event.registrations?.length || 0})</button>
                </div>

                {activeTab === 'overview' && (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Event Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={labelStyle}>Date</label>
                                <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Time</label>
                                <input type="time" name="time" value={formData.time} onChange={handleChange} style={inputStyle} />
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Location</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} style={inputStyle} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                            <button onClick={handleSave} style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: '#22c1e6',
                                color: '#120D20',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}>Save Changes</button>
                        </div>
                    </div>
                )}

                {activeTab === 'registration' && (
                    <div>
                        <div style={{ background: 'rgba(34, 193, 230, 0.1)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid rgba(34, 193, 230, 0.2)' }}>
                            <h4 style={{ color: '#22c1e6', margin: '0 0 0.5rem 0' }}>Shareable Link</h4>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Share this link with attendees to let them register for the event.</p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input type="text" value={`${window.location.origin}/events/${event.id}/register`} readOnly style={{ ...inputStyle, marginTop: 0 }} />
                                <button onClick={copyLink} style={{
                                    background: '#22c1e6',
                                    color: '#120D20',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    padding: '0 1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}>Copy</button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <label style={{ color: '#eff3c1', fontWeight: '500' }}>Registration Status: </label>
                            <select name="status" value={formData.status} onChange={handleChange} style={{ ...inputStyle, width: 'auto', marginTop: 0 }}>
                                <option value="Upcoming">Upcoming (Closed)</option>
                                <option value="Registration Open">Open</option>
                                <option value="Closed">Closed</option>
                            </select>
                            <button onClick={handleSave} style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: '#22c1e6',
                                color: '#120D20',
                                fontWeight: '600',
                                cursor: 'pointer',
                                marginLeft: 'auto'
                            }}>Update Status</button>
                        </div>
                    </div>
                )}

                {activeTab === 'registrants' && (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#eff3c1', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                    <th style={{ padding: '0.75rem' }}>Name</th>
                                    <th style={{ padding: '0.75rem' }}>Email</th>
                                    <th style={{ padding: '0.75rem' }}>Phone</th>
                                    <th style={{ padding: '0.75rem' }}>Date Registered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {event.registrations && event.registrations.length > 0 ? (
                                    event.registrations.map((reg, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '0.75rem' }}>{reg.name}</td>
                                            <td style={{ padding: '0.75rem' }}>{reg.email}</td>
                                            <td style={{ padding: '0.75rem' }}>{reg.phone}</td>
                                            <td style={{ padding: '0.75rem' }}>{new Date(reg.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No registrations yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageEventModal;
