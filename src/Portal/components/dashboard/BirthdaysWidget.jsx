import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const BirthdaysWidget = () => {
    const [birthdayData, setBirthdayData] = useState(null);
    const [loading, setLoading] = useState(true);

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
            <div style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--border-color)',
                borderRadius: '1rem',
                padding: '1.5rem',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ color: 'var(--text-muted)' }}>Loading...</div>
            </div>
        );
    }

    return (
        <div style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border-color)',
            borderRadius: '1rem',
            padding: '1.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
                🎂 Birthdays
            </h3>

            {/* My Birthday */}
            {myBirthday && (
                <div style={{
                    background: myBirthday.is_today
                        ? 'linear-gradient(135deg, #22c1e6, #2e2640)'
                        : 'linear-gradient(135deg, #120D20, #2e2640)',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--border-color)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{ fontSize: '1.5rem' }}>{myBirthday.is_today ? '🎉' : '🎈'}</div>
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                            {myBirthday.is_today ? "It's Your Birthday!" : 'Your Birthday'}
                        </div>
                        <div style={{ color: 'var(--text-color)', fontWeight: '700' }}>{myBirthday.month_day}</div>
                        <div style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>
                            {myBirthday.is_today ? 'Happy Birthday! 🎂' : `${myBirthday.days_until} days to go`}
                        </div>
                    </div>
                </div>
            )}

            {/* Upcoming List */}
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    Upcoming Birthdays ({birthdayData?.birthdays_this_month || 0} this month)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto' }}>
                    {upcoming.length > 0 ? upcoming.slice(0, 6).map((bday, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    background: bday.is_today ? 'var(--primary)' : 'var(--border-color)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: bday.is_today ? '#000' : 'var(--text-color)',
                                    fontSize: '0.8rem'
                                }}>
                                    {bday.first_name?.charAt(0) || bday.name?.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-color)', fontSize: '0.9rem', fontWeight: '500' }}>{bday.name}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                        {bday.is_today ? '🎂 Today!' : bday.is_this_week ? 'This week' : `${bday.days_until} days`}
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ color: bday.is_today ? 'var(--primary)' : 'var(--text-color)', fontSize: '0.85rem', fontWeight: '600' }}>
                                    {bday.birthday}
                                </div>
                                {bday.phone && (
                                    <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}>
                                        Send Wish
                                    </button>
                                )}
                            </div>
                        </div>
                    )) : (
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>
                            No upcoming birthdays
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BirthdaysWidget;
