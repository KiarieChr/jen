import React, { useState, useEffect, useCallback } from 'react';
import CellStatsCards from '../components/cells/CellStatsCards';
import CellsList from '../components/cells/CellsList';
import CreateCellModal from '../components/cells/CreateCellModal';
import api from '../../services/api';

const CellsDashboard = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [cells, setCells] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCells = useCallback(async (search = '') => {
        try {
            setLoading(true);
            const res = await api.get('get_cells.php', { params: { search } });
            if (res.success) {
                setCells(res.data.cells);
                setStats(res.data.stats);
            }
        } catch (err) {
            console.error('Failed to fetch cells:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchCells(); }, [fetchCells]);

    const handleCellCreated = () => {
        setIsCreateModalOpen(false);
        fetchCells();
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Cells Management</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Oversee and manage all cell groups, leaders, and engagement.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    style={{
                        background: 'var(--primary)',
                        color: 'var(--bg-color)',
                        border: 'none',
                        borderRadius: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.95rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 15px rgba(34, 193, 230, 0.3)'
                    }}
                >
                    <span style={{ fontSize: '1.2rem' }}>+</span> Create New Cell
                </button>
            </div>

            {/* Statistics */}
            <CellStatsCards stats={stats} loading={loading} />

            {/* Listing & Management */}
            <CellsList cells={cells} loading={loading} onSearch={fetchCells} />

            {/* Modals */}
            {isCreateModalOpen && <CreateCellModal onClose={() => setIsCreateModalOpen(false)} onCreated={handleCellCreated} />}
        </div>
    );
};

export default CellsDashboard;
