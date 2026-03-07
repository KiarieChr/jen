import React, { useContext } from 'react';
import DashboardCard from './DashboardCard';
import { ThemeContext } from '../../../context/ThemeContext';

const SmartInsightsWidget = () => {
    const { theme } = useContext(ThemeContext);
    const isLight = theme === 'light';

    // Theme colors
    const colors = {
        text: isLight ? '#1e293b' : '#ffffff',
        textMuted: isLight ? '#64748b' : 'rgba(255,255,255,0.5)'
    };

    const insights = [
        { text: 'Your attendance improved by 15% this month 👏', type: 'success' },
        { text: 'You are 80% toward fulfilling your seasonal pledge 🙌', type: 'success' },
        { text: 'High engagement in Jan Sunday services recorded.', type: 'neutral' },
    ];

    const getInsightBorder = (type) => {
        switch (type) {
            case 'success': return '#10b981';
            case 'warning': return '#f59e0b';
            case 'error': return '#ef4444';
            default: return isLight ? '#e2e8f0' : 'rgba(255,255,255,0.1)';
        }
    };

    return (
        <DashboardCard title="Smart Insights" icon="✨">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {insights.map((insight, i) => (
                    <div
                        key={i}
                        style={{
                            paddingLeft: '1rem',
                            borderLeft: `3px solid ${getInsightBorder(insight.type)}`,
                            fontSize: '0.9rem',
                            color: insight.type === 'neutral' ? colors.textMuted : colors.text,
                            lineHeight: '1.5',
                            padding: '0.5rem 0 0.5rem 1rem'
                        }}
                    >
                        {insight.text}
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
};

export default SmartInsightsWidget;
