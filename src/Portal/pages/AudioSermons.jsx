import React from 'react';
import AudioPlayer from '../components/media/AudioPlayer';

const AudioSermons = () => {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', marginBottom: '2rem' }}>Audio Sermons Archive</h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <input
                    type="text"
                    placeholder="Search sermons..."
                    style={{
                        flex: 1,
                        background: 'var(--surface-1)',
                        border: '1px solid var(--border-color)',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '0.5rem',
                        color: 'var(--text-color)'
                    }}
                />
                <select style={{ background: 'var(--surface-1)', border: '1px solid var(--border-color)', color: 'var(--text-color)', padding: '0 1rem', borderRadius: '0.5rem' }}>
                    <option>All Speakers</option>
                </select>
                <select style={{ background: 'var(--surface-1)', border: '1px solid var(--border-color)', color: 'var(--text-color)', padding: '0 1rem', borderRadius: '0.5rem' }}>
                    <option>All Topics</option>
                </select>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <AudioPlayer title="Walking in Divine Purpose" preacher="Rev. John Doe" duration="45:20" />
                <AudioPlayer title="The Art of Waiting" preacher="Pst. Jane Smith" duration="38:15" />
                <AudioPlayer title="Understanding Grace" preacher="Rev. John Doe" duration="52:00" />
                <AudioPlayer title="Foundation of Faith" preacher="Guest Speaker" duration="41:30" />
            </div>
        </div>
    );
};

export default AudioSermons;
