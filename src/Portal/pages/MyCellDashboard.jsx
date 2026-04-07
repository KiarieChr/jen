import React, { useState, useEffect } from 'react';
import CellHeader from '../components/cells/my-cell/CellHeader';
import CellLeaderCard from '../components/cells/my-cell/CellLeaderCard';
import CellMembersList from '../components/cells/my-cell/CellMembersList';
import CellMeetingsWidget from '../components/cells/my-cell/CellMeetingsWidget';
import api from '../../services/api';

const MyCellDashboard = () => {
    const [cellData, setCellData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notAssigned, setNotAssigned] = useState(false);

    useEffect(() => {
        const fetchMyCell = async () => {
            try {
                const res = await api.get('get_my_cell.php');
                if (res.success && res.data.assigned) {
                    setCellData(res.data);
                } else {
                    setNotAssigned(true);
                }
            } catch (err) {
                console.error('Failed to fetch cell data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyCell();
    }, []);

    if (loading) {
        return (
            <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem', textAlign: 'center', paddingTop: '4rem' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Loading cell data...</div>
            </div>
        );
    }

    if (notAssigned) {
        return (
            <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem', textAlign: 'center', paddingTop: '4rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏘️</div>
                <h2 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>Not Assigned to a Cell</h2>
                <p style={{ color: 'var(--text-muted)' }}>You haven't been assigned to a cell group yet. Please contact your administrator.</p>
            </div>
        );
    }
    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            <CellHeader cell={cellData?.cell} />

            <div className="my-cell-grid">
                <div style={{ gridArea: 'leader' }}>
                    <CellLeaderCard cell={cellData?.cell} />
                </div>
                <div style={{ gridArea: 'meetings' }}>
                    <CellMeetingsWidget cell={cellData?.cell} memberCount={cellData?.member_count} />
                </div>
                <div style={{ gridArea: 'members' }}>
                    <CellMembersList members={cellData?.members || []} />
                </div>
            </div>

            <style>{`
                .my-cell-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                    grid-template-areas: 
                        "leader"
                        "meetings"
                        "members";
                }

                @media (min-width: 1024px) {
                    .my-cell-grid {
                        grid-template-columns: 1fr 1fr 1.5fr;
                        grid-template-areas: 
                            "leader meetings members";
                        align-items: start;
                    }
                }
            `}</style>
        </div>
    );
};

export default MyCellDashboard;
