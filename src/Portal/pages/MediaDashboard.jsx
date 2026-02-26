import React, { useState } from 'react';
import MediaStatsCards from '../components/media/MediaStatsCards';
import LatestSermonHero from '../components/media/LatestSermonHero';
import VideoGrid from '../components/media/VideoGrid';
import AudioSermons from './AudioSermons';
import VideoSermons from './VideoSermons';
import PhotoGallery from './PhotoGallery';
import QuickAccessCards from '../components/media/QuickAccessCards';
import UploadAudioModal from '../components/media/UploadAudioModal';
import UploadVideoModal from '../components/media/UploadVideoModal';
import UploadPhotosModal from '../components/media/UploadPhotosModal';

const MediaDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isUploadAudioModalOpen, setIsUploadAudioModalOpen] = useState(false);
    const [isUploadVideoModalOpen, setIsUploadVideoModalOpen] = useState(false);
    const [isUploadPhotosModalOpen, setIsUploadPhotosModalOpen] = useState(false);

    // Tab Navigation Component
    const TabNav = () => (
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
            {[
                { id: 'dashboard', icon: '⚡', label: 'Dashboard' },
                { id: 'audio', icon: '🎤', label: 'Audio Sermons' },
                { id: 'video', icon: '📹', label: 'Video Sermons' },
                { id: 'photos', icon: '🖼️', label: 'Photo Gallery' },
                { id: 'management', icon: '⚙️', label: 'Management' }
            ].map(tab => (
                <div
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                        padding: '0.6rem 1rem',
                        background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                        color: activeTab === tab.id ? 'var(--bg-color)' : 'var(--text-muted)',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: activeTab === tab.id ? '700' : '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s'
                    }}
                >
                    <span>{tab.icon}</span> {tab.label}
                </div>
            ))}
        </div>
    );

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            <TabNav />

            {activeTab === 'dashboard' && (
                <>
                    <LatestSermonHero />
                    <MediaStatsCards />
                    <QuickAccessCards onNavigate={setActiveTab} />
                </>
            )}

            {activeTab === 'audio' && <AudioSermons />}
            {activeTab === 'video' && <VideoSermons />}
            {activeTab === 'photos' && <PhotoGallery />}

            {activeTab === 'management' && (
                <div style={{
                    background: 'var(--surface-1)',
                    border: '1px solid #22c1e6',
                    borderRadius: '1rem',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <h2 style={{ color: 'var(--primary)' }}>Media Management</h2>
                    <p style={{ color: 'var(--text-color)', marginBottom: '2rem' }}>Admin controls for uploading and managing content.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <button
                            onClick={() => setIsUploadAudioModalOpen(true)}
                            style={{ background: 'var(--primary)', color: 'var(--bg-color)', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            + Upload Audio
                        </button>
                        <button
                            onClick={() => setIsUploadVideoModalOpen(true)}
                            style={{ background: 'var(--primary)', color: 'var(--bg-color)', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            + Add Video
                        </button>
                        <button
                            onClick={() => setIsUploadPhotosModalOpen(true)}
                            style={{ background: 'var(--primary)', color: 'var(--bg-color)', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            + Upload Photos
                        </button>
                    </div>
                </div>
            )}

            {isUploadAudioModalOpen && <UploadAudioModal onClose={() => setIsUploadAudioModalOpen(false)} />}
            {isUploadVideoModalOpen && <UploadVideoModal onClose={() => setIsUploadVideoModalOpen(false)} />}
            {isUploadPhotosModalOpen && <UploadPhotosModal onClose={() => setIsUploadPhotosModalOpen(false)} />}
        </div>
    );
};



export default MediaDashboard;
