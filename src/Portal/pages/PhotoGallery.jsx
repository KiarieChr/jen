import React from 'react';
import PhotoAlbumGrid from '../components/media/PhotoAlbumGrid';

const PhotoGallery = () => {
    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '2rem' }}>Ministry Gallery</h1>
            <PhotoAlbumGrid />
        </div>
    );
};

export default PhotoGallery;
