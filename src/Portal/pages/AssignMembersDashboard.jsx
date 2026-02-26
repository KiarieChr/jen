import React, { useState } from 'react';
import AssignmentStatsCards from '../components/cells/assignment/AssignmentStatsCards';
import UnassignedMembersList from '../components/cells/assignment/UnassignedMembersList';
import CellGroupsPanel from '../components/cells/assignment/CellGroupsPanel';

const AssignMembersDashboard = () => {
    const [selectedMembers, setSelectedMembers] = useState([]);

    const toggleSelection = (id) => {
        setSelectedMembers(prev =>
            prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
        );
    };

    const handleAssign = (cellId) => {
        if (selectedMembers.length === 0) {
            alert('Please select at least one member to assign.');
            return;
        }
        alert(`Successfully assigned ${selectedMembers.length} member(s) to Cell ID ${cellId}!`);
        setSelectedMembers([]); // Clear selection
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Assign Members</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Match unassigned members to suitable cell groups.</p>
            </div>

            <AssignmentStatsCards />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 2fr)',
                gap: '1.5rem',
                flex: 1,
                minHeight: 0 // Important for nested scrolling
            }}>
                <UnassignedMembersList selectedMembers={selectedMembers} toggleSelection={toggleSelection} />
                <CellGroupsPanel onAssign={handleAssign} />
            </div>

            <style>{`
                 @media (max-width: 1024px) {
                    div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                        grid-template-rows: 1fr 1fr;
                    }
                 }
            `}</style>
        </div>
    );
};

export default AssignMembersDashboard;
