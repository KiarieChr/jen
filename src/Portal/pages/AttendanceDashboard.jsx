import React from 'react';
import AttendanceStatsCards from '../components/meetings/attendance/AttendanceStatsCards';
import AttendanceTrendChart from '../components/meetings/attendance/AttendanceTrendChart';
import MeetingsVsEventsChart from '../components/meetings/attendance/MeetingsVsEventsChart';
import AttendanceDistributionChart from '../components/meetings/attendance/AttendanceDistributionChart';
import AttendanceTable from '../components/meetings/attendance/AttendanceTable';

const AttendanceDashboard = () => {
    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: '#eff3c1' }}>Attendance & Analytics</h1>
                    <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Track engagement and participation health.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select style={{ background: '#1A1625', border: '1px solid rgba(255,255,255,0.1)', color: '#eff3c1', padding: '0.5rem', borderRadius: '0.5rem' }}>
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>This Quarter</option>
                        <option>This Year</option>
                    </select>
                </div>
            </div>

            {/* Stats */}
            <AttendanceStatsCards />

            {/* Charts Grid */}
            <div className="attendance-charts-grid">
                <div style={{ gridArea: 'trend' }}>
                    <AttendanceTrendChart />
                </div>
                <div style={{ gridArea: 'compare' }}>
                    <MeetingsVsEventsChart />
                </div>
                <div style={{ gridArea: 'dist' }}>
                    <AttendanceDistributionChart />
                </div>
            </div>

            {/* Detailed Table */}
            <AttendanceTable />

            <style>{`
                .attendance-charts-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                    grid-template-areas: 
                        "trend"
                        "compare"
                        "dist";
                }

                @media (min-width: 1024px) {
                    .attendance-charts-grid {
                        grid-template-columns: 2fr 1fr 1fr;
                        grid-template-areas: 
                            "trend trend dist"
                            "compare compare dist";
                         /* Actually let's do a better desktop layout */
                        grid-template-columns: 2fr 1fr;
                        grid-template-areas: 
                            "trend dist"
                            "compare dist" /* This might look weird if dist is tall, let's try a standard 2 row or 3 col */
                    }
                    /* Re-thinking layout for desktop */
                    .attendance-charts-grid {
                        grid-template-columns: 1.5fr 1fr 1fr;
                        grid-template-areas: 
                            "trend compare dist";
                    }
                }
            `}</style>
        </div>
    );
};

export default AttendanceDashboard;
