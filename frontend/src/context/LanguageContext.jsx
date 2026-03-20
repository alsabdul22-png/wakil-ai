import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en'); // en, ar, de

    const translations = {
        en: {
            hero_title: 'Your AI Virtual Co-Founder.',
            hero_subtitle: 'Transform your business with specialized AI agents.',
            start: 'Get Started',
            pricing: 'Pricing',
            dashboard: 'Dashboard',
            login: 'Login',
            signup: 'Join Free',
            marketing: 'Brand & Copy',
            product: 'Product & Web',
            ops: 'Operations',
            credits: 'Credits',
            logout: 'Logout'
        },
        ar: {
            hero_title: 'مؤسس مشارك افتراضي بالذكاء الاصطناعي.',
            hero_subtitle: 'حول عملك باستخدام وكلاء الذكاء الاصطناعي المتخصصين.',
            start: 'ابدأ الآن',
            pricing: 'الأسعار',
            dashboard: 'لوحة التحكم',
            login: 'تسجيل الدخول',
            signup: 'انضم مجاناً',
            marketing: 'العلامة التجارية والنسخ',
            product: 'المنتج والموقع',
            ops: 'العمليات',
            credits: 'الرصيد',
            logout: 'تسجيل الخروج'
        },
        de: {
            hero_title: 'Dein KI-basierter Co-Founder.',
            hero_subtitle: 'Verwandle dein Startup mit spezialisierten KI-Agenten.',
            start: 'Jetzt Starten',
            pricing: 'Preise',
            dashboard: 'Dashboard',
            login: 'Anmelden',
            signup: 'Kostenlos Beitreten',
            marketing: 'Marketing & Texte',
            product: 'Produkt & Web',
            ops: 'Operationen',
            credits: 'Credits',
            logout: 'Abmelden'
        }
    };

    const t = (key) => translations[lang][key] || key;

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
