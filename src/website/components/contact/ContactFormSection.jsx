import React from 'react';

const ContactInfoItem = ({ icon, title, content }) => (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{
            width: '50px',
            height: '50px',
            background: 'rgba(34, 193, 230, 0.1)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#22c1e6',
            fontSize: '1.25rem',
            flexShrink: 0
        }}>
            {icon}
        </div>
        <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#120D20', marginBottom: '0.5rem' }}>
                {title}
            </h4>
            <div style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {content}
            </div>
        </div>
    </div>
);

const ContactFormSection = () => {
    return (
        <section style={{ padding: '4rem 0 6rem', background: '#eff3c1' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    {/* Left: Contact Info */}
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#120D20', marginBottom: '3rem' }}>
                            Get In Touch
                        </h2>

                        <ContactInfoItem
                            icon="📍"
                            title="Address"
                            content={
                                <>
                                    123 Faith Avenue<br />
                                    Nairobi, Kenya
                                </>
                            }
                        />
                        <ContactInfoItem
                            icon="📞"
                            title="Phone"
                            content="+254 700 123 456"
                        />
                        <ContactInfoItem
                            icon="✉️"
                            title="Email"
                            content="info@jesusenthroned.org"
                        />
                        <ContactInfoItem
                            icon="🕒"
                            title="Office Hours"
                            content={
                                <>
                                    Monday - Friday<br />
                                    9:00 AM - 5:00 PM EAT
                                </>
                            }
                        />
                    </div>

                    {/* Right: Contact Form */}
                    <div style={{
                        background: 'white',
                        padding: '3rem',
                        borderRadius: '1.5rem',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#120D20', marginBottom: '2rem' }}>
                            Send Us a Message
                        </h3>

                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>Full Name *</label>
                                    <input type="text" placeholder="Your name" style={{
                                        padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#f1f5f9', outline: 'none'
                                    }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>Email *</label>
                                    <input type="email" placeholder="your@email.com" style={{
                                        padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#f1f5f9', outline: 'none'
                                    }} />
                                </div>
                            </div>

                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>Phone</label>
                                    <input type="text" placeholder="+254 700 000 000" style={{
                                        padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#f1f5f9', outline: 'none'
                                    }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>Subject *</label>
                                    <input type="text" placeholder="How can we help?" style={{
                                        padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#f1f5f9', outline: 'none'
                                    }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>Message *</label>
                                <textarea rows="5" placeholder="Your message..." style={{
                                    padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#f1f5f9', outline: 'none', resize: 'vertical'
                                }}></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{
                                alignSelf: 'flex-start',
                                marginTop: '1rem',
                                width: '100%'
                            }}>
                                ✈ Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    section {
                        padding: 3rem 0 4rem !important;
                    }
                    .form-grid {
                        grid-template-columns: 1fr !important;
                    }
                    div[style*="padding: 3rem"] {
                        padding: 1.5rem !important;
                    }
                    h2 {
                        marginBottom: 2rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default ContactFormSection;
