import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const GenderDistributionChart = ({ data, total }) => {
    // Transform the data format
    const chartData = (data || []).map(item => ({
        name: item.gender || 'Unknown',
        value: parseInt(item.count) || 0,
        color: getGenderColor(item.gender)
    }));

    function getGenderColor(gender) {
        const genderLower = (gender || '').toLowerCase();
        if (genderLower === 'male' || genderLower === 'm') return '#6366f1'; // Indigo for male
        if (genderLower === 'female' || genderLower === 'f') return '#ec4899'; // Pink for female
        return '#94a3b8'; // Gray for unknown
    }

    // Calculate percentages
    const totalCount = total || chartData.reduce((sum, item) => sum + item.value, 0);
    const dataWithPercentage = chartData.map(item => ({
        ...item,
        percentage: totalCount > 0 ? ((item.value / totalCount) * 100).toFixed(1) : 0
    }));

    if (chartData.length === 0 || totalCount === 0) {
        return (
            <div style={{
                background: 'var(--surface-1)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid var(--border-color)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h3 style={{
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    color: 'var(--text-color)',
                    marginBottom: '1rem'
                }}>
                    📊 Gender Distribution
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No registration data</p>
            </div>
        );
    }

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
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                📊 Gender Distribution
            </h3>

            <div style={{ width: '100%', height: '180px', position: 'relative' }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={dataWithPercentage}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={75}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {dataWithPercentage.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value, name, props) => [
                                `${value} (${props.payload.percentage}%)`,
                                props.payload.name
                            ]}
                            contentStyle={{
                                background: 'var(--surface-1)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem',
                                fontSize: '0.85rem'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center label */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total</div>
                    <div style={{
                        fontSize: '1.3rem',
                        fontWeight: '800',
                        color: 'var(--text-color)'
                    }}>
                        {totalCount}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                marginTop: '0.75rem'
            }}>
                {dataWithPercentage.map((item, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: item.color
                        }}></span>
                        <span style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)'
                        }}>
                            {item.name} ({item.percentage}%)
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenderDistributionChart;
