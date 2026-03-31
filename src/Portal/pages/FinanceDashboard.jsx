import React, { useState } from 'react';
import FinanceStatsCards from '../components/finance/FinanceStatsCards';
import FinanceActionBar from '../components/finance/FinanceActionBar';
import TransactionsTable from '../components/finance/TransactionsTable';
import RecordIncomeModal from '../components/finance/RecordIncomeModal';
import RecordExpenseModal from '../components/finance/RecordExpenseModal';
import RecordContributionModal from '../components/finance/RecordContributionModal';
import CreateBudgetModal from '../components/finance/CreateBudgetModal';
import MakePledgeModal from '../components/finance/pledges/MakePledgeModal';

const FinanceDashboard = () => {
    const [incomeModal, setIncomeModal] = useState(false);
    const [expenseModal, setExpenseModal] = useState(false);
    const [contributionModal, setContributionModal] = useState(false);
    const [budgetModal, setBudgetModal] = useState(false);
    const [pledgeModal, setPledgeModal] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => setRefreshKey(k => k + 1);

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: 'var(--text-color)' }}>Financial Management</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Track income, expenses, contributions, pledges, and budgets.</p>
            </div>

            <FinanceStatsCards key={`stats-${refreshKey}`} />
            <FinanceActionBar
                onAddIncome={() => setIncomeModal(true)}
                onAddExpense={() => setExpenseModal(true)}
                onAddContribution={() => setContributionModal(true)}
                onAddBudget={() => setBudgetModal(true)}
                onAddPledge={() => setPledgeModal(true)}
            />
            <TransactionsTable key={`tx-${refreshKey}`} />

            {incomeModal && <RecordIncomeModal onClose={() => setIncomeModal(false)} onSuccess={handleSuccess} />}
            {expenseModal && <RecordExpenseModal onClose={() => setExpenseModal(false)} onSuccess={handleSuccess} />}
            {contributionModal && <RecordContributionModal onClose={() => setContributionModal(false)} onSuccess={handleSuccess} />}
            {budgetModal && <CreateBudgetModal onClose={() => setBudgetModal(false)} onSuccess={handleSuccess} />}
            {pledgeModal && <MakePledgeModal onClose={() => setPledgeModal(false)} onSuccess={handleSuccess} />}
        </div>
    );
};

export default FinanceDashboard;
