import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const FinancialSummaryChart = ({ data }) => {
    const chartData = [
        { name: 'Total Target', value: data?.total_collection || 0, color: '#4e73df' },
        { name: 'Sponsored', value: data?.sponsored_collection || 0, color: '#1cc88a' },
        { name: 'Collected', value: data?.collected || 0, color: '#36b9cc' },
        { name: 'Pending', value: data?.pending || 0, color: '#f6c23e' }
    ];

    const formatCurrency = (value) => {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}K`;
        }
        return value.toLocaleString();
    };

    return (
        <div style={{
            background: 'var(--surface-1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            height: '100%'
        }}>
            <h3 style={{
                fontSize: '0.9rem',
                fontWeight: '700',
                color: 'var(--text-color)',
                margin: '0 0 1rem 0',
                textAlign: 'center'
            }}>
                Event Financial Summary
            </h3>

            <div style={{ width: '100%', height: '220px' }}>
                <ResponsiveContainer>
                    <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30 }}>
                        <XAxis
                            type="number"
                            tickFormatter={formatCurrency}
                            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                            axisLine={{ stroke: 'var(--border-color)' }}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                            axisLine={{ stroke: 'var(--border-color)' }}
                            width={80}
                        />
                        <Tooltip
                            formatter={(value) => [`KES ${value.toLocaleString()}`, 'Amount']}
                            contentStyle={{
                                background: 'var(--surface-1)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem',
                                fontSize: '0.85rem'
                            }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-color)'
            }}>
                {chartData.map((item, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)'
                    }}>
                        <span style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '2px',
                            background: item.color
                        }}></span>
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FinancialSummaryChart;
