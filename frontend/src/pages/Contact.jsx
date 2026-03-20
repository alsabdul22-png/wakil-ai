import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle, Globe, ShieldCheck, ExternalLink, Headphones, Info } from 'lucide-react';

const Contact = () => {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 1800);
    };

    return (
        <div style={{ padding: '10rem 2rem 10rem', background: 'var(--bg)' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '8rem' }}
                >
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Get in <span className="gradient-text">Touch</span></h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.3rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.7' }}>
                        Need support, specialized AI needs, or Enterprise inquiries? Our legendary support team is standing by.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'start' }}>
                    {/* Information */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ background: 'var(--primary-light)', padding: '1.25rem', borderRadius: '18px', color: 'var(--primary)', border: '1px solid var(--border)' }}>
                                <Headphones size={24} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--primary)' }}>Support Email</h4>
                                <a href="mailto:Support@wakil-rd.de" style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '600' }}>Support@wakil-rd.de</a>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ background: 'var(--primary-light)', padding: '1.25rem', borderRadius: '18px', color: 'var(--primary)', border: '1px solid var(--border)' }}>
                                <Info size={24} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--primary)' }}>General Info</h4>
                                <a href="mailto:Info@wakil-rd.de" style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '600' }}>Info@wakil-rd.de</a>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', opacity: 0.6 }}>
                            <div style={{ background: 'var(--primary-light)', padding: '1.25rem', borderRadius: '18px', color: 'var(--primary)' }}>
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>Headquarters</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Venture District, San Francisco, CA</p>
                            </div>
                        </div>
                        
                        <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px', background: 'var(--bg-secondary)', borderLeft: '4px solid var(--primary)' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary)', marginBottom: '1.2rem', fontWeight: '800', fontSize: '1.1rem', letterSpacing: '1px' }}>
                                <ShieldCheck size={20} /> ISO SECURED
                             </div>
                             <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                All support data and inquiries are processed under the same ISO-Standard security protocols as <a href="https://barada.cloud" target="_blank" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Barada AI</a>.
                             </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <AnimatePresence mode="wait">
                        {!sent ? (
                            <motion.div 
                                key="form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="premium-card" 
                                style={{ background: 'var(--glass)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)' }}
                            >
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.9rem', fontWeight: '800', marginBottom: '0.8rem', display: 'block', color: 'var(--primary)', letterSpacing: '1px' }}>YOUR NAME</label>
                                        <input type="text" placeholder="Alex Rivera" required style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.9rem', fontWeight: '800', marginBottom: '0.8rem', display: 'block', color: 'var(--primary)', letterSpacing: '1px' }}>BUSINESS EMAIL</label>
                                        <input type="email" placeholder="alex@venture.co" required style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.9rem', fontWeight: '800', marginBottom: '0.8rem', display: 'block', color: 'var(--primary)', letterSpacing: '1px' }}>INQUIRY MESSAGE</label>
                                        <textarea placeholder="How can Wakil AI help you reach your goals?" required style={{ minHeight: '160px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px' }}></textarea>
                                    </div>
                                    <button type="submit" disabled={loading} className="btn-primary" style={{ height: '4rem', fontSize: '1.15rem' }}>
                                        {loading ? <div className="skeleton" style={{ width: '100px', height: '18px' }}></div> : <><Send size={20} /> Initalize Support</>}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="success"
                                initial={{ scale: 0.9, opacity: 0 }} 
                                animate={{ scale: 1, opacity: 1 }} 
                                style={{ textAlign: 'center', padding: '6rem 2rem' }}
                            >
                                <div style={{ background: 'var(--primary-light)', padding: '2rem', borderRadius: '50%', width: 'fit-content', margin: '0 auto 3rem', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
                                    <CheckCircle size={80} />
                                </div>
                                <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Transmission Success</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.8' }}>Our partners at Wakil RD will review your <br /> inquiry within 12-24 business hours.</p>
                                <button onClick={() => setSent(false)} style={{ color: 'var(--primary)', fontSize: '1.1rem', marginTop: '4rem', fontWeight: 'bold', textDecoration: 'underline' }}>Initialize New Request</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Contact;
