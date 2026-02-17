import React, { useState } from 'react';

const CreateCellModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        cellName: '',
        category: 'General',
        leader: '',
        day: 'Wednesday',
        time: '18:00',
        location: '',
        capacity: 15
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Create Cell functionality would be implemented here!', formData);
        onClose();
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        background: '#120D20',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0.5rem',
        color: '#eff3c1',
        fontSize: '0.9rem',
        marginTop: '0.5rem'
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
                maxWidth: '600px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#eff3c1', margin: 0 }}>Create New Cell</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                        <div>
                            <label style={labelStyle}>Cell Name</label>
                            <input
                                type="text"
                                name="cellName"
                                value={formData.cellName}
                                onChange={handleChange}
                                placeholder="e.g. Goshen Alpha"
                                style={inputStyle}
                                required
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option>General</option>
                                <option>Youth</option>
                                <option>Men</option>
                                <option>Women</option>
                                <option>Kids</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Cell Leader</label>
                        <input
                            type="text"
                            name="leader"
                            value={formData.leader}
                            onChange={handleChange}
                            placeholder="Search member..."
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                        <div>
                            <label style={labelStyle}>Meeting Day</label>
                            <select
                                name="day"
                                value={formData.day}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                                <option>Sunday</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Time</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Location / Area</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. Westlands, Nairobi"
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Max Capacity</label>
                        <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'transparent',
                                color: '#94a3b8',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                background: '#22c1e6',
                                color: '#120D20',
                                cursor: 'pointer',
                                fontWeight: '700'
                            }}
                        >
                            Create Cell
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCellModal;
