import React from 'react';
import { motion } from 'framer-motion';
import { 
    BrainCircuit, Target, Users, Landmark, 
    ArrowRight, Globe, Shield, Zap, Sparkles, Terminal, Cpu, Building, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div style={{ padding: '10rem 2rem 10rem', background: 'var(--bg)' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '10rem' }}
                >
                    <div style={{ display: 'inline-flex', background: 'var(--primary-light)', padding: '0.6rem 1.25rem', borderRadius: '50px', marginBottom: '2.5rem', border: '1px solid var(--border-focus)' }}>
                        <BrainCircuit size={18} color="var(--primary)" style={{ marginRight: '0.8rem' }} /> <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '2px' }}>OUR LEGACY</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '800', marginBottom: '2.5rem', lineHeight: '1' }}>Building the <span className="gradient-text">One-Person Empire</span></h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.4rem', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7' }}>
                        Wakil AI was born in 2026 as a spiritual successor and technological partner to <a href="https://barada.cloud" target="_blank" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Barada AI</a>. Our mission is to democratize elite-level execution for founders, solopreneurs, and small visionary teams.
                    </p>
                </motion.div>

                {/* Features Detail Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', marginBottom: '10rem' }}>
                    <motion.div whileHover={{ y: -10 }} className="premium-card" style={{ border: '1px solid var(--border)', background: 'rgba(0,0,0,0.3)' }}>
                        <div style={{ background: 'var(--primary-light)', padding: '1.25rem', borderRadius: '18px', display: 'flex', width: 'fit-content', marginBottom: '2rem', color: 'var(--primary)' }}>
                            <Cpu size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1.2rem' }}>ISO-Level Precision</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>We don't just chat; we generate. Every output is structured to meet ISO-standard business documentation requirements, ready for immediate scaling.</p>
                    </motion.div>
                    <motion.div whileHover={{ y: -10 }} className="premium-card" style={{ border: '1px solid var(--border)', background: 'rgba(0,0,0,0.3)' }}>
                        <div style={{ background: 'var(--primary-light)', padding: '1.25rem', borderRadius: '18px', display: 'flex', width: 'fit-content', marginBottom: '2rem', color: 'var(--primary)' }}>
                            <Shield size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1.2rem' }}>Encrypted Intelligence</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>Your vision is protected. We leverage the same encryption standards as Barada AI to ensure your strategic data never leaks to global public models.</p>
                    </motion.div>
                </div>

                {/* Partner Section */}
                <div style={{ background: 'linear-gradient(135deg, var(--bg-secondary), rgba(0,255,136,0.05))', padding: '6rem', borderRadius: '40px', border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2.8rem', marginBottom: '2rem' }}>A Strategic Partnership</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
                            By integrating the cloud-first philosophy of <a href="https://barada.cloud" target="_blank" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Barada AI</a>, Wakil AI provides an unparalleled ecosystem where strategy meets deployment. From initial brainstorm to multi-market expansion.
                        </p>
                        <a href="https://barada.cloud" target="_blank" className="btn-primary" style={{ padding: '1rem 2.5rem', display: 'inline-flex', alignItems: 'center', gap: '1rem' }}>Explore Barada AI <ExternalLink size={18} /></a>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                         <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)' }}>50k+</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>One-Person Empires</div>
                         </div>
                         <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)' }}>180+</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Markets</div>
                         </div>
                         <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)' }}>4.9/5</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Founder Rating</div>
                         </div>
                         <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)' }}>2026</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Built For Future</div>
                         </div>
                    </div>
                </div>

                {/* Creative CTA */}
                <div style={{ marginTop: '10rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to Scale?</h2>
                    <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.2rem', textDecoration: 'underline' }}>Initialize Session Now →</Link>
                </div>
            </div>
        </div>
    );
};

export default About;
