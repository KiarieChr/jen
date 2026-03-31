import React, { useState, useEffect } from 'react';
import { API_BASE_URL as API_URL } from '../../services/api';

const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState([]);
    const [activeFilters, setActiveFilters] = useState(['all']);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleEventDoubleClick = (event) => {
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

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Color mapping for labels
    const labelColors = {
        'personal': '#ef4444',
        'planning': '#22c1e6',
        'family': '#f59e0b',
        'events': '#f59e0b',
        'word session': '#4ade80',
        'holiday': '#4ade80',
        'prayer': '#6366f1',
        'etc': '#a855f7',
        'business': '#22c1e6'
    };

    // Fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}get_calendar_events.php?year=${year}&month=${month}`);
                const data = await response.json();
                if (data.success) {
                    setEvents(data.events || []);
                    setFilters(data.filters || []);
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

    const toggleFilter = (filter) => {
        if (filter === 'all') {
            setActiveFilters(['all']);
        } else {
            let newFilters = activeFilters.filter(f => f !== 'all');
            if (newFilters.includes(filter)) {
                newFilters = newFilters.filter(f => f !== filter);
            } else {
                newFilters.push(filter);
            }
            if (newFilters.length === 0) {
                newFilters = ['all'];
            }
            setActiveFilters(newFilters);
        }
    };

    const getEventsForDay = (day) => {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(e => {
            const matchesDate = e.start?.startsWith(dateStr) || e.date?.startsWith(dateStr);
            const matchesFilter = activeFilters.includes('all') || activeFilters.includes(e.label?.toLowerCase());
            return matchesDate && matchesFilter;
        });
    };

    return (
        <div className="calendar-page">
            {/* Sidebar */}
            <div className={`calendar-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <h3>Calendar</h3>
                    <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? '◀' : '▶'}
                    </button>
                </div>

                <div className="sidebar-content">
                    <div className="mini-calendar">
                        <div className="mini-calendar-header">
                            <span>{currentDate.toLocaleString('default', { month: 'short' })} {year}</span>
                        </div>
                    </div>

                    <div className="filter-section">
                        <h4>Event Filters</h4>
                        <label className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={activeFilters.includes('all')}
                                onChange={() => toggleFilter('all')}
                            />
                            <span className="checkmark" style={{ background: activeFilters.includes('all') ? 'var(--secondary)' : 'transparent' }}></span>
                            View All
                        </label>

                        {filters.map(filter => (
                            <label key={filter} className="filter-checkbox">
                                <input
                                    type="checkbox"
                                    checked={activeFilters.includes('all') || activeFilters.includes(filter?.toLowerCase())}
                                    onChange={() => toggleFilter(filter?.toLowerCase())}
                                />
                                <span className="checkmark" style={{ background: (activeFilters.includes('all') || activeFilters.includes(filter?.toLowerCase())) ? (labelColors[filter?.toLowerCase()] || '#a855f7') : 'transparent', borderColor: labelColors[filter?.toLowerCase()] || '#a855f7' }}></span>
                                {filter}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Calendar */}
            <div className="calendar-main">
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
                                                <div
                                                    key={event.id}
                                                    className="event-pill"
                                                    style={{ background: event.color || 'var(--primary)' }}
                                                    title={`Double-click for details: ${event.title}`}
                                                    onDoubleClick={() => handleEventDoubleClick(event)}
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

                <style>{`
                .calendar-page {
                    display: flex;
                    min-height: calc(100vh - 80px);
                    background: var(--background);
                    max-width: 1600px;
                    margin: 0 auto;
                }

                .calendar-sidebar {
                    width: 240px;
                    min-width: 240px;
                    background: var(--surface-1, #1A1625);
                    border-right: 1px solid var(--border-color, rgba(255,255,255,0.1));
                    padding: 1.25rem;
                    display: flex;
                    flex-direction: column;
                    transition: width 0.3s ease;
                }

                .calendar-sidebar.closed {
                    width: 50px;
                    min-width: 50px;
                    padding: 0.75rem 0.5rem;
                }

                .calendar-sidebar.closed .sidebar-content,
                .calendar-sidebar.closed .sidebar-header h3 {
                    display: none;
                }

                .sidebar-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.25rem;
                }

                .sidebar-header h3 {
                    color: var(--text-color, #f8fafc);
                    margin: 0;
                    font-size: 1.1rem;
                }

                .sidebar-toggle {
                    background: var(--surface-2);
                    border: 1px solid var(--border-color);
                    color: var(--text-color);
                    padding: 0.35rem 0.5rem;
                    border-radius: 0.4rem;
                    cursor: pointer;
                    font-size: 0.75rem;
                }

                .mini-calendar {
                    background: var(--surface-2, #252038);
                    border-radius: 0.6rem;
                    padding: 0.75rem;
                    margin-bottom: 1.25rem;
                }

                .mini-calendar-header {
                    color: var(--text-color);
                    font-weight: 600;
                    text-align: center;
                    font-size: 0.9rem;
                }

                .filter-section {
                    background: var(--surface-2, #252038);
                    border-radius: 0.6rem;
                    padding: 0.75rem;
                }

                .filter-section h4 {
                    color: var(--text-color, #f8fafc);
                    margin: 0 0 0.75rem 0;
                    font-size: 0.85rem;
                    font-weight: 600;
                }

                .filter-checkbox {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.5rem 0;
                    cursor: pointer;
                    color: var(--text-muted, #94a3b8);
                    font-size: 0.8rem;
                    transition: color 0.2s;
                }

                .filter-checkbox:hover {
                    color: var(--text-color);
                }

                .filter-checkbox input {
                    display: none;
                }

                .filter-checkbox .checkmark {
                    width: 16px;
                    height: 16px;
                    border: 2px solid var(--border-color);
                    border-radius: 4px;
                    transition: all 0.2s;
                }

                .calendar-main {
                    flex: 1;
                    padding: 1.25rem;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    max-width: 100%;
                }

                .calendar-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.25rem;
                    background: var(--surface-1, #1A1625);
                    padding: 1rem 1.25rem;
                    border-radius: 0.75rem;
                    border: 1px solid var(--border-color, rgba(255,255,255,0.1));
                    gap: 1rem;
                }

                .calendar-title {
                    color: var(--text-color);
                    margin: 0;
                    font-size: 1.5rem;
                }

                .calendar-controls {
                    display: flex;
                    gap: 0.5rem;
                }

                .calendar-nav-btn {
                    background: var(--surface-2);
                    border: 1px solid var(--border-color);
                    color: var(--text-color);
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.85rem;
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
                    border-radius: 0.75rem;
                    border: 1px solid var(--border-color);
                    scrollbar-width: thin;
                    scrollbar-color: var(--border-color) transparent;
                    flex: 1;
                }

                .calendar-grid {
                    display: grid;
                    grid-template-columns: repeat(7, minmax(100px, 1fr));
                    background: var(--border-color);
                    gap: 1px;
                    min-width: 700px;
                }

                .calendar-day-label {
                    background: var(--surface-2);
                    padding: 0.6rem 0.5rem;
                    text-align: center;
                    font-weight: 700;
                    color: var(--primary);
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    border-bottom: 1px solid var(--border-color);
                }

                .calendar-day {
                    background: var(--surface-1);
                    min-height: 85px;
                    padding: 0.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.35rem;
                    transition: background 0.2s;
                }

                .calendar-day.today {
                    background: rgba(34, 192, 230, 0.05);
                    border: 1px solid var(--primary);
                    position: relative;
                    z-index: 1;
                }

                .day-number {
                    font-weight: 700;
                    font-size: 0.9rem;
                    color: var(--text-color);
                }

                .calendar-day.today .day-number {
                    color: var(--primary);
                }

                .day-events {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    overflow: hidden;
                }

                .event-pill {
                    color: white;
                    font-size: 0.65rem;
                    padding: 3px 6px;
                    border-radius: 3px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    cursor: pointer;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    transition: transform 0.1s;
                }

                .event-pill:hover {
                    transform: scale(1.02);
                }

                /* Large screens */
                @media (min-width: 1440px) {
                    .calendar-page {
                        max-width: 1400px;
                    }
                    .calendar-sidebar {
                        width: 260px;
                        min-width: 260px;
                    }
                    .calendar-grid {
                        grid-template-columns: repeat(7, minmax(120px, 1fr));
                    }
                    .calendar-day {
                        min-height: 100px;
                    }
                }

                /* Medium screens */
                @media (max-width: 1200px) {
                    .calendar-sidebar {
                        width: 220px;
                        min-width: 220px;
                    }
                    .calendar-grid {
                        grid-template-columns: repeat(7, minmax(90px, 1fr));
                        min-width: 630px;
                    }
                    .calendar-day {
                        min-height: 75px;
                    }
                }

                @media (max-width: 1024px) {
                    .calendar-sidebar {
                        width: 200px;
                        min-width: 200px;
                        padding: 1rem;
                    }
                    .calendar-main {
                        padding: 1rem;
                    }
                    .calendar-grid {
                        grid-template-columns: repeat(7, minmax(80px, 1fr));
                        min-width: 560px;
                    }
                    .calendar-day {
                        min-height: 70px;
                        padding: 0.4rem;
                    }
                    .day-number {
                        font-size: 0.8rem;
                    }
                    .event-pill {
                        font-size: 0.6rem;
                        padding: 2px 4px;
                    }
                }

                @media (max-width: 768px) {
                    .calendar-page {
                        flex-direction: column;
                    }
                    .calendar-sidebar {
                        width: 100%;
                        min-width: 100%;
                        border-right: none;
                        border-bottom: 1px solid var(--border-color);
                        padding: 0.75rem;
                    }
                    .sidebar-content {
                        display: flex;
                        gap: 1rem;
                    }
                    .mini-calendar {
                        margin-bottom: 0;
                        flex: 1;
                    }
                    .filter-section {
                        flex: 2;
                    }
                    .filter-section h4 {
                        margin-bottom: 0.5rem;
                    }
                    .filter-checkbox {
                        padding: 0.3rem 0;
                    }
                    .calendar-main {
                        padding: 0.75rem;
                    }
                    .calendar-header {
                        flex-direction: column;
                        align-items: stretch;
                        padding: 0.75rem;
                        gap: 0.75rem;
                        text-align: center;
                    }
                    .calendar-title {
                        font-size: 1.25rem;
                    }
                    .calendar-controls {
                        justify-content: center;
                    }
                    .calendar-nav-btn {
                        padding: 0.4rem 0.75rem;
                        font-size: 0.75rem;
                        flex: 1;
                    }
                    .calendar-grid {
                        grid-template-columns: repeat(7, minmax(45px, 1fr));
                        min-width: 315px;
                    }
                    .calendar-day {
                        min-height: 60px;
                        padding: 0.3rem;
                    }
                    .day-number {
                        font-size: 0.75rem;
                    }
                    .calendar-day-label {
                        padding: 0.5rem 0.25rem;
                        font-size: 0.65rem;
                    }
                    .event-pill {
                        font-size: 0.55rem;
                        padding: 2px 3px;
                    }
                }

                /* Small mobile screens */
                @media (max-width: 480px) {
                    .sidebar-content {
                        flex-direction: column;
                        gap: 0.75rem;
                    }
                    .calendar-grid {
                        grid-template-columns: repeat(7, minmax(38px, 1fr));
                        min-width: 266px;
                    }
                    .calendar-day {
                        min-height: 50px;
                        padding: 0.2rem;
                    }
                    .day-number {
                        font-size: 0.7rem;
                    }
                    .calendar-day-label {
                        padding: 0.4rem 0.15rem;
                        font-size: 0.55rem;
                    }
                    .event-pill {
                        font-size: 0.5rem;
                        padding: 1px 2px;
                        border-radius: 2px;
                    }
                    .calendar-title {
                        font-size: 1.1rem;
                    }
                    .calendar-nav-btn {
                        padding: 0.35rem 0.5rem;
                        font-size: 0.7rem;
                    }
                }
                /* Event Details Modal */
                .event-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
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
                    background: var(--surface-1, #1A1625);
                    border-radius: 1rem;
                    border: 1px solid var(--border-color, rgba(255,255,255,0.1));
                    max-width: 500px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: slideUp 0.3s ease;
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .event-modal-header {
                    padding: 1.25rem 1.5rem;
                    border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.1));
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 1rem;
                }

                .event-modal-header h2 {
                    margin: 0;
                    color: var(--text-color, #f8fafc);
                    font-size: 1.25rem;
                    line-height: 1.4;
                }

                .modal-close-btn {
                    background: var(--surface-2, #252038);
                    border: 1px solid var(--border-color);
                    color: var(--text-color);
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1.2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }

                .modal-close-btn:hover {
                    background: var(--primary);
                    border-color: var(--primary);
                }

                .event-modal-body {
                    padding: 1.5rem;
                }

                .event-detail-row {
                    display: flex;
                    gap: 1rem;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.05));
                }

                .event-detail-row:last-child {
                    border-bottom: none;
                }

                .event-detail-label {
                    font-size: 0.8rem;
                    color: var(--text-muted, #94a3b8);
                    min-width: 80px;
                    font-weight: 500;
                }

                .event-detail-value {
                    font-size: 0.9rem;
                    color: var(--text-color, #f8fafc);
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

                .event-modal-footer {
                    padding: 1rem 1.5rem;
                    border-top: 1px solid var(--border-color, rgba(255,255,255,0.1));
                    display: flex;
                    gap: 0.75rem;
                    justify-content: flex-end;
                }

                .event-modal-btn {
                    padding: 0.6rem 1.25rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .event-modal-btn.secondary {
                    background: var(--surface-2);
                    border: 1px solid var(--border-color);
                    color: var(--text-color);
                }

                .event-modal-btn.secondary:hover {
                    background: var(--surface-1);
                }

                .event-modal-btn.primary {
                    background: var(--primary);
                    border: 1px solid var(--primary);
                    color: white;
                }

                .event-modal-btn.primary:hover {
                    opacity: 0.9;
                }

                @media (max-width: 480px) {
                    .event-modal {
                        margin: 0.5rem;
                        max-height: 85vh;
                    }
                    .event-modal-header {
                        padding: 1rem;
                    }
                    .event-modal-header h2 {
                        font-size: 1.1rem;
                    }
                    .event-modal-body {
                        padding: 1rem;
                    }
                    .event-detail-row {
                        flex-direction: column;
                        gap: 0.25rem;
                    }
                    .event-detail-label {
                        min-width: auto;
                    }
                }
            `}</style>
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
                                        style={{ background: selectedEvent.color || 'var(--primary)' }}
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
                                            style={{ color: 'var(--primary)', textDecoration: 'none' }}
                                        >
                                            {selectedEvent.url}
                                        </a>
                                    </span>
                                </div>
                            )}
                            {selectedEvent.allDay && (
                                <div className="event-detail-row">
                                    <span className="event-detail-label">All Day</span>
                                    <span className="event-detail-value">Yes</span>
                                </div>
                            )}
                        </div>
                        <div className="event-modal-footer">
                            <button className="event-modal-btn secondary" onClick={closeModal}>Close</button>
                            {selectedEvent.url && (
                                <a
                                    href={selectedEvent.url.startsWith('http') ? selectedEvent.url : `https://${selectedEvent.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="event-modal-btn primary"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Join Meeting
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarPage;
