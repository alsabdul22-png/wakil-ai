import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        navigate('/dashboard');
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            const msg = err?.response?.data?.message || err?.message || 'Login failed. Please check your credentials.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '2rem' }}>
            {/* Background Glows */}
            <div style={{ position: 'fixed', top: '20%', left: '15%', width: '30vw', height: '30vw', background: 'var(--primary)', opacity: 0.05, filter: 'blur(120px)', borderRadius: '50%' }}></div>
            <div style={{ position: 'fixed', bottom: '20%', right: '15%', width: '25vw', height: '25vw', background: 'var(--primary)', opacity: 0.03, filter: 'blur(100px)', borderRadius: '50%' }}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ width: '100%', maxWidth: '440px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="float-anim" style={{ background: 'var(--primary-light)', padding: '1rem', borderRadius: '50%', display: 'inline-flex', color: 'var(--primary)', marginBottom: '1.5rem', border: '1px solid var(--primary)' }}>
                        <LogIn size={32} />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.8rem' }}>Welcome <span className="gradient-text">Back</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>Secure session initialization for Wakil AI Core</p>
                </div>

                <div className="premium-card">
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                        {error && (
                            <div style={{ background: 'rgba(255, 59, 48, 0.1)', color: '#ff3b30', padding: '1rem', borderRadius: '12px', fontSize: '0.85rem', textAlign: 'center', border: '1px solid rgba(255, 59, 48, 0.2)' }}>
                                {error}
                            </div>
                        )}

                        <div>
                            <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary)', display: 'block', marginBottom: '0.8rem', letterSpacing: '1px' }}>CORE SESSION ID (EMAIL)</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '1.2rem', top: '1.1rem', color: 'var(--text-muted)' }} />
                                <input
                                    type="email"
                                    placeholder="alex@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ paddingLeft: '3.5rem' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary)', display: 'block', marginBottom: '0.8rem', letterSpacing: '1px' }}>PASS-KEY</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '1.2rem', top: '1.1rem', color: 'var(--text-muted)' }} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ paddingLeft: '3.5rem' }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{ height: '4rem', width: '100%', fontSize: '1.15rem' }}
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : <><Sparkles size={20} /> Initialize Access</>}
                        </button>
                    </form>

                    <div style={{ marginTop: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            New Strategist? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'underline' }}>Initialize New Account</Link>
                        </p>
                        <div style={{ height: '1px', background: 'var(--border)', width: '40%', margin: '0.5rem auto' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', color: 'var(--text-muted)', fontSize: '0.75rem', opacity: 0.5 }}>
                            <ShieldCheck size={14} /> BARADA CLOUD SECURED
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
