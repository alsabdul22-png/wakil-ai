import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import PricingPage from './pages/PricingPage';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { Mail } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div className="skeleton" style={{ width: '200px', height: '40px' }}></div>
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

function App() {
  const location = useLocation();

  return (
    <LanguageProvider>
        <AuthProvider>
        <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                        <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            
            {location.pathname !== '/dashboard' && (
                <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '6rem 0' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                    <img src="/logo.png" style={{ height: '32px' }} alt="Logo" />
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '900' }}>WAKIL <span className="gradient-text">AI</span></h3>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '300px' }}>
                                    The legendary virtual co-founder. Inspired by the architecture of <a href="https://barada.cloud" target="_blank" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Barada AI</a>.
                                </p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '2px', marginBottom: '1.5rem' }}>PRODUCT</h4>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    <li><a href="/pricing" style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</a></li>
                                    <li><a href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>Our Vision</a></li>
                                    <li><a href="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>Dashboard</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '2px', marginBottom: '1.5rem' }}>LEGAL</h4>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    <li><a href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a></li>
                                    <li><a href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '2px', marginBottom: '1.5rem' }}>SUPPORT</h4>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={14} /> Support@wakil-rd.de</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={14} /> Info@wakil-rd.de</li>
                                </ul>
                            </div>
                        </div>
                        <div style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                            © 2026 WAKIL AI LEGENDARY EDITION. ALL SYSTEMS OPERATIONAL.
                        </div>
                    </div>
                </footer>
            )}
        </div>
        </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
