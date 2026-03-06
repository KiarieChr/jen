import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const RegistrationProgressChart = ({ data }) => {
    const percentage = data?.percentage || 0;
    const remaining = 100 - percentage;

    const chartData = [
        { name: 'Registered', value: percentage, color: '#22c1e6' },
        { name: 'Remaining', value: remaining, color: 'rgba(34, 193, 230, 0.15)' }
    ];

    // If 100%, show full circle
    const displayData = percentage >= 100
        ? [{ name: 'Registered', value: 100, color: '#22c1e6' }]
        : chartData;

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
                Overall Registration Progress
            </h3>

            <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={displayData}
                            cx="50%"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={80}
                            paddingAngle={0}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                        >
                            {displayData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => `${value.toFixed(1)}%`}
                            contentStyle={{
                                background: 'var(--surface-1)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0.5rem'
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
                    <div style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        color: '#22c1e6'
                    }}>
                        {percentage.toFixed(1)}%
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-color)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-color)' }}>
                        {data?.registered || 0}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Registered</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-color)' }}>
                        {data?.target || 0}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Target</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-color)' }}>
                        {data?.invited || 0}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Invited</div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationProgressChart;
