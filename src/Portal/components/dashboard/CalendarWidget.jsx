import React from 'react';

const CalendarWidget = () => {
    // Simplified static calendar for Feb 2026 (assuming match with prompt context or just generic)
    // Let's use a generic structure or current month. Prompt had "Feb 1st" in screenshots.

    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    // 31 days simplified grid
    const dates = Array.from({ length: 31 }, (_, i) => i + 1);

    // Mock events
    const events = [1, 15, 22]; // Sundays
    const cellMeetings = [5, 12, 19, 26]; // Thursdays

    const isEvent = (d) => events.includes(d);
    const isCell = (d) => cellMeetings.includes(d);
    const today = 2; // Just a mock today

    return (
        <div style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-color)',
            borderRadius: '1rem',
            padding: '1.5rem',
            height: '100%'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    📅 February 2026
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }}></span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Event</span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-color)', display: 'inline-block' }}></span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cell</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {days.map(d => (
                    <div key={d} style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}>{d}</div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', gap: '0.5rem' }}>
                {/* Offset for start of month - Simplified for demo */}
                <div /> <div /> <div />

                {dates.map(date => (
                    <div key={date} style={{
                        aspectRatio: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        fontSize: '0.9rem',
                        color: date === today ? 'var(--bg-color)' : 'var(--text-color)',
                        background: date === today ? 'var(--text-color)' : 'transparent',
                        position: 'relative',
                        cursor: 'pointer',
                        fontWeight: date === today ? 'bold' : 'normal'
                    }}>
                        {date}
                        {isEvent(date) && (
                            <div style={{ position: 'absolute', bottom: '2px', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                        )}
                        {isCell(date) && (
                            <div style={{ position: 'absolute', bottom: '2px', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-color)' }}></div>
                        )}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Upcoming</div>
                <div style={{ color: 'var(--text-color)', fontSize: '0.9rem', fontWeight: '600' }}>Goshen Cell Meeting</div>
                <div style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>Thursday, Feb 5th • 6:00 PM</div>
            </div>
        </div>
    );
};

export default CalendarWidget;
