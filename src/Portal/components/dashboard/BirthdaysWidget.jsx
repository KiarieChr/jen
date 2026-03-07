import React, { useState, useEffect, useContext } from 'react';
import api from '../../../services/api';
import DashboardCard from './DashboardCard';
import { ThemeContext } from '../../../context/ThemeContext';

const BirthdaysWidget = () => {
    const [birthdayData, setBirthdayData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { theme } = useContext(ThemeContext);
    const isLight = theme === 'light';

    // Theme colors
    const colors = {
        text: isLight ? '#1e293b' : '#ffffff',
        textMuted: isLight ? '#64748b' : 'rgba(255,255,255,0.5)',
        surface: isLight ? '#f8fafc' : 'rgba(255,255,255,0.05)',
        surfaceAlt: isLight ? '#f1f5f9' : 'rgba(255,255,255,0.08)',
        border: isLight ? '#e2e8f0' : 'rgba(255,255,255,0.1)'
    };

    useEffect(() => {
        const fetchBirthdays = async () => {
            try {
                setLoading(true);
                const response = await api.get('/get_upcoming_birthdays.php');
                if (response.data.success) {
                    setBirthdayData(response.data.data);
                }
            } catch (err) {
                console.error('Error fetching birthdays:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBirthdays();
    }, []);

    const myBirthday = birthdayData?.my_birthday;
    const upcoming = birthdayData?.upcoming_birthdays || [];

    if (loading) {
        return (
            <DashboardCard title="Birthdays" icon="🎂">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '3rem 0',
                    color: colors.textMuted
                }}>
                    Loading...
                </div>
            </DashboardCard>
        );
    }

    return (
        <DashboardCard title="Birthdays" icon="🎂">
            {/* My Birthday */}
            {myBirthday && (
                <div style={{
                    background: myBirthday.is_today
                        ? 'linear-gradient(135deg, #fef3c7, #fde68a)'
                        : colors.surface,
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: myBirthday.is_today ? '#fbbf24' : colors.surfaceAlt,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                    }}>
                        {myBirthday.is_today ? '🎉' : '🎈'}
                    </div>
                    <div>
                        <div style={{ color: colors.textMuted, fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '600' }}>
                            {myBirthday.is_today ? "It's Your Birthday!" : 'Your Birthday'}
                        </div>
                        <div style={{ color: myBirthday.is_today ? '#1e293b' : colors.text, fontWeight: '700' }}>{myBirthday.month_day}</div>
                        <div style={{ color: myBirthday.is_today ? '#f59e0b' : colors.textMuted, fontSize: '0.85rem' }}>
                            {myBirthday.is_today ? 'Happy Birthday! 🎂' : `${myBirthday.days_until} days to go`}
                        </div>
                    </div>
                </div>
            )}

            {/* Upcoming List */}
            <div>
                <div style={{ fontSize: '0.75rem', color: colors.textMuted, textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.75rem' }}>
                    Upcoming ({birthdayData?.birthdays_this_month || 0} this month)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto' }}>
                    {upcoming.length > 0 ? upcoming.slice(0, 6).map((bday, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    background: bday.is_today ? '#fef3c7' : colors.surfaceAlt,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: bday.is_today ? '#f59e0b' : colors.text,
                                    fontSize: '0.85rem',
                                    fontWeight: '600'
                                }}>
                                    {bday.first_name?.charAt(0) || bday.name?.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ color: colors.text, fontSize: '0.9rem', fontWeight: '500' }}>{bday.name}</div>
                                    <div style={{ color: colors.textMuted, fontSize: '0.75rem' }}>
                                        {bday.is_today ? '🎂 Today!' : bday.is_this_week ? 'This week' : `${bday.days_until} days`}
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ color: bday.is_today ? '#f59e0b' : colors.text, fontSize: '0.85rem', fontWeight: '600' }}>
                                    {bday.birthday}
                                </div>
                                {bday.phone && (
                                    <button style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#5d87ff',
                                        fontSize: '0.75rem',
                                        cursor: 'pointer',
                                        padding: 0,
                                        fontWeight: '500'
                                    }}>
                                        Send Wish
                                    </button>
                                )}
                            </div>
                        </div>
                    )) : (
                        <div style={{ color: colors.textMuted, fontSize: '0.85rem', textAlign: 'center', padding: '2rem' }}>
                            No upcoming birthdays
                        </div>
                    )}
                </div>
            </div>
        </DashboardCard>
    );
};

export default BirthdaysWidget;
