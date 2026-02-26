import React from 'react';
import VideoGrid from '../components/media/VideoGrid';

const VideoSermons = () => {
    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '2rem' }}>Video Library</h1>
            <VideoGrid />
            <div style={{ marginTop: '2rem' }}>
                <VideoGrid />
            </div>
        </div>
    );
};

export default VideoSermons;
