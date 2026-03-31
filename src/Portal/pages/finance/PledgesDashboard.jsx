import React, { useState } from 'react';
import PledgesTable from '../../components/finance/pledges/PledgesTable';
import MakePledgeModal from '../../components/finance/pledges/MakePledgeModal';
import RedeemPledgeModal from '../../components/finance/pledges/RedeemPledgeModal';

const PledgesDashboard = () => {
    const [pledgeModal, setPledgeModal] = useState(false);
    const [redeemPledge, setRedeemPledge] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => setRefreshKey(k => k + 1);

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Pledges</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>View and manage member pledges and redemption progress.</p>
            </div>
            <PledgesTable
                refreshKey={refreshKey}
                onMakePledge={() => setPledgeModal(true)}
                onRedeemPledge={(p) => setRedeemPledge(p)}
            />
            {pledgeModal && <MakePledgeModal onClose={() => setPledgeModal(false)} onSuccess={handleSuccess} />}
            {redeemPledge && <RedeemPledgeModal pledge={redeemPledge} onClose={() => setRedeemPledge(null)} onSuccess={handleSuccess} />}
        </div>
    );
};

export default PledgesDashboard;
