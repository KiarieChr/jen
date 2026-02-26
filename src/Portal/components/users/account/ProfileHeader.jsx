import React from 'react';

const ProfileHeader = ({ onEditProfilePic, onEditProfile }) => {
    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            overflow: 'hidden',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-color)'
        }}>
            {/* Cover Image */}
            <div style={{
                height: '180px',
                background: 'linear-gradient(to right, #2a9d8f, #69b578)', // Approximating the green gradient
                position: 'relative'
            }}></div>

            <div style={{ padding: '0 2rem 2rem 2rem', position: 'relative' }}>
                {/* Profile Image & Action */}
                <div style={{
                    position: 'absolute',
                    top: '-60px',
                    left: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        background: 'var(--primary)',
                        borderRadius: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        fontWeight: '600',
                        color: 'var(--bg-color)',
                        border: '4px solid #1A1625'
                    }}>
                        TM
                    </div>
                    <button
                        onClick={onEditProfilePic}
                        style={{
                            background: '#4f46e5', // Indigo color from image
                            color: 'var(--text-color)',
                            border: 'none',
                            padding: '0.4rem 1rem',
                            borderRadius: '0.4rem',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                        }}>
                        📷 Edit Profile Image
                    </button>
                </div>

                {/* Profile Details */}
                <div style={{ marginLeft: '140px', paddingTop: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', margin: '0 0 0.5rem 0' }}>Timothy Mutisya</h1>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ color: 'var(--text-color)', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    About Me <span onClick={onEditProfile} style={{ color: '#6366f1', fontSize: '0.75rem', cursor: 'pointer' }}>✎ Edit</span>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.2rem 0', maxWidth: '600px' }}>
                                    Passionate about serving the community and technical administration.
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-color)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <span>📅</span> Born on September 10th, 2001 <span onClick={onEditProfile} style={{ color: '#6366f1', marginLeft: '2px', cursor: 'pointer' }}>✎</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <span>🔧</span> Administrator, General Admin, Member
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <span>📍</span> Nairobi <span onClick={onEditProfile} style={{ color: '#6366f1', marginLeft: '2px', cursor: 'pointer' }}>✎</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-color)', marginTop: '0.5rem' }}>
                                <span>🗓️</span> Joined On August 5th, 2025
                            </div>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <span style={{
                                background: '#4f46e5', // Indigo
                                color: 'var(--text-color)',
                                padding: '0.3rem 0.8rem',
                                borderRadius: '2rem',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem'
                            }}>
                                ✓ Active
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
