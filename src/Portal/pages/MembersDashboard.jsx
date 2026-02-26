import React, { useState } from 'react';
import MemberStatsCard from '../components/members/MemberStatsCard';
import MembersActionBar from '../components/members/MembersActionBar';
import MembersTable from '../components/members/MembersTable';
import CreateMemberModal from '../components/members/CreateMemberModal';
import UploadExcelModal from '../components/members/UploadExcelModal';
import NewMemberCategoryModal from '../components/members/NewMemberCategoryModal';
import CreateCellModal from '../components/cells/CreateCellModal';

const MembersDashboard = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isCellModalOpen, setIsCellModalOpen] = useState(false);
    const [isCommittedModalOpen, setIsCommittedModalOpen] = useState(false);

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Members Database</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>View, manage, and track all ministry members.</p>
            </div>

            {/* Smart Alerts (Optional Enhancement) */}
            <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
            }}>
                <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                <div style={{ color: '#fcd34d', fontSize: '0.9rem' }}>
                    <strong>Action Required:</strong> You have 130 unlinked committed members. <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Review Now</span>
                </div>
            </div>

            {/* Stats */}
            <MemberStatsCard />

            {/* Action Bar */}
            <MembersActionBar
                onNewMember={() => setIsCreateModalOpen(true)}
                onUploadExcel={() => setIsUploadModalOpen(true)}
                onNewCategory={() => setIsCategoryModalOpen(true)}
                onNewCellGroup={() => setIsCellModalOpen(true)}
                onAddCommittedMember={() => setIsCommittedModalOpen(true)}
            />

            {/* Data Table */}
            <MembersTable />

            {/* Modal */}
            {isCreateModalOpen && <CreateMemberModal onClose={() => setIsCreateModalOpen(false)} />}
            {isCommittedModalOpen && <CreateMemberModal onClose={() => setIsCommittedModalOpen(false)} initialStatus="Committed Member" />}
            {isUploadModalOpen && <UploadExcelModal onClose={() => setIsUploadModalOpen(false)} />}
            {isCategoryModalOpen && <NewMemberCategoryModal onClose={() => setIsCategoryModalOpen(false)} />}
            {isCellModalOpen && <CreateCellModal onClose={() => setIsCellModalOpen(false)} />}
        </div>
    );
};

export default MembersDashboard;
