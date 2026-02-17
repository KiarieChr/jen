import React, { useState } from 'react';

const CellMembersList = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data
    const members = [
        { id: 1, name: 'David Kim', role: 'Member', status: 'Active' },
        { id: 2, name: 'Alice Wonder', role: 'Member', status: 'Active' },
        { id: 3, name: 'Frank White', role: 'Member', status: 'Away' },
        { id: 4, name: 'Grace Liu', role: 'Intern', status: 'Active' },
        { id: 5, name: 'Henry Ford', role: 'Member', status: 'Active' },
        { id: 6, name: 'Ivy Blue', role: 'Member', status: 'Active' },
    ];

    const filtered = members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#eff3c1', fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🧑‍🤝‍🧑 Fellow Members <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem' }}>{members.length}</span>
                </h3>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '0.4rem 0.8rem 0.4rem 2rem',
                            background: '#120D20',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '2rem',
                            color: '#eff3c1',
                            fontSize: '0.8rem',
                            width: '120px',
                            outline: 'none'
                        }}
                    />
                    <span style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', opacity: 0.5 }}>🔍</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem', overflowY: 'auto' }}>
                {filtered.map(member => (
                    <div key={member.id} style={{
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        transition: 'transform 0.2s',
                        cursor: 'default',
                        border: '1px solid transparent'
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontWeight: '600',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem'
                        }}>
                            {member.name.charAt(0)}
                        </div>
                        <div style={{ color: '#eff3c1', fontSize: '0.85rem', fontWeight: '500' }}>{member.name}</div>
                        <div style={{ color: '#64748b', fontSize: '0.7rem' }}>{member.role}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CellMembersList;
