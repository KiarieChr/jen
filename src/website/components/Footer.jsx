import React from 'react';
import { Mail, Phone, MapPin, Youtube, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container footer-container">
                <div className="footer-top-grid">
                    {/* Column 1: Brand details */}
                    <div className="footer-brand-col">
                        <div className="footer-logo-block">
                            <img
                                src="/favicon.ico"
                                alt="Logo"
                                className="footer-logo-img"
                            />
                            <div>
                                <h3 className="footer-brand-name">Jesus Enthroned</h3>
                                <div className="footer-brand-abbr">NETWORK</div>
                            </div>
                        </div>
                        <p className="footer-brand-desc">
                            Equipping and mobilising men and women to fulfil their divine purpose across spirituality, education, governance, business, media, family, and the arts.
                        </p>
                        <div className="footer-branding-tagline">
                            <span>KINGDOM</span>
                            <span className="dot">•</span>
                            <span>UNITY</span>
                            <span className="dot">•</span>
                            <span>PURPOSE</span>
                        </div>
                    </div>

                    {/* Column 2: Directory Links */}
                    <div className="footer-nav-col">
                        <h4 className="footer-col-title">Quick Links</h4>
                        <ul className="footer-links-list">
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/sermons">Sermons &amp; Teachings</a></li>
                            <li><a href="/events">Upcoming Events</a></li>
                            <li><a href="/partners">Partners</a></li>
                            <li><a href="/partner-give">Giving</a></li>
                            <li><a href="/portal">Member Portal</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="footer-nav-col">
                        <h4 className="footer-col-title">Get in Touch</h4>
                        <ul className="footer-contact-list">
                            <li>
                                <MapPin size={18} className="contact-icon" />
                                <span>123 Barnabas, Nakuru, Kenya</span>
                            </li>
                            <li>
                                <Phone size={18} className="contact-icon" />
                                <span>+254 702 761913</span>
                            </li>
                            <li>
                                <MessageCircle size={18} className="contact-icon" style={{ color: '#25D366' }} />
                                <span>WhatsApp: +254 702 761913</span>
                            </li>
                            <li>
                                <Mail size={18} className="contact-icon" />
                                <span>info@jesusenthroned.org</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Connect & Hours */}
                    <div className="footer-nav-col">
                        <h4 className="footer-col-title">Connect With Us</h4>
                        <div className="footer-social-icons">
                            <a href="https://www.youtube.com/@JesusEnthronedNetwork" target="_blank" rel="noopener noreferrer" className="social-pill youtube">
                                <Youtube size={18} />
                            </a>
                            <a href="https://www.facebook.com/JesusEnthronedNetwork" target="_blank" rel="noopener noreferrer" className="social-pill facebook">
                                <Facebook size={18} />
                            </a>
                            <a href="https://www.instagram.com/@JesusEnthronedNetwork" target="_blank" rel="noopener noreferrer" className="social-pill instagram">
                                <Instagram size={18} />
                            </a>
                            <a href="https://twitter.com/JesusEnthroned" target="_blank" rel="noopener noreferrer" className="social-pill twitter">
                                <Twitter size={18} />
                            </a>
                            <a href="https://wa.me/254702761913" target="_blank" rel="noopener noreferrer" className="social-pill whatsapp">
                                <MessageCircle size={18} />
                            </a>
                        </div>
                        <div className="footer-hours-block">
                            <h5 className="hours-title">Office Hours</h5>
                            <p className="hours-text">Monday - Friday</p>
                            <p className="hours-time">9:00 AM - 5:00 PM EAT</p>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom Block */}
                <div className="footer-bottom-bar">
                    <div className="copyright-info">
                        <p>© 2026 Jesus Enthroned Network. All rights reserved.</p>
                        <p className="credit-text">Designed by Visuals Creatives • Powered by Royal Softwares</p>
                    </div>
                    <div className="legal-links">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                    </div>
                </div>
            </div>

            <style>{`
                .main-footer {
                    background: #0a0710;
                    padding: 80px 0 32px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    position: relative;
                }

                .footer-container {
                    width: 100%;
                    max-width: 1440px;
                    margin: 0 auto;
                    padding: 0 3%;
                }

                .footer-top-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr 1fr 1fr;
                    gap: 48px;
                    margin-bottom: 56px;
                }

                /* Column 1: Brand Info */
                .footer-brand-col {
                    display: flex;
                    flex-direction: column;
                }

                .footer-logo-block {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 24px;
                }

                .footer-logo-img {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid var(--primary, #22c1e6);
                    padding: 1px;
                }

                .footer-brand-name {
                    font-family: 'Onest', 'Montserrat', 'Inter', sans-serif;
                    font-size: 17px;
                    font-weight: 800;
                    color: white;
                    margin: 0;
                    text-transform: uppercase;
                    letter-spacing: 0.02em;
                }

                .footer-brand-abbr {
                    font-size: 9px;
                    color: var(--primary, #22c1e6);
                    letter-spacing: 0.25em;
                    font-weight: 700;
                    margin-top: 2px;
                }

                .footer-brand-desc {
                    font-size: 14px;
                    color: var(--text-muted, #94a3b8);
                    line-height: 1.65;
                    margin: 0 0 24px 0;
                    max-width: 320px;
                }

                .footer-branding-tagline {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    color: var(--primary, #22c1e6);
                }

                .footer-branding-tagline .dot {
                    color: rgba(255, 255, 255, 0.25);
                }

                /* General Column Header styling */
                .footer-col-title {
                    font-family: 'Onest', 'Montserrat', 'Inter', sans-serif;
                    color: white;
                    font-size: 14px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin: 0 0 28px 0;
                }

                /* Column 2: Lists */
                .footer-links-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .footer-links-list li a {
                    font-size: 14px;
                    color: var(--text-muted, #94a3b8);
                    text-decoration: none;
                    transition: color 0.25s ease;
                }

                .footer-links-list li a:hover {
                    color: white;
                }

                /* Column 3: Contact Info */
                .footer-contact-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .footer-contact-list li {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    font-size: 14px;
                    color: var(--text-muted, #94a3b8);
                    line-height: 1.5;
                }

                .contact-icon {
                    color: var(--primary, #22c1e6);
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                /* Column 4: Social Icons & Hours */
                .footer-social-icons {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 28px;
                }

                .social-pill {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-muted, #94a3b8);
                    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .social-pill:hover {
                    transform: translateY(-3px);
                    color: white;
                }

                .social-pill.youtube:hover { background: #FF0000; border-color: #FF0000; }
                .social-pill.facebook:hover { background: #1877F2; border-color: #1877F2; }
                .social-pill.instagram:hover { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); border-color: #dc2743; }
                .social-pill.twitter:hover { background: #000000; border-color: #000000; }
                .social-pill.whatsapp:hover { background: #25D366; border-color: #25D366; }

                .footer-hours-block {
                    display: flex;
                    flex-direction: column;
                }

                .hours-title {
                    color: white;
                    font-size: 13.5px;
                    font-weight: 700;
                    margin: 0 0 6px 0;
                }

                .hours-text {
                    font-size: 13px;
                    color: var(--text-muted, #94a3b8);
                    margin: 0;
                }

                .hours-time {
                    font-size: 13px;
                    color: var(--primary, #22c1e6);
                    font-weight: 600;
                    margin: 2px 0 0 0;
                }

                /* Footer Bottom Bar */
                .footer-bottom-bar {
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    padding-top: 32px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                }

                .copyright-info {
                    font-size: 13px;
                    color: rgba(255, 255, 255, 0.35);
                    line-height: 1.6;
                }

                .credit-text {
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.25);
                }

                .legal-links {
                    display: flex;
                    gap: 24px;
                }

                .legal-links a {
                    font-size: 13px;
                    color: rgba(255, 255, 255, 0.35);
                    text-decoration: none;
                    transition: color 0.25s ease;
                }

                .legal-links a:hover {
                    color: white;
                }

                /* Responsive design */
                @media (max-width: 968px) {
                    .footer-top-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 40px;
                    }
                }

                @media (max-width: 600px) {
                    .footer-top-grid {
                        grid-template-columns: 1fr;
                        gap: 32px;
                    }
                    .footer-bottom-bar {
                        flex-direction: column;
                        text-align: center;
                        align-items: center;
                    }
                    .legal-links {
                        justify-content: center;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
