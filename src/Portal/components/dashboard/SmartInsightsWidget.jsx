import React from 'react';

const SmartInsightsWidget = () => {
    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            height: '100%'
        }}>
            <h3 style={{ color: '#22c1e6', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>✨</span> Smart Insights
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ paddingLeft: '1rem', borderLeft: '2px solid #22c1e6', fontSize: '0.9rem', color: '#eff3c1', lineHeight: '1.4' }}>
                    Your attendance improved by 15% this month 👏
                </div>
                <div style={{ paddingLeft: '1rem', borderLeft: '2px solid #22c1e6', fontSize: '0.9rem', color: '#eff3c1', lineHeight: '1.4' }}>
                    You are 80% toward fulfilling your seasonal pledge 🙌
                </div>
                <div style={{ paddingLeft: '1rem', borderLeft: '2px solid rgba(255,255,255,0.1)', fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.4' }}>
                    High engagement in Jan Sunday services recorded.
                </div>
            </div>
        </div>
    );
};

export default SmartInsightsWidget;
