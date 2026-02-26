import React, { useState } from 'react';
import CellStatsCards from '../components/cells/CellStatsCards';
import CellsList from '../components/cells/CellsList';
import CreateCellModal from '../components/cells/CreateCellModal';

const CellsDashboard = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
            <CellStatsCards />

            {/* Listing & Management */}
            <CellsList />

            {/* Modals */}
            {isCreateModalOpen && <CreateCellModal onClose={() => setIsCreateModalOpen(false)} />}
        </div>
    );
};

export default CellsDashboard;
