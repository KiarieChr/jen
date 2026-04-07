import React, { useState, useEffect, useCallback } from 'react';
import AssignmentStatsCards from '../components/cells/assignment/AssignmentStatsCards';
import UnassignedMembersList from '../components/cells/assignment/UnassignedMembersList';
import CellGroupsPanel from '../components/cells/assignment/CellGroupsPanel';
import api from '../../services/api';

const AssignMembersDashboard = () => {
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [unassigned, setUnassigned] = useState([]);
    const [cells, setCells] = useState([]);
    const [stats, setStats] = useState(null);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async (search = '', location = '') => {
        try {
            setLoading(true);
            const [unassignedRes, cellsRes] = await Promise.all([
                api.get('get_unassigned_members.php', { params: { search, location } }),
                api.get('get_cells.php')
            ]);
            if (unassignedRes.success) {
                setUnassigned(unassignedRes.data.members);
                setStats(unassignedRes.data.stats);
                setLocations(unassignedRes.data.locations);
            }
            if (cellsRes.success) {
                setCells(cellsRes.data.cells);
            }
        } catch (err) {
            console.error('Failed to fetch assignment data:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const toggleSelection = (id) => {
        setSelectedMembers(prev =>
            prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
        );
    };

    const handleAssign = async (cellId) => {
        if (selectedMembers.length === 0) {
            alert('Please select at least one member to assign.');
            return;
        }
        try {
            const res = await api.post('assign_members.php', {
                cell_id: cellId,
                member_ids: selectedMembers
            });
            if (res.success) {
                setSelectedMembers([]);
                fetchData();
            } else {
                alert(res.error || 'Failed to assign members');
            }
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to assign members');
        }
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Assign Members</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Match unassigned members to suitable cell groups.</p>
            </div>

            <AssignmentStatsCards stats={stats} loading={loading} />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 2fr)',
                gap: '1.5rem',
                flex: 1,
                minHeight: 0
            }}>
                <UnassignedMembersList members={unassigned} locations={locations} selectedMembers={selectedMembers} toggleSelection={toggleSelection} onSearch={fetchData} loading={loading} />
                <CellGroupsPanel cells={cells} onAssign={handleAssign} />
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
