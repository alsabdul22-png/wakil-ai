import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';
import { 
    MessageSquare, Sparkles, Send, Loader2, 
    LayoutDashboard, Database, Target, Rocket,
    CreditCard, Settings, ChevronRight, Copy, Check, 
    History, PlayCircle, BookOpen, AlertCircle, TrendingUp,
    Users, Link as LinkIcon, Share2, Terminal, Info, Globe,
    Eraser, User, Bot, ArrowDown, Image as ImageIcon,
    Layout, Mail, Hash, Code, ShieldCheck, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const { user, setUser } = useAuth();
    const { t } = useLanguage();
    const [prompt, setPrompt] = useState('');
    const [tool, setTool] = useState('brand'); 
    const [messages, setMessages] = useState([]); // [{ role: 'user', content: '' }, { role: 'ai', content: '' }]
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    
    const messagesEndRef = useRef(null);

    const tools = [
        { id: 'brand', name: 'Brand & Copy', icon: <Mail size={18} />, color: '#00ff88', placeholder: 'Generate strategic emails, brand stories, or social media posts...', templates: ['What is Barada AI', 'What is Wakil AI', 'Barada/Wakil AI Story'] },
        { id: 'website', name: 'Product & Web', icon: <Layout size={18} />, color: '#10b981', placeholder: 'Describe a website structure or HTML components...', templates: ['Landing Page Section', 'Modern SaaS Header', 'Interactive Hero Component'] },
        { id: 'image', name: 'AI Image Art', icon: <ImageIcon size={18} />, color: '#34d399', placeholder: 'Describe a futuristic visual or brand asset...', templates: ['Futuristic Workspace', 'Neon Brand Logo', 'Cyberpunk Cityscape'] },
        { id: 'operations', name: 'Operations', icon: <Settings size={18} />, color: '#059669', placeholder: 'Automate business inquiries or support flows...', templates: ['Investor Update Flow', 'Customer FAQ List', 'Team Brief Automation'] }
    ];

    const currentTool = tools.find(t => t.id === tool) || tools[0];

    useEffect(() => {
        if (user?.history) {
            setHistory(user.history);
        }
    }, [user]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleGenerate = async (e) => {
        if (e) e.preventDefault();
        if (!prompt.trim() || loading) return;

        const newUserMessage = { role: 'user', content: prompt };
        setMessages(prev => [...prev, newUserMessage]);
        setPrompt('');
        setLoading(true);

        try {
            const res = await axios.post('/api/ai/generate', { prompt: prompt, tool });
            
            if (res.data && res.data.result) {
                const newAiMessage = { role: 'ai', content: res.data.result, tool: tool };
                setMessages(prev => [...prev, newAiMessage]);
                // In Guest mode we don't sync history/credits to DB
            }
        } catch (err) {
            console.error('Generation failed:', err);
            setMessages(prev => [...prev, { role: 'ai', content: 'AI Service Error. Our systems are recalibrating. Please try again or check your session.' }]);
        } finally {
            setLoading(false);
        }
    };

    // Robust Parser for structured content
    const renderMarkdown = (content) => {
        if (!content || typeof content !== 'string') return null;

        try {
            // Ultimate Image Detection: Support any image markdown anywhere
            const imageMatch = Array.from(content.matchAll(/!\[.*?\]\((.*?)\)/g))[0];
            const textWithoutImage = content.replace(/!\[.*?\]\(.*?\)/g, '').trim();

            const sections = textWithoutImage.split('###').filter(s => s.trim() !== '');

            return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                    {sections.length > 0 ? sections.map((section, idx) => {
                        const lines = section.split('\n');
                        const title = lines[0] ? lines[0].trim() : "OUTPUT COMPONENT";
                        const body = lines.slice(1).join('\n').trim();
                        
                        return (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass"
                                style={{ 
                                    padding: '1.8rem', borderRadius: '20px', border: '1px solid var(--border)',
                                    background: 'rgba(255,255,255,0.01)', boxShadow: 'var(--shadow-lg)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem' }}>
                                    <div style={{ background: 'var(--primary)', padding: '0.4rem', borderRadius: '6px', display: 'flex' }}><Sparkles size={14} color="black" /></div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '2px' }}>{title.toUpperCase()}</h4>
                                </div>
                                <div style={{ fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-wrap', color: 'var(--text)' }}>
                                    {body}
                                </div>
                            </motion.div>
                        );
                    }) : (
                        <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text)' }}>{content}</div>
                    )}
                    
                    {imageMatch && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ marginTop: '1.5rem', borderRadius: '24px', overflow: 'hidden', border: '2px solid var(--primary)', boxShadow: '0 0 40px var(--primary-glow)', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                             <img src={imageMatch[1]} alt="AI Generated Canvas" style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', display: 'block', background: '#000' }} />
                             <div style={{ width: '100%', background: 'var(--primary)', padding: '0.8rem 1.4rem', color: 'black', fontWeight: '900', fontSize: '0.75rem', textAlign: 'center', letterSpacing: '2px' }}>
                                <ImageIcon size={14} style={{ marginRight: '0.6rem', verticalAlign: 'middle' }} /> SECURED LEGENDARY CANVAS DEPLOYED
                             </div>
                        </motion.div>
                    )}
                </div>
            );
        } catch (err) {
            console.error('Render error:', err);
            return <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>;
        }
    };

    const copyToClipboard = (text, index) => {
        try {
            navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };

    const useTemplate = (tmp) => setPrompt(tmp);
    const clearChat = () => setMessages([]);

    return (
        <div className="dashboard-grid" style={{ display: 'flex', minHeight: 'calc(100dvh - 72px)', height: 'calc(100dvh - 72px)', overflow: 'hidden', background: 'var(--bg)', color: 'var(--text)' }}>
            {/* Sidebar Left */}
            <aside className="sidebar-content" style={{ width: sidebarOpen ? 'clamp(240px, 15vw, 280px)' : '84px', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '2rem 1.2rem', background: 'var(--bg-secondary)', transition: 'all 0.4s', zIndex: 100 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', padding: '0 0.5rem' }}>
                         {sidebarOpen ? (
                             <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <img src="/logo.png" style={{ height: '32px', width: 'auto' }} alt="Logo" />
                                <p style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '2px', opacity: 0.7 }}>CONTROL PLANE</p>
                             </div>
                         ) : (
                            <img src="/logo.png" style={{ height: '24px', width: 'auto', margin: '0 auto' }} alt="Logo" />
                         )}
                         {sidebarOpen && (
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}>
                                <ChevronRight size={20} style={{ transform: sidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.4s' }} />
                            </button>
                         )}
                    </div>
                    
                    {tools.map(item => (
                        <button 
                            key={item.id}
                            onClick={() => setTool(item.id)}
                            style={{ 
                                display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '1rem 1.4rem', borderRadius: '18px',
                                background: tool === item.id ? 'var(--primary-light)' : 'transparent',
                                color: tool === item.id ? 'var(--primary)' : 'var(--text-muted)',
                                fontWeight: tool === item.id ? '900' : '500',
                                width: '100%',
                                border: tool === item.id ? '1px solid var(--border-focus)' : '1px solid transparent',
                                transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ color: 'inherit', display: 'flex' }}>{item.icon}</div>
                            {sidebarOpen && <span style={{ fontSize: '0.9rem' }}>{item.name}</span>}
                        </button>
                    ))}

                    {sidebarOpen && (
                        <div style={{ marginTop: '2.5rem', padding: '0 0.5rem' }}>
                            <p style={{ fontSize: '0.65rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '1.2rem', letterSpacing: '2px', opacity: 0.7 }}>QUICK BLUEPRINTS</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                {currentTool.templates.map(tmp => (
                                    <button 
                                        key={tmp}
                                        onClick={() => useTemplate(tmp)}
                                        style={{ 
                                            background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '0.8rem 1rem', 
                                            borderRadius: '12px', color: '#fff', fontSize: '0.75rem', textAlign: 'left',
                                            cursor: 'pointer', transition: '0.2s', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem',
                                            width: '100%'
                                        }}
                                        onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'}
                                        onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
                                    >
                                        <Zap size={12} /> {tmp}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {sidebarOpen && (
                        <div style={{ marginTop: '3rem', padding: '0 0.5rem' }}>
                            <p style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--text-muted)', marginBottom: '1.5rem', letterSpacing: '1.5px', opacity: 0.5 }}>STRATEGIC ASSETS</p>
                            <a href="https://barada.cloud" target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 0', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                <Globe size={16} /> Barada.cloud Sync
                            </a>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 0', opacity: 0.5 }}>
                                <Terminal size={16} /> System Lattice v4.2
                            </div>
                        </div>
                    )}
                </div>

                    <div className="glass" style={{ padding: '1.8rem', borderRadius: '24px', border: '1px solid var(--border)', marginBottom: '1.2rem', background: 'rgba(0,255,136,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.75rem' }}>
                            <span style={{ fontWeight: '900', color: 'var(--primary)', letterSpacing: '1px' }}>RESOURCES</span>
                            <span style={{ fontWeight: '900' }}>999 / 999 🚀</span>
                        </div>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                             <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), #fff)', boxShadow: '0 0 15px var(--primary-glow)' }}></motion.div>
                        </div>
                        <button style={{ width: '100%', background: '#fff', color: '#000', padding: '0.8rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '900', border: 'none', cursor: 'default', transition: '0.2s' }}>INFINITE ACCESS ACTIVE</button>
                    </div>
            </aside>

            {/* Chat Workspace Main */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', background: 'var(--bg)' }}>
                {/* Fixed Header */}
                <header className="dashboard-header" style={{ 
                    padding: '1.2rem clamp(1rem, 5vw, 3.5rem)', 
                    borderBottom: '1px solid var(--border)', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    background: 'rgba(3,8,6,0.8)', 
                    backdropFilter: 'blur(20px)', 
                    zIndex: 100 
                }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.3rem' }}>
                            <h2 style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', fontWeight: '900', letterSpacing: '-0.5px' }}>{currentTool.name} <span className="gradient-text">Agent</span></h2>
                            <div className="sync-badge" style={{ background: 'var(--primary-light)', padding: '0.25rem 0.6rem', borderRadius: '8px', fontSize: '0.55rem', color: 'var(--primary)', fontWeight: '900', letterSpacing: '1.5px', border: '1px solid var(--border)' }}>SYNC LIVE</div>
                        </div>
                        <p className="subtitle-tech" style={{ fontSize: 'min(0.75rem, 3vw)', color: 'var(--text-muted)', fontWeight: '500', letterSpacing: '0.5px' }}>Barada Distributed Neural Architecture v4.2</p>
                    </div>
                    <button onClick={clearChat} style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', fontWeight: '700', background: 'transparent', border: 'none', cursor: 'pointer', opacity: 0.7 }}>
                        <Eraser size={18} /> <span className="btn-text">Clear</span>
                    </button>
                </header>

                {/* Messages Area */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '3.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <AnimatePresence mode="popLayout">
                        {messages.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ textAlign: 'center', marginTop: '6vh', maxWidth: '700px', margin: '6vh auto' }}
                            >
                                <div className="float-anim" style={{ marginBottom: '3rem', position: 'relative' }}>
                                    <img src="/logo.png" style={{ height: '120px', width: 'auto', filter: 'drop-shadow(0 0 30px var(--primary-glow))' }} alt="Logo" />
                                    <div style={{ position: 'absolute', inset: 0, background: 'var(--primary)', opacity: 0.05, filter: 'blur(40px)', borderRadius: '50%', zIndex: -1 }}></div>
                                </div>
                                <h3 style={{ fontSize: '2.4rem', marginBottom: '1rem', fontWeight: '900' }}>Hello <span className="gradient-text">Guest</span>, how can <span style={{ color: 'var(--primary)' }}>Wakil</span> help u today?</h3>
                                <div style={{ 
                                    display: 'inline-flex', alignItems: 'center', gap: '1.5rem', padding: '0.8rem 2rem', 
                                    background: 'rgba(255,255,255,0.02)', borderRadius: '50px', border: '1px solid var(--border)',
                                    marginBottom: '4rem', boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <img src="/logo.png" style={{ height: '20px' }} alt="Wakil" />
                                        <span style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '1.5px', color: '#fff' }}>WAKIL AI</span>
                                    </div>
                                    <div style={{ width: '1px', height: '14px', background: 'var(--border)' }}></div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <div style={{ width: '22px', height: '22px', borderRadius: '4px', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                            <img src="/barada-logo.png" style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Barada" />
                                        </div>
                                        <span style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '1.5px', color: 'var(--primary)' }}>BARADA AI</span>
                                    </div>
                                    <div style={{ height: '22px', padding: '0 0.8rem', background: 'var(--primary-light)', borderRadius: '20px', display: 'flex', alignItems: 'center', fontSize: '0.55rem', fontWeight: '900', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
                                        STRATEGIC ALLIANCE
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                                    {currentTool.templates.map(tmp => (
                                         <button 
                                             key={tmp} 
                                             onClick={() => useTemplate(tmp)} 
                                             className="premium-card" 
                                             style={{ 
                                                 padding: '1.2rem', fontSize: '0.85rem', fontWeight: '800', borderRadius: '20px', 
                                                 textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.8rem', 
                                                 background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', cursor: 'pointer',
                                                 transition: '0.3s'
                                             }}
                                         >
                                             <div style={{ color: 'var(--primary)', background: 'var(--primary-light)', width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                                {tmp.includes('Barada') ? (
                                                    <img src="/barada-logo.png" style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Barada" />
                                                ) : <Zap size={16} />}
                                             </div>
                                             <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '800' }}>{tmp}</span>
                                         </button>
                                     ))}
                                 </div>
                            </motion.div>
                        ) : (
                            messages.map((msg, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`chat-bubble ${msg.role === 'user' ? 'chat-user' : 'chat-ai'}`}
                                    style={{ 
                                        width: msg.role === 'ai' ? '100%' : 'fit-content', 
                                        padding: msg.role === 'user' ? '1.2rem clamp(1rem, 4vw, 1.8rem)' : 'clamp(1.2rem, 5vw, 2.5rem)',
                                        borderRadius: '24px'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', opacity: 0.5 }}>
                                        {msg.role === 'user' ? <User size={18} /> : <Bot size={18} color="var(--primary)" />}
                                        <span style={{ fontSize: '0.75rem', fontWeight: '900', letterSpacing: '2px' }}>{msg.role === 'user' ? 'TACTICAL INPUT' : 'SYSTEM OUTPUT'}</span>
                                        {msg.tool && <span style={{ marginLeft: 'auto', background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: '900', border: '1px solid var(--border)' }}>{msg.tool.toUpperCase()} CORE</span>}
                                    </div>
                                    
                                    {msg.role === 'user' ? (
                                        <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#fff' }}>{msg.content}</div>
                                    ) : (
                                        renderMarkdown(msg.content)
                                    )}

                                    {msg.role === 'ai' && (
                                        <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                            <button onClick={() => copyToClipboard(msg.content, i)} style={{ background: 'transparent', border: 'none', color: copiedIndex === i ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                                                {copiedIndex === i ? <><Check size={16} /> Asset Archived</> : <><Copy size={16} /> Copy Asset</>}
                                            </button>
                                            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}><Share2 size={16} /> Deploy Strategy</button>
                                            <div style={{ marginLeft: 'auto', opacity: 0.3 }}><ShieldCheck size={18} /></div>
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                        {loading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="chat-bubble chat-ai" style={{ width: '94%', padding: '2.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', opacity: 0.5 }}>
                                    <Bot size={18} color="var(--primary)" />
                                    <span style={{ fontSize: '0.75rem', fontWeight: '900', letterSpacing: '2px' }}>SYNCHRONIZING WITH BARADA CLOUD...</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                    <div className="skeleton" style={{ width: '85%', height: '24px' }}></div>
                                    <div className="skeleton" style={{ width: '95%', height: '24px' }}></div>
                                    <div className="skeleton" style={{ width: '60%', height: '24px' }}></div>
                                    <div style={{ height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.01)', borderRadius: '24px', border: '1px dashed var(--border)', marginTop: '1.5rem' }}>
                                        <Loader2 className="animate-spin" size={40} color="var(--primary)" />
                                        <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '900', letterSpacing: '1px' }}>PROCESSING NEURAL LATTICE</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area Sticky */}
                <div style={{ padding: '1rem clamp(1rem, 5vw, 4rem) clamp(1rem, 5vw, 4rem)', background: 'linear-gradient(transparent, var(--bg) 30%)', zIndex: 10 }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                        <div className="premium-card" style={{ padding: '0.8rem clamp(0.8rem, 3vw, 1.5rem)', borderRadius: '26px', border: '1px solid var(--border-focus)', display: 'flex', alignItems: 'flex-end', gap: '1.2rem', background: 'rgba(8, 18, 14, 0.98)', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
                            <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate(); } }}
                                placeholder={currentTool.placeholder}
                                style={{ background: 'transparent', border: 'none', resize: 'none', padding: '1rem 0.5rem', minHeight: '58px', maxHeight: '200px', fontSize: '1.05rem', fontWeight: '500', color: '#fff' }}
                            />
                            <div style={{ paddingBottom: '0.6rem', display: 'flex', gap: '1rem' }}>
                                <button onClick={handleGenerate} disabled={loading || !prompt.trim()} className="btn-primary" style={{ padding: '0 clamp(1rem, 3vw, 1.8rem)', height: '48px', borderRadius: '16px', fontSize: '1rem', opacity: (loading || !prompt.trim()) ? 0.3 : 1 }}>
                                    {loading ? <Loader2 className="animate-spin" size={22} /> : <><Send size={20} /></>}
                                </button>
                            </div>
                        </div>
                        <div className="footer-badges" style={{ display: 'flex', justifyContent: 'center', gap: 'min(2.5rem, 5vw)', marginTop: '1.8rem', color: 'var(--text-muted)', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '2px', opacity: 0.5, flexWrap: 'wrap' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><ShieldCheck size={14} color="var(--primary)" /> <span className="badge-text">BARADA CLOUD SECURED</span></span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><ShieldCheck size={14} color="var(--primary)" /> <span className="badge-text">ISO/IEC 27001 CLOUD</span></span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><ShieldCheck size={14} color="var(--primary)" /> <span className="badge-text">ZERO-KNOWLEDGE AUTH</span></span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Sidebar Right: Context & History */}
            {sidebarOpen && (
                <aside className="sidebar-content" style={{ width: 'clamp(300px, 20vw, 360px)', borderLeft: '1px solid var(--border)', background: 'var(--bg-secondary)', padding: '3rem 1.8rem', display: 'flex', flexDirection: 'column' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.8rem' }}>
                        <History size={24} color="var(--primary)" />
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px' }}>STRATEGIC <span className="gradient-text">ARCHIVE</span></h3>
                     </div>
                     <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {history.length > 0 ? history.map(h => (
                            <motion.button 
                                key={h.id}
                                whileHover={{ x: 8, background: 'rgba(255,255,255,0.03)' }}
                                onClick={() => { 
                                    setMessages([{ role: 'user', content: h.prompt }, { role: 'ai', content: h.result, tool: h.tool }]);
                                    setTool(h.tool === 'marketing' ? 'brand' : (h.tool === 'product' ? 'website' : h.tool));
                                }}
                                style={{ textAlign: 'left', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '22px', border: '1px solid var(--border)', fontSize: '0.9rem', cursor: 'pointer', transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                                     <div style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '1.5px' }}>{h.tool?.toUpperCase()} ARCHIVE</div>
                                     <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>{new Date(h.createdAt).toLocaleDateString()}</div>
                                </div>
                                <div style={{ color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0.6rem', fontWeight: '700', fontSize: '1rem' }}>{h.prompt}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}><ShieldCheck size={14} color="var(--primary)" /> Synced with Barada Cloud</div>
                            </motion.button>
                        )) : (
                            <div style={{ textAlign: 'center', marginTop: '8rem', opacity: 0.15 }}>
                                <Database size={64} style={{ marginBottom: '2rem' }} />
                                <p style={{ fontWeight: '900', letterSpacing: '2px', fontSize: '0.8rem' }}>LATTICE MEMORY EMPTY</p>
                            </div>
                        )}
                     </div>
                     <div style={{ marginTop: '3rem', padding: '1.8rem', borderTop: '1px solid var(--border)', textAlign: 'center', background: 'var(--primary-light)', borderRadius: '24px', border: '1px solid var(--primary)' }}>
                         <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '900', marginBottom: '0.6rem', letterSpacing: '1.5px' }}>AGENT STATUS: OPTIMIZED</div>
                         <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Encryption Layer: Barada Core RSA-4096 / AES-256</p>
                     </div>
                </aside>
            )}
        </div>
    );
};

export default Dashboard;
