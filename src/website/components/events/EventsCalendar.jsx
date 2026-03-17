import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://jesusenthroned_net.local/api/';

const EventsCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Color mapping for labels (excluding planning)
    const labelColors = {
        'personal': '#ef4444',
        'family': '#f59e0b',
        'events': '#f59e0b',
        'jesus enthroned events': '#22c1e6',
        'word session': '#4ade80',
        'holiday': '#4ade80',
        'prayer': '#6366f1',
        'etc': '#a855f7',
        'business': '#22c1e6'
    };

    // Fetch events from API - exclude planning
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}get_calendar_events.php?year=${year}&month=${month}&exclude=planning`);
                const data = await response.json();
                if (data.success) {
                    // Filter out planning events on client side as well
                    const filteredEvents = (data.events || []).filter(
                        e => e.label?.toLowerCase() !== 'planning'
                    );
                    setEvents(filteredEvents);
                } else {
                    setEvents([]);
                }
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

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedEvent(null);
    };

    const formatDateTime = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleString('default', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <section className="events-calendar-section">
            <div className="events-calendar-container">
                <div className="calendar-section-header">
                    <h2>Events Calendar</h2>
                    <p>View our upcoming events and meetings</p>
                </div>

                <div className="calendar-wrapper">
                    <div className="calendar-header">
                        <button onClick={prevMonth} className="calendar-nav-btn">
                            ← Previous
                        </button>
                        <h3 className="calendar-month-title">
                            {currentDate.toLocaleString('default', { month: 'long' })} {year}
                        </h3>
                        <button onClick={nextMonth} className="calendar-nav-btn">
                            Next →
                        </button>
                    </div>

                    <div className="calendar-scroll-wrapper">
                        {loading ? (
                            <div className="calendar-loading">Loading events...</div>
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
                                    const isToday = day === new Date().getDate() && 
                                                    month === (new Date().getMonth() + 1) && 
                                                    year === new Date().getFullYear();

                                    return (
                                        <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
                                            <div className="day-number">{day}</div>
                                            <div className="day-events">
                                                {dayEvents.map(event => (
                                                    <div
                                                        key={event.id}
                                                        className="event-pill"
                                                        style={{ 
                                                            background: event.color || labelColors[event.label?.toLowerCase()] || '#22c1e6' 
                                                        }}
                                                        onClick={() => handleEventClick(event)}
                                                        title={`Click for details: ${event.title}`}
                                                    >
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
                </div>
            </div>

            {/* Event Details Modal */}
            {modalOpen && selectedEvent && (
                <div className="event-modal-overlay" onClick={closeModal}>
                    <div className="event-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="event-modal-header">
                            <h2>{selectedEvent.title}</h2>
                            <button className="modal-close-btn" onClick={closeModal}>×</button>
                        </div>
                        <div className="event-modal-body">
                            <div className="event-detail-row">
                                <span className="event-detail-label">Category</span>
                                <span className="event-detail-value">
                                    <span
                                        className="event-label-badge"
                                        style={{ background: selectedEvent.color || '#22c1e6' }}
                                    >
                                        {selectedEvent.label || 'Event'}
                                    </span>
                                </span>
                            </div>
                            <div className="event-detail-row">
                                <span className="event-detail-label">Start</span>
                                <span className="event-detail-value">{formatDateTime(selectedEvent.start)}</span>
                            </div>
                            {selectedEvent.end && (
                                <div className="event-detail-row">
                                    <span className="event-detail-label">End</span>
                                    <span className="event-detail-value">{formatDateTime(selectedEvent.end)}</span>
                                </div>
                            )}
                            {selectedEvent.url && (
                                <div className="event-detail-row">
                                    <span className="event-detail-label">Link</span>
                                    <span className="event-detail-value">
                                        <a
                                            href={selectedEvent.url.startsWith('http') ? selectedEvent.url : `https://${selectedEvent.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="event-link"
                                        >
                                            Join Meeting
                                        </a>
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="event-modal-footer">
                            <button className="modal-btn secondary" onClick={closeModal}>Close</button>
                            {selectedEvent.url && (
                                <a
                                    href={selectedEvent.url.startsWith('http') ? selectedEvent.url : `https://${selectedEvent.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="modal-btn primary"
                                >
                                    Join Meeting
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .events-calendar-section {
                    padding: 4rem 2rem;
                    background: #eff3c1;
                }

                .events-calendar-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .calendar-section-header {
                    text-align: center;
                    margin-bottom: 2.5rem;
                }

                .calendar-section-header h2 {
                    font-size: 2.5rem;
                    color: #1a1a2e;
                    margin: 0 0 0.5rem 0;
                    font-weight: 700;
                }

                .calendar-section-header p {
                    color: #4a5568;
                    font-size: 1.1rem;
                    margin: 0;
                }

                .calendar-wrapper {
                    background: white;
                    border-radius: 1rem;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    overflow: hidden;
                }

                .calendar-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.25rem 1.5rem;
                    background: #1a1a2e;
                    color: white;
                }

                .calendar-month-title {
                    margin: 0;
                    font-size: 1.4rem;
                    font-weight: 600;
                }

                .calendar-nav-btn {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-weight: 500;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                }

                .calendar-nav-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                .calendar-scroll-wrapper {
                    overflow-x: auto;
                }

                .calendar-loading {
                    padding: 3rem;
                    text-align: center;
                    color: #4a5568;
                }

                .calendar-grid {
                    display: grid;
                    grid-template-columns: repeat(7, minmax(100px, 1fr));
                    min-width: 700px;
                }

                .calendar-day-label {
                    background: #f7f8fa;
                    padding: 0.75rem 0.5rem;
                    text-align: center;
                    font-weight: 700;
                    color: #1a1a2e;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    border-bottom: 1px solid #e2e8f0;
                }

                .calendar-day {
                    min-height: 90px;
                    padding: 0.5rem;
                    border: 1px solid #e2e8f0;
                    border-top: none;
                    background: white;
                    display: flex;
                    flex-direction: column;
                    gap: 0.35rem;
                }

                .calendar-day.empty {
                    background: #fafafa;
                }

                .calendar-day.today {
                    background: rgba(34, 193, 230, 0.08);
                    border-color: #22c1e6;
                }

                .day-number {
                    font-weight: 700;
                    font-size: 0.95rem;
                    color: #1a1a2e;
                }

                .calendar-day.today .day-number {
                    color: #22c1e6;
                }

                .day-events {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    overflow: hidden;
                }

                .event-pill {
                    color: white;
                    font-size: 0.7rem;
                    padding: 4px 6px;
                    border-radius: 4px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    cursor: pointer;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    transition: transform 0.1s, box-shadow 0.1s;
                }

                .event-pill:hover {
                    transform: scale(1.02);
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
                }

                /* Event Modal */
                .event-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 1rem;
                    animation: fadeIn 0.2s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .event-modal {
                    background: white;
                    border-radius: 1rem;
                    max-width: 480px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: slideUp 0.3s ease;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .event-modal-header {
                    padding: 1.25rem 1.5rem;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 1rem;
                    background: #1a1a2e;
                    color: white;
                    border-radius: 1rem 1rem 0 0;
                }

                .event-modal-header h2 {
                    margin: 0;
                    font-size: 1.2rem;
                    line-height: 1.4;
                }

                .modal-close-btn {
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    color: white;
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1.4rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                    flex-shrink: 0;
                }

                .modal-close-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                .event-modal-body {
                    padding: 1.5rem;
                }

                .event-detail-row {
                    display: flex;
                    gap: 1rem;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid #f0f0f0;
                }

                .event-detail-row:last-child {
                    border-bottom: none;
                }

                .event-detail-label {
                    font-size: 0.85rem;
                    color: #6b7280;
                    min-width: 80px;
                    font-weight: 500;
                }

                .event-detail-value {
                    font-size: 0.95rem;
                    color: #1a1a2e;
                    flex: 1;
                }

                .event-label-badge {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    border-radius: 1rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: white;
                }

                .event-link {
                    color: #22c1e6;
                    text-decoration: none;
                    font-weight: 500;
                }

                .event-link:hover {
                    text-decoration: underline;
                }

                .event-modal-footer {
                    padding: 1rem 1.5rem;
                    border-top: 1px solid #e2e8f0;
                    display: flex;
                    gap: 0.75rem;
                    justify-content: flex-end;
                    background: #f9fafb;
                    border-radius: 0 0 1rem 1rem;
                }

                .modal-btn {
                    padding: 0.6rem 1.25rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                .modal-btn.secondary {
                    background: white;
                    border: 1px solid #e2e8f0;
                    color: #4a5568;
                }

                .modal-btn.secondary:hover {
                    background: #f7f8fa;
                }

                .modal-btn.primary {
                    background: #22c1e6;
                    border: 1px solid #22c1e6;
                    color: white;
                }

                .modal-btn.primary:hover {
                    background: #1ba8c9;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .events-calendar-section {
                        padding: 2rem 1rem;
                    }

                    .calendar-section-header h2 {
                        font-size: 1.8rem;
                    }

                    .calendar-header {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                        padding: 1rem;
                    }

                    .calendar-nav-btn {
                        padding: 0.4rem 0.75rem;
                        font-size: 0.8rem;
                    }

                    .calendar-month-title {
                        font-size: 1.2rem;
                    }

                    .calendar-grid {
                        grid-template-columns: repeat(7, minmax(45px, 1fr));
                        min-width: 315px;
                    }

                    .calendar-day {
                        min-height: 65px;
                        padding: 0.3rem;
                    }

                    .day-number {
                        font-size: 0.8rem;
                    }

                    .calendar-day-label {
                        padding: 0.5rem 0.25rem;
                        font-size: 0.65rem;
                    }

                    .event-pill {
                        font-size: 0.55rem;
                        padding: 2px 4px;
                    }

                    .event-modal {
                        margin: 0.5rem;
                    }

                    .event-detail-row {
                        flex-direction: column;
                        gap: 0.25rem;
                    }

                    .event-detail-label {
                        min-width: auto;
                    }
                }

                @media (max-width: 480px) {
                    .calendar-grid {
                        grid-template-columns: repeat(7, minmax(38px, 1fr));
                        min-width: 266px;
                    }

                    .calendar-day {
                        min-height: 55px;
                        padding: 0.2rem;
                    }

                    .day-number {
                        font-size: 0.7rem;
                    }

                    .calendar-day-label {
                        font-size: 0.55rem;
                    }

                    .event-pill {
                        font-size: 0.5rem;
                        padding: 1px 2px;
                    }
                }
            `}</style>
        </section>
    );
};

export default EventsCalendar;
