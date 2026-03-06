import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const CellOverviewWidget = () => {
    const [cellData, setCellData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCellData = async () => {
            try {
                setLoading(true);
                const response = await api.get('/get_my_cell.php');
                if (response.data.success) {
                    setCellData(response.data.data);
                }
            } catch (err) {
                console.error('Error fetching cell data:', err);
                setError('Failed to load cell info');
            } finally {
                setLoading(false);
            }
        };
        fetchCellData();
    }, []);

    if (loading) {
        return (
            <div style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--border-color)',
                borderRadius: '1rem',
                padding: '1.5rem',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ color: 'var(--text-muted)' }}>Loading...</div>
            </div>
        );
    }

    if (!cellData?.assigned) {
        return (
            <div style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--border-color)',
                borderRadius: '1rem',
                padding: '1.5rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏠</div>
                <div style={{ color: 'var(--text-color)', fontWeight: '600', marginBottom: '0.5rem' }}>No Cell Assigned</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
                    You haven't been assigned to a cell group yet.
                </div>
            </div>
        );
    }

    const cell = cellData.cell;
    const members = cellData.members || [];
    const memberCount = cellData.member_count || members.length;

    return (
        <div style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-color)',
            borderRadius: '1rem',
            padding: '1.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    🏠 My Cell Group
                </h3>
                <button style={{ background: 'rgba(34, 193, 230, 0.1)', color: 'var(--primary)', border: 'none', borderRadius: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                    View Details
                </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ color: 'var(--text-color)', fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                    {cell?.name || 'My Cell'}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span>Leader:</span>
                    <span style={{ color: 'var(--text-color)', fontWeight: '600' }}>
                        {cell?.leader_name || 'Not assigned'}
                    </span>
                </div>
                {cell?.location && (
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                        📍 {cell.location}
                    </div>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Members</div>
                    <div style={{ color: 'var(--text-color)', fontSize: '1.25rem', fontWeight: '700' }}>{memberCount}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Meeting Day</div>
                    <div style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '700' }}>
                        {cell?.meeting_day || 'TBD'}
                    </div>
                </div>
            </div>

            {/* Members List */}
            {members.length > 0 && (
                <div style={{ marginTop: 'auto' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Cell Members
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '150px', overflowY: 'auto' }}>
                        {members.slice(0, 5).map((member, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    background: 'var(--border-color)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem',
                                    color: 'var(--text-color)'
                                }}>
                                    {member.first_name?.charAt(0) || '?'}
                                </div>
                                <span style={{ color: 'var(--text-color)' }}>
                                    {member.first_name} {member.last_name}
                                </span>
                            </div>
                        ))}
                        {members.length > 5 && (
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                +{members.length - 5} more
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CellOverviewWidget;
