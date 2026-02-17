import React from 'react';

const MonthlyAttendanceChart = () => {
    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            height: '100%'
        }}>
            <h3 style={{ color: '#22c1e6', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                Monthly Attendance Breakdown
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Present */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                        <span>Present</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px' }}>
                        <div style={{ width: '85%', height: '100%', background: '#22c1e6', borderRadius: '5px' }}></div>
                    </div>
                </div>
                {/* Absent */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                        <span>Absent</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px' }}>
                        <div style={{ width: '10%', height: '100%', background: '#ef4444', borderRadius: '5px' }}></div>
                    </div>
                </div>
                {/* Excused */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                        <span>Excused</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px' }}>
                        <div style={{ width: '5%', height: '100%', background: '#a855f7', borderRadius: '5px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyAttendanceChart;
