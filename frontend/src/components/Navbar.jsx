import { useState } from 'react';

const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'hi', label: 'हि', name: 'Hindi' },
  { code: 'mr', label: 'म', name: 'Marathi' },
  { code: 'fr', label: 'FR', name: 'French' },
  { code: 'es', label: 'ES', name: 'Spanish' },
  { code: 'ar', label: 'ع', name: 'Arabic' },
];

const TRANSLATIONS = {
  en: { home: 'Home', history: 'History', about: 'About' },
  hi: { home: 'होम', history: 'इतिहास', about: 'के बारे में' },
  mr: { home: 'मुख्यपृष्ठ', history: 'इतिहास', about: 'माहिती' },
  fr: { home: 'Accueil', history: 'Historique', about: 'À propos' },
  es: { home: 'Inicio', history: 'Historial', about: 'Acerca de' },
  ar: { home: 'الرئيسية', history: 'السجل', about: 'حول' },
};

function Navbar({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const current = LANGUAGES.find(l => l.code === lang);

  return (
    <nav style={{
      background: 'rgba(13,10,26,0.95)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      backdropFilter: 'blur(16px)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 32px', height: '64px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 34, height: 34,
            background: 'linear-gradient(135deg,#4f2dc8,#c9a84c)',
            borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="3" width="12" height="2" rx="1" fill="white" opacity=".9"/>
              <rect x="2" y="7" width="16" height="2" rx="1" fill="white" opacity=".7"/>
              <rect x="2" y="11" width="10" height="2" rx="1" fill="white" opacity=".5"/>
              <circle cx="15" cy="14" r="3" stroke="#c9a84c" strokeWidth="1.5"/>
              <line x1="17.2" y1="16.2" x2="19" y2="18" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 16, letterSpacing: '-0.3px' }}>
            Fake<span style={{ color: '#c9a84c' }} >  News < /span> Detector
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {[
            { key: 'home', path: '/' },
            { key: 'history', path: '/history' },
            { key: 'about', path: '/about' },
          ].map(item => (
            <a key={item.key} href={item.path} style={{
              padding: '7px 15px', borderRadius: 8, fontSize: 14,
              color: window.location.pathname === item.path ? '#c9a84c' : '#8882aa',
              background: window.location.pathname === item.path
                ? 'rgba(201,168,76,0.1)' : 'none',
              textDecoration: 'none', transition: 'all .2s',
            }}>
              {t[item.key]}
            </a>
          ))}

          {/* Language Switcher */}
          <div style={{ position: 'relative', marginLeft: 8 }}>
            <button
              onClick={() => setOpen(!open)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 8,
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.25)',
                color: '#c9a84c', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              🌐 {current?.label} ▾
            </button>
            {open && (
              <div style={{
                position: 'absolute', top: '110%', right: 0,
                background: '#13102a', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, overflow: 'hidden', minWidth: 140,
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 200,
              }}>
                {LANGUAGES.map(l => (
                  <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '10px 16px', background: lang === l.code
                        ? 'rgba(201,168,76,0.1)' : 'none',
                      border: 'none', color: lang === l.code ? '#c9a84c' : '#8882aa',
                      fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'all .15s',
                    }}
                  >
                    {l.label} — {l.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
export { TRANSLATIONS };