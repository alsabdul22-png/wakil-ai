import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Zap, Shield, Globe, CreditCard, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const PricingPage = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [showCheckout, setShowCheckout] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [processing, setProcessing] = useState(false);
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const plans = [
        { 
            name: 'Starter', price: '0', 
            features: ['10 AI credits / mo', 'Standard support', 'Public tools access', 'History limited to 5 items'],
            btn: 'Current Plan', current: !user || user.role === 'user', role: 'user'
        },
        { 
            name: 'Pro', price: billingCycle === 'monthly' ? '29' : '24', 
            features: ['500 AI credits / mo', 'Priority agent access', 'History limited to 50 items', '6-Month Roadmap tool', 'Direct email support'],
            btn: 'Upgrade to Pro', current: user?.role === 'pro', popular: true, role: 'pro'
        },
        { 
            name: 'Enterprise', price: 'Custom', 
            features: ['Unlimited AI credits', 'Custom specialized agents', 'Infinite history & search', 'ISO-Grade security', 'Dedicated co-founder agent'],
            btn: 'Contact Sales', current: false, role: 'enterprise'
        }
    ];

    const handleUpgrade = async () => {
        setProcessing(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/ai/upgrade', { plan: 'pro' }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data.user);
            setShowCheckout(false);
            navigate('/dashboard');
        } catch (err) {
            alert('Payment failed. Please check your card.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div style={{ padding: '8rem 2rem 10rem', background: 'var(--bg)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Simple, <span className="gradient-text">Scalable</span> Pricing</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>Choose the co-founder you need to reach the next stage of your startup journey.</p>
                    
                    {/* Toggle */}
                    <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                        <span style={{ fontSize: '0.9rem', color: billingCycle === 'monthly' ? 'var(--text)' : 'var(--text-muted)', fontWeight: '600' }}>Monthly</span>
                        <div 
                            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                            style={{ width: '56px', height: '30px', background: 'var(--primary)', borderRadius: '15px', padding: '3px', cursor: 'pointer', display: 'flex', justifyContent: billingCycle === 'monthly' ? 'flex-start' : 'flex-end', transition: 'all 0.3s' }}
                        >
                            <motion.div layout style={{ width: '24px', height: '100%', background: 'white', borderRadius: '50%' }}></motion.div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.9rem', color: billingCycle === 'yearly' ? 'var(--text)' : 'var(--text-muted)', fontWeight: '600' }}>Yearly</span>
                            <span style={{ fontSize: '0.75rem', background: '#10b981', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>-20%</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
                    {plans.map((p, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -10 }}
                            className="premium-card"
                            style={{ 
                                border: p.popular ? '2px solid var(--primary)' : '1px solid var(--border)',
                                position: 'relative'
                            }}
                        >
                            {p.popular && (
                                <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '0.3rem 1.2rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold', boxShadow: '0 4px 12px var(--primary-glow)' }}>MOST POPULAR</div>
                            )}
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{p.name}</h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '2rem' }}>
                                <span style={{ fontSize: '3rem', fontWeight: '800' }}>${p.price}</span>
                                {p.price !== 'Custom' && <span style={{ color: 'var(--text-muted)' }}>/mo</span>}
                            </div>
                            
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                                {p.features.map((f, fi) => (
                                    <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1rem', color: 'var(--text-muted)' }}>
                                        <Check size={18} color="var(--primary)" /> {f}
                                    </li>
                                ))}
                            </ul>

                            {p.name === 'Enterprise' ? (
                                <button 
                                    onClick={() => navigate('/contact')}
                                    className="glass" 
                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontWeight: 'bold', height: '3.4rem', border: '1px solid var(--border)' }}
                                >
                                    {p.btn}
                                </button>
                            ) : (
                                <button 
                                    disabled={p.current}
                                    onClick={() => { setSelectedPlan(p); setShowCheckout(true); }}
                                    className={p.popular ? "btn-primary" : "glass"} 
                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontWeight: 'bold', height: '3.4rem', border: p.popular ? 'none' : '1px solid var(--border)', opacity: p.current ? 0.6 : 1 }}
                                >
                                    {p.current ? 'Current Plan' : p.btn}
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Mock Checkout Modal */}
            <AnimatePresence>
                {showCheckout && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCheckout(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}></motion.div>
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass"
                            style={{ position: 'relative', background: 'var(--bg)', width: '100%', maxWidth: '500px', padding: '3rem', borderRadius: '32px', boxShadow: 'var(--shadow-xl)' }}
                        >
                            <button onClick={() => setShowCheckout(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-muted)' }}><X /></button>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Secure Checkout</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Upgrade to Wakil AI Pro Plan</p>
                            
                            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <span style={{ fontWeight: '600' }}>Pro Plan - {billingCycle.toUpperCase()}</span>
                                    <span style={{ fontWeight: '800' }}>${selectedPlan?.price}.00</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    <span>Taxes</span>
                                    <span>$0.00</span>
                                </div>
                                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.2rem' }}>
                                    <span>Total</span>
                                    <span>${selectedPlan?.price}.00</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <CreditCard size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                                    <input placeholder="Card Number" defaultValue="4242 4242 4242 4242" style={{ paddingLeft: '3rem' }} />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <input placeholder="MM/YY" defaultValue="12/28" />
                                    <input placeholder="CVC" defaultValue="123" />
                                </div>
                            </div>
                            
                            <button 
                                onClick={handleUpgrade}
                                disabled={processing}
                                className="btn-primary" 
                                style={{ width: '100%', height: '3.6rem', fontSize: '1.1rem' }}
                            >
                                {processing ? 'Verifying Card...' : 'Pay & Upgrade Now'}
                            </button>
                            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <Shield size={14} /> Secured by Stripe Connect
                            </p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PricingPage;
