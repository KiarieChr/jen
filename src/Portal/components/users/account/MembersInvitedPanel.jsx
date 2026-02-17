import React, { useState } from 'react';

const MembersInvitedPanel = () => {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    // Mock Data
    const invitedMembers = [
        { id: 1, name: 'Alice Cooper', contact: 'alice@example.com', status: 'Joined', date: 'Jan 15, 2026' },
        { id: 2, name: 'Bob Marley', contact: '0712 345 678', status: 'Pending', date: 'Feb 01, 2026' },
        { id: 3, name: 'Charlie Puth', contact: 'charlie@example.com', status: 'bounced', date: 'Dec 10, 2025' }
    ];

    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>Members I Invited</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.3rem' }}>Track the people you have introduced to the community.</p>
                </div>
                <button
                    onClick={() => setIsInviteModalOpen(true)}
                    style={{
                        background: '#22c1e6',
                        color: '#120D20',
                        border: 'none',
                        borderRadius: '0.4rem',
                        padding: '0.6rem 1.2rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <span>+</span> Invite New Member
                </button>
            </div>

            {/* List of Invited Members */}
            <div style={{ display: 'grid', gap: '1rem' }}>
                {invitedMembers.length > 0 ? (
                    invitedMembers.map(member => (
                        <div key={member.id} style={{
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '0.8rem',
                            padding: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '40px', height: '40px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#eff3c1', fontWeight: '600'
                                }}>
                                    {member.name.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ color: '#eff3c1', fontWeight: '500' }}>{member.name}</div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{member.contact}</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    background: member.status === 'Joined' ? 'rgba(74, 222, 128, 0.1)' : (member.status === 'Pending' ? 'rgba(250, 204, 21, 0.1)' : 'rgba(239, 68, 68, 0.1)'),
                                    color: member.status === 'Joined' ? '#4ade80' : (member.status === 'Pending' ? '#facc15' : '#ef4444'),
                                    marginBottom: '0.3rem'
                                }}>
                                    {member.status}
                                </div>
                                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Invited on {member.date}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                        You haven't invited anyone yet. Start building the community!
                    </div>
                )}
            </div>

            {/* Invite Modal */}
            {isInviteModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: '#1A1625',
                        borderRadius: '1rem',
                        padding: '2rem',
                        width: '100%',
                        maxWidth: '500px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
                    }}>
                        <h2 style={{ color: '#eff3c1', margin: '0 0 1.5rem 0' }}>Invite New Member</h2>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full Name</label>
                                <input type="text" placeholder="e.g. John Doe" style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none'
                                }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email or Phone Number</label>
                                <input type="text" placeholder="e.g. john@example.com or 0712..." style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none'
                                }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Invitation Message (Optional)</label>
                                <textarea rows="3" placeholder="Write a personal message..." style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none',
                                    fontFamily: 'inherit'
                                }}></textarea>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <button
                                onClick={() => setIsInviteModalOpen(false)}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: 'transparent',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#cbd5e1',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    alert('Invitation Sent!');
                                    setIsInviteModalOpen(false);
                                }}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: '#22c1e6',
                                    border: 'none',
                                    color: '#120D20',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontWeight: '700'
                                }}
                            >
                                Send Invitation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MembersInvitedPanel;
