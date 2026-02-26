import React from 'react';

const PledgesWidget = () => {
    const pledgeData = {
        campaign: 'Church Building Fund',
        pledged: 50000,
        fulfilled: 35000,
        currency: 'KES'
    };

    const percentage = Math.round((pledgeData.fulfilled / pledgeData.pledged) * 100);
    const balance = pledgeData.pledged - pledgeData.fulfilled;

    return (
        <div style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-color)',
            borderRadius: '1rem',
            padding: '1.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
                🤝 My Partnership
            </h3>

            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'flex-end' }}>
                    <div style={{ color: 'var(--text-color)', fontWeight: '600' }}>{pledgeData.campaign}</div>
                    <div style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1.25rem' }}>{percentage}%</div>
                </div>

                {/* Progress Bar */}
                <div style={{
                    height: '12px',
                    background: 'var(--border-color)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    marginBottom: '1rem'
                }}>
                    <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #22c1e6, #eff3c1)',
                        borderRadius: '6px'
                    }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div>Fulfilled: <span style={{ color: 'var(--text-color)' }}>{pledgeData.currency} {pledgeData.fulfilled.toLocaleString()}</span></div>
                    <div>Pledged: {pledgeData.currency} {pledgeData.pledged.toLocaleString()}</div>
                </div>
            </div>

            <div style={{
                background: 'rgba(34, 193, 230, 0.1)',
                borderRadius: '0.75rem',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div style={{ fontSize: '1.5rem' }}>✨</div>
                <div>
                    <div style={{ color: 'var(--text-color)', fontSize: '0.9rem', fontWeight: '600' }}>Almost there!</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Only {pledgeData.currency} {balance.toLocaleString()} to go. Thank you for your faithfulness.</div>
                </div>
            </div>
        </div>
    );
};

export default PledgesWidget;
