import React, { useState, useEffect } from 'react';
import { API_BASE_URL as API_URL } from '../../services/api';

const TeamSection = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetch(`${API_URL}get_team.php`);
                const data = await response.json();
                if (data.success) {
                    setTeam(data.data.team || []);
                }
            } catch (err) {
                console.error('Error fetching team:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    if (loading) return null; // Or a skeleton
    if (team.length === 0) return null;

    return (
        <section style={{ padding: '100px 0', background: 'linear-gradient(to bottom, #0d0d0d, #120D20)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '70px' }}>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: '800', color: 'white' }}>
                        Our <span style={{ color: 'var(--primary)' }}>Organogram</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '10px' }}>
                        The dedicated leadership of Jesus Enthroned Network
                    </p>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '2.5rem' 
                }}>
                    {team.map((member, index) => (
                        <div key={member.id} className="team-card" style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: '30px',
                            padding: '30px',
                            textAlign: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ 
                                width: '180px', 
                                height: '180px', 
                                borderRadius: '50%', 
                                margin: '0 auto 25px',
                                padding: '8px',
                                border: '2px solid var(--primary)',
                                position: 'relative'
                            }}>
                                <img 
                                    src={member.image_url ? (member.image_url.startsWith('http') ? member.image_url : `${API_URL.replace('api/', '')}${member.image_url}`) : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop'} 
                                    alt={member.name} 
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        borderRadius: '50%', 
                                        objectFit: 'cover' 
                                    }} 
                                />
                            </div>

                            <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px' }}>
                                {member.name}
                            </h3>
                            <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                {member.role}
                            </p>
                            
                            {member.bio && (
                                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '15px' }}>
                                    {member.bio}
                                </p>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
                                {member.twitter_url && <a href={member.twitter_url} style={{ color: 'white', opacity: 0.5 }}><i className="bi bi-twitter-x"></i></a>}
                                {member.facebook_url && <a href={member.facebook_url} style={{ color: 'white', opacity: 0.5 }}><i className="bi bi-facebook"></i></a>}
                                {member.instagram_url && <a href={member.instagram_url} style={{ color: 'white', opacity: 0.5 }}><i className="bi bi-instagram"></i></a>}
                                {member.linkedin_url && <a href={member.linkedin_url} style={{ color: 'white', opacity: 0.5 }}><i className="bi bi-linkedin"></i></a>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                .team-card:hover {
                    transform: translateY(-10px);
                    background: rgba(255, 255, 255, 0.05);
                    border-color: var(--primary);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }
            `}</style>
        </section>
    );
};

export default TeamSection;
