import React from 'react';
import CellHeader from '../components/cells/my-cell/CellHeader';
import CellLeaderCard from '../components/cells/my-cell/CellLeaderCard';
import CellMembersList from '../components/cells/my-cell/CellMembersList';
import CellMeetingsWidget from '../components/cells/my-cell/CellMeetingsWidget';

const MyCellDashboard = () => {
    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            <CellHeader />

            <div className="my-cell-grid">
                <div style={{ gridArea: 'leader' }}>
                    <CellLeaderCard />
                </div>
                <div style={{ gridArea: 'meetings' }}>
                    <CellMeetingsWidget />
                </div>
                <div style={{ gridArea: 'members' }}>
                    <CellMembersList />
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
