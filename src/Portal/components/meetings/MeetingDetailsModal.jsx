import React, { useState } from 'react';
// import MeetingAttendanceForm from './MeetingAttendanceForm';
import './MeetingDetailsModal.css';

const MeetingDetailsModal = ({ meeting, onClose }) => {
    const [copied, setCopied] = useState(false);
    if (!meeting) return null;
    const attendanceUrl = `${window.location.origin}/meetings/${meeting.id}/attend`;
    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-content">
                <h2 style={{ margin: 0, color: 'var(--primary)' }}>{meeting.title}</h2>
                <div style={{ color: 'var(--text-muted)', marginBottom: 12 }}>{meeting.category}</div>
                <div><b>Date:</b> {meeting.date} {meeting.time} - {meeting.end_time}</div>
                <div><b>Facilitator:</b> {meeting.facilitator}</div>
                {meeting.meeting_link && <div><b>Meeting Link:</b> <a href={meeting.meeting_link} target="_blank" rel="noopener noreferrer">{meeting.meeting_link}</a></div>}
                <div style={{ margin: '18px 0 8px 0', fontSize: '0.97rem' }}>
                    <b>Attendance Link:</b> <a href={attendanceUrl} target="_blank" rel="noopener noreferrer">{attendanceUrl}</a>
                    <button
                        style={{ marginLeft: 8, padding: '0.2rem 0.7rem', borderRadius: 5, border: 'none', background: 'var(--primary)', color: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}
                        onClick={() => {
                            navigator.clipboard.writeText(attendanceUrl);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1200);
                        }}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <button onClick={onClose} style={{ padding: '0.5rem 1.2rem', borderRadius: 6, border: 'none', background: 'var(--primary)', color: '#fff', cursor: 'pointer' }}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default MeetingDetailsModal;
