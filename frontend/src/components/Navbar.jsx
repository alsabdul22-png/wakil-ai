import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
    Menu, X, LogOut, LayoutDashboard, 
    ArrowRight, Globe, Shield, Sparkles,
    User, ChevronDown, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { lang, setLang, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: t('home'), path: '/' },
        { name: t('about'), path: '/about' },
        { name: t('pricing'), path: '/pricing' },
        { name: t('contact'), path: '/contact' }
    ];

    const languages = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'ar', label: 'العربية', flag: '🇦🇪' },
        { code: 'de', label: 'Deutsch', flag: '🇩🇪' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav style={{ 
            height: '72px', background: 'rgba(3, 8, 6, 0.8)', backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 1000,
            display: 'flex', alignItems: 'center'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
                    <div style={{ position: 'relative' }}>
                         <img 
                            src="/logo.png" 
                            alt="Wakil AI" 
                            style={{ height: '48px', width: 'auto', display: 'block', filter: 'drop-shadow(0 0 10px rgba(0, 255, 136, 0.3))' }} 
                         />
                         <div style={{ position: 'absolute', inset: 0, background: 'var(--primary)', opacity: 0.1, filter: 'blur(15px)', borderRadius: '50%', zIndex: -1 }}></div>
                    </div>
                    <div>
                        <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fff', letterSpacing: '-0.5px' }}>WAKIL <span className="gradient-text">AI</span></span>
                        <div style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '2.5px', marginTop: '-4px', opacity: 0.8 }}>LEGENDARY EDITION</div>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-nav">
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path} 
                                to={link.path}
                                style={{ 
                                    textDecoration: 'none', color: isActive(link.path) ? 'var(--primary)' : 'var(--text-muted)',
                                    fontSize: '0.9rem', fontWeight: '600', transition: '0.3s',
                                    position: 'relative', padding: '0.5rem 0'
                                }}
                            >
                                {link.name}
                                {isActive(link.path) && <motion.div layoutId="nav-underline" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary-glow)' }} />}
                            </Link>
                        ))}
                    </div>

                    <div style={{ height: '24px', width: '1px', background: 'var(--border)' }}></div>

                    {/* Language Toggle */}
                    <div style={{ position: 'relative' }}>
                        <button 
                            onClick={() => setLangOpen(!langOpen)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}
                        >
                            <Globe size={16} color="var(--primary)" /> {languages.find(l => l.code === lang).code.toUpperCase()} <ChevronDown size={14} />
                        </button>
                        <AnimatePresence>
                            {langOpen && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="glass"
                                    style={{ position: 'absolute', top: '150%', right: 0, padding: '0.8rem', borderRadius: '14px', width: '160px', border: '1px solid var(--border)', zIndex: 100 }}
                                >
                                    {languages.map(l => (
                                        <button 
                                            key={l.code}
                                            onClick={() => { setLang(l.code); setLangOpen(false); }}
                                            style={{ 
                                                width: '100%', padding: '0.8rem', borderRadius: '8px', border: 'none',
                                                background: lang === l.code ? 'var(--primary-light)' : 'transparent',
                                                color: lang === l.code ? 'var(--primary)' : '#fff',
                                                textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer',
                                                fontSize: '0.85rem', fontWeight: 'bold'
                                            }}
                                        >
                                           <span>{l.flag}</span> {l.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                        <Link to="/dashboard" className="btn-primary" style={{ padding: '0.6rem 2rem', fontSize: '0.9rem', fontWeight: '900' }}>
                             LAUNCH DASHBOARD <ArrowRight size={16} style={{ marginLeft: '0.4rem' }} />
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ display: 'flex', background: 'transparent', border: 'none', color: '#fff' }}
                    className="mobile-toggle"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        style={{ position: 'fixed', inset: 0, background: 'var(--bg)', paddingTop: '100px', zIndex: 900, padding: '2rem' }}
                    >
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                                    style={{ fontSize: '2rem', fontWeight: '800', textDecoration: 'none', color: isActive(link.path) ? 'var(--primary)' : '#fff' }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div style={{ height: '1px', background: 'var(--border)' }}></div>
                            <p style={{ color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '2px' }}>SESSION LANGUAGE</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                 {languages.map(l => (
                                    <button 
                                        key={l.code} 
                                        onClick={() => { setLang(l.code); setIsOpen(false); }}
                                        style={{ background: lang === l.code ? 'var(--primary)' : 'var(--bg-secondary)', color: lang === l.code ? 'black' : 'white', border: '1px solid var(--border)', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 'bold' }}
                                    >
                                        {l.label}
                                    </button>
                                 ))}
                            </div>
                            <div style={{ marginTop: '2rem' }}>
                                {user ? (
                                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="btn-primary" style={{ width: '100%', height: '4rem', fontSize: '1.3rem' }}>Dashboard</Link>
                                ) : (
                                    <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary" style={{ width: '100%', height: '4rem', fontSize: '1.3rem' }}>Initialize Account</Link>
                                )}
                            </div>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (min-width: 1025px) {
                    .mobile-toggle { display: none !important; }
                    .desktop-nav { display: flex !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
