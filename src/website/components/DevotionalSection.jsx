import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://jesusenthroned_net.local/api/';

const DevotionalCard = ({ title, verse, reference, date, author, image }) => (
    <div style={{
        background: 'white',
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        cursor: 'pointer'
    }}>
        <div style={{ position: 'relative', height: '240px' }}>
            <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <span style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'rgba(0,0,0,0.75)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                📖 Devotional
            </span>
        </div>
        <div style={{ padding: '1.5rem', color: 'var(--background)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                "{verse}"
            </p>
            <p style={{ color: 'var(--primary-hover)', fontSize: '0.875rem', marginBottom: '1rem', fontWeight: '600' }}>
                — {reference}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.875rem' }}>
                <span>📅 {date}</span>
                <span>{author}</span>
            </div>
        </div>
    </div>
);

const DevotionalSection = ({ devotionals: propDevotionals, loading: propLoading }) => {
    const [devotionals, setDevotionals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Default fallback devotionals
    const defaultDevotionals = [
        {
            id: 1,
            title: 'Walking in Faith',
            verse: 'For we walk by faith, not by sight.',
            reference: '2 Corinthians 5:7',
            date: 'March 10, 2026',
            author: 'Pastor James',
            image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1000&auto=format&fit=crop'
        },
        {
            id: 2,
            title: 'The Peace of God',
            verse: 'And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
            reference: 'Philippians 4:7',
            date: 'March 9, 2026',
            author: 'Pastor Grace',
            image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1000&auto=format&fit=crop'
        },
        {
            id: 3,
            title: 'Trust in the Lord',
            verse: 'Trust in the LORD with all your heart and lean not on your own understanding.',
            reference: 'Proverbs 3:5',
            date: 'March 8, 2026',
            author: 'Pastor James',
            image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1000&auto=format&fit=crop'
        }
    ];

    useEffect(() => {
        // If devotionals passed as props, use those
        if (propDevotionals?.length > 0) {
            setDevotionals(propDevotionals);
            setLoading(false);
            return;
        }

        const fetchDevotionals = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}get_devotionals.php?limit=3&featured=1`);
                const data = await response.json();

                if (data.success && data.devotionals?.length > 0) {
                    // Map API response to component format
                    const formattedDevotionals = data.devotionals.map(dev => ({
                        id: dev.id,
                        title: dev.title,
                        verse: dev.scripture_text || 'Scripture text unavailable',
                        reference: dev.scripture_reference || 'Reference unavailable',
                        date: dev.date_formatted,
                        author: dev.author?.name || 'Unknown Author',
                        image: dev.featured_image || `https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1000&auto=format&fit=crop`,
                        slug: dev.slug
                    }));
                    setDevotionals(formattedDevotionals);
                } else {
                    // Fall back to default devotionals
                    setDevotionals(defaultDevotionals);
                }
            } catch (err) {
                console.error('Error fetching devotionals:', err);
                setError(err.message);
                // Fall back to default devotionals on error
                setDevotionals(defaultDevotionals);
            } finally {
                setLoading(false);
            }
        };

        fetchDevotionals();
    }, [propDevotionals]);

    const displayDevotionals = devotionals.length > 0 ? devotionals : defaultDevotionals;
    const isLoading = propLoading !== undefined ? propLoading : loading;

    return (
        <section className="section-padding" style={{ background: 'var(--secondary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{
                        background: 'rgba(34, 193, 230, 0.1)',
                        color: 'var(--primary-hover)',
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Daily Inspiration
                    </span>
                    <h2 style={{
                        fontSize: '3rem',
                        fontWeight: '800',
                        color: 'var(--background)',
                        margin: '1.5rem 0 1rem'
                    }}>
                        Today's Devotional
                    </h2>
                    <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                        Start your day with God's Word and be inspired by daily devotional messages.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    {isLoading ? (
                        // Loading skeleton
                        [...Array(3)].map((_, index) => (
                            <div key={index} style={{
                                background: 'white',
                                borderRadius: '1rem',
                                overflow: 'hidden',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                            }}>
                                <div style={{ height: '240px', background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)', animation: 'shimmer 1.5s infinite' }}></div>
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ height: '24px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
                                    <div style={{ height: '60px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
                                    <div style={{ height: '16px', background: '#f0f0f0', borderRadius: '4px', width: '60%' }}></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        displayDevotionals.map((devotional, index) => (
                            <DevotionalCard key={devotional.id || index} {...devotional} />
                        ))
                    )}
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Link to="/devotionals" className="btn btn-hover-effect" style={{
                        background: 'var(--background)',
                        color: 'white',
                        padding: '1rem 2rem',
                        textDecoration: 'none',
                        display: 'inline-block'
                    }}>
                        View All Devotionals →
                    </Link>
                </div>
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @media (max-width: 968px) {
                    .section-padding {
                        padding: 3rem 0 !important;
                    }
                    h2 {
                        fontSize: 2.25rem !important;
                        marginTop: 1rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default DevotionalSection;
