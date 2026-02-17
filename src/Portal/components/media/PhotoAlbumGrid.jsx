import React from 'react';

const AlbumCard = ({ title, count, cover }) => (
    <div style={{
        background: '#1A1625',
        borderRadius: '1rem',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)',
        cursor: 'pointer'
    }}>
        <div style={{ height: '200px', background: `url(${cover})`, backgroundSize: 'cover' }}></div>
        <div style={{ padding: '1rem' }}>
            <h3 style={{ color: '#eff3c1', fontSize: '1.1rem', margin: '0 0 0.3rem 0' }}>{title}</h3>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{count} Photos</div>
        </div>
    </div>
);

const PhotoAlbumGrid = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <AlbumCard title="Youth Conference 2025" count={142} cover="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=400" />
            <AlbumCard title="Christmas Service" count={86} cover="https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=400" />
            <AlbumCard title="Community Outreach" count={54} cover="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=400" />
        </div>
    );
};

export default PhotoAlbumGrid;
