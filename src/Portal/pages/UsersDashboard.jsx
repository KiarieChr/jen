import React, { useState } from 'react';
import UserStatsCards from '../components/users/UserStatsCards';
import UserActionsMenu from '../components/users/UserActionsMenu';
import UsersTable from '../components/users/UsersTable';
import UserAuditLog from '../components/users/UserAuditLog';
import AddUserModal from '../components/users/AddUserModal';
import AssignRolesModal from '../components/users/AssignRolesModal';
import BulkDeactivateModal from '../components/users/BulkDeactivateModal';

const UsersDashboard = () => {
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isAssignRolesModalOpen, setIsAssignRolesModalOpen] = useState(false);
    const [isBulkDeactivateModalOpen, setIsBulkDeactivateModalOpen] = useState(false);
    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: '#eff3c1' }}>Users & Security</h1>
                    <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Manage system access and roles.</p>
                </div>
            </div>

            {/* Stats */}
            <UserStatsCards />

            {/* Actions */}
            <UserActionsMenu
                onAddUser={() => setIsAddUserModalOpen(true)}
                onAssignRoles={() => setIsAssignRolesModalOpen(true)}
                onBulkDeactivate={() => setIsBulkDeactivateModalOpen(true)}
            />

            {/* Main Content Grid */}
            <div className="users-dashboard-grid">
                <div style={{ gridArea: 'table' }}>
                    <UsersTable />
                </div>
                <div style={{ gridArea: 'audit' }}>
                    <UserAuditLog />
                </div>
            </div>

            {isAddUserModalOpen && <AddUserModal onClose={() => setIsAddUserModalOpen(false)} />}
            {isAssignRolesModalOpen && <AssignRolesModal onClose={() => setIsAssignRolesModalOpen(false)} />}
            {isBulkDeactivateModalOpen && <BulkDeactivateModal onClose={() => setIsBulkDeactivateModalOpen(false)} />}

            <style>{`
                .users-dashboard-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                    grid-template-areas: 
                        "audit"
                        "table";
                }

                @media (min-width: 1024px) {
                    .users-dashboard-grid {
                        grid-template-columns: 3fr 1fr;
                        grid-template-areas: 
                            "table audit";
                    }
                }
            `}</style>
        </div>
    );
};

export default UsersDashboard;
