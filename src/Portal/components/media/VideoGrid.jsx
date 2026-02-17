import React from 'react';

const VideoCard = ({ title, date, thumbnail }) => (
    <div style={{
        background: '#1A1625',
        borderRadius: '1rem',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)',
        cursor: 'pointer',
        transition: 'transform 0.2s'
    }}>
        <div style={{ height: '160px', background: `url(${thumbnail})`, backgroundSize: 'cover', position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(0,0,0,0.6)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid white',
                    color: 'white'
                }}>▶</div>
            </div>
        </div>
        <div style={{ padding: '1rem' }}>
            <h3 style={{ color: '#eff3c1', fontSize: '1rem', margin: '0 0 0.5rem 0' }}>{title}</h3>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{date}</div>
        </div>
    </div>
);

const VideoGrid = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <VideoCard title="Faith That Moves Mountains" date="Feb 02, 2026" thumbnail="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=400" />
            <VideoCard title="The Power of Prayer" date="Jan 26, 2026" thumbnail="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=400" />
            <VideoCard title="Community & Fellowship" date="Jan 19, 2026" thumbnail="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=400" />
        </div>
    );
};

export default VideoGrid;
