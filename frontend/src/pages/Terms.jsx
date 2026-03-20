import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
    return (
        <div style={{ padding: '8rem 2rem 10rem', background: 'var(--bg)' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Terms of Service</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Last updated: March 20, 2026</p>
                    
                    <section style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.2rem' }}>1. Acceptance of Terms</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            By accessing and using Wakil AI ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, you must not use the Service. Wakil AI is a product of Wakil AI Technologies Inc.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.2rem' }}>2. Description of Service</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            Wakil AI provides AI-powered business tools, including but not limited to strategy generation, marketing copy, and product roadmaps. The Service is provided "as is" and relies on third-party large language models.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.2rem' }}>3. User Credits & Subscriptions</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            Users are granted a limited number of credits upon registration. Additional credits are available through our paid subscription plans. Credits are non-refundable and non-transferable. Subscriptions automatically renew unless cancelled.
                        </p>
                    </section>
                    
                    <section style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.2rem' }}>4. Intellectual Property</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            While you own the outputs generated through your prompts, Wakil AI retains all rights to its platform, interface, and underlying proprietary algorithms.
                        </p>
                    </section>
                    
                    <div style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Questions about our terms? Contact us at legal@wakilai.com</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Terms;
