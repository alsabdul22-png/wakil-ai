import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Menu, X, Globe, Heart, History, Compass, 
    ArrowRight, MapPin, Feather, Sparkles,
    Shield, Target, Users
} from 'lucide-react';

const SyriaProject = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const colors = {
        sand: '#f4e4bc',
        beige: '#faf7f2',
        olive: '#556b2f',
        earth: '#8b4513',
        text: '#2d2d2d',
        textLight: '#6b6b6b'
    };

    const features = [
        { icon: <History />, title: 'Deep Roots', desc: 'Exploring the cradle of civilization from Ebla to the Umayyads.' },
        { icon: <Compass />, title: 'Modern Vision', desc: 'Synthesizing historical patterns with futuristic urban planning.' },
        { icon: <Feather />, title: 'Artisan Culture', desc: 'Preserving the intricate damascene metalwork and silk weaving traditions.' }
    ];

    return (
        <div style={{ background: colors.beige, color: colors.text, fontFamily: "'Inter', sans-serif" }}>
            {/* Navbar */}
            <nav style={{ 
                position: 'fixed', top: 0, width: '100%', zIndex: 1000,
                background: scrolled ? 'rgba(250, 247, 242, 0.9)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                height: '80px', display: 'flex', alignItems: 'center',
                transition: '0.4s', borderBottom: scrolled ? `1px solid rgba(0,0,0,0.05)` : 'none'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', width: '90%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: '900', letterSpacing: '2px', fontSize: '1.2rem', color: colors.olive }}>
                        <feTurbulence type="turbulence" />
                        SYRIAN <span style={{ opacity: 0.6 }}>LEGACY</span>
                    </div>

                    {/* Desktop Links */}
                    <div style={{ display: 'none', gap: '3rem', fontSize: '0.9rem', fontWeight: 'bold' }} className="d-lg-flex">
                        {['Heritage', 'Architecture', 'The Future', 'Contact'].map(item => (
                            <a key={item} href={`#${item.toLowerCase()}`} style={{ textDecoration: 'none', color: colors.text, opacity: 0.7, transition: '0.3s' }} onMouseOver={e=>e.target.style.opacity=1} onMouseOut={e=>e.target.style.opacity=0.7}>{item}</a>
                        ))}
                    </div>

                    <button onClick={() => setMobileMenu(true)} className="d-lg-none" style={{ background: 'transparent', border: 'none', color: colors.olive }}>
                        <Menu size={28} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} style={{ position: 'fixed', inset: 0, background: colors.beige, zIndex: 2000, padding: '2rem' }}>
                         <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4rem' }}>
                            <button onClick={() => setMobileMenu(false)} style={{ background: 'transparent', border: 'none' }}><X size={32} /></button>
                         </div>
                         <div style={{ display: 'grid', gap: '2.5rem', fontSize: '2rem', fontWeight: '900' }}>
                            {['Heritage', 'Architecture', 'The Future', 'Contact'].map(i => <a onClick={()=>setMobileMenu(false)} href={`#${i.toLowerCase()}`} key={i} style={{ color: colors.olive, textDecoration: 'none' }}>{i}</a>)}
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <header style={{ position: 'relative', height: '100dvh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/syrian_modern_vision_hero_1774142967978.png" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1, filter: 'brightness(0.85)' }} alt="Syrian Vision" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))', zIndex: -1 }}></div>
                <div style={{ textAlign: 'center', color: '#fff', width: '90%', maxWidth: '900px' }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                            Preserving <span style={{ color: colors.sand }}>Legacy</span>,<br />
                            Building <span style={{ color: colors.sand }}>Tomorrow</span>
                        </h1>
                        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', opacity: 0.9, marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
                            Synthesizing Damascene geometry with modern sustainability to define the next chapter of Syrian architectural identity.
                        </p>
                        <button style={{ 
                            background: colors.sand, color: colors.earth, padding: '1.2rem 3rem', borderRadius: '50px', 
                            border: 'none', fontWeight: '900', letterSpacing: '1px', cursor: 'pointer', transition: '0.4s',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                        }} onMouseOver={e=>e.target.style.transform='translateY(-5px)'} onMouseOut={e=>e.target.style.transform='translateY(0)'}>
                            EXPLORE THE VISION
                        </button>
                    </motion.div>
                </div>
            </header>

            {/* Grid Section */}
            <section id="heritage" style={{ padding: '8rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <span style={{ color: colors.olive, fontWeight: '900', fontSize: '0.8rem', letterSpacing: '3px' }}>OUR PHILOSOPHY</span>
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', marginTop: '1rem' }}>Architecture that <span style={{ color: colors.olive }}>Speaks</span>.</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                        {features.map((f, i) => (
                            <motion.div 
                                key={i} whileHover={{ y: -10 }} 
                                style={{ background: '#fff', padding: '4rem 3rem', borderRadius: '32px', border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 20px 60px rgba(0,0,0,0.02)' }}
                            >
                                <div style={{ color: colors.olive, marginBottom: '2rem', display: 'inline-flex', padding: '1.2rem', background: '#f5f5dc', borderRadius: '20px' }}>
                                    {f.icon}
                                </div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem' }}>{f.title}</h3>
                                <p style={{ color: colors.textLight, lineHeight: '1.8', fontSize: '1.1rem' }}>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Imagery/Vision Section */}
            <section style={{ background: colors.olive, color: '#fff', padding: '10rem 2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, background: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'center' }}>
                    <div style={{ borderRadius: '40px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.4)' }}>
                        <img src="/syrian_modern_vision_hero_1774142967978.png" style={{ width: '100%', transform: 'scale(1.1)', filter: 'sepia(0.2)' }} alt="Vision detail" />
                    </div>
                    <div>
                        <Feather size={48} style={{ color: colors.sand, marginBottom: '2rem' }} />
                        <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '2rem', lineHeight: '1.2' }}>The <span style={{ color: colors.sand }}>Soul</span> of the Levant.</h2>
                        <p style={{ opacity: 0.8, fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '3rem' }}>
                            Every stone in Syria tells a story of five millennia. Our project translates these stories into sustainable architectures that respect the climate, the people, and the future.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {[
                                { t: '15+', d: 'Modern Centers' },
                                { f: '500k', d: 'Historical Sites' }
                            ].map((stat, idx) => (
                                <div key={idx}>
                                    <h4 style={{ fontSize: '2.5rem', fontWeight: '900', color: colors.sand }}>{stat.t || stat.f}</h4>
                                    <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>{stat.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section id="contact" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                <div className="container" style={{ background: colors.sand, padding: '6rem 4rem', borderRadius: '50px', color: colors.earth }}>
                    <Sparkles size={48} style={{ marginBottom: '2rem' }} />
                    <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>Shape the <span style={{ opacity: 0.5 }}>Legacy</span>.</h2>
                    <p style={{ fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto 3rem', opacity: 0.8 }}>Join our network of architects, historians, and visionaries building the future of Syria.</p>
                    <button style={{ 
                        background: colors.earth, color: '#fff', padding: '1.4rem 4rem', borderRadius: '50px', fontSize: '1.1rem', 
                        fontWeight: '900', border: 'none', cursor: 'pointer', transition: '0.3s' 
                    }}>GET INVOLVED</button>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '6rem 2rem', borderTop: '1px solid rgba(0,0,0,0.05)', textAlign: 'center', opacity: 0.6, fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '3rem', fontWeight: 'bold' }}>
                    <a href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
                    <a href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
                    <a href="mailto:info@syria-legacy.com" style={{ color: 'inherit', textDecoration: 'none' }}>Email</a>
                </div>
                <p>© 2026 THE SYRIAN LEGACY PROJECT. ALL RIGHTS RESERVED WORLDWIDE.</p>
            </footer>

            <style>{`
                html { scroll-behavior: smooth; }
                .d-lg-none { display: block; }
                .d-lg-flex { display: none; }
                @media (min-width: 1024px) {
                    .d-lg-none { display: none !important; }
                    .d-lg-flex { display: flex !important; }
                }
                section { overflow: hidden; }
                img { max-width: 100%; transition: 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
            `}</style>
        </div>
    );
};

export default SyriaProject;
