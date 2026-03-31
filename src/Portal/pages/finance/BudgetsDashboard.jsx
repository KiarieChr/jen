import React from 'react';
import BudgetsList from '../../components/finance/budgets/BudgetsList';

const BudgetsDashboard = () => {
    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Budgets</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Create and manage ministry budgets and track utilization.</p>
            </div>
            <BudgetsList />
        </div>
    );
};

export default BudgetsDashboard;
