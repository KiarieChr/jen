import React from 'react';

const CellGroupsPanel = ({ onAssign }) => {
    const cells = [
        { id: 1, name: 'Goshen Alpha', leader: 'John Doe', current: 12, max: 15, location: 'Westlands' },
        { id: 2, name: 'Zion Youth', leader: 'Sarah Smith', current: 14, max: 15, location: 'Kilimani' },
        { id: 3, name: 'Bethel Men', leader: 'Mike Jones', current: 8, max: 12, location: 'CBD' },
        { id: 4, name: 'Grace Women', leader: 'Mary Jane', current: 15, max: 15, location: 'Ngong Rd' },
    ];

    const getCapacityColor = (current, max) => {
        const ratio = current / max;
        if (ratio >= 1) return '#ef4444'; // Red
        if (ratio >= 0.8) return '#f59e0b'; // Amber
        return '#22c1e6'; // Blue
    };

    return (
        <div style={{
            background: '#1A1625',
            borderRadius: '1rem',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden'
        }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ margin: '0', color: '#eff3c1', fontSize: '1rem' }}>Available Cell Groups</h3>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'grid', gap: '1rem' }}>
                {cells.map(cell => {
                    const capacityColor = getCapacityColor(cell.current, cell.max);
                    const isFull = cell.current >= cell.max;

                    return (
                        <div key={cell.id} style={{
                            background: '#120D20',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                <div>
                                    <div style={{ color: '#eff3c1', fontWeight: '600', fontSize: '0.95rem' }}>{cell.name}</div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{cell.location} • {cell.leader}</div>
                                </div>
                                <button
                                    onClick={() => onAssign(cell.id)}
                                    disabled={isFull}
                                    style={{
                                        background: isFull ? 'rgba(255,255,255,0.05)' : 'rgba(34, 193, 230, 0.1)',
                                        color: isFull ? '#64748b' : '#22c1e6',
                                        border: isFull ? 'none' : '1px solid #22c1e6',
                                        borderRadius: '0.5rem',
                                        padding: '0.3rem 0.8rem',
                                        fontSize: '0.75rem',
                                        cursor: isFull ? 'not-allowed' : 'pointer',
                                        fontWeight: '600'
                                    }}
                                >
                                    {isFull ? 'Full' : 'Assign'}
                                </button>
                            </div>

                            {/* Capacity Bar */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${(cell.current / cell.max) * 100}%`,
                                        height: '100%',
                                        background: capacityColor,
                                        borderRadius: '3px'
                                    }}></div>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: capacityColor, fontWeight: '600', width: '45px', textAlign: 'right' }}>
                                    {cell.current}/{cell.max}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CellGroupsPanel;
