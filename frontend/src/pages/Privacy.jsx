import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
    return (
        <div style={{ padding: '8rem 2rem 10rem', background: 'var(--bg)' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Privacy Policy</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Last updated: March 20, 2026</p>
                    
                    <section style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.2rem' }}>1. Data Collection</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            We collect basic information required for service delivery, such as your email address, name, and billing details. Additionally, we store your prompt history locally for your convenience.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.2rem' }}>2. Third-Party AI Providers</h3>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Your prompts are sent securely to our third-party AI provider (OpenAI or similar) to generate outputs. We do NOT allow these providers to train their public models on your private data.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.2rem' }}>3. Cookies & Tracking</h3>
                        <p style={{ color: 'var(--text-muted)' }}>
                            We use essential cookies to maintain your login session and improve our service. No third-party tracking cookies are used on Wakil AI.
                        </p>
                    </section>
                    
                    <section style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.2rem' }}>4. Your Rights</h3>
                        <p style={{ color: 'var(--text-muted)' }}>
                            You have the right to export or delete your user account and data at any time. Simply use our contact page to request a deletion of all records associated with your email.
                        </p>
                    </section>

                    <div style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '16px' }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Learn more about our commitment to user privacy at privacy@wakilai.com</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
