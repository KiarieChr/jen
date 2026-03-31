import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const FinanceStatsCards = () => {
    const [stats, setStats] = useState({
        total_income: 0,
        total_expenses: 0,
        total_contributions: 0,
        total_pledges: 0,
        pledges_redeemed: 0,
        net_balance: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await api.get('get_finance_stats.php');
                if (data.success) setStats(data.data);
            } catch (err) {
                console.error('Failed to load finance stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const fmt = (n) => (n || 0).toLocaleString();

    const cards = [
        { title: 'Total Income', value: `KES ${fmt(stats.total_income)}`, icon: '💰', color: '#4ade80', desc: 'All income streams' },
        { title: 'Total Expenses', value: `KES ${fmt(stats.total_expenses)}`, icon: '📤', color: '#f87171', desc: 'All expenditures' },
        { title: 'Contributions', value: `KES ${fmt(stats.total_contributions)}`, icon: '🤝', color: '#22c1e6', desc: 'Member giving' },
        { title: 'Active Pledges', value: `KES ${fmt(stats.total_pledges)}`, icon: '📋', color: '#f59e0b', desc: `${fmt(stats.pledges_redeemed)} redeemed` },
        { title: 'Net Balance', value: `KES ${fmt(stats.net_balance)}`, icon: '📊', color: stats.net_balance >= 0 ? '#4ade80' : '#f87171', desc: 'Income - Expenses' },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {cards.map((card, i) => (
                <div key={i} style={{
                    background: 'var(--surface-1)',
                    borderRadius: '1rem',
                    padding: '1.25rem',
                    border: '1px solid var(--border-color)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>{card.title}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-color)', margin: '0.2rem 0' }}>
                                {loading ? '...' : card.value}
                            </div>
                        </div>
                        <div style={{
                            background: `${card.color}15`,
                            color: card.color,
                            borderRadius: '0.5rem',
                            padding: '0.5rem',
                            fontSize: '1.2rem'
                        }}>
                            {card.icon}
                        </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{card.desc}</div>
                </div>
            ))}
        </div>
    );
};

export default FinanceStatsCards;
