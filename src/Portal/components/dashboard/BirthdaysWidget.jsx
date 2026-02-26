import React from 'react';

const BirthdaysWidget = () => {
    const upcoming = [
        { name: 'Alice M.', date: 'Feb 5', relation: 'Cell Member' },
        { name: 'John D.', date: 'Feb 12', relation: 'Cell Member' },
        { name: 'Pastor Sarah', date: 'Feb 18', relation: 'Leader' },
    ];

    const myBirthday = {
        date: 'August 15',
        daysLeft: 194
    };

    return (
        <div style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-color)',
            borderRadius: '1rem',
            padding: '1.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
                🎂 Birthdays
            </h3>

            {/* My Birthday */}
            <div style={{
                background: 'linear-gradient(135deg, #120D20, #2e2640)',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border-color)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div style={{ fontSize: '1.5rem' }}>🎈</div>
                <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Next Celebration</div>
                    <div style={{ color: 'var(--text-color)', fontWeight: '700' }}>{myBirthday.date} (Mine)</div>
                    <div style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>{myBirthday.daysLeft} days to go</div>
                </div>
            </div>

            {/* Upcoming List */}
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Upcoming in Cell</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {upcoming.map((bday, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '32px', height: '32px', background: 'var(--border-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-color)', fontSize: '0.8rem' }}>
                                    {bday.name.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-color)', fontSize: '0.9rem', fontWeight: '500' }}>{bday.name}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{bday.relation}</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ color: 'var(--text-color)', fontSize: '0.85rem', fontWeight: '600' }}>{bday.date}</div>
                                <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}>Send Wish</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BirthdaysWidget;
