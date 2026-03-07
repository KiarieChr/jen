 import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DevotionalSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        const section = document.getElementById('devotional-section');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    // Sample devotional data - can be replaced with API call
    const todayDevotional = {
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
        title: "Walking in Faith",
        verse: "For we walk by faith, not by sight.",
        reference: "2 Corinthians 5:7",
        excerpt: "Faith is not about having all the answers or seeing the complete picture. It's about trusting God's plan even when the path ahead seems unclear. Today, let us embrace the journey of faith, knowing that He who began a good work in us will carry it on to completion.",
        author: "Pastor James"
    };

    return (
        <section id="devotional-section" className="devotional-section">
            <div className="devotional-bg-pattern"></div>

            <div className="container">
                <div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
                    <span className="section-badge">📖 Daily Inspiration</span>
                    <h2 className="section-title">Today's Devotional</h2>
                    <p className="section-subtitle">Start your day with God's Word</p>
                </div>

                <div className={`devotional-card ${isVisible ? 'animate-in' : ''}`}>
                    <div className="devotional-date">
                        <span className="date-icon">📅</span>
                        <span>{todayDevotional.date}</span>
                    </div>

                    <div className="devotional-content">
                        <div className="verse-card">
                            <div className="verse-quote">
                                <span className="quote-mark">"</span>
                                <p>{todayDevotional.verse}</p>
                                <span className="quote-mark closing">"</span>
                            </div>
                            <div className="verse-reference">— {todayDevotional.reference}</div>
                        </div>

                        <h3 className="devotional-title">{todayDevotional.title}</h3>
                        <p className="devotional-excerpt">{todayDevotional.excerpt}</p>

                        <div className="devotional-footer">
                            <div className="author">
                                <div className="author-avatar">
                                    {todayDevotional.author.charAt(0)}
                                </div>
                                <span className="author-name">{todayDevotional.author}</span>
                            </div>
                            <Link to="/devotionals" className="read-more-btn">
                                Read Full Devotional
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="devotional-decoration">
                        <div className="decoration-circle circle-1"></div>
                        <div className="decoration-circle circle-2"></div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className={`devotional-links ${isVisible ? 'animate-in' : ''}`}>
                    <Link to="/devotionals" className="quick-link">
                        <span className="link-icon">📚</span>
                        <span className="link-text">Past Devotionals</span>
                    </Link>
                    <Link to="/bible-reading" className="quick-link">
                        <span className="link-icon">📖</span>
                        <span className="link-text">Bible Reading Plan</span>
                    </Link>
                    <Link to="/prayer-requests" className="quick-link">
                        <span className="link-icon">🙏</span>
                        <span className="link-text">Prayer Requests</span>
                    </Link>
                </div>
            </div>

            <style>{`
                .devotional-section {
                    position: relative;
                    padding: 6rem 0;
                    background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
                    overflow: hidden;
                }

                .devotional-bg-pattern {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(circle at 2px 2px, rgba(34, 193, 230, 0.08) 1px, transparent 0);
                    background-size: 40px 40px;
                    pointer-events: none;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 3rem;
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .section-header.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                .section-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: linear-gradient(135deg, rgba(34, 193, 230, 0.1), rgba(168, 85, 247, 0.1));
                    padding: 0.5rem 1.25rem;
                    border-radius: 2rem;
                    font-size: 0.9rem;
                    color: #22c1e6;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .section-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #0f172a;
                    margin-bottom: 0.75rem;
                }

                .section-subtitle {
                    font-size: 1.1rem;
                    color: #334155;
                }

                .devotional-card {
                    position: relative;
                    background: #ffffff;
                    border-radius: 1.5rem;
                    box-shadow: 0 4px 40px rgba(0, 0, 0, 0.08);
                    padding: 2.5rem;
                    max-width: 800px;
                    margin: 0 auto 3rem;
                    overflow: hidden;
                    opacity: 0;
                    transform: translateY(40px);
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
                }
                .devotional-card.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                .devotional-date {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #f1f5f9;
                    padding: 0.5rem 1rem;
                    border-radius: 2rem;
                    font-size: 0.85rem;
                    color: #64748b;
                    margin-bottom: 2rem;
                }

                .devotional-content {
                    position: relative;
                    z-index: 2;
                }

                .verse-card {
                    background: linear-gradient(135deg, #1e1b2e 0%, #2d2640 100%);
                    border-radius: 1rem;
                    padding: 2rem;
                    margin-bottom: 2rem;
                    position: relative;
                    overflow: hidden;
                }
                .verse-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                    opacity: 0.5;
                }

                .verse-quote {
                    position: relative;
                    text-align: center;
                }
                .verse-quote p {
                    font-size: 1.5rem;
                    font-style: italic;
                    color: #ffffff;
                    line-height: 1.6;
                    margin: 0;
                }
                .quote-mark {
                    font-size: 4rem;
                    color: rgba(34, 193, 230, 0.3);
                    font-family: Georgia, serif;
                    line-height: 0;
                    position: relative;
                    top: 1.5rem;
                }
                .quote-mark.closing {
                    top: 0.5rem;
                }

                .verse-reference {
                    text-align: center;
                    margin-top: 1.5rem;
                    color: #22c1e6;
                    font-weight: 600;
                    font-size: 1rem;
                }

                .devotional-title {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 1rem;
                }

                .devotional-excerpt {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #475569;
                    margin-bottom: 2rem;
                }

                .devotional-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 1rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid #e2e8f0;
                }

                .author {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .author-avatar {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #22c1e6, #a855f7);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 1rem;
                }
                .author-name {
                    color: #1e293b;
                    font-weight: 600;
                }

                .read-more-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: linear-gradient(135deg, #22c1e6 0%, #1aa3c4 100%);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.75rem;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                .read-more-btn:hover {
                    transform: translateX(5px);
                    box-shadow: 0 4px 20px rgba(34, 193, 230, 0.4);
                }

                .devotional-decoration {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 300px;
                    height: 300px;
                    pointer-events: none;
                }
                .decoration-circle {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0.5;
                }
                .circle-1 {
                    width: 200px;
                    height: 200px;
                    background: linear-gradient(135deg, rgba(34, 193, 230, 0.1), transparent);
                    top: -50px;
                    right: -50px;
                }
                .circle-2 {
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), transparent);
                    top: 50px;
                    right: 80px;
                }

                .devotional-links {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
                }
                .devotional-links.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                .quick-link {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 1.25rem 2rem;
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 1rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                .quick-link:hover {
                    border-color: #22c1e6;
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                }
                .link-icon {
                    font-size: 1.5rem;
                }
                .link-text {
                    color: #1e293b;
                    font-weight: 600;
                    font-size: 0.9rem;
                }

                @media (max-width: 768px) {
                    .devotional-section {
                        padding: 4rem 0;
                    }
                    .section-title {
                        font-size: 2rem;
                    }
                    .devotional-card {
                        padding: 1.5rem;
                        margin: 0 1rem 2rem;
                    }
                    .verse-quote p {
                        font-size: 1.2rem;
                    }
                    .devotional-title {
                        font-size: 1.4rem;
                    }
                    .devotional-excerpt {
                        font-size: 1rem;
                    }
                    .devotional-footer {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .read-more-btn {
                        justify-content: center;
                    }
                    .quick-link {
                        padding: 1rem 1.5rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default DevotionalSection;
