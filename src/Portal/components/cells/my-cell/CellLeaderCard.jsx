import React from 'react';

const CellLeaderCard = () => {
    // Mock Data
    const leadership = {
        leader: { name: 'John Doe', role: 'Cell Leader', email: 'john@example.com', phone: '+254 700 000 000' },
        assistant: { name: 'Jane Smith', role: 'Assistant Leader', email: 'jane@example.com' }
    };

    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            height: '100%'
        }}>
            <h3 style={{ color: '#22c1e6', fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                👤 Leadership
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Main Leader */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#22c1e6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#120D20', fontWeight: 'bold' }}>
                        {leadership.leader.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ color: '#eff3c1', fontWeight: '600', fontSize: '1rem' }}>{leadership.leader.name}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{leadership.leader.role}</div>
                    </div>
                    <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: '#eff3c1', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        📞
                    </button>
                    <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: '#eff3c1', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        ✉️
                    </button>
                </div>

                {/* Assistant */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.75rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: '#eff3c1' }}>
                        {leadership.assistant.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ color: '#eff3c1', fontWeight: '500', fontSize: '0.9rem' }}>{leadership.assistant.name}</div>
                        <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{leadership.assistant.role}</div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem', fontStyle: 'italic', margin: 0 }}>
                    "Leading with love and service."
                </p>
            </div>
        </div>
    );
};

export default CellLeaderCard;
