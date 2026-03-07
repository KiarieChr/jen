import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await api.get('/get_calendar_events.php', {
                    params: { year, month }
                });
                setEvents(response.events || []);
            } catch (error) {
                console.error('Failed to fetch events:', error);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [year, month]);

    const prevMonth = () => setCurrentDate(new Date(year, month - 2, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month, 1));

    const getEventsForDay = (day) => {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(e => e.start?.startsWith(dateStr) || e.date?.startsWith(dateStr));
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <h1 className="calendar-title">
                    {currentDate.toLocaleString('default', { month: 'long' })} {year}
                </h1>
                <div className="calendar-controls">
                    <button onClick={prevMonth} className="calendar-nav-btn">← Prev</button>
                    <button onClick={() => setCurrentDate(new Date())} className="calendar-nav-btn">Today</button>
                    <button onClick={nextMonth} className="calendar-nav-btn">Next →</button>
                </div>
            </div>

            <div className="calendar-scroll-wrapper">
                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Loading calendar...
                    </div>
                ) : (
                    <div className="calendar-grid">
                        {dayLabels.map(label => (
                            <div key={label} className="calendar-day-label">
                                {label}
                            </div>
                        ))}

                        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                            <div key={`empty-${i}`} className="calendar-day empty"></div>
                        ))}

                        {days.map(day => {
                            const dayEvents = getEventsForDay(day);
                            const isToday = day === new Date().getDate() && month === (new Date().getMonth() + 1) && year === new Date().getFullYear();

                            return (
                                <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
                                    <div className="day-number">
                                        {day}
                                    </div>
                                    <div className="day-events">
                                        {dayEvents.map(event => (
                                            <div key={event.id} className="event-pill" style={{ background: event.color || 'var(--primary)' }} title={`${event.title} - ${event.location || ''}`}>
                                                {event.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <style>{`
                .calendar-container {
                    padding: 2rem;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .calendar-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    marginBottom: 2rem;
                    background: var(--surface-1);
                    padding: 1.5rem;
                    border-radius: 1rem;
                    border: 1px solid var(--border-color);
                    gap: 1.5rem;
                }

                .calendar-title {
                    color: var(--text-color);
                    margin: 0;
                    font-size: 1.8rem;
                }

                .calendar-controls {
                    display: flex;
                    gap: 0.75rem;
                }

                .calendar-nav-btn {
                    background: var(--surface-2);
                    border: 1px solid var(--border-color);
                    color: var(--text-color);
                    padding: 0.6rem 1.25rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.2s;
                    white-space: nowrap;
                }

                .calendar-nav-btn:hover {
                    background: var(--primary);
                    color: white;
                    border-color: var(--primary);
                }

                .calendar-scroll-wrapper {
                    overflow-x: auto;
                    background: var(--surface-1);
                    border-radius: 1rem;
                    border: 1px solid var(--border-color);
                    scrollbar-width: thin;
                    scrollbar-color: var(--border-color) transparent;
                }

                .calendar-grid {
                    display: grid;
                    grid-template-columns: repeat(7, minmax(140px, 1fr));
                    background: var(--border-color);
                    gap: 1px;
                    min-width: 900px;
                }

                .calendar-day-label {
                    background: var(--surface-2);
                    padding: 1rem;
                    text-align: center;
                    fontWeight: 700;
                    color: var(--primary);
                    fontSize: 0.9rem;
                    textTransform: uppercase;
                    border-bottom: 1px solid var(--border-color);
                }

                .calendar-day {
                    background: var(--surface-1);
                    min-height: 120px;
                    padding: 0.75rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    transition: background 0.2s;
                }

                .calendar-day.today {
                    background: rgba(34, 192, 230, 0.05);
                    border: 1px solid var(--primary);
                    position: relative;
                    z-index: 1;
                }

                .day-number {
                    fontWeight: 700;
                    font-size: 1.1rem;
                    color: var(--text-color);
                }

                .calendar-day.today .day-number {
                    color: var(--primary);
                }

                .day-events {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .event-pill {
                    color: white;
                    fontSize: 0.75rem;
                    padding: 4px 8px;
                    border-radius: 4px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    transition: transform 0.1s;
                }

                .event-pill:hover {
                    transform: scale(1.02);
                }

                @media (max-width: 1024px) {
                    .calendar-grid {
                        grid-template-columns: repeat(7, minmax(120px, 1fr));
                        min-width: 800px;
                    }
                }

                @media (max-width: 768px) {
                    .calendar-container {
                        padding: 1rem;
                    }
                    .calendar-header {
                        flex-direction: column;
                        align-items: stretch;
                        padding: 1rem;
                        gap: 1rem;
                        text-align: center;
                    }
                    .calendar-title {
                        font-size: 1.4rem;
                    }
                    .calendar-controls {
                        justify-content: center;
                    }
                    .calendar-nav-btn {
                        padding: 0.5rem 1rem;
                        font-size: 0.85rem;
                        flex: 1;
                    }
                    .calendar-day {
                        min-height: 100px;
                        padding: 0.5rem;
                    }
                    .day-number {
                        font-size: 0.9rem !important;
                    }
                    .calendar-day-label {
                        padding: 0.75rem 0.5rem !important;
                        font-size: 0.75rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default CalendarPage;
