import React from 'react';
import { motion } from 'framer-motion';
import { 
    BrainCircuit, Sparkles, Target, Zap, 
    ArrowRight, MessageSquare, Rocket, BarChart, 
    ShieldCheck, Cpu, Globe, Users, Trophy, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Landing = () => {
    const { t } = useLanguage();

    return (
        <div style={{ paddingBottom: '0', background: 'var(--bg)' }}>
            {/* Hero Section */}
            <section style={{ 
                padding: '12rem 2rem 10rem', 
                textAlign: 'center', 
                background: 'radial-gradient(circle at 50% -20%, var(--primary-glow), transparent 60%)',
                position: 'relative'
            }}>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="container"
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ 
                            background: 'var(--primary-light)', 
                            color: 'var(--primary)', 
                            padding: '0.6rem 1.5rem', 
                            borderRadius: '50px', 
                            fontSize: '0.9rem', 
                            fontWeight: '700',
                            marginBottom: '2.5rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            border: '1px solid var(--border-focus)'
                        }}
                    >
                        <Sparkles size={16} /> Legendary AI Suite is Live
                    </motion.div>
                    
                    <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1', letterSpacing: '-0.05em' }}>
                        The Intelligent <br /> <span className="gradient-text">Co-Founder</span>
                    </h1>
                    
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.4rem', maxWidth: '800px', margin: '0 auto 4rem', lineHeight: '1.6' }}>
                        {t('hero_subtitle')} Inspired by the world-class architecture of <a href="https://barada.cloud" target="_blank" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Barada AI</a>. Experience the future of execution.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/register" className="btn-primary" style={{ height: '4rem', padding: '0 3rem', fontSize: '1.2rem', gap: '1rem' }}>
                            {t('start')} <ArrowRight size={22} />
                        </Link>
                        <Link to="/pricing" className="glass" style={{ 
                            height: '4rem', padding: '0 3rem', borderRadius: '15px', fontWeight: 'bold', fontSize: '1.2rem',
                            border: '1px solid var(--border)', display: 'flex', alignItems: 'center'
                        }}>
                            {t('pricing')}
                        </Link>
                    </div>

                    <div style={{ marginTop: '6rem', opacity: 0.5, display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                        <a href="https://barada.cloud" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 'bold' }}>
                            PARTNER OF BARADA.CLOUD <ExternalLink size={16} />
                        </a>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 'bold' }}>
                            <Cpu size={20} /> GPT-4O INTERFACE
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '8rem 2rem' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Legendary <span className="gradient-text">Execution</span></h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Built for founders who demand precision. No noise, just vision.</p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                        {[
                            { icon: <Target className="text-primary" />, title: 'Brand Strategy', desc: 'Craft high-converting pitch decks and brand narratives that win investors.' },
                            { icon: <BrainCircuit className="text-primary" />, title: 'Product Specification', desc: 'Define every feature of your MVP with ISO-standard specifications generated in seconds.' },
                            { icon: <MessageSquare className="text-primary" />, title: 'Operations Auto-Responder', desc: 'Automate support and stakeholder communication with specialized business-tuned AI.' }
                        ].map((s, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -12, scale: 1.02 }}
                                className="premium-card"
                                style={{ border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)' }}
                            >
                                <div style={{ marginBottom: '2rem', padding: '1.2rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '18px', width: 'fit-content' }}>
                                    {s.icon}
                                </div>
                                <h3 style={{ marginBottom: '1.2rem', fontSize: '1.8rem' }}>{s.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7' }}>{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Creative Extra: The "AI Pulse" section */}
            <section style={{ padding: '8rem 2rem', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-10%', top: '20%', width: '400px', height: '400px', background: 'var(--primary-glow)', filter: 'blur(150px)', borderRadius: '50%' }}></div>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'center' }}>
                        <div>
                           <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Beyond Chat. <br /> <span className="gradient-text">Beyond Static.</span></h2>
                           <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                Wakil AI leverages the same core philosophy as <a href="https://barada.cloud" target="_blank" style={{ color: 'var(--primary)' }}>Barada AI</a>: provide the user with structured, actionable data that can be immediately deployed to teams, developers, or customers.
                           </p>
                           <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                               {[
                                   { t: 'Multi-Model intelligence', d: 'Switching between specialized LLMs to get the best result for each task.' },
                                   { t: 'Real-time Sync', d: 'Your data is synced across your devices instantly with ISO-grade encryption.' }
                               ].map((item, idx) => (
                                   <div key={idx} style={{ display: 'flex', gap: '1.5rem' }}>
                                       <div style={{ color: 'var(--primary)', marginTop: '0.4rem' }}><Zap size={22} fill="currentColor" /></div>
                                       <div>
                                           <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{item.t}</h4>
                                           <p style={{ color: 'var(--text-muted)' }}>{item.d}</p>
                                       </div>
                                   </div>
                               ))}
                           </div>
                        </div>
                        <div className="glass" style={{ padding: '4rem', borderRadius: '40px', position: 'relative', border: '1px solid var(--border)' }}>
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                 <div className="skeleton" style={{ width: '100%', height: '14px' }}></div>
                                 <div className="skeleton" style={{ width: '80%', height: '14px' }}></div>
                                 <div className="skeleton" style={{ width: '40%', height: '14px' }}></div>
                                 <div style={{ height: '1px', background: 'var(--border)', margin: '1rem 0' }}></div>
                                 <div className="skeleton" style={{ width: '60%', height: '14px' }}></div>
                                 <div className="skeleton" style={{ width: '90%', height: '14px' }}></div>
                             </div>
                             <div className="glass" style={{ position: 'absolute', bottom: '-20px', right: '-20px', padding: '1rem 2rem', borderRadius: '15px', fontWeight: 'bold', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
                                ISO-SPEC GENERATED
                             </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Branding Footer */}
            <footer style={{ padding: '6rem 2rem', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4rem' }}>
                    <div style={{ maxWidth: '300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <img src="/logo.png" style={{ height: '40px' }} alt="Logo" />
                            <span style={{ fontSize: '1.4rem', fontWeight: '900' }}>WAKIL <span className="gradient-text">AI</span></span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.9rem' }}>
                            The intelligent co-founder suite designed for legendary execution. Built with the architecture of the future.
                        </p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '6rem', flexWrap: 'wrap' }}>
                        <div>
                            <h4 style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '1.5rem' }}>PLATFORM</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
                                <Link to="/pricing" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Pricing</Link>
                                <Link to="/register" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Get Started</Link>
                                <a href="https://barada.cloud" target="_blank" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Barada Cloud</a>
                            </div>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '1.5rem' }}>LEGAL</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Privacy Policy</span>
                                <span style={{ color: 'var(--text-muted)' }}>Terms of Service</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}>
                    © 2026 WAKIL AI LEGENDARY EDITION. ALL SYSTEMS OPERATIONAL via BARADA.CLOUD
                </div>
            </footer>
        </div>
    );
};

export default Landing;
